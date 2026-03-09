import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setMsg("");
      setLoading(true);

      const res = await api.post("/auth/forgot-password", { email });

      setMsg(res.data.message || "Reset link sent");
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={submit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
        {msg && <div style={{ marginTop: "10px", color: "blue" }}>{msg}</div>}
      </form>
      <p className="login-link">
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
