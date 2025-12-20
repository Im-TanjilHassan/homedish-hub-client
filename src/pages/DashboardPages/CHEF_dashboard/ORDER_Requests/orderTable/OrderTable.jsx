import { format } from "date-fns";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const RequestTable = ({
  order,
  handleAcceptReq,
  handleRejectReq,
  handleCancelOrder,
}) => {
  const {
    _id,
    foodName,
    price,
    quantity,
    orderStatus,
    userEmail,
    orderTime,
    userAddress,
    paymentStatus,
  } = order;

  return (
    <tr className="text-center cursor-default">
      <td>{foodName}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{orderStatus}</td>
      <td>{userEmail}</td>
      <td>{format(new Date(orderTime), "dd/MM/yyyy hh:mm a")}</td>
      <td>{userAddress}</td>
      <td>{paymentStatus}</td>
      <th className="space-x-2 flex flex-col justify-center items-center gap-y-3">
        <button
          onClick={() => handleAcceptReq(_id)}
          disabled={orderStatus === "cancelled"}
          className="btn bg-green-500 text-white font-semibold hover:bg-green-600 btn-xs"
        >
          <MdOutlineDone />
          Accept
        </button>
        <button
          onClick={() => handleCancelOrder(_id)}
          disabled={orderStatus === "cancelled"}
          className="btn bg-red-600 font-semibold hover:bg-red-700 btn-xs"
        >
          <RxCross2 />
          Cancel
        </button>
        <button
          onClick={() => handleRejectReq(_id)}
          disabled={orderStatus === "cancelled"}
          className="btn bg-primary font-semibold hover:bg-primary/80 btn-xs"
        >
          <TbTruckDelivery />
          Deliver
        </button>
      </th>
    </tr>
  );
};

export default RequestTable;
