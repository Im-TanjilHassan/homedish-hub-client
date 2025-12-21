import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosSecure from "../../../../../api/axiosSecure";

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    console.log("confirming with:", clientSecret);

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Step C.3 will handle DB update
      await axiosSecure.post("/payments", {
        orderId: id,
        transactionId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types[0],
      });
      navigate(`/dashboard/paymentSuccess/${id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-base-300 rounded-lg bg-gray-300" />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        disabled={!stripe || processing}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-base-200 via-base-300 to-base-200 text-neutral-content text-sm font-semibold tracking-tight py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-xl/20 opacity-80"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-300 to-base-100 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-700 ease-out pointer-events-none"></div>
        <span className="relative">
          {processing ? "Processing..." : "Confirm Payment"}
        </span>
      </button>
    </form>
  );
}

export default CheckoutForm;
