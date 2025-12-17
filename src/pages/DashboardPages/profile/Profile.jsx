import React, { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaEdit } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";
import Swal from "sweetalert2";

const Profile = () => {
  const { dbUser, user, refetchProfile } = useContext(AuthContext);
  const [reqPending, setReqPending] = useState(false)

  const handleChefRequest = async () => {
    const result = await Swal.fire({
      title: "Become a Chef?",
      text: "This request will be sent for admin approval.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, send request",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setReqPending(true);
    try {
      await axiosSecure.post("/chefRequest");

      refetchProfile();
      
      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Your chef request is now pending approval.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setReqPending(false)
    }
  };

  return (
    <div className="min-h-screen bg-base-200 rounded-2xl flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-6">
        {/* Page Header */}
        <header className="mb-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            My Profile
          </h1>
          <p className="mt-1 text-base text-gray-500">
            View and manage your personal information.
          </p>
        </header>

        {/* Profile Summary Card */}
        <section className="bg-base-100 backdrop-blur-sm shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 flex items-start md:items-center gap-4 md:gap-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              {user.photoURL ? (
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden">
                  <img src={user.photoURL} className="w-full h-full" alt="" />
                </div>
              ) : (
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-inner flex items-center justify-center overflow-hidden">
                  <span className="text-lg md:text-xl font-medium text-white">
                    {user?.displayName?.[0]}
                  </span>
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <i data-lucide="check" className="w-3 h-3 text-white"></i>
              </span>
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-primary">
                {user.displayName}
              </h2>
              <p className="mt-0.5 text-base text-emerald-700 font-semibold">
                {dbUser.role}
              </p>
              <p className="mt-0.5 text-sm md:text-base text-gray-500">
                {dbUser.address}
              </p>
            </div>
          </div>

          <div className="flex-1" />

          <button className="inline-flex items-center justify-center rounded-full md:bg-primary text-white text-xs md:text-base font-medium md:px-4 md:py-2 shadow-sm hover:bg-primary/80 gap-2 cursor-pointer">
            <FaEdit />
            <span className="hidden md:block lg:block">Edit Profile</span>
          </button>
        </section>

        {/* Personal Information */}
        <section className="bg-base-100 shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 space-y-4 md:space-y-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold tracking-tight text-neutral-content">
              Personal Information
            </h3>
            <div className="flex-1" />
            <button className="inline-flex items-center justify-center rounded-full md:bg-primary text-white text-xs md:text-sm font-medium px-3 py-1 gap-1 hover:bg-primary/80 transition cursor-pointer">
              <FaEdit />
              <span className="hidden md:block lg:block">Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Name
              </p>
              <p className="text-neutral-content font-medium">
                {user.displayName}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                DATE OF BIRTH
              </p>
              <p className="text-neutral-content font-medium">12-10-1999</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                EMAIL ADDRESS
              </p>
              <p className="text-neutral-content font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                PHONE NUMBER
              </p>
              <p className="text-neutral-content font-medium">01539486310</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                ADDRESS
              </p>
              <p className="text-neutral-content font-medium">
                {dbUser.address}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                USER ROLE
              </p>
              <p className="text-neutral-content font-medium">{dbUser.role}</p>
            </div>
          </div>
          {dbUser.role !== "admin" && (
            <div className="w-full flex justify-end items-center gap-5">
              <button
                hidden={dbUser.role === "chef"}
                disabled={dbUser.role === "chef-pending"}
                onClick={handleChefRequest}
                className="rounded-lg shadow-xl/30 px-3 py-1.5 text-white font-bold bg-primary hover:bg-primary/80 cursor-pointer disabled:bg-base-300 disabled:text-gray-500"
              >
                {reqPending ? "Sending..." : "Be A Chef"}
              </button>
              <button className="rounded-lg shadow-xl/30 px-3 py-1.5 text-white font-bold bg-primary hover:bg-primary/80 cursor-pointer">
                Be An Admin
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
