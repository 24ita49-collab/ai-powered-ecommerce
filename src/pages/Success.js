import { useNavigate } from "react-router-dom";

function Success() {

  const navigate = useNavigate();

  return (
    <div className="success-page">

      <h1>🎉 Payment Successful!</h1>

      <p>Your order has been placed successfully.</p>

      <button
        className="pay-btn"
        onClick={() => navigate("/orders")}
      >
        View My Orders
      </button>

    </div>
  );
}

export default Success;