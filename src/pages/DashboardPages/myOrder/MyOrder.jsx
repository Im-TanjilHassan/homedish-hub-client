import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api/axiosSecure';
import UserOrderTable from './userOrderTable/UserOrderTable';
import { MdOutlineSearchOff } from 'react-icons/md';

const MyOrder = () => {
    const { user } = useContext(AuthContext)
    const userEmail = user?.email;

    const {
      data: orders = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["myOrders", userEmail],
      enabled: !!userEmail,
      queryFn: async () => {
        const res = await axiosSecure.get(`/orders?email=${userEmail}`);
        return res.data;
      },
    });

    const handlePay = (order) => {
      console.log("Proceed to payment for:", order._id);
    };

    if (isLoading) {
      return <p className="text-center">Loading your orders...</p>;
    }

     if (isError) {
       return <p className="text-center text-red-500">{error.message}</p>;
    }

    return (
      <div className="min-h-screen bg-base-200 rounded-2xl px-4 py-10">
        <div className="w-full max-w-5xl space-y-6 mb-10">
          <header>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
              My Orders
            </h1>
            <p className="mt-1 text-base text-gray-500">
              View and manage your food order and payment.
            </p>
          </header>
        </div>
        <div className="bg-base-100 shadow-sm rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 transform transition duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="overflow-x-auto w-full">
            {orders.length ? (
              <div>
                <table className="table">
                  {/* head */}
                  <thead className="text-center">
                    <tr>
                      <th>Food Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Order Status</th>
                      <th>Delivery Time</th>
                      <th>Chef Name</th>
                      <th>Chef ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-15">
                    {orders.map((order) => (
                      <UserOrderTable
                        key={order._id}
                        order={order}
                        handlePay={handlePay}
                      ></UserOrderTable>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-full p-10 text-primary/50 font-bold flex justify-center ">
                <div>
                  <MdOutlineSearchOff className="text-5xl mx-auto" />{" "}
                  <h2 className="text-2xl">No Order Found</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default MyOrder;