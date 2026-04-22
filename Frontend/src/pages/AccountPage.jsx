import { Link, useNavigate } from "react-router-dom";
import { useAuth, useWishlist, useCart } from "../context/store";
import { PRODUCTS } from "../data/products";
import { LogOut, Heart, ShoppingBag, User, Package, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

const MOCK_ORDERS = [
  { id: "#PK2025001", date: "18/04/2025", status: "Đã giao", total: 970000, items: 2 },
  { id: "#PK2025002", date: "12/04/2025", status: "Đang giao", total: 650000, items: 1 },
  { id: "#PK2025003", date: "03/04/2025", status: "Đã giao", total: 1240000, items: 3 },
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { ids } = useWishlist();
  const { count } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="page-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Vui lòng đăng nhập</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Bạn cần đăng nhập để xem tài khoản</p>
        <Link to="/login" className="btn-primary">Đăng nhập ngay</Link>
      </main>
    );
  }

  const wishlistProducts = PRODUCTS.filter(p => ids.includes(p.id));

  const handleLogout = () => { logout(); navigate("/"); };

  const statusColor = (s) => s === "Đã giao" ? "#22c55e" : s === "Đang giao" ? "var(--pk-pink)" : "var(--pk-gold)";

  return (
    <main className="page-content" style={{ paddingBottom: 72 }}>
      <div className="container">
        <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, padding: "36px 0 28px" }}>Tài khoản của tôi</h1>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 28, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Profile card */}
            <div className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,var(--pk-pink),var(--pk-rose))", color: "#fff", fontSize: "1.8rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 6px 20px rgba(232,88,122,0.35)" }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{user.name}</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 16 }}>{user.email}</p>
              <span className="badge badge-new">Thành viên Vàng ✨</span>
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: 20 }}>
              {[
                { Icon: Package,    label: "Đơn hàng",  value: MOCK_ORDERS.length, to: null },
                { Icon: Heart,      label: "Yêu thích", value: ids.length, to: "/wishlist" },
                { Icon: ShoppingBag,label: "Giỏ hàng",  value: count, to: "/cart" },
              ].map(({ Icon, label, value, to }) => (
                <div key={label} onClick={to ? () => navigate(to) : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", cursor: to ? "pointer" : "default" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={16} color="var(--pk-pink)" />
                    <span style={{ fontSize: "0.875rem" }}>{label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 700, color: "var(--pk-pink)" }}>{value}</span>
                    {to && <ChevronRight size={14} color="var(--text-muted)" />}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleLogout} className="btn-outline" style={{ width: "100%", justifyContent: "center", color: "#ef4444", borderColor: "#ef4444" }}>
              <LogOut size={15} /> Đăng xuất
            </button>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Orders */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <Package size={18} color="var(--pk-pink)" /> Lịch sử đơn hàng
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {MOCK_ORDERS.map(o => (
                  <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "var(--surface-2)", borderRadius: "var(--radius-md)", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>{o.id}</p>
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{o.date} · {o.items} sản phẩm</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700, color: "var(--pk-pink)", marginBottom: 4 }}>
                        {new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(o.total)}
                      </p>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: `${statusColor(o.status)}20`, color: statusColor(o.status) }}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist preview */}
            {wishlistProducts.length > 0 && (
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <h3 style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                    <Heart size={18} color="var(--pk-pink)" /> Sản phẩm yêu thích
                  </h3>
                  <Link to="/wishlist" style={{ fontSize: "0.82rem", color: "var(--pk-pink)", fontWeight: 600 }}>Xem tất cả</Link>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
                  {wishlistProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
