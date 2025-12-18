import React from 'react';

const ReviewTable = ({review, index}) => {
    return (
      <tr className="hover">
        <td>{index + 1}</td>

        <td className="font-medium">{review.foodName}</td>

        {/* Rating */}
        <td>
          <div className="text-yellow-500">
            {"★".repeat(review.rating)}
            <span className="text-gray-300">
              {"★".repeat(5 - review.rating)}
            </span>
          </div>
        </td>

        {/* Comment */}
        <td className="max-w-xs truncate">{review.comment}</td>

        {/* Date */}
        <td className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </td>
        {/* actions */}
        <td className="text-sm text-gray-500 space-x-2">
          <button className="bg-primary text-neutral-content p-1 text-xs rounded-sm hover:bg-primary/80 hover:shadow-2xl cursor-pointer">
            {" "}
            Delete
          </button>
          <button className="bg-yellow-600 text-neutral-content p-1 text-xs rounded-sm hover:bg-yellow-700 hover:shadow-2xl cursor-pointer">
            Update
          </button>
        </td>
      </tr>
    );
};

export default ReviewTable;