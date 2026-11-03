import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventCard from "../components/events/EventCard";

export default function HomePage() {
  const { events } = useEvents();
  // Anasayfada ilk 2 yaklaşan etkinliği gösteriyoruz ve yan yana durmaları için grid içine alıyoruz
  const upcomingEvents = events.slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      
      <div className="etkinlik-grid">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/events" className="buton">
          Tüm etkinlikleri gör
        </Link>
      </div>
    </section>
  );
}