# Kampüs Etkinlikleri - Vize Projesi

Canlı Vercel Adresi: [https://semanurmeto-frontend.vercel.app](https://semanurmeto-frontend.vercel.app) *(veya kendi Vercel linkin)*

## Proje Hakkında
Bu proje, fakültedeki seminer, atölye ve söyleşileri tek yerden takip etmeyi sağlayan, React ve TypeScript ile geliştirilmiş bir kampüs etkinlikleri yönetim platformudur.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için terminalde sırasıyla şu komutları çalıştırın:

\`\`\`bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
\`\`\`

## Route Listesi (10 Adet)
1. `/` - Ana Sayfa (Yaklaşan etkinlikler)
2. `/events` - Tüm Etkinlikler (Arama ve filtreleme)
3. `/events/:id` - Etkinlik Detay Sayfası
4. `/admin` - Yönetim Paneli
5. `/admin/new` - Yeni Etkinlik Ekleme Formu
6. `/admin/:id/edit` - Etkinlik Düzenleme Formu
7. `/login` - Giriş Yap Sayfası
8. `/register` - Kayıt Ol Sayfası
9. `/forgot-password` - Şifremi Unuttum Sayfası
10. `*` - 404 Sayfa Bulunamadı

---
*Oxlint ve Vite yapılandırma detayları aşağıdadır:*

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)