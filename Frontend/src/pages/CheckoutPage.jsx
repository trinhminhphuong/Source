import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/store";
import { formatPrice } from "../data/products";
import { Check, CreditCard, Truck, Banknote } from "lucide-react";

const STEPS = ["Thông tin", "Vận chuyển", "Thanh toán", "Xác nhận"];

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("cod");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", note: "" });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const shipping = total >= 500000 ? 0 : 30000;
  const finalTotal = total + shipping;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = "Vui lòng nhập họ tên";
    if (!form.email.includes("@")) e.email = "Email không hợp lệ";
    if (form.phone.length < 9) e.phone = "Số điện thoại không hợp lệ";
    if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
    if (!form.city.trim())    e.city = "Vui lòng chọn tỉnh/thành";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validate()) return;
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const handleOrder = () => {
    clear();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <main className="page-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh" }}>
        <div className="card" style={{ textAlign: "center", padding: "56px 40px", maxWidth: 440 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,var(--pk-pink),#d44070)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 28px rgba(232,88,122,0.4)" }}>
            <Check size={32} color="#fff" />
          </div>
          <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: 12 }}>Đặt hàng thành công!</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 28 }}>
            Cảm ơn <strong>{form.name}</strong>! Đơn hàng của bạn đang được xử lý.<br />
            Chúng tôi sẽ gửi email xác nhận đến <strong>{form.email}</strong>.
          </p>
          <button onClick={() => navigate("/")} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Về trang chủ
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content" style={{ paddingBottom: 72 }}>
      <div className="container">
        <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, padding: "36px 0 32px" }}>
          Thanh toán
        </h1>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40, maxWidth: 540 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: i <= step ? "linear-gradient(135deg,var(--pk-pink),#d44070)" : "var(--border)",
                  color: i <= step ? "#fff" : "var(--text-muted)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.82rem", transition: "all 0.3s"
                }}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: i === step ? 700 : 400, color: i === step ? "var(--pk-pink)" : "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i < step ? "var(--pk-pink)" : "var(--border)", margin: "0 6px", marginBottom: 20, transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "flex-start" }}>
          {/* Form */}
          <div className="card" style={{ padding: 28 }}>
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 4 }}>Thông tin liên hệ</h3>
                <Field label="Họ và tên *" error={errors.name}>
                  <input className="input-pk" placeholder="Trịnh Minh Phương" value={form.name} onChange={e => set("name", e.target.value)} />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input className="input-pk" type="email" placeholder="any@mail.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </Field>
                <Field label="Số điện thoại *" error={errors.phone}>
                  <input className="input-pk" placeholder="0866772011" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </Field>
                <Field label="Địa chỉ giao hàng *" error={errors.address}>
                  <input className="input-pk" placeholder="Số nhà, đường, phường, quận..." value={form.address} onChange={e => set("address", e.target.value)} />
                </Field>
                <Field label="Tỉnh / Thành phố *" error={errors.city}>
                  <select className="input-pk" value={form.city} onChange={e => set("city", e.target.value)}>
                    <option value="">-- Chọn tỉnh/thành --</option>
                    {["TP. Hồ Chí Minh","Hà Nội","Đà Nẵng","Cần Thơ","Hải Phòng","Bình Dương","Đồng Nai","An Giang"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Ghi chú (không bắt buộc)">
                  <textarea className="input-pk" rows={3} placeholder="Ghi chú thêm cho đơn hàng..." value={form.note} onChange={e => set("note", e.target.value)} style={{ resize: "vertical" }} />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Phương thức vận chuyển</h3>
                {[
                  { id: "standard", label: "Giao hàng tiêu chuẩn", desc: "3-5 ngày làm việc", price: "30.000đ (miễn phí từ 500k)" },
                  { id: "express",  label: "Giao hàng nhanh",       desc: "1-2 ngày làm việc",  price: "50.000đ" },
                  { id: "same",     label: "Giao trong ngày",       desc: "Chỉ nội thành HCM",  price: "80.000đ" },
                ].map(opt => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: "var(--radius-md)", border: `2px solid ${payMethod === opt.id ? "var(--pk-pink)" : "var(--border)"}`, marginBottom: 12, cursor: "pointer", background: payMethod === opt.id ? "var(--pk-pink-light)" : "var(--surface)", transition: "all 0.2s" }}>
                    <input type="radio" name="ship" value={opt.id} checked={payMethod === opt.id} onChange={() => setPayMethod(opt.id)} style={{ accentColor: "var(--pk-pink)" }} />
                    <Truck size={18} color="var(--pk-pink)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{opt.label}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{opt.desc} · {opt.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Phương thức thanh toán</h3>
                {[
                  { id: "cod",     label: "Thanh toán khi nhận hàng (COD)", Icon: Banknote },
                  { id: "card",    label: "Thẻ tín dụng / Ghi nợ",          Icon: CreditCard },
                  { id: "momo",    label: "Ví MoMo",                         Icon: CreditCard },
                  { id: "banking", label: "Chuyển khoản ngân hàng",          Icon: Banknote },
                ].map(opt => (
                  <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: "var(--radius-md)", border: `2px solid ${payMethod === opt.id ? "var(--pk-pink)" : "var(--border)"}`, marginBottom: 12, cursor: "pointer", background: payMethod === opt.id ? "var(--pk-pink-light)" : "var(--surface)", transition: "all 0.2s" }}>
                    <input type="radio" name="pay" value={opt.id} checked={payMethod === opt.id} onChange={() => setPayMethod(opt.id)} style={{ accentColor: "var(--pk-pink)" }} />
                    <opt.Icon size={18} color="var(--pk-pink)" />
                    <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Xác nhận đơn hàng</h3>
                {[
                  ["Họ tên", form.name], ["Email", form.email], ["SĐT", form.phone],
                  ["Địa chỉ", form.address], ["Tỉnh/TP", form.city],
                  ["Thanh toán", payMethod.toUpperCase()],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 12, paddingBlock: 8, borderBottom: "1px solid var(--border)", fontSize: "0.875rem" }}>
                    <span style={{ color: "var(--text-muted)", width: 90, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-outline">Quay lại</button>
              )}
              {step < STEPS.length - 1 ? (
                <button onClick={handleNext} className="btn-primary">Tiếp theo</button>
              ) : (
                <button onClick={handleOrder} className="btn-primary">
                  <Check size={16} /> Đặt hàng
                </button>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="card" style={{ padding: 22, width: 280, position: "sticky", top: 90 }}>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem" }}>Đơn hàng ({items.length})</h4>
            <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <img src={item.image} alt={item.name} style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>x{item.qty} · {formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-muted)" }}>Tạm tính</span><span>{formatPrice(total)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-muted)" }}>Vận chuyển</span><span style={{ color: shipping === 0 ? "#22c55e" : undefined }}>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1rem", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
                <span>Tổng</span><span style={{ color: "var(--pk-pink)" }}>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
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
