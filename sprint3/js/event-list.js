import { events } from "./data.js";

const listContainer = document.querySelector("#etkinlik-listesi");

// --- 1. KART ÜRETME ŞABLONU ---
function createCard(event) {
    const dateParts = event.date.split("-"); 
    const properDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const formattedDate = properDate.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });

    return `
        <article class="kart">
            <h3>${event.title}</h3>
            <p>${event.category}</p>
            <p><time datetime="${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${event.time}">Tarih: ${formattedDate}, ${event.time}</time></p>
            <p>Yer: ${event.location}</p>
            <p>Kontenjan: ${event.capacity} kişi</p>
            <p>${event.description}</p>
            <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
        </article>
    `;
}

// --- 2. EKRANA ÇİZME FONKSİYONU ---
function render(dizi) {
    listContainer.innerHTML = dizi.map(createCard).join("");
}

// --- 3. ANA SAYFA KONTROLÜ (ADIM 5) ---
if (listContainer.dataset.limit) {
    const yaklasan = [...events];
    yaklasan.sort((a, b) => {
        const dateA = new Date(a.date.split("-")[2], a.date.split("-")[1] - 1, a.date.split("-")[0]);
        const dateB = new Date(b.date.split("-")[2], b.date.split("-")[1] - 1, b.date.split("-")[0]);
        return dateA - dateB;
    });

    const limit = Number(listContainer.dataset.limit);
    const gosterilecekler = yaklasan.slice(0, limit);
    render(gosterilecekler);
} else {
    render(events);
}

// --- 4. FİLTRELEME İŞLEMLERİ (ADIM 7) ---
// Filtre formunun sadece etkinlikler.html sayfasında çalışması için kontrol ediyoruz
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
    const aramaKutusu = document.querySelector("#arama");
    const kategoriSecimi = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");

    // A) Kategorileri veriden alıp tekrar edenleri silerek (Set) açılır menüye ekleme
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
        kategoriSecimi.innerHTML += `<option value="${kat}">${kat}</option>`;
    });

    // B) Asıl filtreleme yeteneği
    function filtrele() {
        // Yazılanı ve seçileni al (Küçük harfe çevir ki büyük/küçük harf duyarlılığı olmasın)
        const arananMetin = aramaKutusu.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriSecimi.value;

        // Listeyi filtrele
        const sonuc = events.filter((e) => {
            // Başlıkta veya açıklamada aranan kelime geçiyor mu?
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(arananMetin) || 
                                e.description.toLocaleLowerCase("tr-TR").includes(arananMetin);
            
            // Kategori seçilmediyse (Tümü) veya seçilen kategori etkinliğin kategorisiyle aynıysa
            const kategoriUyuyor = (secilenKategori === "") || (e.category === secilenKategori);

            // İkisi de doğruysa bu etkinliği listede tut (&&)
            return metinUyuyor && kategoriUyuyor;
        });

        // C) Kalanları listele ve sayısını yaz
        if (sonuc.length === 0) {
            listContainer.innerHTML = "";
            sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
            sonucSatiri.style.color = "red";
        } else {
            render(sonuc);
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
            sonucSatiri.style.color = "black";
        }
    }

    // D) Kutulara yazı yazıldığında (input) veya kategori değiştiğinde (change) filtreyi tetikle
    aramaKutusu.addEventListener("input", filtrele);
    kategoriSecimi.addEventListener("change", filtrele);

    // Form içinde Enter'a basınca sayfanın yenilenmesini (preventDefault) engelle
    filtreFormu.addEventListener("submit", (e) => e.preventDefault());
}