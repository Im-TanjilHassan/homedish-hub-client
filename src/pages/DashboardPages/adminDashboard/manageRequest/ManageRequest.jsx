import React, { useContext } from 'react';
import RequestTable from './requestTable/RequestTable';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../../providers/AuthProvider';
import { MdOutlineSearchOff } from "react-icons/md";

const ManageRequest = () => {
  const { dbUser } = useContext(AuthContext);

    const { data: pendingChefs = [], refetch, isLoading } = useQuery({
      queryKey: ["pendingChefs"],
      enabled: dbUser?.role === "admin",
      retry: false,
      queryFn: async () => {
        const res = await axiosSecure.get("/chefRequests");
        return res.data;
      },
    });

  if (isLoading) {
     return <p>Loading...</p>;
  }
  
  // console.log(pendingChefs);
  const handleAcceptReq = async(userId) => {
    const result = await Swal.fire({
      title: "Approve Chef Request?",
      text: "This user will become a chef.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/chefRequests/accept/${userId}`);

      if (res.data?.message) {
        Swal.fire({
          title: "Approved!",
          text: res.data.message,
          icon: "success",
          timer: 1500,
        });

        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Approval failed",
        icon: "error",
      });
    }
  }
  
  const handleRejectReq = async(userId) => {
    const result = await Swal.fire({
      title: "Reject Chef Request?",
      text: "This request will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/chefRequests/reject/${userId}`);

      if (res.data?.message) {
        Swal.fire({
          title: "Rejected",
          text: res.data.message,
          icon: "success",
          timer: 1500,
        });

        refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Rejection failed",
        icon: "error",
      });
    }
  } 

    return (
      <div className="min-h-screen bg-base-200 rounded-2xl flex justify-center px-4 py-10">
        <div className="w-full max-w-5xl space-y-6">
          {/* Page Header */}
          <header className="mb-4">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
              Manage Request
            </h1>
            <p className="mt-1 text-base text-gray-500">
              View and manage your user role request.
            </p>
          </header>

          {/* chef Requests */}
          <section className="bg-base-100 shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="overflow-x-auto w-full">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-primary pb-5 mb-5 border-b">
                Chef Request's
              </h2>
              <div>
                {pendingChefs.length ? (
                  <div>
                    <table className="table">
                      {/* head */}
                      <thead className="text-center">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Request status</th>
                          <th>Requested Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-15">
                        {pendingChefs.map((pendingData) => (
                          <RequestTable
                            key={pendingChefs._id}
                            pendingData={pendingData}
                            handleAcceptReq={handleAcceptReq}
                            handleRejectReq={handleRejectReq}
                          ></RequestTable>
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

export default ManageRequest;