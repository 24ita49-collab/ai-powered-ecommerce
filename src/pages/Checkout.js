import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout({ cart, setCart, setOrders }) {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product || null;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  if (!product) {
    return (
      <div className="checkout-page">
        <h1>No Product Selected</h1>
        <button
          className="pay-btn"
          onClick={() => navigate("/cart")}
        >
          Go To Cart
        </button>
      </div>
    );
  }

  const total = Number(product.price);
  const finalAmount = total - discount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();

    if (code === "WELCOME10") {
      setDiscount(total * 0.1);
      toast.success("10% Discount Applied");
    } else if (code === "SAVE20") {
      setDiscount(total * 0.2);
      toast.success("20% Discount Applied");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon");
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Please Select Payment Method");
      return;
    }

    const updatedCart = cart.filter(
      (item) => item.id !== product.id
    );

    setCart(updatedCart);

    const newOrder = {
      id: Date.now(),
      title: product.title,
      image: product.image,
      price: finalAmount.toFixed(2),
      paymentMethod,
      date: new Date().toLocaleDateString(),
      status: "Processing",
    };

    setOrders((prev) => [...prev, newOrder]);

    toast.success("Order Placed Successfully 🎉");

    navigate("/success");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222" }}>
        Checkout
      </h1>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
          display: "block",
          margin: "20px auto",
        }}
      />

      <h2 style={{ color: "#222" }}>{product.title}</h2>

      <h3 style={{ color: "#222" }}>
        Amount : ₹ {total.toFixed(2)}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Enter Coupon"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={applyCoupon}
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>

      <h3 style={{ color: "#222" }}>
        Discount : ₹ {discount.toFixed(2)}
      </h3>

      <h2 style={{ color: "#0057ff" }}>
        Final Amount : ₹ {finalAmount.toFixed(2)}
      </h2>

      <h2 style={{ marginTop: "25px", color: "#222" }}>
        Select Payment Method
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "15px",
        }}
      >
        {[
          "GPay",
          "PhonePe",
          "Credit / Debit Card",
          "Cash On Delivery",
        ].map((method) => (
          <label
            key={method}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              cursor: "pointer",
              color: "#000",
              background: "#fff",
              fontSize: "17px",
              fontWeight: "600",
            }}
          >
            <input
              type="radio"
              name="payment"
              value={method}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {method}
          </label>
        ))}
      </div>

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "15px",
          background: "#0057ff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;