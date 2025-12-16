import { format } from "date-fns";

const RequestTable = ({ pendingData, handleAcceptReq, handleRejectReq }) => {
  const { _id, name, email, role, chefRequestedAt, image, address } =
    pendingData;

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
            <div className="text-sm opacity-50">{address}</div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{role}</td>
      <td>{format(new Date(chefRequestedAt), "dd/MM/yyyy hh:mm a")}</td>
      <th className="space-x-2">
        <button
          onClick={() => handleAcceptReq(_id)}
          className="btn bg-green-400 text-black font-semibold hover:bg-green-600 btn-xs"
        >
          Accept
        </button>
        <button
          onClick={() => handleRejectReq(_id)}
          className="btn bg-base-300 font-semibold hover:bg-base-300/80 btn-xs"
        >
          Reject
        </button>
      </th>
    </tr>
  );
};

export default RequestTable;
