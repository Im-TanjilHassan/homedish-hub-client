import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import axiosSecure from "../../../../api/axiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../../stripe/stripePromise";
import CheckoutForm from "./checkOutForm/CheckoutForm";

const PayNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: intentData, isLoading: intentLoading } = useQuery({
    queryKey: ["payment-intent", id],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        orderId: id,
      });
      return res.data;
    },
    enabled:
      !!id &&
      order?.orderStatus === "accepted" &&
      order?.paymentStatus !== "paid",

    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || intentLoading) {
    return <p className="text-center py-10">Preparing payment...</p>;
  }

  // DO NOT render Elements without clientSecret
  if (!intentData?.clientSecret) {
    return <p className="text-center py-10 text-red-400">Payment failed.</p>;
  }

  //Guard
  if (order.orderStatus !== "accepted" || order.paymentStatus !== "Pending") {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 font-semibold">
          Payment is not allowed for this order.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-primary text-neutral-content rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-base-200 border border-base-300 shadow-xl shadow-slate-900/40 backdrop-blur-xl p-6 sm:p-8 space-y-6">
        {/* <!-- Header --> */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500 mb-1">
              Checkout
            </p>
            <h2 className="text-2xl tracking-tight font-semibold text-neutral-content leading-snug">
              Order Payment
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Review your order details before continuing to payment.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full border border-base-300 bg-base-300 px-2.5 py-1">
            <span className="text-xs font-medium text-neutral-content tracking-tight">
              Secure
            </span>
          </div>
        </div>

        {/* <!-- Order summary --> */}
        <div className="rounded-xl border border-base-300 bg-base-300 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-content tracking-tight">
                  {order.foodName}
                </p>
                <p className="text-xs text-slate-500">
                  cooked by
                  <span className="text-neutral-content font-medium ml-1">
                    {order.chefName}
                  </span>
                </p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-base-100 px-2.5 py-1 text-xs text-neutral-content">
              Qty:
              <span className="ml-1 font-medium text-neutral-content">
                {order.quantity}
              </span>
            </span>
          </div>

          <div className="border-t border-base-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-content">
              <span>Price</span>
              <span className="font-medium text-neutral-content">
                ${order.price}
              </span>
            </div>

            <div className="flex justify-between text-neutral-content">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-content">
                ${order.totalPrice}
              </span>
            </div>

            <div className="flex justify-between text-neutral-content">
              <span>Delivery</span>
              <span className="text-neutral-content font-medium">Free</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-medium text-neutral-content">
                Total
              </span>
              <div className="text-right">
                <p className="text-lg tracking-tight font-semibold text-neutral-content">
                  ${order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Status + Stripe notice --> */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center gap-2">
            <span className="text-neutral-content">Status</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-base-100 px-2.5 py-1 text-primary capitalize">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(251,191,36,0.25)]"></span>
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/*  STRIPE PAYMENT SECTION START */}
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: intentData.clientSecret }}
        >
          <CheckoutForm clientSecret={intentData.clientSecret} />
        </Elements>
      </div>
    </div>
  );
};

export default PayNow;
