import React, { useEffect, useState } from 'react';
import { Button, Container, Header } from '../../components/UI';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../context';
import Link from 'next/link';

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
};

const EventCenterPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the "events" collection in Firebase
    const fetchEvents = async () => {
      const eventCollection = collection(firestore, 'events');
      const querySnapshot = await getDocs(eventCollection);

      const eventsData = [];
      querySnapshot.forEach((doc) => {
        const event = { id: doc.id, ...doc.data() }; // Include the document ID
        eventsData.push(event);
      });

      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Find Nearby Events In your area',
      }}
      className="min-h-screen bg-gray-100 py-6 px-4"
    >
      <div className="max-w-4xl">
        <Header as="h1" className="text-3xl font-extrabold text-gray-900 mb-6">
          Event Center
        </Header>
        <div className="my-4 text-black">
          Elevate your home buying journey with our Event Center, showcasing local events such as
          seminars and informational gatherings. Engage with participants, learn from seasoned
          organizers, and deepen your understanding of the home buying process. Explore event
          details like titles, locations, and dates to find the perfect match for your interests.
          Click "Join Event" to become part of a passionate community dedicated to homeownership.
          Stay updated on trends, gain expert advice, and forge connections that enhance your home
          buying experience. Whether you're a first-time buyer or expanding your knowledge, our
          Event Center is your hub for empowering and enriching local events.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events?.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-b from-indigo-500 to-blue-600 p-4">
                <Header as="h2" className="text-white text-xl font-semibold">
                  {event.title}
                </Header>
                <p className="text-white text-sm">{event.location}</p>
              </div>
              <div className="p-4 text-black">
                <div key={event.id} className="event">
                  <p>Organizer: {event.organizer}</p>
                  <p data-tooltip-id="my-tooltip-1">
                    Description: {truncateDescription(event.description, 15)}{' '}
										</p>
                  <p>
                    Total Participants: {event.participants.length} | {event.totalParticipants}
                  </p>
                  <p>Start: {event.dateStartTime}</p>
                  <p>End: {event.dateEndTime}</p>
                  <p>Date: {event.eventDate}</p>
                  <Link href={`/event-center/${event.id}`}>
                    <Button color="secondary" className="text-white mt-2">
                      View Event
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EventCenterPage;
