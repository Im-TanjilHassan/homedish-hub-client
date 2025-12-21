import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import axiosSecure from "../../../../api/axiosSecure.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import OrderTable from "./orderTable/OrderTable";
import { MdOutlineSearchOff } from "react-icons/md";
import Swal from "sweetalert2";


const Order = () => {
    const { dbUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
  const chefId = dbUser?.chefId;

    // BACKEND
    // ----------------------------
    //fetch requests
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["chefOrders", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/chef/orders?chefId=${chefId}`);
      return res.data;
    },
  });
    
    //call cancel
    const cancelOrderMutation = useMutation({
      mutationFn: async (orderId) => {
        const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["chefOrders"]);
      },
    });
  
  // call accept
  const acceptOrderMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await axiosSecure.patch(`/orders/accept/${orderId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chefOrders"]);
    },
  });

  //call delivered
  const deliverMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await axiosSecure.patch(`/orders/deliver/${orderId}`);
      return res.data;
    },
    onSuccess: () => {
      // Refresh chef orders after delivery
      queryClient.invalidateQueries(["chefOrders"]);
    },
  });

    // BTNS FUNCTIONS
    // ----------------------------
    //cancel btn
    const handleCancelOrder = async (orderId) => {
      const result = await Swal.fire({
        title: "Cancel this order?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
      });

      if (!result.isConfirmed) return;

      cancelOrderMutation.mutate(orderId);
  };
  
  // accept btn
  const handleAcceptOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Accept this order?",
      text: "Once accepted, the user can proceed to payment.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept Order",
    });

    if (!result.isConfirmed) return;

    acceptOrderMutation.mutate(orderId);
  };

  const handleDeliveredOrder = async (orderId) => {
    const result = await Swal.fire({
      title: "Delivered this order?",
      text: "Once Delivered, the user Will get the order.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Deliver",
    });

    if (!result.isConfirmed) return;

    deliverMutation.mutate(orderId);
  }

  if (isLoading) {
    return <p className="text-center">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-base-200 rounded-2xl px-4 py-10">
      <div className="w-full max-w-5xl space-y-6 mb-10">
        <header>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            Order Requests
          </h1>
          <p className="mt-1 text-base text-gray-500">
            View and manage your food order requests.
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
                    <th>user Email</th>
                    <th>Order Time</th>
                    <th>User Address</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="space-y-15">
                  {orders.map((order) => (
                    <OrderTable
                      key={order._id}
                      order={order}
                      handleAcceptOrder={handleAcceptOrder}
                      handleDeliveredOrder={handleDeliveredOrder}
                      handleCancelOrder={handleCancelOrder}
                    ></OrderTable>
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
    </div>
  );
};

export default Order;
