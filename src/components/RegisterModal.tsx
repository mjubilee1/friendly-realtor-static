import React, { useState } from 'react';
import { Button, Modal } from './UI';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider, googleProvider } from '../context';
import { SocialIcon } from 'react-social-icons';

export const RegisterModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleGoogleSignup = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log('Error signing up with Google.', error);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.log('Error signing up with Facebook.', error);
    }
  };

  return (
    <Modal
      open={open}
      trigger={
        <Button type="button" color="secondary" onClick={() => setOpen((prev) => !prev)}>
          Register
        </Button>
      }
      onClose={() => setOpen(false)}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Register on FriendlyRealtor</h2>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email address"
          />
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 border rounded"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
        <div>
          on sign up with
          <div className="flex items-center justify-end">
            <Button onClick={handleGoogleSignup} className="m-0 p-0">
              <SocialIcon network="google" />
            </Button>
            <Button onClick={handleFacebookSignUp} className="m-0 p-0">
              <SocialIcon network="facebook" />
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
