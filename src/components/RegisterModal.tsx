import React, { useState } from 'react';
import { AddLink, Button, Modal, Popup } from './UI';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../context';
import { Formik, Form, Field } from 'formik';
import { usePopup } from './UI/Popup';
import { splitName } from '../utils/commonUtil';
import * as Yup from 'yup';
import { user } from '../agents';

export const RegisterModal = ({ mobile = false }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email Address is required'),
    password: Yup.string()
      .required('Password is required')
      .test(
        'password-strength',
        'Password must contain at least 8 characters including uppercase, lowercase, numbers, and special characters.',
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value),
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required('Confirm Password is required'),
  });
  const { isOpen, message, openPopup, closePopup } = usePopup();

  const [open, setOpen] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>('');

  const handleSignUp = async (values) => {
    try {
      const { firstName, lastName } = splitName(values.name);
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(res.user);
      const subscriberObj = {
        firstName,
        lastName,
        emailAddress: res.user.email,
      };
      await setDoc(doc(firestore, 'buyers', res.user.uid), subscriberObj);
      await user.newSubscriber(subscriberObj);
      openPopup('Email verification sent!');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorState('Email already in use, try another one.');
          break;
        case 'auth/invalid-email':
          setErrorState('Please enter a valid email!');
          break;
        case 'auth/weak-password':
          setErrorState('Please enter a stronger password!');
          break;
        case undefined:
          setErrorState(error.message as string);
          break;
        default:
          setErrorState(`Contact Support contact@friendlyrealtor.app ${error.message}`);
      }
    }
  };

  const validatePassword = (value) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
      return 'Password must contain at least 8 characters including uppercase, lowercase, numbers, and special characters.';
    }
    return undefined;
  };

  const validateConfirmPassword = (value, values) => {
    if (value !== values.password) {
      return 'Passwords do not match.';
    }
    return undefined;
  };

  return (
    <Modal
      open={open}
      trigger={
        mobile ? (
          <AddLink
            onClick={() => setOpen((prev) => !prev)}
            className="font-ubuntu my-2 font-normal cursor-pointer text-[16px] text-white"
          >
            Register
          </AddLink>
        ) : (
          <Button type="button" color="secondary" onClick={() => setOpen((prev) => !prev)}>
            Register
          </Button>
        )
      }
      onClose={() => setOpen(false)}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Register on FriendlyRealtor</h2>
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        {({ errors, values }) => (
          <Form>
            {errorState !== '' ? <div className="text-red-500 mt-2">{errorState}</div> : null}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
              />
              {errors.password && <div className="text-red-500 mt-2">{errors.password}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border rounded"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="text-red-500 mt-2">{errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className={`w-full py-2 px-4 bg-blue-500 ${
                Object.keys(errors).length > 0 && 'opacity-30'
              } text-white rounded hover:bg-blue-600`}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
      {isOpen && (
        <Popup
          message={message}
          onClose={() => {
            closePopup();
            setOpen(false);
          }}
        />
      )}
    </Modal>
  );
};
