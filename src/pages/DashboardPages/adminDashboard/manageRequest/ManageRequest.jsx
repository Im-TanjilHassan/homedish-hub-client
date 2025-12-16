import React from 'react';
import RequestTable from './requestTable/RequestTable';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';

const ManageRequest = () => {

    const { data: pendingChefs = [], isLoading, isError, error } = useQuery({
      queryKey: ["pendingChefs"],
      retry: false,
      queryFn: async () => {
        const res = await axiosSecure.get("/chefRequests");
        return res.data;
      },
    });

  if (isLoading) {
     return <p>Loading...</p>;
  }

  if (isError) {
    console.log(error);
    return <p>Error loading chef request</p>
  }
  
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
              <table className="table">
                {/* head */}
                <thead className="text-center">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Request status</th>
                    <th>Requested Time</th>
                    <th>Decision</th>
                  </tr>
                </thead>
                <tbody className='space-y-15'>
                  {pendingChefs.map((pendingData) => (
                    <RequestTable
                      key={pendingChefs._id}
                      pendingData={pendingData}
                    ></RequestTable>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* admin Requests */}
        </div>
      </div>
    );
};

export default ManageRequest;