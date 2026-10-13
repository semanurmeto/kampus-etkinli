import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
    // --- BÖLÜM 1: EĞER GÜNCELLEME SAYFASINDAYSAK VERİLERİ DOLDUR ---
    const urlParams = new URLSearchParams(window.location.search);
    const gelenId = urlParams.get("id");
    let guncellenenEtkinlik = null;

    if (gelenId) {
        guncellenenEtkinlik = events.find(e => e.id === gelenId);
        
        if (guncellenenEtkinlik) {
            // Etkinlik bulunduysa kutuları verilerle doldur
            document.querySelector("#etkinlikAdi").value = guncellenenEtkinlik.title;
            document.querySelector("#kategori").value = guncellenenEtkinlik.category;
            
            // Tarihi HTML input'un anlayacağı YYYY-MM-DD formatına çeviriyoruz
            const dateParts = guncellenenEtkinlik.date.split("-");
            document.querySelector("#tarih").value = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            
            document.querySelector("#saat").value = guncellenenEtkinlik.time;
            document.querySelector("#yer").value = guncellenenEtkinlik.location;
            document.querySelector("#kontenjan").value = guncellenenEtkinlik.capacity;
            document.querySelector("#aciklama").value = guncellenenEtkinlik.description;
        } else {
            // Yanlış id girildiyse formu gizle ve hata ver
            form.style.display = "none";
            mesajKutusu.style.color = "red";
            mesajKutusu.textContent = "Hata: Güncellenecek etkinlik bulunamadı!";
        }
    }

    // --- BÖLÜM 2: FORM GÖNDERİLDİĞİNDE HATA KONTROLÜ YAP ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isim = document.querySelector("#etkinlikAdi").value.trim();
        const tarih = document.querySelector("#tarih").value;
        const saat = document.querySelector("#saat").value;

        // Geçmiş tarih engeli
        const secilenTarih = new Date(tarih);
        const bugun = new Date();
        bugun.setHours(0, 0, 0, 0); 

        if (secilenTarih < bugun) {
            mesajKutusu.style.color = "red";
            mesajKutusu.textContent = "Hata: Geçmiş bir tarihe etkinlik planlayamazsınız!";
            return; 
        }

        // İsim uzunluğu engeli
        if (isim.length < 3) {
            mesajKutusu.style.color = "red";
            mesajKutusu.textContent = "Hata: Etkinlik adı en az 3 karakter olmalıdır!";
            return; 
        }

        // Başarılı olursa:
        mesajKutusu.style.color = "green";
        if (gelenId && guncellenenEtkinlik) {
            mesajKutusu.textContent = "Harika! Etkinlik başarıyla güncellendi.";
            // Güncellemede form sıfırlanmaz, yazılar ekranda kalır.
        } else {
            mesajKutusu.textContent = "Harika! Yeni etkinlik başarıyla kaydedildi.";
            form.reset(); // Ekleme sayfasında formu sıfırla.
        }
    });
}