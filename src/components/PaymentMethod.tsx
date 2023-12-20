import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './UI';
import { Form } from './UI/Form';
import {
  doc,
  updateDoc,
  getDoc,
  collection,
} from 'firebase/firestore';
import { firestore } from '../context';

export const PaymentMethod = (props) => {
  const { register, handleSubmit, setError, clearErrors, formState } = useForm();
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const cardElement = {
        number: data.cardNumber,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc,
        name: data.userName,
      };

			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment-method`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId: props.user?.id || '', ...cardElement }),
			});
			console.log(response)
      /*const buyerCollection = collection(firestore, 'buyers');
      const docRef = doc(buyerCollection, props.user.id);
      const existingDoc = await getDoc(docRef);

      if (existingDoc.exists()) {
        await updateDoc(docRef, {
          stripeId: results?.paymentMethod?.id,
        });
      }*/

      clearErrors(); // Clear any previous errors
      setMessage('');
    } catch (error) {
      setMessage(`Error updating payment method. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-8 mt-4">
      {message && <p>{message}</p>}
			<input
        type="text"
        placeholder="Your Name"
				className="text-black"
        {...register('userName', { required: 'Your name is required' })}
      />
      {errors.userName && <p>{errors.userName.message}</p>}

      <input
        type="text"
        placeholder="Card Number"
				className="text-black"
        {...register('cardNumber', { required: 'Card number is required' })}
      />
      {errors.cardNumber && <p>{errors.cardNumber.message}</p>}

      <input
        type="text"
        placeholder="CVC"
				className="text-black"
        {...register('cvc', { required: 'CVC is required' })}
      />
      {errors.cvc && <p>{errors.cvc.message}</p>}

      <input
        type="text"
        placeholder="Expiration Month"
				className="text-black"
        {...register('expMonth', { required: 'Expiration month is required' })}
      />
      {errors.expMonth && <p>{errors.expMonth.message}</p>}

      <input
        type="text"
        placeholder="Expiration Year"
				className="text-black"
        {...register('expYear', { required: 'Expiration year is required' })}
      />
      {errors.expYear && <p>{errors.expYear.message}</p>}

      <Button
        color="black"
        type="submit"
        loading={loading}
        className={'bg-blue-500 rounded-sm py-2 mt-4 text-white'}
      >
        {loading ? 'Updating...' : 'Update Payment Method'}
      </Button>
    </Form>
  );
};
