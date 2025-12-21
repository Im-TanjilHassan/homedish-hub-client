import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axiosSecure from '../api/axiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

const GiveReview = ({ id }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const reviewData = {
      foodId: id,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL,
      rating: Number(data.rating),
      comment: data.comment,
    };

    const res = await axiosSecure.post("/reviews", reviewData);

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Review submitted successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["reviews", id]);
      queryClient.invalidateQueries(["meal", id]);

      reset();
    }
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-xl/30 mb-10">
      <h3 className="text-xl font-semibold mb-4">Your Review</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select
            {...register("rating", { required: true })}
            className="w-full bg-base-100 border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select rating</option>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm">Rating is required</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            {...register("comment", { required: true })}
            rows="4"
            placeholder="Share your experience about this meal..."
            className="w-full bg-base-100 border border-base-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">Comment is required</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiveReview;