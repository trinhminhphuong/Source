import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PRODUCTS, formatPrice } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("Bán chạy");
  
  const currentCat = searchParams.get("cat") || "SẢN PHẨM MỚI";

  // Simulate brand filters
  const BRANDS = ["Colorkey", "Espoir", "Glamrr Q", "MD CARE", "Paréves", "Clio", "Jumiso", "Lalarecipe", "Dr.G", "Make P:rem"];
  const CATEGORIES = ["Chăm sóc da mặt", "Chăm sóc cơ thể", "Chăm sóc tóc", "Chăm sóc răng miệng", "Trang điểm", "Phụ kiện/Dụng cụ làm đẹp", "Dược mỹ phẩm", "Thực phẩm chức năng", "BEST SELLER"];

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      {/* ── BREADCRUMB & BANNER ── */}
      <div className="container" style={{ paddingTop: 10, paddingBottom: 20 }}>
        <div style={{ fontSize: "0.8rem", color: "#666", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Trang chủ</Link>
          <ChevronRight size={12} />
          <span>Danh mục</span>
          <ChevronRight size={12} />
          <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{currentCat}</span>
        </div>
        
        <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1920&q=80" alt="Web Sale" style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 12, display: "block" }} />
      </div>

      <div className="container" style={{ display: "flex", gap: 30, paddingBottom: 60 }}>
        {/* ── SIDEBAR ── */}
        <aside className="hide-mobile" style={{ width: 250, flexShrink: 0 }}>
          {/* Section: Title */}
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, textTransform: "uppercase", marginBottom: 8, color: "#1a1a1a" }}>{currentCat}</h1>
          
          <div style={{ paddingBottom: 20, borderBottom: "1px solid #eee", marginBottom: 20 }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a", marginBottom: 12 }}>Bạn đang tìm gì ?</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CATEGORIES.map(cat => (
                <div key={cat} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", color: "#555", cursor: "pointer", fontWeight: cat === "BEST SELLER" ? 700 : 400 }}>
                  {cat}
                  <ChevronRight size={14} color="#ccc" />
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingBottom: 20, borderBottom: "1px solid #eee", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a" }}>Khoảng giá</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ width: "100%", padding: "8px", background: "#ffe4e8", border: "none", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, color: "#1a1a1a", cursor: "pointer" }}>0 - 500.000đ</button>
              <button style={{ width: "100%", padding: "8px", background: "#e0f2fe", border: "none", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, color: "#1a1a1a", cursor: "pointer" }}>500.000đ - 1.000.000đ</button>
              <button style={{ width: "100%", padding: "8px", background: "#fef08a", border: "none", borderRadius: 99, fontSize: "0.8rem", fontWeight: 600, color: "#1a1a1a", cursor: "pointer" }}>Trên 1.000.000đ</button>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1a1a", marginBottom: 12 }}>THƯƠNG HIỆU</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto" }}>
              {BRANDS.map(brand => (
                <label key={brand} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#555", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--pk-pink)", width: 14, height: 14 }} />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1 }}>
          {/* ƯU ĐÃI HOT HÔM NAY (Top section mock) */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ background: "#fff5f7", padding: "8px", textAlign: "center", borderRadius: 99, fontWeight: 700, color: "var(--pk-pink-dark)", marginBottom: 16 }}>
              ƯU ĐÃI HOT HÔM NAY
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ background: "#e0f2fe", borderRadius: 99, display: "flex", alignItems: "center", padding: "8px 24px", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>INNISFREE</div>
                  <div style={{ fontSize: "0.75rem" }}>GIÁ CHỈ TỪ 85K</div>
                  <div style={{ fontSize: "0.75rem", color: "#555" }}>Xem Ngay &raquo;</div>
                </div>
                <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=100&q=80" alt="Innisfree" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} />
              </div>
              <div style={{ background: "#e0f2fe", borderRadius: 99, display: "flex", alignItems: "center", padding: "8px 24px", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>IN TO YOU</div>
                  <div style={{ fontSize: "0.75rem" }}>GIÁ CHỈ TỪ 139K</div>
                  <div style={{ fontSize: "0.75rem", color: "#555" }}>Xem Ngay &raquo;</div>
                </div>
                <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&q=80" alt="InToYou" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} />
              </div>
              <div style={{ background: "#e0f2fe", borderRadius: 99, display: "flex", alignItems: "center", padding: "8px 24px", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>DASIQUE</div>
                  <div style={{ fontSize: "0.75rem" }}>GIÁ CHỈ TỪ 340K</div>
                  <div style={{ fontSize: "0.75rem", color: "#555" }}>Xem Ngay &raquo;</div>
                </div>
                <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100&q=80" alt="Dasique" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} />
              </div>
            </div>
          </div>

          {/* Sort bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fcfcfc", padding: "10px 16px", border: "1px solid #eee", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666" }}>Sắp xếp</span>
              {["Bán chạy", "Mới nhất", "Giá thấp đến cao", "Giá cao đến thấp"].map(s => (
                <div key={s} onClick={() => setSort(s)} style={{ fontSize: "0.85rem", fontWeight: sort === s ? 700 : 500, color: sort === s ? "var(--pk-pink-dark)" : "#555", cursor: "pointer", paddingBottom: 2, borderBottom: sort === s ? "2px solid var(--pk-pink-dark)" : "none" }}>
                  {s}
                </div>
              ))}
            </div>
            <select style={{ padding: "6px 12px", border: "1px solid #eee", borderRadius: 4, fontSize: "0.85rem", outline: "none" }}>
              <option>Hiển thị 20</option>
              <option>Hiển thị 40</option>
            </select>
          </div>

          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
            {/* Duplicating products just to show a full grid */}
            {PRODUCTS.map(p => <ProductCard key={p.id + "_copy"} product={p} />)}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
            <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "var(--pk-pink-dark)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>1</button>
            <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "#fff", color: "#666", fontWeight: 600, cursor: "pointer" }}>2</button>
            <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "#fff", color: "#666", fontWeight: 600, cursor: "pointer" }}>3</button>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontWeight: 600 }}>...</span>
            <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "#fff", color: "#666", fontWeight: 600, cursor: "pointer" }}>21</button>
            <button style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "#fff", color: "#666", fontWeight: 600, cursor: "pointer" }}>&raquo;</button>
          </div>
        </div>
      </div>
    </main>
  );
}
