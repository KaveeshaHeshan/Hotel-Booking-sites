import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form.email, form.password);
      nav("/");
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ fontWeight:800, fontSize:22 }}>Login</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:10, marginTop:12 }}>
        <label>
          <div>Email</div>
          <input value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} placeholder="demo@demo.com" />
        </label>
        <label>
          <div>Password</div>
          <input type="password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} placeholder="demo123" />
        </label>
        {err && <div style={{ color:"#dc2626" }}>{err}</div>}
        <button type="submit" style={{ padding:"8px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>
          Sign in
        </button>
      </form>
      <div style={{ marginTop:8, fontSize:14 }}>
        No account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
