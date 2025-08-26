import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    if (!form.name || !form.email || !form.password) {
      setErr("All fields required");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      setOk("Account created. You can login now.");
      setTimeout(()=>nav("/login"), 600);
    } catch (e) {
      setErr(e.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ fontWeight:800, fontSize:22 }}>Register</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:10, marginTop:12 }}>
        <label>
          <div>Name</div>
          <input value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          <div>Email</div>
          <input value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          <div>Password</div>
          <input type="password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} />
        </label>
        {err && <div style={{ color:"#dc2626" }}>{err}</div>}
        {ok && <div style={{ color:"#16a34a" }}>{ok}</div>}
        <button type="submit" style={{ padding:"8px 12px", border:"1px solid #e5e7eb", borderRadius:8, background:"#111", color:"#fff" }}>
          Create account
        </button>
      </form>
      <div style={{ marginTop:8, fontSize:14 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
