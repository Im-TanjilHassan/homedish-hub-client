import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../providers/AuthProvider";

const CreateMeal = () => {
  const { dbUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //   watch,
    //   setValue,
  } = useForm({
    defaultValues: {
      foodName: "",
      chefName: "",
      price: "",
      rating: "",
      ingredients: "",
      estimatedDeliveryTime: "",
      chefExperience: "",
      chefId: "",
      // userEmail,
    },
  });

  const onSubmitForm = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 rounded-2xl">
      <div className="w-full max-w-4xl mx-auto py-10">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
              Create Meal
            </h1>
            <p className="mt-1 text-base text-slate-400">
              Add a new meal to your menu. All submissions are stored in the
              meals collection.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)]"
        >
          {/* Left column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-primary/20 bg-base-100 shadow-xl/30 backdrop-blur">
              <div className="border-b border-primary/20 px-5 sm:px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-content">
                    Meal Details
                  </h2>
                  <p className="mt-1 text-base text-gray-500">
                    Core information shown to customers.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-5 space-y-5">
                {/* Food Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium tracking-tight text-neutral-content">
                    Food Name
                  </label>
                  <input
                    type="text"
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                    className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                    placeholder="e.g. Spicy Garlic Butter Shrimp"
                  />
                  {errors.foodName && (
                    <p className="text-xs text-rose-400">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                {/* Chef Name & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Chef Name
                    </label>
                    <input
                      type="text"
                      {...register("chefName", {
                        required: "Chef name is required",
                      })}
                      className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300/80 transition"
                      placeholder="Your full name"
                    />
                    {errors.chefName && (
                      <p className="text-xs text-rose-400">
                        {errors.chefName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Price
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-neutral-content0">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register("price", {
                          required: "Price is required",
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: "Price must be positive",
                          },
                        })}
                        className="w-full rounded-lg border border-base-300 bg-base-200 pl-7 pr-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-xs text-rose-400">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating & Estimated Delivery Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Rating
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        {...register("rating", {
                          valueAsNumber: true,
                          min: { value: 0, message: "Min rating is 0" },
                          max: { value: 5, message: "Max rating is 5" },
                        })}
                        className="w-full rounded-lg border border-base-300 bg-base-200 pl-8 pr-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                        placeholder="4.8"
                      />
                    </div>
                    {errors.rating && (
                      <p className="text-xs text-rose-400">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Estimated Delivery Time
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("estimatedDeliveryTime", {
                          required: "Estimated delivery time is required",
                        })}
                        className="w-full rounded-lg border border-base-300 bg-base-200 pl-3.5 pr-10 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                        placeholder="e.g. 30–40 min"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[0.7rem] text-neutral-content0">
                        mins
                      </span>
                    </div>
                    {errors.estimatedDeliveryTime && (
                      <p className="text-xs text-rose-400">
                        {errors.estimatedDeliveryTime.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium tracking-tight text-neutral-content">
                    Ingredients
                  </label>
                  <textarea
                    {...register("ingredients", {
                      required: "Ingredients are required",
                    })}
                    rows={4}
                    className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition resize-none"
                    placeholder="List the main ingredients, separated by commas..."
                  ></textarea>
                  <p className="text-xs text-neutral-content0">
                    Example: Shrimp, garlic, butter, chili flakes, lemon,
                    parsley
                  </p>
                  {errors.ingredients && (
                    <p className="text-xs text-rose-400">
                      {errors.ingredients.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* User Email & Submission */}
            <div className="rounded-2xl border border-base-300 bg-base-100 backdrop-blur">
              <div className="px-5 sm:px-6 py-4 border-b border-base-300">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-content">
                  Account & Submission
                </h2>
                <p className="mt-1 text-base text-slate-400">
                  Your email and chef ID help us link meals to your profile.
                </p>
              </div>
              <div className="px-5 sm:px-6 py-5 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      User Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register("userEmail")}
                        readOnly
                        className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-slate-400 outline-none cursor-not-allowed"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <span
                          className="iconify text-neutral-content0"
                          data-icon="lucide:lock"
                          data-width="16"
                          data-height="16"
                        ></span>
                      </span>
                    </div>
                    <p className="text-xs text-neutral-content0">
                      This email is linked to your user account.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Chef ID
                    </label>
                    <input
                      type="text"
                      {...register("chefId")}
                      className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                      placeholder="Assigned after admin approval"
                    />
                    <p className="text-xs text-neutral-content0">
                      Use the ID provided by the admin. Leave blank if pending.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium tracking-tight text-neutral-content">
                    Chef’s Experience
                  </label>
                  <textarea
                    {...register("chefExperience")}
                    rows={3}
                    className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition resize-none"
                    placeholder="Describe your cooking background, specialties, or years of experience..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-neutral-content0">
                    By submitting, you confirm this meal complies with our food
                    safety and quality guidelines.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-5 py-2.5 text-sm font-medium tracking-tight text-neutral-content shadow-xl/30 hover:bg-primary/70  transition cursor-pointer"
                  >
                    Create Meal
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Image upload */}
            <div className="rounded-2xl border border-base-300 bg-base-100 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur">
              <div className="border-b border-base-300 px-5 sm:px-6 py-4">
                <h2 className="text-lg font-semibold tracking-tight text-neutral-content">
                  Food Image
                </h2>
                <p className="mt-1 text-base text-slate-400">
                  Upload a high-quality photo of the meal.
                </p>
              </div>

              <div className="px-5 sm:px-6 py-5 space-y-4">
                <label className="block">
                  <span className="block text-xs font-medium tracking-tight text-neutral-content mb-2">
                    Image Upload
                  </span>
                  <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-base-200 px-4 py-6 text-center cursor-pointer hover:border-base-300 hover:bg-base-100 transition">
                    <input
                      type="file"
                      accept="image/*"
                      // onChange={handleFileChange}
                      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs text-slate-300">
                        <span className="font-medium">Click to upload</span> or
                        drag &amp; drop
                      </div>
                      <p className="text-xs text-neutral-content0">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                  </div>
                </label>

                {/* {previewUrl && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium tracking-tight text-neutral-content">
                          Preview
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl(null);
                            setImageFile(null);
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-[0.7rem] text-slate-300 hover:bg-slate-800/80 transition"
                        >
                          <span
                            className="iconify"
                            data-icon="lucide:x"
                            data-width="14"
                            data-height="14"
                          ></span>
                          Remove
                        </button>
                      </div>
                      <div className="overflow-hidden rounded-xl border border-base-300 bg-slate-950">
                        <img
                          src={previewUrl}
                          alt="Food preview"
                          className="w-full h-40 sm:h-52 object-cover"
                        />
                      </div>
                    </div>
                  )} */}
              </div>
            </div>

            {/* Helper card */}
            <div className="rounded-2xl border border-base-300 bg-base-100 backdrop-blur">
              <div className="px-5 sm:px-6 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-medium tracking-tight text-neutral-content">
                    Tips for better approvals
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-base-300"></span>
                    Use clear, well-lit images of the final plated meal.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-base-300"></span>
                    Include all major ingredients and potential allergens.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-base-300"></span>
                    Keep pricing and delivery time realistic for your area.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
