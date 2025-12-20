import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { MdOutlineSearchOff } from "react-icons/md";
import MealTable from "./mealTable/MealTable";
import Swal from "sweetalert2";

const FavoriteMeal = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });
    
    const deleteFavoriteMutation = useMutation({
      mutationFn: async (id) => {
        const res = await axiosSecure.delete(`/favorites/${id}`);
        return res.data;
      },

      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        // refetch favorites
        queryClient.invalidateQueries(["favorites"]);
      },

      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not delete favorite meal",
        });
      },
    });

    const handleDeleteFavorite = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "This meal will be removed from your favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFavoriteMutation.mutate(id);
        }
      });
    };



  if (isLoading) {
    return <p className="text-center">Loading favorites...</p>;
  }

  console.log(favorites);

  return (
    <div className="min-h-screen bg-base-200 rounded-2xl px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        <header className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            Favorite Meals
          </h1>
          <p className="mt-1 text-base text-gray-500">
            View and manage your Favorite Meals Collection.
          </p>
        </header>
      </div>
      {/* meal table */}
      <div className="bg-base-100 shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
        <div className="overflow-x-auto w-full">
          {favorites.length ? (
            <div>
              <table className="table">
                {/* head */}
                <thead className="text-center">
                  <tr>
                    <th>Meal Name</th>
                    <th>Chef Name</th>
                    <th>Price $</th>
                    <th>Added Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-15">
                  {favorites.map((favorite) => (
                    <MealTable
                      key={user._id}
                      favorite={favorite}
                      handleDeleteFavorite={handleDeleteFavorite}
                    ></MealTable>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full p-10 text-primary/50 font-bold flex justify-center ">
              <div>
                <MdOutlineSearchOff className="text-5xl mx-auto" />{" "}
                <h2 className="text-2xl">No Favorite Meal Found</h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteMeal;
