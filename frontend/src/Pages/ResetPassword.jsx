import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!password) return;

    try {
      setLoading(true);
      setMsg("");

      const res = await api.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={submit}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Updating..." : "Reset password"}
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
