import React, { useState } from 'react';
import { useAuthContext, firestore, fireStorage } from '../../context';
import { FreeReportModal } from '../../components';
import { Bar, Button, Header, Spacer } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { Radio } from '../../components/UI/Form/Radio';
import { FileInput } from '../../components/UI/Form/FileInput';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const HouseHunter = () => {
  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hasAgent: '',
      preapproval: '',
      salary: '',
    },
  });
  const { user } = useAuthContext();
  const [saving, setSaving] = useState<boolean>(false);

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
            preapprovalDownloadURL: '',
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

  return (
    <div>
      <div className="flex justify-between">
        <Header as="h2">Welcome {`${user.firstName} ${user.lastName}`}</Header>
        <FreeReportModal />
      </div>
      <Spacer />
      <div className="my-4">
        To help us better understand please fill out the form below if applicable.
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Spacer />
        <FileInput label="Upload Preapproval" {...register('preapproval')} />
        <Spacer />
        <Form.Text
          type="number"
          label="What is your salary?"
          placeholder="Salary"
          {...register('salary')}
        />
        <Spacer className="mt-4" />
        <Button type="submit" color="secondary" loading={saving}>
          Save
        </Button>
      </Form>
      <Spacer className="mb-6" />
      {formattedScore !== 'NaN' ? (
        <Bar number={Number(formattedScore)} />
      ) : (
        <div>Fill out the credit report to see credit score.</div>
      )}
      <div className="mt-8" />
      {formattedScore !== 'NaN' && <p>{`You score is ${formattedScore}`}</p>}
      <div className="mt-16" />
    </div>
  );
};

export default HouseHunter;
