import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import axiosSecure from "../../../../api/axiosSecure"
import { AuthContext } from "../../../../providers/AuthProvider"
import { useQueryClient } from "@tanstack/react-query";

const ReviewTable = ({ review, index, handleEditClick }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  //handle delete btn
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/reviews/${id}`);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your review has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });

        // refresh dashboard data
        queryClient.invalidateQueries(["myReviews", user.email]);
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["meal"]);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not delete review.",
      });
    }
  };

  return (
    <tr className="hover">
      <td>{index + 1}</td>

      <td className="font-medium">{review.foodName}</td>

      {/* Rating */}
      <td>
        <div className="text-yellow-500">
          {"★".repeat(review.rating)}
          <span className="text-gray-300">{"★".repeat(5 - review.rating)}</span>
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
        <button
          onClick={() => {
            handleDelete(review._id);
          }}
          className="bg-primary text-neutral-content p-1 text-xs rounded-sm hover:bg-primary/80 hover:shadow-2xl cursor-pointer"
        >
          {" "}
          Delete
        </button>
        <button
          onClick={() => handleEditClick(review)}
          className="bg-yellow-600 text-neutral-content p-1 text-xs rounded-sm hover:bg-yellow-700 hover:shadow-2xl cursor-pointer"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReviewTable;