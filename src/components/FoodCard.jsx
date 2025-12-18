import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';

const FoodCard = ({meal}) => {
    const {_id, chefName, foodName, price, rating, foodImage} = meal
    return (
      <Link to={`/meals/${_id}`}>
        <button
          type="button"
          className="
              relative group isolate
              flex flex-col items-center
              rounded-3xl
              bg-base-200
              shadow-xl
              transition-all duration-300
              hover:-translate-y-1.5 hover:shadow-xl/30
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
              px-6 pt-16 pb-8
              text-left
              min-w-xs cursor-pointer
            "
        >
          {/* Glow background */}
          <div
            className="
                pointer-events-none absolute inset-x-6 -top-10
                h-28
                bg-gradient-to-b from-base-300 via-base-300/10 to-transparent
                blur-2xl opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "
            aria-hidden="true"
          ></div>

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
          <div className="mt-16 mb-5 text-center space-y-2">
            <div className="space-y-1">
              <p
                className="
                    text-lg tracking-tight
                    font-semibold
                    text-neutral-content
                  "
              >
                {foodName}
              </p>
              <p className="text-base text-neutral-content">Chef: {chefName}</p>
            </div>

            <div className="flex items-center justify-between gap-1 pt-1 w-40 mx-auto ">
              <span className="text-2xl tracking-tight font-semibold text-neutral-content">
                ${price}
              </span>
              <span className="text-2xl tracking-tight font-semibold text-neutral-content flex justify-center items-center gap-3">
                <FaStar />
                {rating}
              </span>
            </div>
          </div>

          {/* Bottom highlight & hover hint */}
          <div
            className="
                pointer-events-none md:absolute md:inset-x-0 md:bottom-0 h-10
                bg-gradient-to-t from-base-300/60 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300 rounded-3xl
              "
            aria-hidden="true"
          ></div>

          <div
            className="
                pointer-events-none md:absolute inset-x-0 bottom-3
                flex justify-center
                md:opacity-0 translate-y-1
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300
              "
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-base-300 px-3 py-1">
              <span className="text-xs text-neutral-content">See Details</span>
            </span>
          </div>
        </button>
      </Link>
    );
};

export default FoodCard;