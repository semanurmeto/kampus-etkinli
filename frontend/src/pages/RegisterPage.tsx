import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3) return setError("Ad soyad en az 3 karakter olmalı.");
    if (!email.includes("@")) return setError("Geçerli bir e-posta girin.");
    if (password.length < 6) return setError("Şifre en az 6 karakter olmalı.");
    
    setError("");
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    navigate("/login");
  }

  return (
    <section>
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Ad Soyad</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">E-posta</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="hata-metni">{error}</p>}
        
        <button type="submit" style={{ marginTop: "1rem" }}>Kayıt ol</button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/login" style={{ color: "#4CAF50", textDecoration: "none" }}>Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </section>
  );
}