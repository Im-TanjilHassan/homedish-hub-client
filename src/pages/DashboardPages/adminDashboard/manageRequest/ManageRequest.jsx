import React from 'react';
import RequestTable from './requestTable/RequestTable';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';

const ManageRequest = () => {

    const { data: pendingChefs = [], refetch } = useQuery({
      queryKey: ["pendingChefs"],
      queryFn: async () => {
        const res = await axiosSecure.get("/chef-requests");
        return res.data;
      },
    });

    console.log(pendingChefs);
    

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
              <RequestTable></RequestTable>
            </div>
          </section>

          {/* admin Requests */}
        </div>
      </div>
    );
};

export default ManageRequest;