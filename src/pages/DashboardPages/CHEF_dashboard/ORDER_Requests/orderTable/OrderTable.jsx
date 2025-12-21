import { format } from "date-fns";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const RequestTable = ({
  order,
  handleAcceptOrder,
  handleDeliveredOrder,
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

  const cancelDisabled = orderStatus !== "pending";
  const acceptDisabled = orderStatus !== "pending";
  const canDeliver = orderStatus === "accepted" && paymentStatus === "paid";

  return (
    <tr className="text-center cursor-default">
      <td>{foodName}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td
        className={`${orderStatus === "cancelled" && "text-red-600"} ${
          orderStatus === "accepted" && "text-green-600"
        } ${orderStatus === "delivered" && "text-primary/80"}`}
      >
        {orderStatus}
      </td>
      <td>{userEmail}</td>
      <td>{format(new Date(orderTime), "dd/MM/yyyy hh:mm a")}</td>
      <td>{userAddress}</td>
      <td>{paymentStatus}</td>
      <th className="h-30">
        <div className="flex-col space-y-2 block">
          <button
            onClick={() => handleAcceptOrder(_id)}
            disabled={acceptDisabled}
            className="btn bg-green-500  font-semibold hover:bg-green-600 btn-xs disabled:bg-green-950"
          >
            <MdOutlineDone />
            Accept
          </button>
          <button
            onClick={() => handleCancelOrder(_id)}
            disabled={cancelDisabled}
            className="btn bg-red-600 font-semibold hover:bg-red-700 btn-xs disabled:bg-red-950"
          >
            <RxCross2 />
            Cancel
          </button>
          <button
            onClick={() => handleDeliveredOrder(_id)}
            disabled={!canDeliver}
            className="btn bg-primary font-semibold hover:bg-primary/80 btn-xs disabled:bg-primary/40"
          >
            <TbTruckDelivery />
            Deliver
          </button>
        </div>
      </th>
    </tr>
  );
};

export default RequestTable;
