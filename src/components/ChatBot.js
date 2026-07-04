import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Hi! Welcome to E-Shop.\nAsk me about Products, Delivery, Refund, Payment, Wishlist, Cart or Orders.",
    },
  ]);

  // Product Database
  const products = [
    {
      name: "Premium Men's T-Shirt",
      category: "men",
      price: 799,
      stock: 10,
      rating: 4.8,
    },
    {
      name: "Women's Casual T-Shirt",
      category: "women",
      price: 899,
      stock: 8,
      rating: 4.7,
    },
    {
      name: "Women's Oversized T-Shirt",
      category: "women",
      price: 999,
      stock: 12,
      rating: 4.9,
    },
    {
      name: "Luxury Watch",
      category: "electronics",
      price: 2999,
      stock: 5,
      rating: 4.9,
    },
    {
      name: "Premium Laptop Backpack",
      category: "bags",
      price: 1499,
      stock: 15,
      rating: 4.8,
    },
    {
      name: "Wireless Bluetooth Headphones",
      category: "electronics",
      price: 2499,
      stock: 10,
      rating: 4.9,
    },
  ];

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    // Greetings
    if (
      msg.includes("hi") ||
      msg.includes("hello") ||
      msg.includes("hey")
    ) {
      return "👋 Hello! Welcome to E-Shop. How can I help you today?";
    }

    if (msg.includes("good morning")) {
      return "🌞 Good Morning! Happy Shopping!";
    }

    if (msg.includes("good evening")) {
      return "🌆 Good Evening! Need any product suggestions?";
    }
        // Compare Products
    if (msg.includes("compare")) {
      const found = products.filter((p) =>
        msg.includes(p.name.toLowerCase().split(" ")[0])
      );

      if (found.length >= 2) {
        return `📊 Product Comparison

${found[0].name}
💰 ₹${found[0].price}
⭐ ${found[0].rating}

VS

${found[1].name}
💰 ₹${found[1].price}
⭐ ${found[1].rating}`;
      }

      return "⚠️ Try: compare watch and headphones";
    }

    // Products Under Budget
    // Budget Recommendation (Works for any amount)
// Budget Recommendation
// Budget Recommendation
const budgetMatch = msg.match(/(under|below|less than)\s*(\d+)/i);

if (budgetMatch) {
  const budget = Number(budgetMatch[2]);

  const result = products.filter((p) => p.price <= budget);

  if (result.length === 0) {
    const cheapest = products.reduce((min, p) =>
      p.price < min.price ? p : min
    );

    return `❌ No products available under ₹${budget}.

💡 Here's our cheapest product:

📦 ${cheapest.name}
💰 ₹${cheapest.price}
⭐ ${cheapest.rating}
📦 Stock: ${cheapest.stock}`;
  }

  return (
    `💰 Products Under ₹${budget}\n\n` +
    result
      .map(
        (p) =>
          `📦 ${p.name}
💰 ₹${p.price}
⭐ ${p.rating}
📦 Stock: ${p.stock}`
      )
      .join("\n\n")
  );
} // <-- THIS CLOSING BRACE WAS MISSING
    // Stock Check
    if (msg.includes("stock")) {
      const product = products.find((p) =>
        msg.includes(p.name.toLowerCase().split(" ")[0])
      );

      if (product) {
        return `📦 ${product.name}

✅ In Stock
Only ${product.stock} items left.`;
      }

      return "❌ Product not found.";
    }
        // Delivery
    if (msg.includes("delivery")) {
      return "🚚 Estimated delivery is 3-5 business days.";
    }

    // Refund
    if (msg.includes("refund")) {
      return "🔄 Refunds can be requested within 7 days after delivery.";
    }

    // Payment
    if (msg.includes("payment")) {
      return "💳 We support UPI, Credit Card, Debit Card and Cash on Delivery.";
    }

    // Wishlist
    if (msg.includes("wishlist")) {
      return "❤️ Click the heart icon to save your favourite products.";
    }

    // Cart
    if (msg.includes("cart")) {
      return "🛒 You can update quantity or remove items from your cart anytime.";
    }

    // Orders
    if (msg.includes("order")) {
      return "📦 Visit the Orders page to track your order status.";
    }

    // Contact
    if (msg.includes("contact")) {
      return "📞 Contact us at support@eshop.com";
    }

    // Thank You
    if (msg.includes("thank")) {
      return "😊 You're welcome! Happy Shopping!";
    }

    // Goodbye
    if (
      msg.includes("bye") ||
      msg.includes("goodbye")
    ) {
      return "👋 Thanks for shopping with E-Shop. Have a great day!";
    }

    // Default Reply
    return "🤖 Sorry! I didn't understand.\n\nTry asking:\n• Compare watch and headphones\n• Products under 1000\n• Men's products\n• Electronics\n• Stock of Luxury Watch\n• Delivery\n• Refund";
  };

  // Send Message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
    };

    const botMsg = {
      sender: "bot",
      text: getReply(input),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };
    return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="chat-box">

          <div className="chat-header">
            🤖 AI Shopping Assistant
          </div>

          {/* Quick Buttons */}
          <div className="quick-buttons">
            <button
              onClick={() =>
                setInput("Compare Luxury Watch and Wireless Bluetooth Headphones")
              }
            >
              ⚖ Compare
            </button>

            <button
              onClick={() =>
                setInput("Show products under 1000")
              }
            >
              💰 Under ₹1000
            </button>

            <button
              onClick={() =>
                setInput("Show electronics")
              }
            >
              ⚡ Electronics
            </button>

            <button
              onClick={() =>
                setInput("Stock of Luxury Watch")
              }
            >
              📦 Stock
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;