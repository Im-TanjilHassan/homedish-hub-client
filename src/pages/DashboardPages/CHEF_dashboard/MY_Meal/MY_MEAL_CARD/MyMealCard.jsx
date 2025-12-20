import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const MyMealCard = ({ meal, handleDelete, handleEditClick }) => {
  const {
    _id,
    chefName,
    foodName,
    price,
    rating,
    foodImage,
    chefExperience,
    estimatedDeliveryTime,
    ingredients,
  } = meal;

  return (
    <div
      className="
              relative group isolate
              flex flex-col items-center
              rounded-3xl
              bg-base-200
              shadow-xl
              transition-all duration-300
              hover:-translate-y-1.5 hover:shadow-xl/30
              p-6
              min-w-xs cursor-default
              w-98
            "
    >
      {/* Image wrapper */}
      <div
        className="
                absolute -top-12 z-10
                h-38 w-38
                rounded-full
                overflow-hidden
                ring-4 ring-base-300 ring-offset-2 ring-offset-base-300/60
                shadow-[0_16px_40px_rgba(0,0,0,0.6)]
                transition-transform duration-300
                group-hover:translate-y-0.5
              "
      >
        <img src={foodImage} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="text-start space-y-5 mt-30 px-3 mb-5 w-full">
        <div className="space-y-1">
          <p
            className="
                    text-lg tracking-tight
                    
                    text-neutral-content
                  "
          >
            <span className="font-semibold">FoodName</span>: {foodName}
          </p>
          <p className="text-base text-neutral-content">
            <span className="font-semibold">Chef Name</span>: {chefName}
          </p>
        </div>

        <div className="flex items-center justify-between ">
          <span className="tracking-tight font-semibold text-neutral-content">
            Price: ${price}
          </span>
          <span className="tracking-tight font-semibold text-neutral-content flex justify-center items-center gap-3">
            <FaStar />
            {rating}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="font-semibold">Ingregients</span>:
          {ingredients.slice(0, 3).map((ingredient, index) => (
            <p key={index}>{ingredient},</p>
          ))}
          <span>...</span>
        </div>

        <div className="space-y-5">
          <p className="flex flex-wrap gap-2">
            <span className="font-semibold">Estimate Delivery Time:</span>{" "}
            {estimatedDeliveryTime}{" "}
          </p>
          <div>
            <p>
              {" "}
              <span className="font-semibold">Chef Experience</span>:{" "}
              {chefExperience.slice(0, 50)}...{" "}
            </p>
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex justify-center items-center gap-3 w-full">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-base-300 w-full rounded-2xl py-1 hover:bg-base-300/60 cursor-pointer font-semibold"
        >
          Delete
        </button>
        <button
          onClick={() => handleEditClick(meal)}
          className="bg-yellow-600 w-full rounded-2xl py-1 hover:bg-yellow-700 font-semibold cursor-pointer"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default MyMealCard;
