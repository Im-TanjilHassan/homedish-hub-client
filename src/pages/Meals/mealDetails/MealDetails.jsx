import React, { useContext } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import GiveReview from "../../../components/GiveReview";
import ReviewCard from "../../../components/ReviewCard";

const MealDetails = () => {
  const { id } = useParams();
  const { dbUser } = useContext(AuthContext);
  //fetch single meal
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  //fetch reviews
  const { data: reviews = [], } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews?foodId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Food Image */}
        <div>
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-[380px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Food Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-neutral-content">
            {meal.foodName}
          </h1>

          <p className="text-gray-400">
            Prepared by <span className="font-semibold">{meal.chefName}</span>
            <span className="ml-2 text-sm text-gray-400">
              (ID: {meal.chefId})
            </span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            <span className="text-lg font-semibold">{meal.rating}</span>
            <FaStar />
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-primary">${meal.price}</p>

          {/* Delivery Info */}
          <div className="text-gray-700 space-y-1">
            <p className="text-neutral-content">
              <span className="font-medium">Delivery Area:</span>{" "}
              {dbUser.address}
            </p>
            <p className="text-neutral-content">
              <span className="font-medium">Estimated Time:</span>{" "}
              {meal.estimatedDeliveryTime}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-1">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {meal.ingredients.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-base-300 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Chef Experience */}
          <div className="bg-base-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-1">Chef’s Experience</h4>
            <p className="text-neutral-content text-sm">
              {meal.chefExperience}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="btn btn-primary">Order Now</button>

            <button className="btn btn-outline">Add to Favorite</button>
          </div>
        </div>
      </div>

      {/* Reviews Section Below */}
      <div className="mt-14">
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Reviews</h2>

          <GiveReview id={id}></GiveReview>
          {/* Reviews List */}
          <h3 className="text-xl font-semibold mb-6">What Others Are Saying</h3>
          {reviews.length ? (
            <div className="space-y-6 md:grid md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review}></ReviewCard>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-gray-500 text-2xl">No Review Found</h2>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MealDetails;
