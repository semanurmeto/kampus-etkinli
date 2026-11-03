import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Lütfen kayıtlı e-posta adresinizi girin.");
      return;
    }
    setError("");
    alert("Şifre sıfırlama bağlantısı e-postanıza gönderildi.");
    navigate("/login");
  }

  return (
    <section>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {error && <p className="hata-metni">{error}</p>}
        
        <button type="submit" style={{ marginTop: "1rem" }}>Bağlantı Gönder</button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/login" style={{ color: "#4CAF50", textDecoration: "none" }}>Giriş sayfasına dön</Link>
      </div>
    </section>
  );
}