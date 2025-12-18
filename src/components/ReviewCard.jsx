import React from 'react';
import image from "../assets/banner/banner-bg-removebg-preview.png"

const ReviewCard = () => {
    return (
      <div className="flex gap-4 p-5 border rounded-xl bg-base-200 shadow-sm">
        {/* Reviewer Image */}
        <img
          src={image}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Review Content */}
        <div className="flex-1">
          {/* Name & Date */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-lg">Tanjil Hassan</h4>

            <span className="text-sm text-gray-500">
              12/ 25/ 2021
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 my-1">
            4
          </div>

          {/* Comment */}
          <p className="text-gray-700 mt-2">comment</p>
        </div>
      </div>
    );
};

export default ReviewCard;