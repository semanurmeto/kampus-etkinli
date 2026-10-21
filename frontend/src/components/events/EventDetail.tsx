// frontend/src/components/events/EventDetail.tsx
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <section className="etkinlik-detay">
      <h2>{event.title}</h2>
      {event.image && <img src={event.image} alt="Afiş" style={{maxWidth: "300px", display: "block", marginBottom: "1rem"}} />}
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Saat:</strong> {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p><strong>Açıklama:</strong> {event.description}</p>
      
      <br />
      <button onClick={() => onEdit(event.id)}>Bu Etkinliği Güncelle</button>
      <button onClick={onBack} style={{marginLeft: "10px", backgroundColor: "gray"}}>Geri Dön</button>
    </section>
  );
}