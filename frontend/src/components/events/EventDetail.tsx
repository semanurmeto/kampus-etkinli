import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <section>
      {event.image && (
        <div style={{ marginBottom: "1.5rem" }}>
          <img src={event.image} alt={event.title} style={{ maxWidth: "450px", width: "100%", borderRadius: "4px" }} />
        </div>
      )}
      
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Açıklama</h3>
      <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>{event.description}</p>

      <div style={{ background: "#f9f9f9", padding: "1.5rem", border: "1px solid #ddd", borderRadius: "4px", maxWidth: "400px" }}>
        <h3 style={{ fontFamily: "Georgia, serif", marginBottom: "1rem" }}>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link to="/events" className="buton" style={{ backgroundColor: "#555" }}>Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} className="buton">Bu etkinliği güncelle</Link>
      </div>
    </section>
  );
}