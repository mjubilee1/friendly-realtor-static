import React, { useEffect, useState } from 'react';
import { Container, Header, AddLink, Icon, Button, Modal } from '../../components/UI';
import { StarRating, SendMessageModal } from '../../components';
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  collection,
  getDocs,
  where,
  query,
  updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import { firestore, auth } from '../../context';
import moment from 'moment';

const ProfilePage = ({ data }) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [saving2, setSaving2] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [userID, setUserID] = useState(undefined);
  const [messageText, setMessageText] = useState<string>('');
  const [reviews, setReviews] = useState([]);
  const [userDoc, setUserDoc] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!data || !data.name) {
    return <p className="text-white text-4xl flex justify-center">No Profile Found!</p>;
  }

  useEffect(() => {
    if (data.userName) {
      const fetchUserID = async () => {
        try {
          const usersCollection = collection(firestore, 'users'); // Replace 'firestore' with your Firestore instance
          const userQuery = query(usersCollection, where('userName', '==', data.userName));
          const userQuerySnapshot = await getDocs(userQuery);

          if (userQuerySnapshot.docs.length > 0) {
            // Set the user's document ID in the state
            setUserID(userQuerySnapshot.docs[0].id);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      };

      // Function to fetch reviews for this user from Firestore
      const fetchReviews = async () => {
        try {
          // Query the 'users' collection to get the user's document
          const usersCollection = collection(firestore, 'users');
          const userQuery = query(usersCollection, where('userName', '==', data.userName));
          const userQuerySnapshot = await getDocs(userQuery);

          if (userQuerySnapshot.docs.length > 0) {
            // Get the user's document ID
            const userId = userQuerySnapshot.docs[0].id;

            // Query the 'reviews' collection to get reviews for this user using userId as the document ID
            const reviewsCollection = collection(firestore, 'reviews');
            const userReviewsQuery = doc(reviewsCollection, userId);
            const userReviewsDoc = await getDoc(userReviewsQuery);

            if (userReviewsDoc.exists()) {
              // The user's reviews data is in userReviewsDoc.data().reviews
              const reviewsData = userReviewsDoc.data().reviews || [];
              setReviews(reviewsData);
            }
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      fetchUserID();
      fetchReviews();
    }
  }, [data.userName]);

  // Function to add a new review to Firestore
  const addReview = async () => {
    setSaving(true);
    try {
      const usersCollection = collection(firestore, 'users');
      const userQuery = query(usersCollection, where('userName', '==', data.userName));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.docs.length > 0) {
        // Get the user's document ID
        const userId = userQuerySnapshot.docs[0].id; // Assuming you have the ID here
        const reviewsCollection = collection(firestore, 'reviews');
        const reviewDocRef = doc(reviewsCollection, userId);
        const reviewDocSnapshot = await getDoc(reviewDocRef);

        if (reviewDocSnapshot.exists()) {
          // Create a new review object
          const newReview = {
            rating: rating, // The rating value you want to add
            text: reviewText, // The review text you want to add
            reviewerId: auth.currentUser?.uid || '',
          };

          // Use updateDoc to add the new review to the "reviews" array field
          await updateDoc(reviewDocRef, {
            reviews: arrayUnion(newReview),
          });
        } else {
          const newReview = {
            rating: rating, // The rating value you want to add
            text: reviewText, // The review text you want to add
            reviewerId: auth.currentUser?.uid || '',
          };

          // Create a new review document with the userId as the document name and the initial review
          await setDoc(reviewDocRef, {
            reviews: [newReview],
          });
        }

        setRating(0);
        setReviewText('');
      } else {
        // If the user's document doesn't exist, create a new document using setDoc
        const newUserId = userQuerySnapshot.docs[0].data().userId;
        const newReviewsCollection = collection(firestore, 'reviews');
        const newReviewDocRef = doc(newReviewsCollection, newUserId);

        // Create a new review object
        const newReview = {
          rating: rating, // The rating value you want to add
          text: reviewText, // The review text you want to add
          reviewerId: auth.currentUser?.uid || '',
        };

        // Set the data for the new review document
        await setDoc(newReviewDocRef, {
          reviews: [newReview],
        });

        setRating(0);
        setReviewText('');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setSaving(false);
    }
  };

  const defaultBio = `Experienced realtor ${data.name} dedicated to helping home buyers find their dream homes. Trustworthy guidance and exceptional service for a seamless home buying experience. Let's make your homeownership dreams a reality.`;
  const defaultSeoBio = `Experienced realtor ${
    data.name
  } dedicated to helping home buyers find their dream homes${
    data.serviceZipCodes && data.serviceZipCodes.length > 0
      ? ` in ${data.serviceZipCodes.join(', ')}`
      : data.location
      ? ` in ${data.location}`
      : ''
  }. Trustworthy guidance and exceptional service for a seamless home buying experience. Let's make your homeownership dreams a reality.`;

  return (
    <Container
      seoProps={{
        title: `FriendlyRealtor - Agent ${data.name}`,
        description: `${data.bio || defaultSeoBio}`,
      }}
    >
      <div className="flex">
        <div className="bg-white overflow-auto rounded-lg w-full">
          <div className="p-10">
            <Header as="h3" className="uppercase text-gray-500">
              Real Estate Agent
            </Header>
            {data.socials && (
              <div className="flex justify-center mt-3 mb-6 flex-col">
                <Header as="h5" className=" text-gray-500">
                  Get Connected
                </Header>
                <div className="text-black flex mt-2 gap-4">
                  {Object.keys(data.socials[0]).map((social) => {
                    const socialLink = data.socials[0][social];
                    return (
                      <AddLink to={socialLink} target="_blank" key={socialLink}>
                        <Icon name={social} size="large" color="black" />
                      </AddLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between px-4 pt-10 pb-6 md:pb-10 items-center gap-6">
            <div className="max-w-3xl">
              <Header as="h3" className="text-black text-center mt-5">
                {data.name}
              </Header>
              {data.video && (
                <div className="flex flex-col items-center mt-6">
                  <iframe
                    width="560"
                    height="315"
                    src={data.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
              {data.serviceZipCodes && data.serviceZipCodes.length > 0 ? (
                <div className="text-gray-500 text-center text-md mt-4">
                  Serving the following locations: {data.serviceZipCodes.join(', ')}
                </div>
              ) : (
                data.location && (
                  <div className="text-gray-500 text-center text-md">
                    Serving the following locations: {data.location}
                  </div>
                )
              )}
              <div className="text-gray-500 text-sm p-4 text-center max-sm overflow-hidden">
                {data.bio || defaultBio}
              </div>
            </div>
            <div>
              <Image src={data.photo} width={300} height={300} alt="" className="pb-4" />
              {data.phone && <div className="text-gray-500">{`Phone number: ${data.phone}`}</div>}
              <SendMessageModal userID={userID} />
            </div>
          </div>
          {data.deals && (
            <div className="text-gray-500 px-4 pb-6">
              <Header as="h3" className="pb-4">
                Previous Deals
              </Header>
              {data.deals.map((deal) => {
                const closingDate = moment.unix(deal.closingDate.seconds);
                const formattedDate = closingDate.format('MMMM D, YYYY');
                return (
                  <div>
                    <div className="font-md">Address - {deal.address}</div>
                    <div className="font-md">Closing Date - {formattedDate}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="px-4 pb-6">
            <StarRating
              rating={rating}
              reviewText={reviewText}
              showAddReview
              onRatingChange={(val) => {
                setRating(val);
              }}
              onReviewTextChange={(val) => {
                setReviewText(val);
              }}
            />
            <Button color="secondary" className="mt-2" onClick={addReview} loading={saving}>
              Add Review
            </Button>
          </div>
          {/* Display the reviews */}
          <div className="px-4 pb-6">
            {reviews?.length > 0 ? (
              <div className="text-gray-500">
                <h3 className="font-bold mb-2 text-lg">User Reviews:</h3>
                {reviews.map((review, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4">
                    <StarRating rating={review.rating} />
                    <p className="text-gray-500 mt-2">Review: {review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews available for this user.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export async function getStaticPaths() {
  const userRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userRef);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  const paths = data
    .filter((user) => user.userName)
    .map((user) => ({
      params: { username: user.userName.trim() },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  try {
    const userRef = collection(firestore, 'users');
    const q = query(userRef, where('userName', '==', context.params.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Get the first document from the query snapshot
      const userDocRef = querySnapshot.docs[0];

      const result = JSON.parse(JSON.stringify(userDocRef.data()));

      if (result.serviceZipCodes?.length) {
        const zipcodes = result.serviceZipCodes.join(',');

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcodes}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          );
          const data = await response.json();

          if (data?.results?.length) {
            const postcodeLocalities = data.results
              .map((field) => field.postcode_localities || [])
              .flat();

            result.serviceZipCodes = postcodeLocalities;
          }
        } catch (error) {
          console.log('Error getting zip code data', error);
        }
      }
      return {
        props: {
          data: result,
        },
      };
    } else {
      return {
        props: {
          data: {},
        },
      };
    }
  } catch (error) {
    console.log('Error was caused', error);
    return {
      props: {
        data: {},
      },
    };
  }
}

export default ProfilePage;
