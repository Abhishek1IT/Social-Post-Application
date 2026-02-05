import { useState } from "react"; // hook import form data store
import api from "../api"; // baseURL set
import { useNavigate } from "react-router-dom"; // page redirect
import { Link } from "react-router-dom"; // import LINK use login page
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState(""); // email input state
  const [password, setPassword] = useState(""); // password input state
  const navigate = useNavigate(); // reditect function

  const submit = async (e) => {
    e.preventDefault(); // reloding form submit

    try {
      const res = await api.post("/api/auth/login", { // login request to backend
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // token save

      // feed page
      navigate("/feed"); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={submit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button>Login</button>
        <p>
         Please create Account <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
