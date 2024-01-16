import React, { useState, useEffect } from 'react';
import { Elements, ElementsConsumer, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from './UI';

const PaymentForm = ({ eventId, stripe, elements, setCheckoutError, totalAmount, cost }) => {
  const [saving, setSaving] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/event-center/${eventId}`,
        },
      });

      if (result.error) {
        setCheckoutError(result.error.message || 'Error occurred on payment');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <p className="text-black text-md my-4">{`Cost: $${cost || '0.00'}`}</p>
      <p className="text-black text-md mb-4">{`Service Fee: 20%`}</p>
      <p className="text-black text-md mb-4">{`Total: $${totalAmount.toFixed(2)}`}</p>
      <Button
        color="black"
        type="submit"
        loading={saving}
        className={'bg-blue-500 rounded-sm py-2 mt-4 text-white text-left'}
      >
        Submit Payment
      </Button>
    </form>
  );
};

export const CheckoutForm = (props) => {
  const { cost, setCheckoutError, title, eventId } = props;

  const [clientSecret, setClientSecret] = useState<string>('');
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  const serviceFee = 0.2;
  const totalAmount = Math.round(serviceFee * cost) + Number(cost);
  const totalAmountInCents = Math.round(totalAmount * 100);

  const fetchClientSecret = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/stripe-client-secret`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cost: totalAmountInCents }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  useEffect(() => {
    fetchClientSecret(cost); // Specify the amount for which you want to get the client secret
  }, []);

  if (!clientSecret) {
    return;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <PaymentForm
            stripe={stripe}
            elements={elements}
            setCheckoutError={setCheckoutError}
            title={title}
            totalAmount={totalAmount}
            cost={cost}
            eventId={eventId}
          />
        )}
      </ElementsConsumer>
    </Elements>
  );
};
