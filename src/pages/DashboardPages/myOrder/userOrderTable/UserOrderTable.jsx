import { MdOutlinePayment } from "react-icons/md";
import { Link } from "react-router";

const UserOrderTable = ({ order, handlePay }) => {
  const {
    _id,
    foodName,
    price,
    quantity,
    orderStatus,
    deliveryTime,
    chefName,
    chefId,
    paymentStatus,
  } = order;

  return (
    <tr className="text-center cursor-default">
      <td>{foodName}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td
        className={`${orderStatus === "cancelled" && "text-red-600"} ${
          orderStatus === "accepted" && "text-green-600"
        } ${orderStatus === "deliver" && "text-primary/80"}`}
      >
        {orderStatus}
      </td>
      <td>{deliveryTime}</td>
      <td>{chefName}</td>
      <td>{chefId}</td>
      <th className="h-30">
        <div className="flex-col space-y-2 block">
          {orderStatus === "accepted" && paymentStatus === "Pending" ? (
            <Link to={`/dashboard/payNow/${_id}`}>
              <button
                onClick={() => handlePay(order)}
                className="btn bg-primary font-semibold hover:bg-primary/80 btn-xs disabled:bg-primary/40"
              >
                <MdOutlinePayment />
                Pay Now
              </button>
            </Link>
          ) : (
            <div>N/A</div>
          )}
        </div>
      </th>
    </tr>
  );
};

export default UserOrderTable;
