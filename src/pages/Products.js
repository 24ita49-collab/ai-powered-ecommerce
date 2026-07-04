import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

// Custom Images
import men1 from "../assets/men1.png";
import women1 from "../assets/women1.png";
import women2 from "../assets/women2.png";
import watch1 from "../assets/watch1.png";
import bag1 from "../assets/bag1.png";
import Headphones from "../assets/Headphones.png";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
  ? new SpeechRecognition()
  : null;

function Products({
  cart,
  setCart,
  wishlist,
  setWishlist,
  userRole,
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    // Custom Products
    const customProducts = [
      {
        id: 101,
        title: "Premium Men's T-Shirt",
        price: 799,
        image: men1,
        category: "men's clothing",
        rating: { rate: 4.8 },
        stock: 10,
      },
      {
        id: 102,
        title: "Women's Casual T-Shirt",
        price: 899,
        image: women1,
        category: "women's clothing",
        rating: { rate: 4.7 },
        stock: 8,
      },
      {
        id: 103,
        title: "Women's Oversized T-Shirt",
        price: 999,
        image: women2,
        category: "women's clothing",
        rating: { rate: 4.9 },
        stock: 12,
      },
      {
        id: 104,
        title: "Luxury Watch",
        price: 2999,
        image: watch1,
        category: "electronics",
        rating: { rate: 4.9 },
        stock: 5,
      },
      {
  id: 105,
  title: "Premium Laptop Backpack",
  price: 1499,
  image: bag1,
  category: "bags",
  description: "Stylish water-resistant laptop backpack.",
  rating: {
    rate: 4.8,
    count: 85,
  },
  stock: 15,
},
{
  id: 106,
  title: "Wireless Bluetooth Headphones",
  price: 2499,
  image: Headphones,
  category: "electronics",
  description: "Wireless headphones with deep bass and noise cancellation.",
  rating: {
    rate: 4.9,
    count: 120,
  },
  stock: 10,
},
    ];

    fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
  const updatedProducts = data.map((product) => {
    let newPrice;

    switch (product.id) {
      case 1:
        newPrice = 599;
        break;
      case 2:
        newPrice = 999;
        break;
      case 3:
        newPrice = 799;
        break;
      case 4:
        newPrice = 1299;
        break;
      case 5:
        newPrice = 1599;
        break;
      case 6:
        newPrice = 899;
        break;
      case 7:
        newPrice = 2499;
        break;
      case 8:
        newPrice = 1799;
        break;
      case 9:
        newPrice = 699;
        break;
      case 10:
        newPrice = 1999;
        break;
      case 11:
        newPrice = 2999;
        break;
      case 12:
        newPrice = 1199;
        break;
      case 13:
        newPrice = 1499;
        break;
      case 14:
        newPrice = 3499;
        break;
      case 15:
        newPrice = 2299;
        break;
      case 16:
        newPrice = 1899;
        break;
      case 17:
        newPrice = 999;
        break;
      case 18:
        newPrice = 2699;
        break;
      case 19:
        newPrice = 799;
        break;
      case 20:
        newPrice = 1499;
        break;
      default:
        newPrice = product.price;
    }

    return {
      ...product,
      price: newPrice,
      stock: Math.floor(Math.random() * 10) + 1,
    };
  });

  

    setProducts([...customProducts, ...updatedProducts]);
  })
      .catch((err) => {
        console.log(err);

        // API fail aana custom products mattum show aagum
        setProducts(customProducts);
      });

  }, []);

    

  let filteredProducts = products.filter((product) => {
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "all" ||
    product.category === category;

  return matchesSearch && matchesCategory;
});

if (sortBy === "low-high") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sortBy === "high-low") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sortBy === "rating") {
  filteredProducts.sort(
    (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
  );
}

if (sortBy === "az") {
  filteredProducts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

  const addProduct = () => {
  if (!newProduct.title || !newProduct.price || !newProduct.image) {
    alert("Please fill all fields");
    return;
  }

  const productToAdd = {
    id: Date.now(),
    ...newProduct
  };

  setProducts((prev) => [...prev, productToAdd]);

  setNewProduct({ title: "", price: "", image: "" });
};
  
  const updateProduct = (id, updatedData) => {
  setProducts((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    )
  );
};
const deleteProduct = (id) => {
  setProducts((prev) =>
    prev.filter((product) => product.id !== id)
  );
  
};
const startListening = () => {
  if (!recognition) {
    alert("Voice Search is not supported in this browser.");
    return;
  }

  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setSearch(transcript);
  };
};
  return (

    <div className="products-page">

      <h1 className="title">
        Featured Products
      </h1>
<div className="search-container">

  <div className="search-box">
    <span className="search-icon">🔍</span>

    <input
      type="text"
      placeholder="Search products..."
      className="product-search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <button
      className="voice-btn"
      onClick={startListening}
    >
      🎤
    </button>
  </div>

  <div className="filter-row">
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="category-filter"
    >
      <option value="all">All Categories</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="women's clothing">Women's Clothing</option>
      <option value="electronics">Electronics</option>
      <option value="bags">Bags</option>
      <option value="jewelery">Jewellery</option>
    </select>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="sort-filter"
    >
      <option value="default">Default</option>
      <option value="low-high">Price: Low → High</option>
      <option value="high-low">Price: High → Low</option>
      <option value="rating">Highest Rating</option>
      <option value="az">A → Z</option>
    </select>
  </div>

</div>


      
     {userRole === "admin" && (

  <div className="admin-section">

    <button
      className="show-add-btn"
      onClick={() =>
        document
          .querySelector(".add-product-box")
          .classList.toggle("active")
      }
    >
      + Add Product
    </button>

    <div className="add-product-box">

      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Title"
        value={newProduct.title}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            title: e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            price: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            image: e.target.value
          })
        }
      />
      <input
  type="number"
  placeholder="Stock"
  value={newProduct.stock}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      stock: Number(e.target.value)
    })
  }
/>

      <button onClick={addProduct}>
        Add Product
      </button>

    </div>

  </div>

)}
    

      <div className="product-grid">

        {
          filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}

              cart={cart}
              setCart={setCart}

              wishlist={wishlist}
              setWishlist={setWishlist}
               
              userRole={userRole}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}

            />

          ))
        }

      </div>

    </div>

  );
}

export default Products;