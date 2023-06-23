import React, { useState } from 'react';
import { Button, Modal } from './UI';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../context';
import { Formik, Form, Field } from 'formik';

export const ForgotPasswordModal = () => {
  const initialValues = {
    email: '',
  };

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      setSubmitting(false);
      setErrors({});
      setIsSubmitted(true);
      // Handle success
    } catch (error) {
      setSubmitting(false);
      setErrors({ resetError: 'Error sending password reset email. Please try again.' });
      console.log('Error sending password reset email.', error);
    }
  };

  const handleCloseModal = () => {
    setForgotPasswordOpen(false);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    handleCloseModal();
  };

  return (
    <Modal
      open={forgotPasswordOpen}
      onClose={handleModalClose}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
      trigger={
        <Button
          type="button"
          color="secondary"
          onClick={() => {
            setForgotPasswordOpen(true);
          }}
          className="bg-transparent hover:bg-transparent"
        >
          Forgot Password
        </Button>
      }
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
      </div>
      {isSubmitted ? (
        <div>
          <p className="text-green-500 mb-4">Password reset email has been sent successfully.</p>
          <Button
            type="button"
            color="primary"
            onClick={handleModalClose}
            className="w-full py-2 px-4 rounded"
          >
            Close
          </Button>
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="reset-email" className="block mb-2 font-medium">
                  Email Address
                </label>
                <Field
                  type="email"
                  id="reset-email"
                  name="email"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email address"
                />
                {errors.resetError && <div className="text-red-500">{errors.resetError}</div>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
