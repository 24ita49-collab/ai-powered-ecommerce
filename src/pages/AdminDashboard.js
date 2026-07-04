

function AdminDashboard({ orders, wishlist }) {

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.price),
    0
  );

  return (
    <div className="dashboard">
      <h1>📊 Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h2>📦 Products</h2>
          <h3>20</h3>
        </div>

        <div className="card">
          <h2>🛒 Orders</h2>
          <h3>{orders.length}</h3>
        </div>

        <div className="card">
          <h2>❤️ Wishlist</h2>
          <h3>{wishlist.length}</h3>
        </div>

        <div className="card">
          <h2>💰 Revenue</h2>
          <h3>₹ {revenue.toFixed(2)}</h3>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;