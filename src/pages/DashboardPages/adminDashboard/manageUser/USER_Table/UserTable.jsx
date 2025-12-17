import { FaUserTimes } from "react-icons/fa";

const UserTable = ({ user, handleMakeFraud }) => {
  const { _id, image, name, email, role, status } = user;
  return (
    <tr className="text-center hover:bg-base-300/60">
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{role}</td>
      <td
        className={`font-semibold ${user.status === "fraud" && "text-red-500"}`}
      >
        {status}
      </td>
      <th className="space-x-2">
        {user.role !== "admin" && user.status !== "fraud" ? (
          <button
            onClick={() => handleMakeFraud(_id)}
            className="w-24 text-xs text-black bg-yellow-500 py-1 px-1 font-semibold hover:bg-yellow-600 flex items-center gap-2 justify-center mx-auto cursor-pointer disabled:bg-base-300"
          >
            <FaUserTimes />
            Make Fraud
          </button>
        ) : (
          <span className="text-gray-400">N/A</span>
        )}
      </th>
    </tr>
  );
};

export default UserTable;
