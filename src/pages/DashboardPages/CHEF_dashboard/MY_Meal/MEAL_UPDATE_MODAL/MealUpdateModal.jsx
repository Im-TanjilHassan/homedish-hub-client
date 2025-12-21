import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosSecure from "../../../../../api/axiosSecure";

const UpdateMealModal = ({ meal, close, refetch }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      foodName: meal.foodName,
      price: meal.price,
      estimatedDeliveryTime: meal.estimatedDeliveryTime,
      chefExperience: meal.chefExperience,
    },
  });

  const onSubmit = async (data) => {

    await axiosSecure.patch(`/meals/${meal._id}`, data);

    Swal.fire("Updated!", "Meal updated successfully.", "success");
    refetch();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-300 p-6 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-lg font-semibold">Update Meal</h2>
        <label>Food Name</label>
        <input
          {...register("foodName")}
          className="input input-bordered w-full"
        />
        <label>Price $</label>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="0.01"
          min="0"
          className="input input-bordered w-full"
        />
        <label>Estimate Delivery Time</label>
        <input
          {...register("estimatedDeliveryTime")}
          className="input input-bordered w-full"
        />
        <label>Chef's Experience</label>
        <textarea
          {...register("chefExperience")}
          className="textarea textarea-bordered w-full"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={close} className="btn btn-sm">
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMealModal;
