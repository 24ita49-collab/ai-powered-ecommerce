import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login({ setUserRole , setUser }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
  useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    /* ADMIN LOGIN */

    if(
      email === "admin@gmail.com" &&
      password === "admin123"
    ){

      setUserRole("admin");
      setUser({
  name: "Admin",
  email: "admin@gmail.com",
  role: "admin"
});

      alert("Admin Login Success");

      navigate("/products");
    }

    /* CUSTOMER LOGIN */

    else{

      setUserRole("customer");
setUser({
  name: "Customer",
  email: email,
  role: "customer"
});
      alert("Customer Login Success");

      navigate("/products");
    }
  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;