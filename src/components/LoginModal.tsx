import React, { useState } from 'react';
import { Button, Modal } from './UI';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SocialIcon } from 'react-social-icons';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider, googleProvider } from '../context';

export const LoginModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // Handle successful login
    } catch (error) {
      console.log('Error logging in.', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log('Error signing up with Google.', error);
    }
  };

  const handleFacebookSignIn = async () => {
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
          Login
        </Button>
      }
      onClose={() => setOpen(false)}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Login to FriendlyRealtor</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div>
        on login in with
        <div className="flex items-center justify-end">
          <Button onClick={handleGoogleSignIn} className="m-0 p-0">
            <SocialIcon network="google" />
          </Button>
          <Button onClick={handleFacebookSignIn} className="m-0 p-0">
            <SocialIcon network="facebook" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};
