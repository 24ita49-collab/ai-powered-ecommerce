

  function Wishlist({
  wishlist,
  setWishlist
}) {

  const removeWishlist = (index) => {

    const updatedWishlist =
    wishlist.filter(
      (item, i) => i !== index
    );

    setWishlist(updatedWishlist);
  };

  return (

    <div className="cart-page">

      <h1>My Wishlist</h1>

      {
        wishlist.map((item, index) => (

          <div
            className="cart-item"
            key={index}
          >

            <img
              src={item.image}
              alt={item.title}
              width="100"
            />

            <div>

              <h3>{item.title}</h3>

              <p>₹ {item.price}</p>

              <button
                onClick={() =>
                  removeWishlist(index)
                }
                className="remove-btn"
              >
                Remove
              </button>

            </div>

          </div>

        ))
      }

    </div>

  );
}

export default Wishlist;