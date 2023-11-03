import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

export const StarRating = ({
  rating,
  reviewText,
  showAddReview,
  onRatingChange,
  onReviewTextChange,
}) => {
  const handleReviewChange = (event) => {
    // Call the callback function to send the updated review text to the parent
    onReviewTextChange(event.target.value);
  };

  // Catch Rating value
  const handleRating = (rate) => {
    // Call the callback function to send the updated rating to the parent
    onRatingChange(rate);
  };

  return (
    <div>
      <div className="">
        <StarRatings
          rating={rating}
          starRatedColor="#FFD700"
          starHoverColor="#FFD700"
          changeRating={handleRating}
          numberOfStars={5}
          starDimension="30px"
          name="rating"
        />
      </div>
      {showAddReview && (
        <textarea
          placeholder="Add a review"
          className="w-96 h-32 border-black border-2 mt-4 text-black px-4"
          value={reviewText}
          onChange={handleReviewChange}
        />
      )}
    </div>
  );
};
