import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../../../../api/axiosSecure";
import UserTable from "./USER_Table/UserTable";
import { MdOutlineSearchOff } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUser = () => {
  const {
    data: usersData,
    isLoading,
      refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/allUsers");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

    const users = usersData?.data || [];
    
    const handleMakeFraud = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This user will be permanently marked as fraud.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, mark fraud",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      try {
        const res = await axiosSecure.patch(`/admin/users/${id}/fraud`);

        if (res.data.success) {
          Swal.fire("Success!", res.data.message, "success");
          refetch();
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Something went wrong",
          "error"
        );
      }
    };


  return (
    <div className="min-h-screen bg-base-200 rounded-2xl flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        {/* Page Header */}
        <header className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            Manage User
          </h1>
          <p className="mt-1 text-base text-gray-500">
            View and manage your user.
          </p>
        </header>

        {/* chef Requests */}
        <section className="bg-base-100 shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="overflow-x-auto w-full">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-primary pb-5 mb-5 border-b w-full">
              All User's ({users.length})
            </h2>
            <div>
              {users.length ? (
                <div>
                  <table className="table">
                    {/* head */}
                    <thead className="text-center">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-15">
                      {users.map((user) => (
                        <UserTable
                          key={user._id}
                          user={user}
                          handleMakeFraud={handleMakeFraud}
                        ></UserTable>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-full p-10 text-primary/50 font-bold flex justify-center ">
                  <div>
                    <MdOutlineSearchOff className="text-5xl mx-auto" />{" "}
                    <h2 className="text-2xl">No Request Found</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* admin Requests */}
      </div>
    </div>
  );
};

export default ManageUser;
