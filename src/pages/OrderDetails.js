import { useLocation, useNavigate } from "react-router-dom";

function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div>
        <h2>No Order Found</h2>
        <button onClick={() => navigate("/orders")}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="order-details-page">

      <button
        className="back-btn"
        onClick={() => navigate("/orders")}
      >
        ← Back
      </button>

      <div className="order-card">

        <img
          src={order.image}
          alt={order.title}
          className="order-image"
        />

        <h2>{order.title}</h2>

        <p><strong>Price:</strong> ₹ {order.price}</p>

        <p><strong>Payment:</strong> {order.paymentMethod}</p>

        <p><strong>Date:</strong> {order.date}</p>

        <h3>Status: {order.status}</h3>

        <h3>Delivery Progress</h3>

        <ul>
          <li>✔ Order Placed</li>
          <li>{order.status === "Processing" || order.status === "Shipped" || order.status === "Delivered" ? "✔" : "○"} Processing</li>
          <li>{order.status === "Shipped" || order.status === "Delivered" ? "✔" : "○"} Shipped</li>
          <li>{order.status === "Delivered" ? "✔" : "○"} Delivered</li>
        </ul>

      </div>

    </div>
  );
}

export default OrderDetails;