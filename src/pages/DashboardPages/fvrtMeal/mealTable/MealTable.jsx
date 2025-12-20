import { MdDelete } from "react-icons/md";
import { format } from "date-fns";

const MealTable = ({ favorite, handleDeleteFavorite }) => {
  const { _id, mealName, mealImage, chefName, price, addedTime } = favorite;
  return (
    <tr className="text-center cursor-default">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={mealImage} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold">{mealName}</div>
          </div>
        </div>
      </td>
      <td>{chefName}</td>
      <td>{price}</td>
      <td>{format(new Date(addedTime), "dd/MM/yyyy hh:mm a")}</td>
      <th className="space-x-2">
        <button
          onClick={() => handleDeleteFavorite(_id)}
          className="w-24 text-xs text-neutral-content bg-primary py-1 px-1 font-semibold flex items-center gap-2 justify-center mx-auto cursor-pointer"
        >
          <MdDelete />
          Delete
        </button>
      </th>
    </tr>
  );
};

export default MealTable;
