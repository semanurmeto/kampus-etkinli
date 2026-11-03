import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../types/campus-event";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const emptyForm: EventFormData = {
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
  };

  return (
    <>
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </>
  );
}