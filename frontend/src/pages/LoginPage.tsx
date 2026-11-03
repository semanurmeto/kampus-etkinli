import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setError("Geçerli bir e-posta girin.");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }
    setError("");
    alert("Başarıyla giriş yapıldı!");
    navigate("/");
  }

  return (
    <section>
      <h2 className="bolum-baslik">Giriş Yap</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">E-posta</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            aria-invalid={error.includes("e-posta") ? true : undefined}
          />
        </div>
        <div>
          <label htmlFor="password">Şifre</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            aria-invalid={error.includes("Şifre") ? true : undefined}
          />
        </div>
        {error && <p className="hata-metni">{error}</p>}
        
        <button type="submit" style={{ marginTop: "1rem" }}>Giriş yap</button>
      </form>
      
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/forgot-password" style={{ color: "#4CAF50", textDecoration: "none" }}>Şifremi unuttum</Link>
        <Link to="/register" style={{ color: "#4CAF50", textDecoration: "none" }}>Hesabın yok mu? Kayıt ol</Link>
      </div>
    </section>
  );
}