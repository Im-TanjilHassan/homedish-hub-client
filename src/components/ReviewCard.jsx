import { format } from "date-fns";
const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, date, rating, comment } = review;
  return (
    <div className="flex justify-center items-center gap-4 rounded-xl bg-base-200 shadow-xl/30 md:w-88 md:h-78">
      {/* Reviewer Image */}
      <div className="p-5 space-y-5">
        <img
          src={reviewerImage}
          className="w-22 h-22 mx-auto border-2 border-base-300 rounded-full object-cover"
        />
        {/* Review Content */}
        <div className="flex-col justify-center items-center">
          {/* Name & Date */}
          <h4 className="font-semibold text-lg text-center">{reviewerName}</h4>
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            <div className="mx-auto">
              {"★".repeat(rating)}
              <span className="text-neutral-content">
                {"★".repeat(5 - rating)}
              </span>
            </div>
          </div>

          {/* Comment */}
          <p className="text-neutral-content mt-2 text-center">{comment}</p>
        </div>
        <span className="text-sm text-neutral-content float-end">
          {format(new Date(date), "dd/MM/yyyy hh:mm a")}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
