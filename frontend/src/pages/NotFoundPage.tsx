import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p style={{ marginBottom: "1rem" }}>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link 
        to="/" 
        className="buton" 
        style={{ 
          backgroundColor: "#4CAF50", 
          color: "white", 
          padding: "0.5rem 1rem", 
          textDecoration: "none", 
          borderRadius: "4px",
          display: "inline-block"
        }}
      >
        Ana sayfaya dön
      </Link>
    </section>
  );
}