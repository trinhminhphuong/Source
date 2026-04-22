import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/store";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPw: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validateLogin = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Email không hợp lệ";
    if (form.password.length < 6) e.password = "Mật khẩu phải có ít nhất 6 ký tự";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRegister = () => {
    const e = {};
    if (!form.name.trim())         e.name = "Vui lòng nhập họ tên";
    if (!form.email.includes("@")) e.email = "Email không hợp lệ";
    if (form.password.length < 6)  e.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (form.password !== form.confirmPw) e.confirmPw = "Mật khẩu không khớp";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    login({ name: form.email.split("@")[0], email: form.email });
    navigate("/account");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;
    login({ name: form.name, email: form.email });
    navigate("/account");
  };

  return (
    <main className="page-content hero-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "90vh", padding: "40px 20px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 420, padding: "40px 36px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,var(--pk-pink),var(--pk-rose))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.4rem", fontFamily: "Playfair Display,serif", margin: "0 auto 12px", boxShadow: "0 6px 20px rgba(232,88,122,0.4)" }}>P</div>
          <span style={{ fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--pk-pink)" }}>PinkyLab</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "var(--surface-2)", borderRadius: 999, padding: 4, marginBottom: 28 }}>
          {["login","register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); setForm({ name:"",email:"",password:"",confirmPw:"" }); }}
              style={{ flex: 1, padding: "9px 0", borderRadius: 999, border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", transition: "all 0.25s",
                background: tab === t ? "linear-gradient(135deg,var(--pk-pink),#d44070)" : "transparent",
                color: tab === t ? "#fff" : "var(--text-muted)"
              }}>
              {t === "login" ? "Đăng nhập" : "Đăng ký"}
            </button>
          ))}
        </div>

        {/* Login form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Email" error={errors.email}>
              <input className="input-pk" type="email" placeholder="email@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
            </Field>
            <Field label="Mật khẩu" error={errors.password}>
              <div style={{ position: "relative" }}>
                <input className="input-pk" type={showPw ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
            <div style={{ textAlign: "right" }}>
              <a href="#" style={{ fontSize: "0.8rem", color: "var(--pk-pink)", fontWeight: 500 }}>Quên mật khẩu?</a>
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
              Đăng nhập
            </button>
            <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Hoặc thử với tài khoản demo: <strong>any@email.com</strong> / <strong>123456</strong>
            </p>
          </form>
        )}

        {/* Register form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Họ và tên" error={errors.name}>
              <input className="input-pk" placeholder="Trịnh Minh Phương" value={form.name} onChange={e => set("name", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input-pk" type="email" placeholder="email@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
            </Field>
            <Field label="Mật khẩu" error={errors.password}>
              <div style={{ position: "relative" }}>
                <input className="input-pk" type={showPw ? "text" : "password"} placeholder="Ít nhất 6 ký tự" value={form.password} onChange={e => set("password", e.target.value)} style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
            <Field label="Xác nhận mật khẩu" error={errors.confirmPw}>
              <input className="input-pk" type="password" placeholder="Nhập lại mật khẩu" value={form.confirmPw} onChange={e => set("confirmPw", e.target.value)} />
            </Field>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
              Tạo tài khoản
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 20 }}>
          Bằng cách đăng nhập, bạn đồng ý với <a href="#" style={{ color: "var(--pk-pink)" }}>Điều khoản dịch vụ</a> của PinkyLab.
        </p>
      </div>
    </main>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: 4 }}>{error}</p>}
    </div>
  );
}
