import { useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";

export default function Header() {
  const location = useLocation();
  const { events } = useEvents();

  let baslik = "Kampüs Etkinlikleri";
  let altBaslik = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  // Eğer adres çubuğu "/events/bir-id" şeklindeyse etkinliği bulup başlığa yazdırıyoruz
  if (location.pathname.startsWith("/events/") && location.pathname.split("/").length === 3) {
    const id = location.pathname.split("/")[2];
    const event = events.find((e) => e.id === id);
    
    if (event) {
      baslik = event.title;
      altBaslik = "Etkinlik Detayları";
    }
  }

  return (
    <header className="site-baslik">
      <h1>{baslik}</h1>
      <p>{altBaslik}</p>
    </header>
  );
}