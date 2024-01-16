import { Header, Image, Container, Button, Modal } from '../../components/UI';
import { CheckoutForm } from '../../components';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { useAuthContext, firestore } from '../../context';
import { useAppStore } from '../../stores';
import { useSearchParams } from 'next/navigation';
import { EventCategories } from '.';
import moment from 'moment';
import { useRouter } from 'next/router';
import { fbEvent, gtagEvent } from '../../utils/analyticsUtil';

const EventPage = ({ data }) => {
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const { openLoginModal } = useAppStore();
  const [duplicateMsg, setDuplicateMsg] = useState<string>('');
  const { user } = useAuthContext();
  const [message, setMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchEventData = async () => {
      const eventId = router.query.id || ''; // Use router.query.id to get the eventId from the URL
      const eventDocRef = doc(collection(firestore, 'events'), eventId);

      try {
        const eventDocSnapshot = await getDoc(eventDocRef);
        const createdAt =
          eventDocSnapshot.data()?.createdAt instanceof Timestamp
            ? moment(eventDocSnapshot.data()?.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')
            : null;

        if (!eventDocSnapshot.exists()) {
          return {
            notFound: true,
          };
        }

        const eventData = {
          ...eventDocSnapshot.data(),
          id: eventDocSnapshot.id,
          createdAt: createdAt,
        };
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [data]);

  useEffect(() => {
    if (!!event && !!user && event.participants.includes(user.id)) {
      setDuplicateMsg('User is already successfully added to the event.');
    }
  }, [user, event]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const paymentIntent = searchParams.get('payment_intent');
        if (paymentIntent && user) {
          const buyerRef = doc(firestore, 'buyers', user?.id);
          await updateDoc(buyerRef, { paymentIntents: arrayUnion(paymentIntent) });
          router.replace(`/event-center/${event.id}`, undefined, { shallow: true });

          await sendJoinEmail();
        }
      } catch (error) {
        setMessage(error?.message || 'Error fetching payments');
      }
    };

    fetchPaymentIntent();
  }, [searchParams, user]);

  if (!event) {
    return (
      <div className="container mx-auto px-4">
        <p>Loading...</p>
      </div>
    );
  }

  const sendJoinEmail = async () => {
    // Create a reference to the event document in the "events" collection
    const eventRef = doc(firestore, 'events', event.id);
    const updatedParticipants = [...event.participants, user.id];

    const eventDateTimeString = `${event?.eventDate} ${event?.dateStartTime} - ${event?.dateEndTime}`;

    // Send a POST request to your send-event-email API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/send-event-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.emailAddress,
        virtual: event.virtual || false,
        eventLink: event.link || '',
        location: event.location || '',
        date: eventDateTimeString,
        name: event.title,
      }),
    });

    if (response.ok) {
      setMessage('Email sent successfully!, check your email');
    } else {
      setMessage(`Error sending email:', ${response.statusText}`);
    }
    // Update the document with the updated participants array
    await updateDoc(eventRef, { participants: updatedParticipants });
  };
  const handleJoinEvent = async () => {
    fbEvent(`click-join-event-${event.id || ''}`, {
      content_name: 'click_join_event',
      content_category: 'user_interaction',
      value: 1,
    });

    gtagEvent({
      action: `click-join-event-${event.id || ''}`,
      category: 'user_interaction',
      label: 'click_join_event',
      value: 1,
    });

    if (user) {
      setLoading(true); // Set the saving state to indicate that the operation is in progress
      // Add the user's ID to the participants array
      try {
        if (event.cost) {
          setShowCheckout(true);
          return;
        }

        await sendJoinEmail();
        setTimeout(() => {
          setMessage('');
        }, [2000]);
      } catch (error) {
        console.error('Error updating event:', error);
      } finally {
        setLoading(false); // Set the saving state to indicate that the operation is complete
      }
    }

    openLoginModal();
  };

  const imgUrl =
    event.photo ||
    'https://images.ctfassets.net/v3wxyl8kvdve/eHixnDXrSzYiTSusWBxvI/1239c81dc28ebc88d67dac22c2c9f003/1_jeAJ1_Kb4XacKzNFxlD2Og.webp';
  const imgAlt = event.title || 'Event Photo';
  const category = EventCategories.find((category) => category.value === event.category)?.label;
  return (
    <Container
      seoProps={{
        title: `${event.title} - FriendlyRealtor` || '',
        description: event.description || '',
        openGraph: {
          images: [
            {
              url: imgUrl,
              alt: imgAlt,
              width: 850,
              height: 650,
            },
          ],
        },
      }}
      className="event-container"
    >
      <div className="p-4 md:p-8">
        <Image
          src={imgUrl}
          alt={imgAlt}
          width={850}
          height={850}
          className="w-full h-[200px] mb-8 rounded-lg"
        />
        {!duplicateMsg && (
          <Button
            color="secondary"
            className="text-white my-4 px-20 py-4"
            loading={loading}
            onClick={handleJoinEvent}
          >
            Join Event
          </Button>
        )}
        {message && <div className="text-green-500">{message}</div>}
        {duplicateMsg && <div className="text-red-600 my-4">{duplicateMsg}</div>}
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="mb-2 text-lg italic">Location: {event.location}</p>
        <p className="mb-2 text-lg italic">Category: {category}</p>
        <p className="mb-2 text-lg italic">Cost: {`$${event.cost}` || 'Free'}</p>
        <p className="mb-2 text-lg italic">Date: {event.eventDate}</p>
        <p className="mb-2 text-lg italic">Start Time: {event.dateStartTime}</p>
        <p className="mb-2 text-lg italic">End Time: {event.dateEndTime}</p>
        <p className="mb-4 leading-relaxed">Description: {event.description}</p>
        <p className="mb-2 text-lg italic">Total Participants: {event.totalParticipants}</p>
      </div>
      <Modal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        className="bg-white p-6"
        closeXClassName="text-black"
      >
        <div className="text-black text-4xl my-4 text-center">{event.title}</div>
        {checkoutError && <p className="text-red-500 my-2">{checkoutError}</p>}
        <CheckoutForm
          title={event.title}
          cost={event.cost || ''}
          setCheckoutError={setCheckoutError}
          eventId={event.id}
        />
      </Modal>
    </Container>
  );
};

export async function getStaticPaths() {
  const eventCollection = collection(firestore, 'events');
  const querySnapshot = await getDocs(eventCollection);

  const paths = [];
  querySnapshot.forEach((doc) => {
    paths.push({ params: { id: doc.id } }); // Only include the title, not the entire path
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const eventId = params.id;
  const eventDocRef = doc(collection(firestore, 'events'), eventId);

  try {
    const eventDocSnapshot = await getDoc(eventDocRef);
    const createdAt =
      eventDocSnapshot.data()?.createdAt instanceof Timestamp
        ? moment(eventDocSnapshot.data()?.createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')
        : null;

    if (!eventDocSnapshot.exists()) {
      return {
        notFound: true,
      };
    }

    const eventData = { ...eventDocSnapshot.data(), id: eventDocSnapshot.id, createdAt: createdAt };

    return {
      props: {
        data: eventData || null,
      },
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
    return {
      notFound: true,
    };
  }
}

export default EventPage;
