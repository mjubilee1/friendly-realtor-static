import { Header, Image, Container, Button } from '../../components/UI';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuthContext, firestore } from '../../context';
import { useAppStore } from '../../stores';

const EventPage = ({ data }) => {
  const [event, setEvent] = useState();
  const { openLoginModal } = useAppStore();
  const [duplicateMsg, setDuplicateMsg] = useState<string>('');
  const { user } = useAuthContext();

  useEffect(() => {
    setEvent(data);
  }, [data]);

  if (!event) {
    return (
      <div className="container mx-auto px-4">
        <p>Loading...</p>
      </div>
    );
  }

  const handleJoinEvent = async (id) => {
    if (user) {
      setLoading(true); // Set the saving state to indicate that the operation is in progress

      const event = events.find((event) => event.id === id);
      // Check if the user's ID is already in the participants array
      if (event.participants.includes(user.id)) {
        setDuplicateMsg('User is already successfully added to the event.');
        setLoading(false);
        return;
      }

      // Add the user's ID to the participants array
      const updatedParticipants = [...event.participants, user.id];

      // Create a reference to the event document in the "events" collection
      const eventRef = doc(firestore, 'events', event.id);

      try {
        // Update the document with the updated participants array
        await updateDoc(eventRef, { participants: updatedParticipants });
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
      <div className="mx-auto p-4 md:p-8 max-w-2xl">
        <Image src={imgUrl} alt={imgAlt} width={850} height={650} className="w-full mb-8 rounded-lg" />
        {duplicateMsg && <div className="text-red-600 my-4">{duplicateMsg}</div>}
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="mb-2 text-lg italic">Location: {event.location}</p>
        <p className="mb-4 leading-relaxed">{event.description}</p>
        <Button color="secondary" className="text-white mt-2">
          Join Event
        </Button>
      </div>
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

    if (!eventDocSnapshot.exists()) {
      return {
        notFound: true,
      };
    }

    const eventData = { id: eventDocSnapshot.id, ...eventDocSnapshot.data() };

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
