import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container, Header } from '../../components/UI';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../context';
import Link from 'next/link';
import { Select } from '../../components/UI/Select';

export const EventCategories = [
  { value: 'open_houses', label: 'Open Houses' },
  { value: 'property_tours', label: 'Property Tours' },
  { value: 'realtor_networking', label: 'Realtor Networking' },
  { value: 'homebuyer_seminars', label: 'Homebuyer Seminars' },
  { value: 'real_estate_workshops', label: 'Real Estate Workshops' },
  { value: 'investment_property_seminars', label: 'Investment Property Seminars' },
  { value: 'property_auctions', label: 'Property Auctions' },
  { value: 'real_estate_conferences', label: 'Real Estate Conferences' },
  { value: 'realtor_training_sessions', label: 'Realtor Training Sessions' },
  { value: 'property_investment_expos', label: 'Property Investment Expos' },
  { value: 'community_outreach_events', label: 'Community Outreach Events' },
  { value: 'realtor_appreciation_dinners', label: 'Realtor Appreciation Dinners' },
  { value: 'mortgage_and_financing_workshops', label: 'Mortgage and Financing Workshops' },
  {
    value: 'real_estate_technology_demonstrations',
    label: 'Real Estate Technology Demonstrations',
  },
  { value: 'property_market_updates', label: 'Property Market Updates' },
];

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  }
  return description;
};

const EventCenterPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      minHeight: 'unset',
    }),
  };

  const filteredEvents = useMemo(() => {
    if (selectedEvent) {
      return events.filter((event) => event.category === selectedEvent);
    }
    return events; // Display all events when selectedEvent is empty
  }, [events, selectedEvent]);

  return (
    <Container
      seoProps={{
        title: 'FriendlyRealtor - Find Nearby Events In your area',
      }}
      className="min-h-screen bg-gray-100 py-6 px-4"
    >
      <div>
        <div className="flex justify-between items-center">
          <Header as="h1" className="text-3xl font-extrabold text-gray-900 mb-6">
            Event Center
          </Header>
          <Select
            id="event-center-select"
            options={EventCategories}
            placeholder="Select Category"
            onChange={(selectedOption) => setSelectedEvent(selectedOption.value)}
            styles={customStyles}
          />
        </div>
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
          {filteredEvents?.map((event) => (
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
                    Description: {truncateDescription(event.description, 100)}{' '}
                  </p>
                  <p>
                    Total Participants: {event.participants.length} | {event.totalParticipants}
                  </p>
                  <p>Start: {event.dateStartTime}</p>
                  <p>End: {event.dateEndTime}</p>
                  <p>Date: {event.eventDate}</p>
                  <p>Cost: {event.cost ? `$${event.cost}` : 'Free'}</p>
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
