import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon } from './UI';
import { Form } from './UI/Form';
import { doc, updateDoc, collection, getDoc } from 'firebase/firestore';
import { firestore } from '../context';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

const Field = ({ label, id, type, placeholder, required, autoComplete, value, onChange }) => (
  <div className="text-left mb-4">
    <label htmlFor={id} className="text-black w-full">
      {label}
    </label>
    <input
      className="text-black w-full border-2 border-black pl-2 py-1"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

export const PaymentMethod = (props) => {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showEditCard, setShowEditCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  });

  const [cardInfo, setCardInfo] = useState({
    last4: '',
    expMonth: '',
    expYear: '',
  });

  useEffect(() => {
    setShowEditCard(!props.user.stripeCustomerId);
    const fetchCardInfo = async () => {
      if (props.user.stripeCustomerId && props.user.stripeId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/retrieve-payment-method/${props.user.stripeCustomerId}/${props.user.stripeId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          const responseData = await response.json();
          setBillingDetails({
            email: responseData?.paymentMethod?.billing_details?.email || '',
            name: responseData?.paymentMethod?.billing_details?.name || '',
          });
          setCardInfo({
            last4: responseData.paymentMethod.card.last4,
            expMonth: responseData.paymentMethod.card.exp_month,
            expYear: responseData.paymentMethod.card.exp_year,
          });
        }
      }
    };

    fetchCardInfo();
  }, [props.user]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (showEditCard && stripe) {
        const card = elements?.getElement(CardElement);

        const payload = await stripe.createPaymentMethod({
          type: 'card',
          card,
          billing_details: billingDetails,
        });

        if (payload.error?.message) {
          setMessage(payload.error?.message);
          return;
        }
        const alreadyCard = !!(props.user.stripeCustomerId && props.user.stripeId);
        const buyerCollection = collection(firestore, 'buyers');
        const buyerDocRef = doc(buyerCollection, props.user.id);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/create-payment-method`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: props.user?.id || '',
              customerId: props.user.stripeCustomerId,
              paymentMethodId: payload.paymentMethod?.id,
              alreadyCard: alreadyCard,
              email: billingDetails.email || '',
              name: billingDetails.name || '',
            }),
          },
        );

        if (response.ok) {
          const responseData = await response.json();
          if (alreadyCard) {
            const existDoc = await getDoc(buyerDocRef);
            const buyerData = existDoc.data();
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/remove-payment-method`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentMethodId: buyerData.stripeId,
              }),
            });

            await updateDoc(buyerDocRef, {
              stripeId: responseData?.attachedPayment?.id,
            });
          } else {
            await updateDoc(buyerDocRef, {
              stripeCustomerId: responseData?.attachedPayment?.customer,
              stripeId: responseData?.attachedPayment?.id,
            });
            router.reload();
          }

          setMessage('Updated Successfully');
          setTimeout(() => {
            setMessage('');
          }, [2000]);
        }
      }
    } catch (error) {
      setMessage(`Error updating payment method. ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#000',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#000000',
        },
        '::placeholder': {
          color: '#000000',
        },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md p-8 mt-4">
      <fieldset className="FormGroup">
        {message && (
          <p className={message === 'Updated Successfully' ? 'text-green-500' : 'text-red-500'}>
            {message}
          </p>
        )}
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
      </fieldset>
      <div className={`flex ${showEditCard ? 'items-end' : 'items-center'} gap-6`}>
        <div
          onClick={() => {
            setShowEditCard((prev) => !prev);
          }}
        >
          <Icon
            name="pencil-alt"
            color="black"
            size="large"
            className="hover:text-blue-500 cursor-pointer"
          />
        </div>
        <fieldset className="FormGroup" style={{ width: '100%' }}>
          {showEditCard ? (
            <CardElement options={CARD_OPTIONS} className="mt-4 text-black" />
          ) : (
            <div className="border p-4 rounded-md bg-blue-500 w-full text-left">
              <p className="text-lg font-semibold mb-2 text-center">Card Details</p>
              <p className="text-gray-800">Card Number: **** **** **** {cardInfo.last4}</p>
              <p className="text-gray-800">
                Exp Date: {cardInfo.expMonth}/{cardInfo.expYear}
              </p>
              {/* Add other card details if needed */}
            </div>
          )}
        </fieldset>
      </div>

      <div className="w-full flex">
        <Button
          color="black"
          type="submit"
          loading={loading}
          className={'bg-blue-500 rounded-sm py-2 mt-4 text-white text-left'}
        >
          {!props.user.stripeCustomerId ? 'Add Payment Method' : 'Update Payment Method'}
        </Button>
      </div>
    </Form>
  );
};
