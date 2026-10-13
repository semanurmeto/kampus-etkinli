// 1. Verilerimizi içeri aktarıyoruz
import { events } from "./data.js";

// 2. HTML'deki boş kutuyu (container) ve başlığı yakalıyoruz
const detayKutusu = document.querySelector("#detay");
const sayfaBasligi = document.querySelector("#sayfa-basligi");

// 3. Adres çubuğundaki (URL) '?id=' kısmını okuyoruz
const urlParams = new URLSearchParams(window.location.search);
const gelenId = urlParams.get("id");

// 4. Gelen ID'yi 'events' listesinde arıyoruz
const event = events.find((e) => e.id === gelenId);

// 5. PDF KURALI: Etkinlik bulunamazsa veya id yanlış girildiyse HATA GÖSTER
if (!event) {
    sayfaBasligi.textContent = "Etkinlik bulunamadı";
    document.title = "Etkinlik Bulunamadı - Kampüs Etkinlikleri";
    
    // Hata durumunda ekrana kırmızı bir uyarı kutusu bas
    detayKutusu.innerHTML = `
        <div style="border: 2px solid red; padding: 1rem; border-radius: 8px; text-align: center;">
            <p style="color: red; font-weight: bold;">"${gelenId || 'boş'}" numaralı bir etkinlik yok.</p>
            <p>Listeden bir etkinlik seçin.</p>
            <br>
            <a href="etkinlikler.html" style="background-color: var(--renk-ana); color: white; padding: 8px 12px; text-decoration: none; border-radius: 4px;">← Listeye dön</a>
        </div>
    `;
} 
// 6. Etkinlik başarıyla bulunduysa sayfayı DOĞRUDAN DOLDUR
else {
    // Sayfa sekme adını ve büyük başlığı etkinliğin adıyla değiştir
    document.title = `${event.title} - Kampüs Etkinlikleri`;
    sayfaBasligi.textContent = event.title;

    // Tarihi düzgün formata çevir (Örn: 12 Ekim 2026)
    const dateParts = event.date.split("-"); 
    const properDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const formattedDate = properDate.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });

    // HTML içine orijinal 'dl/dt/dd' künye yapınla verileri bas
    detayKutusu.innerHTML = `
        <figure style="text-align: center;">
            <!-- Afiş görselini dinamik oluşturabiliriz ama senin HTML yapını koruyoruz -->
            <img src="afis.jpg" alt="${event.title} Afişi" width="250" height="100" style="background-color: #eee; display: block; margin: 0 auto;">
            <figcaption><i>${event.title} Afişi</i></figcaption>
        </figure>

        <div>
            <h3>Etkinlik Künyesi</h3>
            <dl>
                <dt><strong>Tarih</strong></dt>
                <dd><time datetime="${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${event.time}">${formattedDate}, ${event.time}</time></dd>

                <dt><strong>Yer</strong></dt>
                <dd>${event.location}</dd>
                
                <dt><strong>Kategori</strong></dt>
                <dd>${event.category}</dd>

                <dt><strong>Kontenjan</strong></dt>
                <dd>${event.capacity} Kişi</dd>
            </dl>
            
            <h3>Açıklama</h3>
            <p>${event.description}</p>
            
            <br>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <a href="etkinlikler.html">← Listeye dön</a>
                <!-- ADIM 11 (Güncelleme Sayfası) için gerekli link! -->
                <a href="etkinlik-guncelle.html?id=${event.id}" style="background-color: var(--renk-ana); color: white; padding: 8px 12px; text-decoration: none; border-radius: 4px;">Bu etkinliği güncelle</a>
            </div>
        </div>
    `;
}