import React, { useState } from 'react';
import { AddLink, Button, Modal, Popup } from './UI';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../context';
import { Formik, Form, Field } from 'formik';
import { usePopup } from './UI/Popup';

export const RegisterModal = ({ mobile = false }) => {
  const { isOpen, message, openPopup, closePopup } = usePopup();

  const [open, setOpen] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>('');

  const handleSignUp = async (values) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(res.user);
      await setDoc(doc(firestore, 'buyers', res.user.uid), {
        name: values.name,
      });
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
                validate={validatePassword}
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
                validate={(value) => {
                  validateConfirmPassword(value, values.password);
                }}
              />
              {errors.confirmPassword && (
                <div className="text-red-500 mt-2">{errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
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
