import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, EventFormData } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: data.title,
      category: data.category as CampusEvent["category"],
      date: data.date,
      time: data.time,
      location: data.location,
      capacity: Number(data.capacity),
      description: data.description,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? {
              ...event,
              title: data.title,
              category: data.category as CampusEvent["category"],
              date: data.date,
              time: data.time,
              location: data.location,
              capacity: Number(data.capacity),
              description: data.description,
            }
          : event
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("Provider yok");
  return value;
}