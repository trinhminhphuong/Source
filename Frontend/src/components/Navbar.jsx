import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart, useAuth } from "../context/store";

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" style={{ position: 'sticky', background: '#fff', borderBottom: 'none', padding: 0 }}>
      {/* Top Announcement Bar */}
      <div style={{ background: "var(--pk-teal)", color: "#fff", fontSize: "0.8rem", fontWeight: 600, textAlign: "center", padding: "8px 20px" }}>
        FREESHIP30K - GIẢM NGAY 30K CHO ĐƠN HÀNG 199K &nbsp;&nbsp;|&nbsp;&nbsp; NHẬP MÃ T04FREESHIP25K - GIẢM NGAY 25K CHO ĐƠN HÀNG 99K
      </div>

      {/* Main Header Container */}
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 85, padding: "0 20px", gap: 30 }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ fontFamily: "Playfair Display, serif", color: "#1a1a1a", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
            Pinky<span style={{ color: "var(--pk-pink)" }}>Lab</span>
          </div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-muted)", marginTop: 4 }}>COSMETICS</div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hide-mobile" style={{
          display: "flex", alignItems: "center", flex: 1, maxWidth: 600,
          background: "var(--pk-pink-light)", borderRadius: 999, overflow: "hidden", height: 42
        }}>
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Bạn cần tìm ..."
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              padding: "0 20px", fontSize: "0.9rem", color: "var(--text)"
            }}
          />
          <button type="submit" style={{
            background: "var(--pk-pink)", color: "#fff", padding: "0 24px",
            display: "flex", alignItems: "center", justifyContent: "center",
            height: "100%", border: "none", cursor: "pointer"
          }}>
            <Search size={18} />
          </button>
        </form>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to={user ? "/account" : "/login"} style={{ color: "var(--text)", display: "flex", alignItems: "center" }}>
             <User size={24} />
          </Link>

          <Link to="/cart" style={{ color: "var(--text)", position: "relative", display: "flex", alignItems: "center" }}>
            <ShoppingBag size={24} />
            {count > 0 && <span className="cart-badge" style={{
              background: "#000", color: "#fff", top: -6, right: -8, width: 18, height: 18, fontSize: "0.7rem", border: "none"
            }}>{count}</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="hide-desktop btn-ghost" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Main Menu Bar (Pink) */}
      <div className="hide-mobile" style={{ background: "var(--pk-pink)", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: 32, padding: "12px 0" }}>
          {[
            { label: "DANH MỤC SẢN PHẨM", icon: <Menu size={16} /> },
            { label: "SẢN PHẨM MỚI" },
            { label: "❤️ DEAL HOT DƯỚI 100K ❤️" },
            { label: "PINKYLAB BEAUTY", hasDrop: true },
            { label: "GÓC LÀM ĐẸP", hasDrop: true },
            { label: "TRA CỨU ĐƠN HÀNG" },
          ].map(item => (
            <Link key={item.label} to="/products" style={{
              color: "#fff", fontWeight: 600, fontSize: "0.85rem",
              display: "flex", alignItems: "center", gap: 6, textDecoration: "none"
            }}>
              {item.icon} {item.label} {item.hasDrop && <ChevronDown size={14} />}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="hide-desktop" style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "#fff", borderTop: "1px solid var(--border)",
          padding: 20, display: "flex", flexDirection: "column", gap: 16,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)", zIndex: 100
        }}>
          <form onSubmit={handleSearch} style={{
            display: "flex", alignItems: "center", background: "var(--pk-pink-light)",
            borderRadius: 999, overflow: "hidden"
          }}>
            <input
               value={searchVal} onChange={e => setSearchVal(e.target.value)}
               placeholder="Bạn cần tìm..." style={{ flex: 1, background: "none", border: "none", outline: "none", padding: "12px 16px" }}
            />
            <button type="submit" style={{ background: "var(--pk-pink)", color: "#fff", padding: "0 20px", border: "none" }}><Search size={16}/></button>
          </form>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, color: "var(--text)", padding: "4px 0" }}>DANH MỤC SẢN PHẨM</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, color: "var(--text)", padding: "4px 0" }}>SẢN PHẨM MỚI</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, color: "var(--text)", padding: "4px 0" }}>DEAL HOT DƯỚI 100K</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ fontWeight: 600, color: "var(--text)", padding: "4px 0" }}>TRA CỨU ĐƠN HÀNG</Link>
        </div>
      )}
    </nav>
  );
}
