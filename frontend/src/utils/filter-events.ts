import type { CampusEvent } from "../types/campus-event";

export function filterEvents(events: CampusEvent[], search: string, category: string): CampusEvent[] {
  return events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
                          event.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Tümü" || event.category === category;
    return matchesSearch && matchesCategory;
  });
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}