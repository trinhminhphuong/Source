import { Link } from "react-router-dom";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="product-card" style={{ background: "#fff", border: "1px solid #eee", padding: 10, borderRadius: 8, display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", borderRadius: 4, marginBottom: 12 }}>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
          
          {/* Tags */}
          {!product.inStock && (
            <div style={{ position: "absolute", top: 8, left: 8, background: "#333", color: "#fff", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 2, fontWeight: 600 }}>
              Hết hàng
            </div>
          )}
          {product.inStock && product.badge === "sale" && (
            <div style={{ position: "absolute", top: 8, left: 8, background: "var(--pk-teal)", color: "#fff", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 2, fontWeight: 600 }}>
              SĂN SALE
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "0.65rem", color: "#666", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
            {product.brand}
          </p>
          <h3 style={{ fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.4, marginBottom: 8, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {product.name}
          </h3>

          {/* Price Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
            {product.originalPrice && (
              <span style={{ fontSize: "0.7rem", color: "#999", textDecoration: "line-through" }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--pk-red)" }}>
              {formatPrice(product.price)}
            </span>
            {discount > 0 && (
              <span style={{ background: "var(--pk-red)", color: "#fff", fontSize: "0.65rem", padding: "2px 4px", borderRadius: 2, fontWeight: 700 }}>
                -{discount}%
              </span>
            )}
          </div>

          {/* Rating & Sold */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ background: "var(--pk-red)", color: "#fff", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 99, display: "flex", alignItems: "center", gap: 2, fontWeight: 600 }}>
              {product.rating} <span style={{ fontSize: "0.6rem" }}>★</span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "#666" }}>Đã bán {product.reviews * 14}</span>
          </div>

          {/* Progress Bar */}
          <div style={{ height: 4, background: "#ffe4e8", borderRadius: 2, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${Math.min(100, product.reviews * 2)}%`, background: "var(--pk-red)", borderRadius: 2 }} />
          </div>
        </div>

      </div>
    </Link>
  );
}
