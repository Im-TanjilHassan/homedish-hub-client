import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import FoodCard from "../../components/FoodCard";

const Meals = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals", sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allMeals?sort=${sortOrder}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-4xl font-bold">
          L<span className="loading loading-spinner loading-md"></span>ading...
        </p>
      </div>
    );
    }
    
    const filteredMeals = meals.filter((meal) =>
      meal.foodName.toLowerCase().includes(search.toLowerCase())
    );

  console.log(meals);

  return (
    <section className="mb-20">
      {/* Title & Description */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-4xl text-primary font-bold mb-4">Our Meals</h2>

        <p className="text-gray-500 leading-relaxed">
          Discover freshly prepared homemade meals crafted by passionate local
          chefs. Choose from a variety of dishes made with care, quality
          ingredients, and authentic flavors.
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-30">
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

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered bg-base-200"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {filteredMeals.length === 0 ? (
        <div className="text-center">
          <p className="text-3xl text-gray-400 font-semibold">No Meal Found!!</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center items-center-safe gap-y-20">
          {filteredMeals.map((meal) => (
          <FoodCard key={meal._id} meal={meal}></FoodCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default Meals;
