// pages/Home.js

import { Link } from "react-router-dom";

function Home() {
  return (
    <>

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            🚀 AI Powered Shopping Experience
          </span>

          <h1>
            Smart Shopping
            <br />
            Starts Here
          </h1>

          <p>
            Discover thousands of premium products with personalized
            recommendations, secure payments, lightning-fast delivery,
            and hassle-free shopping.
          </p>

          <div className="hero-buttons">

            <Link to="/products">
              <button className="shop-btn">
                Shop Now
              </button>
            </Link>

            <button className="explore-btn">
              Explore
            </button>

          </div>

          <div className="hero-stats">

            <div className="stat-box">
              <h2>10K+</h2>
              <p>Customers</p>
            </div>

            <div className="stat-box">
              <h2>5K+</h2>
              <p>Products</p>
            </div>

            <div className="stat-box">
              <h2>4.9★</h2>
              <p>Rating</p>
            </div>

          </div>

        </div>

      </section>



      {/* FEATURES */}

      <section className="features">

        <div className="feature-card">
          <h2>🤖</h2>
          <h3>AI Recommendations</h3>
          <p>
            Personalized product suggestions based on your shopping history.
          </p>
        </div>

        <div className="feature-card">
          <h2>🚚</h2>
          <h3>Fast Delivery</h3>
          <p>
            Get your products delivered quickly with live tracking.
          </p>
        </div>

        <div className="feature-card">
          <h2>🔒</h2>
          <h3>Secure Payment</h3>
          <p>
            100% secure online payment with trusted gateways.
          </p>
        </div>

        <div className="feature-card">
          <h2>↩️</h2>
          <h3>Easy Returns</h3>
          <p>
            Hassle-free returns and instant refund support.
          </p>
        </div>

      </section>



      {/* AI SECTION */}

      <section className="ai-section">

        <h2>🤖 AI Personalized Recommendations</h2>

        <p>
          Our AI analyzes your interests and shopping history to recommend
          products you'll love.
        </p>

        <div className="ai-cards">

          <div className="ai-card">
            <h3>🎯 Smart Suggestions</h3>
            <p>
              AI recommends products based on your preferences.
            </p>
          </div>

          <div className="ai-card">
            <h3>🔥 Trending Picks</h3>
            <p>
              Explore the most popular products loved by customers.
            </p>
          </div>

          <div className="ai-card">
            <h3>💰 Best Deals</h3>
            <p>
              Get personalized discounts and exclusive offers.
            </p>
          </div>

        </div>

      </section>



      {/* TRENDING PRODUCTS */}

      <section className="trending-section">

        <h2>🔥 Trending Products</h2>

        <p>
          Explore our best-selling products.
        </p>

        <div className="trending-grid">

          <div className="trend-card">
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              alt="Backpack"
            />
            <h3>Travel Backpack</h3>
            <span>$109.95</span>
          </div>

          <div className="trend-card">
            <img
              src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
              alt="Jacket"
            />
            <h3>Men's Jacket</h3>
            <span>$55.99</span>
          </div>

          <div className="trend-card">
            <img
              src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
              alt="Laptop Bag"
            />
            <h3>Laptop Bag</h3>
            <span>$39.99</span>
          </div>

          <div className="trend-card">
            <img
              src="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
              alt="Shoes"
            />
            <h3>Running Shoes</h3>
            <span>$79.99</span>
          </div>

        </div>

        <Link to="/products">
          <button className="view-all-btn">
            View All Products →
          </button>
        </Link>

      </section>

    </>
  );
}

export default Home;