import {  useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function PaymentSuccess() {
//   const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Refresh user orders
  useEffect(() => {
    queryClient.invalidateQueries(["myOrders"]);
  }, [queryClient]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-base-200 rounded-2xl p-8 shadow-xl text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-400">
          Payment Successful 🎉
        </h2>
        <p className="text-sm text-slate-400">
          Your payment has been completed successfully.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/dashboard/myOrder")}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-base-300 rounded-lg"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
