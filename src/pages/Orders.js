import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Orders({ orders, setOrders }) {
  const navigate = useNavigate();

  const requestRefund = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, refundStatus: "Refund Requested" }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    toast.success("Refund Request Sent Successfully");
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Yet 📦</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <img
              src={order.image}
              alt={order.title}
              className="order-image"
              width="120"
            />

            <div className="order-info">
              <h3>{order.title}</h3>

              <p>₹ {order.price}</p>

              <p>
                <b>Payment:</b> {order.paymentMethod}
              </p>

              <p>
                <b>Date:</b> {order.date}
              </p>

              <h4>Status: {order.status}</h4>

              <p>
                <b>Refund Status:</b>{" "}
                {order.refundStatus || "Not Requested"}
              </p>

              {order.refundStatus !== "Refund Requested" && (
                <button
                  className="refund-btn"
                  onClick={() => requestRefund(order.id)}
                >
                  Request Refund
                </button>
              )}
            </div>

            <button
              className="details-btn"
              onClick={() =>
                navigate("/orderdetails", {
                  state: { order },
                })
              }
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
                 