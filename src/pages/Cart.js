import { useNavigate } from "react-router-dom";

function Cart({ cart,setCart, removeFromCart }) {

  const navigate = useNavigate();
const increaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
const decreaseQuantity = (id) => {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1
          }
        : item
    )
  );
};
  const total = cart.reduce(
  (sum, item) =>
    sum + item.price * item.quantity,
  0
);

  return (

    <div className="cart-page">

      <h1>Cart</h1>

      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <h2 className="empty-cart">
          Your cart is empty 🛒
        </h2>

      ) : (

        <>
          {
            cart.map((item) => (

              <div
                key={item.id}
                className="cart-card"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-image"
                />

                {/* DETAILS */}
                <div className="cart-details">

                  <h3>{item.title}</h3>

                  <p>Price : ₹ {item.price}</p>

<div className="quantity-box">

  <button onClick={() => decreaseQuantity(item.id)}>
    -
  </button>

  <span>{item.quantity}</span>

  <button onClick={() => increaseQuantity(item.id)}>
    +
  </button>

</div>

<p>
  Subtotal : ₹ {(item.price * item.quantity).toFixed(2)}
</p>

                </div>

                {/* REMOVE BUTTON */}
                <div className="cart-actions">

  <button
    className="remove-btn"
    onClick={() => removeFromCart(item.id)}
  >
    Remove
  </button>

  <button
    className="pay-btn"
    onClick={() =>
      navigate("/checkout", {
        state: { product: item }
      })
    }
  >
    Buy Now
  </button>

</div>

              </div>

            ))
          }

          {/* TOTAL */}
          <h2 className="total">
            Total: ₹ {total.toFixed(2)}
          </h2>

          {/* PAYMENT BUTTON */}
          

        </>
      )}

    </div>

  );
}

export default Cart;