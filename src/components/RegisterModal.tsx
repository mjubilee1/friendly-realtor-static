import React, { useEffect, useState } from 'react';
import { AddLink, Button, Modal, Popup } from './UI';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../context';
import { Formik, Form, Field } from 'formik';
import { usePopup } from './UI/Popup';
import { splitName } from '../utils/commonUtil';
import { fbEvent, gtagEvent } from '../utils/analyticsUtil';
import * as Yup from 'yup';
import { user } from '../agents';
import { useAppStore } from '../stores';
import { useRouter } from 'next/router';

export const RegisterModal = ({ mobile = false }) => {
  const router = useRouter();

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
  const { openLoginModal, isRegisterModalOpen, openRegisterModal, closeRegisterModal } =
    useAppStore();

  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isRegisterModalOpen) {
      fbEvent('open_register', {
        content_name: 'registration open',
        content_category: 'user_interaction',
        value: 1,
      });

      gtagEvent({
        action: 'open_register',
        category: 'user_interaction',
        label: 'registration open',
        value: 1,
      });
      const queryParameters = { registration: true };
      const updatedQuery = { ...router.query, ...queryParameters };
      router.push({ pathname: router.pathname, query: updatedQuery });
    }
  }, [isRegisterModalOpen]);

  const handleSignUp = async (values) => {
    setLoading(true);
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
      gtagEvent({
        action: 'sign_up',
        category: 'user_registration',
        label: 'new_user',
        value: 0,
      });
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
    } finally {
      setLoading(false);
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
      open={isRegisterModalOpen} // Use Zustand store 'open' state
      trigger={
        mobile ? (
          <AddLink
            onClick={() => openRegisterModal()} // Use Zustand store function to open modal
            className="font-ubuntu my-2 font-normal cursor-pointer text-[16px] text-white"
          >
            Register
          </AddLink>
        ) : (
          <Button type="button" color="secondary" onClick={() => openRegisterModal()}>
            Register
          </Button>
        )
      }
      onClose={() => {
        closeRegisterModal();
        const { registration, ...restQuery } = router.query;
        router.push({ pathname: router.pathname, query: restQuery });
      }}
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
            <Button
              type="submit"
              color="secondary"
              loading={loading}
              className="text-white"
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </Button>
            <AddLink onClick={openLoginModal}>Already a member?</AddLink>
          </Form>
        )}
      </Formik>
      {isOpen && (
        <Popup
          message={message}
          onClose={() => {
            closePopup();
            closeRegisterModal();
          }}
        />
      )}
    </Modal>
  );
};
