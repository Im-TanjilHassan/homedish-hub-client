import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useContext, useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";

const CreateMeal = () => {
  const { dbUser } = useContext(AuthContext);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      foodName: "",
      chefName: "",
      price: "",
      ingredients: "",
      estimatedDeliveryTime: "",
      chefExperience: "",
      foodImage: null,
    },
  });

  const imgbbKey = import.meta.env.VITE_IMAGEBB_KEY;

  const onSubmitForm = async (data) => {
    try {
      setIsLoading(true)
      if (!data.foodImage || data.foodImage.length === 0) {
        throw new Error("Food image is required");
      }

      const imageFile = data.foodImage[0];

      // upload image to imgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error("Image upload failed");
      }

      const imageUrl = uploadData.data.url;

      // convert ingredients string to array
      const ingredientsArray = data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // new meal data
      const mealData = {
        foodName: data.foodName,
        chefName: dbUser.name,
        foodImage: imageUrl,
        price: data.price,
        ingredients: ingredientsArray,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
      };

      await axiosSecure.post("/meals", mealData);

      Swal.fire({
        title: "Success!",
        text: "Meal created successfully",
        icon: "success",
        timer: 1500,
      });

      reset()
      setPreviewUrl(null);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      Swal.fire({
        title: "Error",
        text: err.message || "Failed to create meal",
        icon: "error",
      });
    }
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
          {/* Image upload */}
          <div className="rounded-2xl border border-base-300 bg-base-100 shadow-xl/30 backdrop-blur">
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
                <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-200 px-4 py-6 text-center cursor-pointer hover:border-base-300 hover:bg-base-100 transition">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("foodImage", {
                      required: "Food image is required",
                    })}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
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
                {errors.foodImage && (
                  <p className="text-xs text-rose-400 mt-2">
                    {errors.foodImage.message}
                  </p>
                )}
              </label>

              {previewUrl && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-tight text-neutral-content">
                      Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-base-300 bg-base-100 px-2 py-1 text-[0.7rem] text-neutral-content hover:bg-base-200 transition"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-base-300 bg-base-100">
                    <img
                      src={previewUrl}
                      alt="Food preview"
                      className="w-full h-40 sm:h-52 object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

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
                      {...register("chefName")}
                      readOnly
                      value={dbUser.name}
                      className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-slate-500 placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300/80 transition"
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
                            value: 1,
                            message: "Price must be greater than 0",
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
                  Your email help us link meals to your profile.
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
                        readOnly
                        value={dbUser.email}
                        className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-slate-400 outline-none cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-neutral-content0">
                      This email is linked to your user account.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-tight text-neutral-content">
                      Estimated Delivery Time
                    </label>
                    <input
                      type="text"
                      {...register("estimatedDeliveryTime", {
                        required: "Delivery time is required",
                      })}
                      className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition"
                      placeholder="e.g. 30 minutes"
                    />
                    {errors.estimatedDeliveryTime && (
                      <p className="text-xs text-rose-400">
                        {errors.estimatedDeliveryTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium tracking-tight text-neutral-content">
                    Chef’s Experience
                  </label>
                  <textarea
                    {...register("chefExperience", {
                      required: "Chef experience is required",
                      min: {
                        value: 0,
                        message: "Experience cannot be negative",
                      },
                      max: {
                        value: 50,
                        message: "Experience seems unrealistic",
                      },
                    })}
                    rows={3}
                    className="w-full rounded-lg border border-base-300 bg-base-200 px-3.5 py-2.5 text-base text-neutral-content placeholder-slate-500 outline-none focus:border-base-300 focus:ring-2 focus:ring-base-300 transition resize-none"
                    placeholder="Describe your cooking background, specialties, or years of experience..."
                  ></textarea>
                  {errors.chefExperience && (
                    <p className="text-xs text-rose-400">
                      {errors.chefExperience.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-neutral-content0">
                    By submitting, you confirm this meal complies with our food
                    safety and quality guidelines.
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-5 py-2.5 text-sm font-medium tracking-tight text-neutral-content shadow-xl/30 hover:bg-primary/70  transition cursor-pointer"
                  >
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Create Meal"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
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
