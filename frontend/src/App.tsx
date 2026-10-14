// frontend/src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import { events as initialEvents } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "add" | "detail" | "update";

function formatDate(dateString: string) {
  const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [y, m, d] = dateString.split("-");
  return `${parseInt(d, 10)} ${aylar[parseInt(m, 10) - 1]} ${y}`;
}

function App() {
  const [eventList, setEventList] = useState<CampusEvent[]>(initialEvents);
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const [addForm, setAddForm] = useState({
    title: "", category: "Seminer" as Category, date: "", time: "", location: "", capacity: 0, description: ""
  });

  const [updateForm, setUpdateForm] = useState<CampusEvent | null>(null);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    
    if (next === "update" && id) {
      const ev = eventList.find(e => e.id === id);
      if (ev) setUpdateForm(ev);
    }
  }

  const upcoming = [...eventList].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filteredEvents = filterByCategory(searchEvents(eventList, searchText), selectedCategory);
  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  let sekmeBasligi = "";
  const selectedEvent = selectedId ? findEventById(eventList, selectedId) : undefined;

  if (page === "detail" && selectedEvent) {
    sekmeBasligi = `- ${selectedEvent.title}`;
  } else if (page === "events") {
    sekmeBasligi = "- Tüm Etkinlikler";
  } else if (page === "add") {
    sekmeBasligi = "- Etkinlik Ekle";
  } else if (page === "update") {
    sekmeBasligi = "- Etkinlik Güncelle";
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri ${sekmeBasligi}`.trim();
  }, [sekmeBasligi]);

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      ...addForm
    };
    setEventList([...eventList, newEvent]);
    alert("Etkinlik başarıyla eklendi!");
    setAddForm({ title: "", category: "Seminer", date: "", time: "", location: "", capacity: 0, description: "" });
    go("events");
  }

  function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!updateForm) return;
    setEventList(eventList.map(ev => ev.id === updateForm.id ? updateForm : ev));
    alert("Etkinlik başarıyla güncellendi!");
    go("detail", updateForm.id);
  }

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p>{event.category}</p>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={(e) => { e.preventDefault(); go("detail", event.id); }}>Detayları gör</a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      <nav className="menu">
        <a href="#" className={page === "home" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a>
        <a href="#" className={page === "events" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a>
        <a href="#" className={page === "add" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a>
      </nav>

      <main>
        {page === "home" && (
          <section className="ana-sayfa">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-vitrini">
              {upcoming.map(renderCard)}
            </div>
            <br />
            <button onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}
        
        {page === "events" && (
          <section className="tum-etkinlikler">
            <h2>Tüm Etkinlikler</h2>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="search">Etkinlik ara</label>
                <input type="search" id="search" placeholder="Örn: atölye..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              </div>
              <div>
                <label htmlFor="category">Kategori</label>
                <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category | "")}>
                  <option value="">Tümü</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </form>
            <p>{filteredEvents.length === 0 ? "Sonuç bulunamadı." : `${filteredEvents.length} etkinlik listeleniyor.`}</p>
            <div className="etkinlik-vitrini-uc-sutun">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {page === "detail" && selectedEvent && (
          <section className="etkinlik-detay">
            <h2>{selectedEvent.title}</h2>
            {selectedEvent.image && <img src={selectedEvent.image} alt="Afiş" style={{maxWidth: "300px", display: "block", marginBottom: "1rem"}} />}
            <p><strong>Kategori:</strong> {selectedEvent.category}</p>
            <p><strong>Tarih:</strong> {formatDate(selectedEvent.date)}</p>
            <p><strong>Saat:</strong> {selectedEvent.time}</p>
            <p><strong>Yer:</strong> {selectedEvent.location}</p>
            <p><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
            <p><strong>Açıklama:</strong> {selectedEvent.description}</p>
            
            <br />
            <button onClick={() => go("update", selectedEvent.id)}>Bu Etkinliği Güncelle</button>
            <button onClick={() => go("events")} style={{marginLeft: "10px", backgroundColor: "gray"}}>Geri Dön</button>
          </section>
        )}

        {page === "add" && (
          <section className="etkinlik-ekle">
            <h2>Yeni Etkinlik Ekle</h2>
            <form onSubmit={handleAddSubmit}>
              <div>
                <label>Başlık:</label>
                <input type="text" required value={addForm.title} onChange={e => setAddForm({...addForm, title: e.target.value})} />
              </div>
              <div>
                <label>Kategori:</label>
                <select value={addForm.category} onChange={e => setAddForm({...addForm, category: e.target.value as Category})}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label>Tarih:</label>
                <input type="date" required value={addForm.date} onChange={e => setAddForm({...addForm, date: e.target.value})} />
              </div>
              <div>
                <label>Saat:</label>
                <input type="time" required value={addForm.time} onChange={e => setAddForm({...addForm, time: e.target.value})} />
              </div>
              <div>
                <label>Yer:</label>
                <input type="text" required value={addForm.location} onChange={e => setAddForm({...addForm, location: e.target.value})} />
              </div>
              <div>
                <label>Kontenjan:</label>
                <input type="number" required min="1" value={addForm.capacity || ""} onChange={e => setAddForm({...addForm, capacity: parseInt(e.target.value)})} />
              </div>
              <div>
                <label>Açıklama:</label>
                <textarea required rows={4} value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})}></textarea>
              </div>
              <button type="submit">Etkinliği Kaydet</button>
            </form>
          </section>
        )}

        {page === "update" && updateForm && (
          <section className="etkinlik-guncelle">
            <h2>Etkinliği Güncelle</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div>
                <label>Başlık:</label>
                <input type="text" required value={updateForm.title} onChange={e => setUpdateForm({...updateForm, title: e.target.value})} />
              </div>
              <div>
                <label>Kategori:</label>
                <select value={updateForm.category} onChange={e => setUpdateForm({...updateForm, category: e.target.value as Category})}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label>Tarih:</label>
                <input type="date" required value={updateForm.date} onChange={e => setUpdateForm({...updateForm, date: e.target.value})} />
              </div>
              <div>
                <label>Saat:</label>
                <input type="time" required value={updateForm.time} onChange={e => setUpdateForm({...updateForm, time: e.target.value})} />
              </div>
              <div>
                <label>Yer:</label>
                <input type="text" required value={updateForm.location} onChange={e => setUpdateForm({...updateForm, location: e.target.value})} />
              </div>
              <div>
                <label>Kontenjan:</label>
                <input type="number" required min="1" value={updateForm.capacity || ""} onChange={e => setUpdateForm({...updateForm, capacity: parseInt(e.target.value)})} />
              </div>
              <div>
                <label>Açıklama:</label>
                <textarea required rows={4} value={updateForm.description} onChange={e => setUpdateForm({...updateForm, description: e.target.value})}></textarea>
              </div>
              <button type="submit">Değişiklikleri Kaydet</button>
              <button type="button" onClick={() => go("detail", updateForm.id)} style={{marginLeft: "10px", backgroundColor: "gray"}}>İptal</button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>Semanur Meto - 2121032052 - 2026</p>
      </footer>
    </>
  );
}

export default App;