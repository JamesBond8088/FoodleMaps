import React from 'react';
import { Star } from "lucide-react"

const StaticStarRating = ({ rating }) => {
  return (
    <div className='flex flex-row gap-x-1'>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index + 1 > rating) {
          return <Star color="#fff" fill="#808080" strokeWidth={1} key={index} />;
        } else {
          return <Star color="#fff" fill="#FFD700" strokeWidth={1} key={index} />;
        }
      })}
    </div>
  )
};

export default StaticStarRating;