import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";


const EditReviewModal = ({ isOpen, onClose, review }) => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm({
      defaultValues: {
        rating: "",
        comment: "",
      },
    });

    useEffect(() => {
      if (review) {
        reset({
          rating: review.rating,
          comment: review.comment,
        });
      }
    }, [review, reset]);

    if (!isOpen || !review) return null;
    
    const onSubmit = async (data) => {
      try {
        const res = await axiosSecure.patch(`/reviews/${review._id}`, {
          rating: Number(data.rating),
          comment: data.comment,
        });

        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your review has been updated.",
            timer: 1500,
            showConfirmButton: false,
          });

          // refresh data
          queryClient.invalidateQueries(["myReviews"]);
          queryClient.invalidateQueries(["reviews"]);
          queryClient.invalidateQueries(["meal"]);

          onClose();
        }
      } catch (error) {
          console.log(error);
          
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Something went wrong.",
        });
      }
    };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-base-300 rounded-xl w-full max-w-md p-6 relative shadow-xl/30 shadow-primary/40">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-4">Edit Review</h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Rating</label>
            <select
              defaultValue={review.rating}
              {...register("rating", { required: true })}
              className="select select-bordered w-full bg-base-200"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Bad</option>
            </select>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Comment</label>
            <textarea
              defaultValue={review.comment}
              {...register("comment", { required: true })}
              rows="4"
              className="textarea textarea-bordered w-full bg-base-200"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Update Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;
