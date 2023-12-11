import React, { useEffect, useState } from 'react';
import { useAuthContext, firestore, fireStorage, realtimeDb } from '../../context';
import { Bar, Button, Header, Spacer, Container } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { Radio } from '../../components/UI/Form/Radio';
import { FileInput } from '../../components/UI/Form/FileInput';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { ref as databaseRef, push, set, onValue } from 'firebase/database';
import moment from 'moment'; // Import moment.js for timestamp formatting
import { filter } from 'lodash';

const HouseHunter = () => {
  const { handleSubmit, register, reset, watch, setValue } = useForm({
    defaultValues: {
      hasAgent: '',
      preapproval: '',
      salary: '',
    },
  });

  const { user } = useAuthContext();
  const { preapproval } = watch();
  const [saving, setSaving] = useState<boolean>(false);
  const [creditProfile, setCreditProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [saving2, setSaving2] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user?.creditScore) {
      setCreditProfile(user.creditScore);
    }
  }, [user]);

  useEffect(() => {
    const retrieveAgentQuestions = async () => {
      if (user?.id) {
        const userDocRef = doc(collection(firestore, 'buyers'), user.id);

        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          if (data.agentQuestions) {
            const agentQuestions = data.agentQuestions;
            reset({
              hasAgent: agentQuestions?.hasAgent,
              salary: agentQuestions?.salary,
            });

            if (agentQuestions?.preapprovalDownloadURL) {
              // Convert the preapprovalDownloadURL to a File object
              const response = await fetch(agentQuestions.preapprovalDownloadURL);
              const blob = await response.blob();
              const file = new File([blob], 'preapproval_document'); // Provide a filename for the file
              // Set the File object as the value of the "preapproval" field in the form
              setValue('preapproval', file);
            }
          }
        }
      }
    };

    retrieveAgentQuestions();
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      const realtimeDbRef = databaseRef(realtimeDb, `users/${user.id}/messages`);

      // Fetch messages for the current user and listen for changes
      onValue(realtimeDbRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageKeys = Object.keys(data);
          const messagesData = [];
          const dataMessages = [];
          for (const key of messageKeys) {
            const usersCollection = collection(firestore, 'users');
            const userDocRef = doc(usersCollection, key);
            const buyerCollection = collection(firestore, 'buyers');
            const buyerDocRef = doc(buyerCollection, user.id);
            const buyerDocSnapshot = await getDoc(buyerDocRef);

            // Use getDoc to fetch the document by its reference
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
              dataMessages.push({
                id: key,
                ...userDocSnapshot.data(),
              });
            }

            const message = data[key];
            const innerMessageKeys = Object.keys(message);
            for (const innerKey of innerMessageKeys) {
              const refMessage = message[innerKey];
              const { content, senderId, timestamp } = refMessage;
              const formattedTimestamp = moment.unix(timestamp.seconds).format('MMM, Do, h:mm a');

              // Use Firestore to fetch the user's username based on senderId
              if (senderId) {
                messagesData.push({
                  key,
                  content,
                  senderId,
                  formattedTimestamp,
                  user: userDocSnapshot.data(),
                  buyer: buyerDocSnapshot.data(),
                });
              }
            }
          }
          setUserMessages(dataMessages);
          setMessages(messagesData);
        }
      });
    }
  }, [user]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async (selectedUserId: string) => {
    setSaving2(true);
    try {
      const senderMessagesRef = databaseRef(
        realtimeDb,
        `users/${user.id}/messages/${selectedUserId}`,
      );
      const recipientMessagesRef = databaseRef(
        realtimeDb,
        `users/${selectedUserId}/messages/${user.id}`,
      );

      const newMessageRef = push(senderMessagesRef);
      const newMessageRecipientMessageRef = push(recipientMessagesRef);

      const timestamp = Timestamp.now();

      const messageData = {
        senderId: user.id,
        content: messageText,
        timestamp: timestamp,
      };

      await set(newMessageRef, messageData);
      await set(newMessageRecipientMessageRef, messageData);

      setMessageText('');
    } catch (error) {
      console.log('Error sending message to user.', error);
    } finally {
      setSaving2(false);
    }
  };

  const uploadAndSaveFile = async (data) => {
    const file = data.preapproval?.length ? data.preapproval[0] : undefined;
    try {
      const userDocRef = doc(collection(firestore, 'buyers'), user.id);
      if (!!file) {
        // Upload the file to Firebase Storage
        const storageRef = ref(fireStorage, `preapproval/${user.id}/${file.name}`);
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(userDocRef, {
          agentQuestions: {
            hasAgent: data.hasAgent || '',
            salary: data.salary || '',
            preapprovalDownloadURL: downloadURL,
          },
        });
      } else {
        await updateDoc(userDocRef, {
          agentQuestions: {
            hasAgent: data.hasAgent || '',
            salary: data.salary || '',
            preapprovalDownloadURL: data.preapproval || '',
          },
        });
      }
    } catch (error) {
      console.error('Error uploading and saving file:', error);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const userDocRef = doc(collection(firestore, 'buyers'), user.id);

      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        uploadAndSaveFile(data);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
    setSaving(false);
  };

  const formattedScore = 'NaN';
  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  const preapprovalText = preapproval && !!preapproval[0]?.name ? 'preapproval_document' : null;

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - My Profile',
        noindex: true,
      }}
    >
      <div className="flex justify-between">
        <Header as="h2">Welcome {`${user.firstName} ${user.lastName}`}</Header>
        {/*<FreeReportModal user={user} setCreditProfile={setCreditProfile} />*/}
      </div>
      <Spacer />
      <div className="my-4">
        To help us better understand please fill out the form below if applicable.
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Radio
            label="Are you working with agent?"
            options={[
              {
                name: 'Yes',
                value: 'yes',
              },
              {
                name: 'No',
                value: 'no',
              },
            ]}
            {...register('hasAgent')}
          />
        </Form.Row>
        <Spacer />
        <Form.Row>
          <FileInput
            label="Upload Preapproval"
            {...register('preapproval')}
            text={preapproval?.name || preapprovalText}
          />
        </Form.Row>
        <Spacer />
        <Form.Text
          type="number"
          label="What is your salary?"
          placeholder="Salary"
          {...register('salary')}
        />
        <Spacer className="mt-4" />
        <Form.Row>
          <Button type="submit" color="secondary" loading={saving}>
            Save
          </Button>
        </Form.Row>
      </Form>
      <Spacer className="mb-6" />
      {!!creditProfile ? (
        <Bar number={creditProfile} />
      ) : (
        <div>Fill out the credit report to see credit score.</div>
      )}
      <div className="mt-8" />
      {!!creditProfile && <p>{`You score is ${creditProfile}`}</p>}
      <div className="mt-16" />
      <Header as="h3" className="mb-4">
        Messages
      </Header>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 p-4">
          {userMessages?.length > 0 && (
            <div className="flex flex-col space-y-6">
              {userMessages.map((message) => (
                <div
                  key={message.key}
                  onClick={() => handleUserClick(message)}
                  className="bg-white text-black rounded-lg shadow-md p-4 flex justify-between cursor-pointer transform transition hover:scale-105"
                >
                  <p className="text-lg font-semibold">{message.name}</p>
                  <Button
                    color="transparent"
                    iconOnly
                    icon={{ name: 'mail', color: 'secondary', size: 'large' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:w-3/4 p-4">
          {selectedUser?.id && (
            <>
              <div className="space-y-6">
                {filter(messages, (message) => message.key === selectedUser.id).map((message) => {
                  const isProfileUser = message.senderId === user.id;
                  return (
                    <div
                      className={`${
                        isProfileUser ? 'bg-gray-800' : 'bg-gray-500'
                      } rounded p-4 text-white`}
                    >
                      <p className="text-lg font-semibold">
                        {isProfileUser
                          ? message.buyer?.firstName + ' ' + message.buyer?.lastName
                          : message.user?.name}
                      </p>
                      <p className="text-white">{message.content}</p>
                      <p className="text-white italic text-xs">{message.formattedTimestamp}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <textarea
                  className="w-full h-20 p-4 mb-4 text-black rounded border-black border-2"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(event) => {
                    setMessageText(event?.target.value);
                  }}
                />
                <Button
                  color="secondary"
                  onClick={() => {
                    handleSendMessage(selectedUser.id);
                  }}
                  loading={saving2}
                >
                  Send Message
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default HouseHunter;
