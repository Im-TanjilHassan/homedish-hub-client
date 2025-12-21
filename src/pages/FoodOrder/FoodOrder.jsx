import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axiosPublic";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

function FoodOrder() {
  const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

  //fetch single meal
  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      quantity: 1,
      userAddress: "",
    },
  });

  useEffect(() => {
    if (meal) {
      reset({
        quantity: 1,
        userAddress: "",
      });
    }
  }, [meal, reset]);

  const onSubmit = async (data) => {
    const total = (data.quantity * meal.price).toFixed(2);

    const result = await Swal.fire({
      title: "Confirm Order?",
      text: `Your total price is $${total}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (!result.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      foodName: meal.foodName,
      price: meal.price,
      quantity: data.quantity,
      chefId: meal.chefId,
      userEmail: user.email,
      userAddress: data.userAddress,
      chefName: meal.chefName,
      deliveryTime: meal.estimatedDeliveryTime,
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);

      if (res.data?.orderId) {
        await Swal.fire({
          icon: "success",
          title: "Order placed successfully!",
          text: "You can track your order from My Orders page.",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/dashboard/myOrder");
      }
    } catch (error) {
        console.log(error);
        
      Swal.fire({
        icon: "error",
        title: "Order failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  console.log("price value:", meal?.price, "type:", typeof meal?.price);
  const quantity = Number(watch("quantity") || 0);
  const price = Number(meal?.price || 0);
  const totalPrice = quantity > 0 ? (quantity * price).toFixed(2) : "0.00";

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (user?.status === "fraud") {
    return (
      <p className="text-center text-red-500">
        Your account is marked as fraud. You cannot place orders.
      </p>
    );
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-3xl mx-4 bg-base-200 rounded-2xl shadow-xl shadow-slate-950/50 backdrop-blur-md">
        <div className="w-full  p-6 md:p-8 flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
              delivery details
            </p>
            <h2 className="mt-1 text-xl tracking-tight font-semibold text-neutral-content">
              Complete your order
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* user email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-content tracking-tight">
                Email
              </label>
              <input
                type="text"
                readOnly
                value={user?.email}
                className="text-sm rounded-lg border border-base-300 bg-base-100 text-neutral-content px-3 py-2 outline-none focus:ring-2 focus:ring-primary  placeholder-slate-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* meal */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-content tracking-tight">
                  Meal
                </label>
                <input
                  type="text"
                  readOnly
                  value={meal.foodName}
                  className="text-sm rounded-lg border border-base-300 bg-base-100 text-neutral-content px-3 py-2 outline-none focus:ring-2 focus:ring-primary  placeholder-slate-500"
                />
              </div>
              {/* price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-content tracking-tight">
                  Price
                </label>
                <input
                  type="text"
                  readOnly
                  value={`$${meal.price.toFixed(2)}`}
                  className="text-sm rounded-lg border border-base-300 bg-base-100 text-neutral-content px-3 py-2 outline-none focus:ring-2 focus:ring-primary  placeholder-slate-500"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Quantity */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-neutral-content tracking-tight">
                    Quantity
                  </label>
                  <span className="text-[0.65rem] text-slate-500 font-medium tracking-tight">
                    Max 20 per order
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="20"
                    step="1"
                    className={`text-sm rounded-lg border bg-base-100 text-neutral-content px-3 py-2 outline-none focus:ring-2 focus:ring-primary placeholder-slate-500 w-full ${
                      errors.quantity
                        ? "border-rose-500/80 focus:ring-rose-500/70"
                        : "border-base-300"
                    }`}
                    placeholder="Enter quantity"
                    {...register("quantity", {
                      required: "Please select how many you want",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 meal required" },
                      max: { value: 20, message: "Maximum 20 per order" },
                    })}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <span className="text-[0.7rem] text-slate-500 font-medium tracking-tight">
                      pcs
                    </span>
                  </div>
                </div>
                {errors.quantity && (
                  <p className="text-[0.7rem] text-rose-400 font-medium mt-0.5 tracking-tight">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="userAddress"
                  className="text-xs font-medium text-neutral-content tracking-tight"
                >
                  Delivery address
                </label>
                <textarea
                  id="userAddress"
                  rows="3"
                  className={`text-sm rounded-lg border bg-base-100 text-neutral-content px-3 py-2 outline-none focus:ring-2 focus:ring-primary  placeholder-slate-500 resize-none ${
                    errors.userAddress
                      ? "border-rose-500/80 focus:ring-rose-500/70"
                      : "border-base-300"
                  }`}
                  placeholder="Street, number, city, ZIP"
                  {...register("userAddress", {
                    required: "Delivery address is required",
                    minLength: {
                      value: 8,
                      message: "Please provide a more detailed address",
                    },
                  })}
                ></textarea>
                {errors.userAddress && (
                  <p className="text-[0.7rem] text-rose-400 font-medium mt-0.5 tracking-tight">
                    {errors.userAddress.message}
                  </p>
                )}
              </div>
            </div>

            {/* Order meta (auto-filled visual only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {/* chefId */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-content tracking-tight">
                  Chef ID
                </label>
                <input
                  type="text"
                  readOnly
                  value={meal.chefId}
                  className="text-sm rounded-lg border border-base-300 bg-base-100 text-neutral-content px-3 py-2 outline-none"
                />
              </div>
              {/* order status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-content tracking-tight">
                  Order status
                </label>
                <input
                  type="text"
                  readOnly
                  value={"pending"}
                  className="text-sm rounded-lg border border-base-300 bg-base-100 text-neutral-content px-3 py-2 outline-none capitalize"
                />
              </div>
            </div>

            {/* Footer: total + submit */}
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium tracking-tight">
                    Total Amount
                  </span>
                  <span className="text-2xl tracking-tight font-semibold text-primary">
                    {Number.isNaN(quantity) || quantity <= 0
                      ? "$0.00"
                      : `$${totalPrice}`}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/70 disabled:bg-base-300 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold tracking-tight text-neutral-content shadow-lg shadow-base-300 transition-colors"
                  >
                    <span className="icon-[lucide--utensils-crossed]"></span>
                    <span>
                      {isSubmitting ? "Placing order..." : "Confirm order"}
                    </span>
                  </button>
                  <span className="text-[0.65rem] text-slate-500 font-medium tracking-tight">
                    By confirming, you agree to receive delivery updates via
                    email.
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodOrder;
