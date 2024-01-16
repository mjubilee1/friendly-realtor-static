import React, { useEffect, useState } from 'react';
import { useAuthContext, firestore, fireStorage, realtimeDb } from '../../context';
import { Bar, Button, Header, Spacer, Container } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { Radio } from '../../components/UI/Form/Radio';
import { FileInput } from '../../components/UI/Form/FileInput';
import { PaymentMethod } from '../../components';
import { useForm } from 'react-hook-form';
import { Select } from '../../components/UI/Select';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  Timestamp,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ref as databaseRef, push, set, onValue } from 'firebase/database';
import moment from 'moment'; // Import moment.js for timestamp formatting
import { filter } from 'lodash';
import { PlaidLink } from 'react-plaid-link';

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
  const [accounts, setAccounts] = useState([]);
  const [token, setToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [frequency, setFrequency] = useState<string>('');
  const [unlinkLoading, setUnlinkLoading] = useState<boolean>(false);
  const [transferLoading, setTransferLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [recurringAmount, setRecurringAmount] = useState<number>(0);
  const [sourceAccount, setSourceAccount] = useState<string>('');
  const [destinationAccount, setDestinationAccount] = useState<string>('');
  const [accountOptions, setAccountOptions] = useState([]);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      setAccountOptions([]);
      return;
    }

    const filteredAccounts = accounts.filter(
      (destAccount) => destAccount.account_id !== sourceAccount.account_id,
    );

    const mappedOptions = filteredAccounts.map((destAccount) => ({
      value: destAccount.account_id,
      label: destAccount.name,
    }));

    setAccountOptions(mappedOptions);
  }, [user, accounts]);

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

  useEffect(() => {
    const createPlaidLinkToken = async () => {
      try {
        if (user) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-link-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user?.id || '' }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch Plaid Link token');
          }
          const res = await response.json();
          setToken(res.link_token);
          const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
          const docRef = doc(plaidAccountsCollection, user.id);

          // Check if there's an existing document for the user
          const existingDoc = await getDoc(docRef);
          if (!existingDoc.exists()) {
            // If no existing document, add a new one with the specified document ID
            await setDoc(docRef, {
              userId: user.id,
              createdAt: serverTimestamp(),
            });
          } else if (existingDoc.data()) {
            const data = existingDoc.data();
            setAccessToken(data.plaidAccessToken);
            setFrequency(data.frequency);
            setRecurringAmount(data.transferAmount || 0);
            setDestinationAccount(data?.destinationAccount?.label || null);
            setSourceAccount(data?.sourceAccount?.label || null);

            if (data.plaidAccessToken) {
              const balancesResponse = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/get-balances`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ accessToken: data.plaidAccessToken }),
                },
              );

              if (balancesResponse.ok) {
                const response = await balancesResponse.json();
                setAccounts(response.balances);
              } else {
                throw new Error('Failed to fetch balances');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching Plaid Link token:', error);
        // Handle the error as needed
      }
    };

    createPlaidLinkToken();
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

  const handleOnChange = async (value) => {
    setFrequency(value);
    await updateFrequencyInFirestore(value);
  };

  const updateFrequencyInFirestore = async (value) => {
    // Check if the accounts array exists (you may adjust this condition based on your data structure)
    if (accounts && accounts.length > 0) {
      // Assuming you have the necessary Firestore functions imported
      const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
      const docRef = doc(plaidAccountsCollection, user.id);

      // Update the frequency value in Firestore
      await updateDoc(docRef, { frequency: value || '' });
    }
  };

  const handleAmountChange = async (value) => {
    if (value < 0) {
      setMsg('Recurring amount cannot be negative');
      return;
    }
    setMsg('');
    setRecurringAmount(value);
    await updateAmountInFirestore(value);
  };

  const updateAmountInFirestore = async (value) => {
    if (accounts && accounts.length > 0) {
      const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
      const docRef = doc(plaidAccountsCollection, user.id);
      await updateDoc(docRef, { transferAmount: value || '' });
    }
  };
  const handleSourceChange = async (value) => {
    setSourceAccount(value.label);
    await updateSourceInFirestore(value);
  };

  const updateSourceInFirestore = async (value) => {
    if (accounts && accounts.length > 0) {
      const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
      const docRef = doc(plaidAccountsCollection, user.id);
      await updateDoc(docRef, { sourceAccount: value || null });
    }
  };

  const handleDestinationChange = async (value) => {
    setDestinationAccount(value.label);
    await updateDestinationInFirestore(value);
  };

  const updateDestinationInFirestore = async (value) => {
    if (accounts && accounts.length > 0) {
      const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
      const docRef = doc(plaidAccountsCollection, user.id);
      await updateDoc(docRef, { destinationAccount: value || null });
    }
  };

  const onPlaidSuccess = async (publicToken, metadata) => {
    try {
      // Send the public token to your server to exchange it for an access token
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/set-access-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token: publicToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to set access token');
      }

      const data = await response.json();

      const accountsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/accounts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!accountsResponse.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const accountsData = await accountsResponse.json();
      const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
      const docRef = doc(plaidAccountsCollection, user.id);

      // Check if there's an existing document for the user
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        // If there's an existing document, update it with the new accounts data
        await updateDoc(docRef, {
          accounts: accountsData.accounts, // assuming accountsData is the array of accounts
          institution: metadata.institution,
          plaidAccessToken: data.access_token,
          updatedAt: serverTimestamp(),
        });
        setAccessToken(data.access_token);
        setMsg('');
      } else {
        // If no existing document, you may choose to handle this case differently
        console.error('No existing document found for the user.');
      }
      // Handle connected accounts as needed
    } catch (error) {
      console.error('Error handling Plaid success:', error);
      // Handle the error as needed
    }
  };

  const handleUnlinkBankAccount = async () => {
    try {
      setUnlinkLoading(true);
      // Call your server endpoint to unlink the bank account
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/unlink-bank-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plaidAccessToken: accessToken }),
      });

      if (response.ok) {
        // Query Firestore to update plaidAccessToken to null
        const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
        const docRef = doc(plaidAccountsCollection, user.id);

        // Check if there's an existing document for the user
        const existingDoc = await getDoc(docRef);

        if (existingDoc.exists()) {
          // Update the document to set plaidAccessToken to null
          await updateDoc(docRef, { plaidAccessToken: null, accounts: [] });
        }
        setAccessToken(null);
      }
    } catch (error) {
      console.error('Error unlinking bank account:', error);
    } finally {
      setUnlinkLoading(false);
    }
  };

  const joinRecurringTransfer = async () => {
    try {
      setTransferLoading(true);

      if (!accessToken) {
        setMsg('Connect Bank Account First');
        return;
      }

      const fromAccount = accounts.find((account) => account.name === sourceAccount);
      const toAccount = accounts.find((account) => account.name === destinationAccount);

      const transferData = {
        accessToken: accessToken,
        fromAccountID: fromAccount?.account_id || '',
        toAccountID: toAccount?.account_id || '',
        amount: recurringAmount,
        frequency: frequency,
        name: user.firstName + ' ' + user.lastName,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-recurring-transfer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transferData),
        },
      );

      const responseData = await response.json();

      if (response.ok) {
        // Transfer created successfully
        setMsg('');

        const plaidAccountsCollection = collection(firestore, 'plaid_accounts');
        const docRef = doc(plaidAccountsCollection, user.id);

        // Check if there's an existing document for the user
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          await updateDoc(docRef, {
            sourceTransfer: responseData?.fromRetrieveTransfer || null,
            destinationTransfer: responseData?.toRetrieveTransfer || null,
          });
        }
      } else {
        setMsg(`Error setting up recurring transfer: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error joining recurring transfer:', error);
    } finally {
      setTransferLoading(false);
    }
  };

  const formattedScore = 'NaN';
  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  const preapprovalText = preapproval && !!preapproval[0]?.name ? 'preapproval_document' : null;
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      minHeight: 'unset',
    }),
  };

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - My Profile',
        noindex: true,
      }}
    >
      <div className="flex flex-row flex-wrap">
        <div className="flex-1">
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
            <div className="p-4">
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
            <div className="p-4">
              {selectedUser?.id && (
                <>
                  <div className="space-y-6 w-[480px]">
                    {filter(messages, (message) => message.key === selectedUser.id).map(
                      (message) => {
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
                            <p className="text-white italic text-xs">
                              {message.formattedTimestamp}
                            </p>
                          </div>
                        );
                      },
                    )}
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
        </div>
        <div className="pl-16">
          <Header as="h1">Payment Method</Header>
          {msg && <p className="my-2 text-red-500">{msg}</p>}
          <Elements stripe={stripePromise}>
            <PaymentMethod user={user} />
          </Elements>
          {/*<div className="mt-20 mb-4 text-3xl">Bank Account Saving's Feature</div>
          {!accessToken ? (
            <>
              <PlaidLink
                token={token}
                onSuccess={onPlaidSuccess}
                style={{ backgroundColor: '#000000' }}
              >
                Connect bank account
              </PlaidLink>
            </>
          ) : (
            <Button
              onClick={handleUnlinkBankAccount}
              loading={unlinkLoading}
              color="black"
              className="bg-red-500 rounded-sm text-white px-4 py-2 hover:bg-red-600"
            >
              Unlink bank account
            </Button>
          )}*/}
          {/*<div className="my-6">
            <p className="text-white my-2">
              Choose how often you want to transfer money into your other account.
            </p>
            <Select
              id="plaid-select"
              options={[
                {
                  value: 'weekly',
                  label: 'Weekly',
                },
                {
                  value: 'bi-weekly',
                  label: 'Bi Weekly',
                },
                {
                  value: 'monthly',
                  label: 'Monthly',
                },
              ]}
              value={{
                value: frequency,
                label: frequency.charAt(0).toUpperCase() + frequency.slice(1),
              }}
              placeholder="Select Transfer Schedule"
              onChange={(selectedOption) => handleOnChange(selectedOption.value)}
              styles={customStyles}
            />
            <div className="my-4">
              <label className="text-white block mb-2">Recurring Amount</label>
              <input
                type="number"
                value={recurringAmount}
                onChange={(e) => handleAmountChange(parseInt(e.target.value))}
                placeholder="Enter Amount"
                className="rounded-md px-3 text-black py-2 border-2 border-gray-300"
              />
            </div>
          </div>*/}
          {accessToken && accountOptions?.length > 0 && (
            <div>
              <label className="text-white block mb-2">Source Account</label>
              <Select
                id="source-account-select"
                value={sourceAccount && { value: sourceAccount, label: sourceAccount }}
                options={accountOptions}
                placeholder="Select Source Account"
                onChange={(selectedOption) => handleSourceChange(selectedOption)}
                styles={customStyles}
              />
              <div className="my-4" />
              <label className="text-white block mb-2">Destination Account</label>
              <Select
                id="destination-account-select"
                value={
                  destinationAccount && { value: destinationAccount, label: destinationAccount }
                }
                options={accountOptions}
                placeholder="Select Destination Account"
                onChange={(selectedOption) => handleDestinationChange(selectedOption)}
                styles={customStyles}
              />
            </div>
          )}
          {/*<Button
            color="black"
            onClick={joinRecurringTransfer}
            loading={transferLoading}
            className="bg-blue-500 my-4 round-sm py-2"
          >
            {accessToken ? 'Manage Recurring Payments' : 'Enroll in Recurring Payments'}
							</Button>*/}
          {accessToken && (
            <div className="flex flex-row mt-6 flex-wrap just-between border-2 border-white">
              {accounts?.length > 0 &&
                accounts.map((sourceAccount) => (
                  <div key={sourceAccount.account_id} className="mt-6 ml-6">
                    <div className="flex flex-row gap-2">
                      <Header as="h5">Source Account: </Header>
                      <div>{sourceAccount.name}</div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Header as="h5">Type: </Header>
                      <div>{sourceAccount.subtype}</div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Header as="h5">Current Balance:</Header>
                      <div>${sourceAccount.balances.current}</div>
                    </div>
                    <div className="mt-4">
                      <label className="text-white block mb-2">Select Destination Account</label>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default HouseHunter;
