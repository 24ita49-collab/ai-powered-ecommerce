// pages/ProductDetails.js
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import men1 from "../assets/men1.png";
import women1 from "../assets/women1.png";
import women2 from "../assets/women2.png";
import watch1 from "../assets/watch1.png";
import bag1 from "../assets/bag1.png";
import Headphones from "../assets/Headphones.png";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
useEffect(() => {
  // Custom products
  const customProducts = [
    {
  id: 101,
  title: "Premium Men's T-Shirt",
  price: 799,
  image: men1,
  category: "men's clothing",
  description: "Premium cotton t-shirt with soft fabric.",
  rating: { rate: 4.8, count: 120 },
},
{
  id: 102,
  title: "Women's Casual T-Shirt",
  price: 899,
  image: women1,
  category: "women's clothing",
  description: "Comfortable casual wear for everyday use.",
  rating: { rate: 4.7, count: 90 },
},
{
  id: 103,
  title: "Women's Oversized T-Shirt",
  price: 999,
  image: women2,
  category: "women's clothing",
  description: "Stylish oversized premium t-shirt.",
  rating: { rate: 4.9, count: 150 },
},
{
  id: 104,
  title: "Luxury Watch",
  price: 2999,
  image: watch1,
  category: "electronics",
  description: "Luxury stainless steel watch.",
  rating: { rate: 4.9, count: 60 },
},
{
  id: 105,
  title: "Premium Laptop Backpack",
  price: 1499,
  image: bag1,
  category: "bags",
  description: "Stylish water-resistant laptop backpack.",
  rating: { rate: 4.8, count: 85 },
},
{
  id: 106,
  title: "Wireless Bluetooth Headphones",
  price: 2499,
  image: Headphones,
  category: "electronics",
  description: "Wireless headphones with deep bass and noise cancellation.",
  rating: { rate: 4.9, count: 120 },
},
  ];

  const customProduct = customProducts.find(
    (p) => p.id === Number(id)
  );

  if (customProduct) {
    setProduct(customProduct);

    setRelatedProducts(
      customProducts.filter(
        (p) =>
          p.category === customProduct.category &&
          p.id !== customProduct.id
      )
    );

    return;
  }

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data);

      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
          setRelatedProducts(
            products.filter(
              (p) =>
                p.category === data.category &&
                p.id !== data.id
            )
          );
        });
    });

}, [id]);
  

  const addReview = () => {
    if (!newReview.name || !newReview.comment) {
      toast.error("Please fill all fields");
      return;
    }

    setReviews([
      ...reviews,
      {
        id: Date.now(),
        ...newReview,
      },
    ]);

    toast.success("⭐ Review Added Successfully");

    setNewReview({
      name: "",
      rating: 5,
      comment: "",
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("🔗 Product Link Copied!");
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }
  const days = Math.floor(Math.random() * 5) + 3;

const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + days);

  return (
    <div className="details-container">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-card">

        <img
          src={product.image}
          alt={product.title}
          className="details-image"
        />

        <div className="details-info">

          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h2>₹ {product.price}</h2>

          <p>
            <b>Category:</b> {product.category}
          </p>
          <p
  style={{
    color: "green",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  🚚 Delivery in {days} days
  <br />
  Expected by {deliveryDate.toDateString()}
</p>

          <p>
            ⭐ {product.rating?.rate} ({product.rating?.count} Reviews)
          </p>

          <button
            className="share-btn"
            onClick={shareProduct}
          >
            📤 Share Product
          </button>

        </div>

      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Customer Reviews</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={newReview.name}
        onChange={(e) =>
          setNewReview({
            ...newReview,
            name: e.target.value,
          })
        }
      />

      <br />
      <br />

      <select
        value={newReview.rating}
        onChange={(e) =>
          setNewReview({
            ...newReview,
            rating: Number(e.target.value),
          })
        }
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <br />
      <br />

      <textarea
        rows="4"
        cols="40"
        placeholder="Write your review..."
        value={newReview.comment}
        onChange={(e) =>
          setNewReview({
            ...newReview,
            comment: e.target.value,
          })
        }
      />

      <br />
      <br />

      <button
        className="cart-btn"
        onClick={addReview}
      >
        Submit Review
      </button>

      <div
        className="reviews"
        style={{ marginTop: "20px" }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-card"
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <h4>{review.name}</h4>
            <p>{"⭐".repeat(review.rating)}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <hr style={{ margin: "40px 0" }} />
<p>Related Products Count: {relatedProducts.length}</p>
   <hr style={{ margin: "40px 0" }} />

<h2>Related Products</h2>

<div className="related-grid">
  {relatedProducts.map((item) => (
    <div
      key={item.id}
      className="related-card"
    >
      <img
        src={item.image}
        alt={item.title}
        className="related-image"
      />

      <h4>{item.title}</h4>

      <p>₹ {item.price}</p>

      <Link to={`/products/${item.id}`}>
        <button className="details-btn">
          View Details
        </button>
      </Link>
    </div>
  ))}
</div>  
      
            

    </div>
  );
}

export default ProductDetails;