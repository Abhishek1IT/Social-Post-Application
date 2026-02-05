import { useState } from "react"; // hook import form data store
import api from "../api"; // baseURL set
import { useNavigate } from "react-router-dom"; // page redirect
import { Link } from "react-router-dom"; // import LINK use login page
import "../styles/signup.css";

export default function Signup() {
  const [form, setForm] = useState({ // form state
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // redirect function

  const handleChange = (e) => { // input chenge then call
    setForm({ ...form, [e.target.name]: e.target.value }); // input name value update
  };

  const submit = async (e) => {
    e.preventDefault(); // page relode stop

    try {
      console.log(form);

      const res = await api.post("/api/auth/signup", form); // signup request to backend

      localStorage.setItem("token", res.data.token); // token store to localstorage

      //Login Page
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Singup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={submit}>
        <h2>Singup</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button>Signup</button>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </form>
    </div>
  );
}
