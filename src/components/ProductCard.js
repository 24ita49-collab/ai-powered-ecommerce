// components/ProductCard.js
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductCard({
  product,
  cart,
  setCart,
  wishlist,
  setWishlist,
  userRole,
  updateProduct,
   deleteProduct
}) {
    const handleEdit = () => {
  const newTitle = prompt("Enter product title", product.title);
  const newPrice = prompt("Enter product price", product.price);
  const newImage = prompt("Enter product image URL", product.image);

  if (newTitle && newPrice && newImage) {
    updateProduct(product.id, {
      title: newTitle,
      price: newPrice,
      image: newImage
    });

    toast.success("✅ Product Updated Successfully");
  }
};
const addToCart = () => {

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {

    setCart(
      cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
      
    );
    toast.success("🛒 Product Added to Cart");

  } else {

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ]);
 toast.success("🛒 Product Added to Cart");
  }
};
  

  const addToWishlist = () => {

    setWishlist([...wishlist, product]);
    toast.success("❤️ Added to Wishlist");
  };

  const editProduct = () => {

    alert("Admin Can Edit Product");
  };

  return (

    <div className="card product-card">

      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
<h2>{product.title}</h2>

<div className="product-info">
  <p>₹ {product.price}</p>

  <span>
    ⭐ {product.rating?.rate}
  </span>
  <p>
  {product.stock > 0 ? (
    <span style={{ color: "green", fontWeight: "bold" }}>
      🟢 In Stock ({product.stock})
    </span>
  ) : (
    <span style={{ color: "red", fontWeight: "bold" }}>
      🔴 Out of Stock
    </span>
  )}
</p>
</div>
  

<div className="product-buttons">
    <button
  className="cart-btn"
  onClick={addToCart}
  disabled={product.stock === 0}
>
  {product.stock === 0
    ? "Out of Stock"
    : "Add To Cart"}
</button>  

        

        <button
          onClick={addToWishlist}
          className="wishlist-btn"
        >
          Wishlist
        </button>

      </div>

      <Link to={`/products/${product.id}`}>

        <button className="details-btn">
          View Details
        </button>

      </Link>

      {/* ADMIN ONLY */}

     {userRole === "admin" && (
  <button className="admin-btn" onClick={handleEdit}>
    Edit Product
  </button>
   
)}
{userRole === "admin" && (
  <button
    className="delete-btn"
    onClick={() => deleteProduct(product.id)}
  >
    Delete Product
  </button>
)}


    </div>

  );
}

export default ProductCard;