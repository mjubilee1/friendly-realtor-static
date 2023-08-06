import React, { useEffect, useState } from 'react';
import { useAuthContext, firestore, fireStorage } from '../../context';
import { FreeReportModal } from '../../components';
import { Bar, Button, Header, Spacer } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { Radio } from '../../components/UI/Form/Radio';
import { FileInput } from '../../components/UI/Form/FileInput';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';

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
    <div>
      <div className="flex justify-between">
        <Header as="h2">Welcome {`${user.firstName} ${user.lastName}`}</Header>
        <FreeReportModal user={user} setCreditProfile={setCreditProfile} />
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
    </div>
  );
};

export default HouseHunter;
