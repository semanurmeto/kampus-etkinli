import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventCard from "../components/events/EventCard";
import { filterEvents } from "../utils/filter-events";

export default function EventsPage() {
  const { events } = useEvents();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tümü");

  const filteredEvents = filterEvents(events, search, category);

  return (
    <section>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>

      <div style={{ background: "white", border: "1px solid #d1c4e9", padding: "1.5rem", borderRadius: "4px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <label htmlFor="search" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Etkinlik ara</label>
            <input 
              id="search"
              type="text" 
              placeholder="Örn: atölye..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div style={{ width: "200px" }}>
            <label htmlFor="category" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Kategori</label>
            <select 
              id="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
            >
              <option value="Tümü">Tümü</option>
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>
          </div>
        </div>
      </div>

      <p style={{ marginBottom: "1.5rem", color: "#666" }}>{filteredEvents.length} etkinlik listeleniyor.</p>

      {filteredEvents.length === 0 ? (
        <p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>
      ) : (
        <div className="etkinlik-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}