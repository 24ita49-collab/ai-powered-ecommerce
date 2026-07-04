

function AdminOrders({ orders, setOrders }) {

  const updateStatus = (id, status) => {

    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: status }
        : order
    );

    setOrders(updatedOrders);

    alert("Order Status Updated Successfully");
  };

  return (

    <div className="orders-page">

      <h1>Manage Orders</h1>

      {orders.length === 0 ? (

        <h2>No Orders Available</h2>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="order-card"
          >

            <img
              src={order.image}
              alt={order.title}
              width="100"
            />

            <div className="order-info">

              <h3>{order.title}</h3>

              <p>₹ {order.price}</p>

              <p>Date : {order.date}</p>

              <p>Payment : {order.paymentMethod}</p>

            </div>

            <div>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
              >
                <option value="Order Placed">
                  Order Placed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

        ))

      )}

    </div>

  );
}

export default AdminOrders;