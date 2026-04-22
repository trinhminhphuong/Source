import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/store";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistProducts = PRODUCTS.filter(p => ids.includes(p.id));

  return (
    <main className="page-content" style={{ paddingBottom: 72 }}>
      <div className="container">
        <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, padding: "36px 0 28px" }}>
          <Heart size={26} color="var(--pk-pink)" style={{ verticalAlign: "middle", marginRight: 10 }} />
          Sản phẩm yêu thích
          <span style={{ fontFamily: "Inter,sans-serif", fontWeight: 400, fontSize: "1rem", color: "var(--text-muted)", marginLeft: 10 }}>({wishlistProducts.length})</span>
        </h1>

        {wishlistProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: 20 }}>💕</div>
            <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Chưa có sản phẩm yêu thích</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Bấm vào biểu tượng ❤️ trên sản phẩm để thêm vào đây</p>
            <Link to="/products" className="btn-primary">Khám phá sản phẩm</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 22 }}>
            {wishlistProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
