import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosPublic from "../../api/axiosPublic";
import FoodCard from "../../components/FoodCard";

const Meals = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["meals", sortOrder, search, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allMeals?sort=${sortOrder}&search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  React.useEffect(() => {
    setPage(1);
  }, [sortOrder, search]);

  const meals = data?.meals || [];
  const totalMeals = data?.total || 0;
  const totalPages = data?.totalPages || 1;

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
          <span className="font-semibold">{totalMeals}</span>)
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
      {isLoading && (
        <div className="flex justify-center my-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {meals.length === 0 ? (
        <div className="text-center">
          <p className="text-3xl text-gray-400 font-semibold">
            No Meal Found!!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 space-y-16">
          {meals.map((meal) => (
            <FoodCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2 mt-10">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn ${
              page === num + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Meals;
