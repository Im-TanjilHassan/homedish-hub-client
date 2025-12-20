import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import MyMealCard from "./MY_MEAL_CARD/MyMealCard";
import Swal from "sweetalert2";
import MealUpdateModal from "./MEAL_UPDATE_MODAL/MealUpdateModal";

const MyMeal = () => {
  const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);

  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chef/meals");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-4xl font-bold">
          L<span className="loading loading-spinner loading-md"></span>
          ading...
        </p>
      </div>
    );
  }

  const filteredMeals = meals.filter((meal) =>
    meal.foodName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.delete(`/meals/${id}`);

    Swal.fire("Deleted!", "Meal deleted successfully.", "success");
    refetch();
  };

  //handle edit btn
  const handleEditClick = (meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };

  console.log(meals);

  return (
    <div className="min-h-screen bg-base-200 rounded-2xl px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <header className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            My Meals
          </h2>
          <p className="mt-1 text-base text-gray-500">
            View and manage your Meal.
          </p>
        </header>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-20">
          {/* Left: Total Meals */}
          <div className="text-lg font-medium">
            Total Meals(
            <span className="font-semibold">{filteredMeals.length}</span>)
          </div>

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meals..."
              className="input border bg-base-200 w-94"
            />
          </div>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 justify-items-center bg-base-100  rounded-2xl space-y-25 md:gap-y-10 p-5">
        {filteredMeals.map((meal) => (
          <MyMealCard
            key={meal._id}
            meal={meal}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
          ></MyMealCard>
        ))}
      </div>
      {open && (
        <MealUpdateModal
          meal={selectedMeal}
          close={() => setOpen(false)}
          refetch={refetch}
        ></MealUpdateModal>
      )}
    </div>
  );
};

export default MyMeal;
