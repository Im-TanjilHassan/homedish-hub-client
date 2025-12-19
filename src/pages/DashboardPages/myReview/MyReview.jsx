import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import ReviewTable from "./reviewTable/ReviewTable";
import EditReviewModal from "./editReviewMODAL/EditRevModal";

const MyReview = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const { user } = useContext(AuthContext);
  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading your reviews...</div>;
  }

  //handle edit btn
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-base-200 rounded-2xl px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <header className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            My Reviews
          </h1>
          <p className="mt-1 text-base text-gray-500">
            View and manage your food reviews.
          </p>
        </header>
      </div>
      <div>
        {myReviews.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            You haven’t reviewed any meals yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
            <table className="table">
              <thead className="bg-base-100 text-neutral-content">
                <tr>
                  <th>#</th>
                  <th>Food Name</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {myReviews.map((review, index) => (
                  <ReviewTable
                    key={review._id}
                    review={review}
                    index={index}
                    handleEditClick={handleEditClick}
                  ></ReviewTable>
                ))}
              </tbody>
            </table>
            <EditReviewModal
              isOpen={isEditOpen}
              review={selectedReview}
              onClose={() => setIsEditOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReview;