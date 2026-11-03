import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>
      
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/admin/new" className="buton" style={{ backgroundColor: "#4CAF50", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px", display: "inline-block" }}>
          + Yeni Etkinlik
        </Link>
      </div>
      
      <div className="yonetim-listesi">
        {events.length === 0 ? (
          <p>Henüz etkinlik eklenmemiş.</p>
        ) : (
          events.map((event) => (
            <article key={event.id} className="kart" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "4px" }}>
              <p><strong>Etkinlik:</strong> {event.title}</p>
              <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
              <p><strong>Kategori:</strong> {event.category}</p>
              
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <Link to={`/admin/${event.id}/edit`} className="buton" style={{ backgroundColor: "#4CAF50", color: "white", padding: "0.5rem 1rem", textDecoration: "none", borderRadius: "4px" }}>
                  Düzenle
                </Link>
                <button 
                  onClick={() => {
                    if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
                      deleteEvent(event.id);
                    }
                  }}
                  style={{ backgroundColor: "#f44336", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Sil
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}