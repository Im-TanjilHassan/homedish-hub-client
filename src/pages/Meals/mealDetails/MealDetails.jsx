import React, { useContext } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import GiveReview from "../../../components/GiveReview";
import ReviewCard from "../../../components/ReviewCard";
import Swal from "sweetalert2";
import axiosSecure from "../../../api/axiosSecure";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";

const MealDetails = () => {
  const { id } = useParams();
  const { dbUser, user } = useContext(AuthContext);
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

  //post add to fav
  const addToFavoriteMutation = useMutation({
    mutationFn: async (favoriteData) => {
      const res = await axiosSecure.post("/favorites", favoriteData);
      return res.data;
    },

    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Added to Favorite",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";

      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: message,
      });
    },
  });

  const handleAddToFavorite = () => {
    if (!user?.email) return;

    const favoriteMeal = {
      mealId: meal._id,
      mealName: meal.foodName,
      mealImage: meal.foodImage,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      userEmail: user.email,
    };

    addToFavoriteMutation.mutate(favoriteMeal);
  };


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

          <div className="flex justify-between items-center w-70">
            {/* Price */}
            <p className="text-2xl font-bold text-primary">${meal.price}</p>
            {/* Rating */}
            <div className="text-2xl flex items-center gap-2 text-yellow-500">
              <span className="text-2xl font-semibold">{meal.rating}</span>
              <FaStar />
            </div>
          </div>

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
          {dbUser.role === "user" && (
            <div className="flex gap-4 pt-4">
              <button className="btn btn-primary">
                <CiShoppingCart />
                Order Now
              </button>

              <button
                onClick={handleAddToFavorite}
                disabled={addToFavoriteMutation.isLoading}
                className="btn btn-outline"
              >
                <MdOutlineBookmarkAdd />
                {addToFavoriteMutation.isLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Add to Favorite"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section Below */}
      <div className="mt-14">
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">What Others Are Saying</h2>
          {dbUser.role === "user" && <GiveReview id={id}></GiveReview>}
          {/* Reviews List */}
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
