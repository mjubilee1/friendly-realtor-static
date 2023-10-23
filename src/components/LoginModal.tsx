import React, { useEffect, useState } from 'react';
import { AddLink, Button, Modal, Popup } from './UI';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { splitName } from '../utils/commonUtil';
import { SocialIcon } from 'react-social-icons';
import { signInWithPopup } from 'firebase/auth';
import { firestore, auth, facebookProvider, googleProvider } from '../context';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePopup } from './UI/Popup';
import { setTokenCookies, setRefreshTokenCookies } from '../utils/commonUtil';
import { user } from '../agents';
import { useAppStore } from '../stores';
import { useRouter } from 'next/router';

export const LoginModal = ({ mobile = false }) => {
  const router = useRouter();

  const [loginError, setLoginError] = useState('');
  const [errorState, setErrorState] = useState<string>('');

  const { isOpen, message, openPopup, closePopup } = usePopup();
  const { openLoginModal, isLoginModalOpen, openRegisterModal, closeLoginModal } = useAppStore();

  useEffect(() => {
    if (isLoginModalOpen) {
      const queryParameters = { login: true };
      const updatedQuery = { ...router.query, ...queryParameters };
      router.push({ pathname: router.pathname, query: updatedQuery });
    } else {
      router.push({ pathname: router.pathname, query: '' });
    }
  }, [isLoginModalOpen]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await signInWithEmailAndPassword(auth, values.email, values.password);

        const usersCollectionRef = collection(firestore, 'users');
        const userDocRef = doc(usersCollectionRef, res.user.uid);
        getDoc(userDocRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const foundUser = docSnapshot.data();

            if (!!foundUser) {
              setLoginError(
                'Error: User account found. You created an account as an agent. Try another email address.',
              );
            }
          }
        });
        if (res.user.emailVerified) {
          setTokenCookies(res.user.accessToken);
          setRefreshTokenCookies(res._tokenResponse.refreshToken);
        } else {
          await sendEmailVerification(res.user);
          openPopup('Email verification sent!');
        }
        closeLoginModal();
      } catch (error) {
        setLoginError('Error logging in. Please check your credentials and try again.');
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      // Check if a document exists for the user
      const userDocRef = doc(firestore, 'buyers', res.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const { firstName, lastName } = splitName(res.user.displayName || '');
        const subscriberObj = {
          firstName,
          lastName,
          emailAddress: res.user.email,
        };
        await setDoc(doc(firestore, 'buyers', res.user.uid), subscriberObj);
        await user.newSubscriber(subscriberObj);
      }
      setTokenCookies(res.user.accessToken);
      setRefreshTokenCookies(res._tokenResponse.refreshToken);
      closeLoginModal();
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

  const handleFacebookSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);

      // Check if a document exists for the user
      const userDocRef = doc(firestore, 'buyers', res.user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        const { firstName, lastName } = splitName(res.user.displayName || '');
        const subscriberObj = {
          firstName,
          lastName,
          emailAddress: res.user.email,
        };
        await setDoc(doc(firestore, 'buyers', res.user.uid), subscriberObj);
        await user.newSubscriber(subscriberObj);
      }
      setTokenCookies(res.user.accessToken);
      setRefreshTokenCookies(res._tokenResponse.refreshToken);
      closeLoginModal();
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

  return (
    <>
      <Modal
        open={isLoginModalOpen}
        id="login-modal"
        trigger={
          mobile ? (
            <AddLink
              onClick={() => openLoginModal()}
              className="font-ubuntu font-normal cursor-pointer text-[16px] text-white"
            >
              Login
            </AddLink>
          ) : (
            <Button type="button" color="secondary" onClick={() => openLoginModal()}>
              Login
            </Button>
          )
        }
        onClose={() => closeLoginModal()}
        className="bg-white text-black p-4"
        closeXClassName="text-black"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Login to FriendlyRealtor</h2>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {errorState !== '' ? <div className="text-red-500 mt-2">{errorState}</div> : null}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>
          {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <AddLink onClick={openRegisterModal}>Create Account</AddLink>
          <ForgotPasswordModal />
        </form>
        <div className="flex flex-col items-end">
          <p>or login with</p>
          <div className="flex items-center mt-2 justify-end">
            <Button onClick={handleGoogleSignIn} className="!p-0 mr-2">
              <SocialIcon network="google" />
            </Button>
            <Button onClick={handleFacebookSignIn} className="!p-0">
              <SocialIcon network="facebook" />
            </Button>
          </div>
        </div>
        {isOpen && (
          <Popup
            message={message}
            onClose={() => {
              closePopup();
              closeLoginModal();
            }}
          />
        )}
      </Modal>
    </>
  );
};
