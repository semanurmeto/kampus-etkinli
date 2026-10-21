import { useState, useEffect } from "react";
import "./App.css";
import { events as initialEvents } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import type { PageName } from "./types/page";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventFilter from "./components/events/EventFilter";
import EventList from "./components/events/EventList";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [eventList] = useState<CampusEvent[]>(initialEvents);
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
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

  return (
    <>
      <Header title="Kampüs Etkinlikleri" text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="ana-sayfa">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-vitrini">
              <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            </div>
            <br />
            <button onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </section>
        )}
        
        {page === "events" && (
          <section className="tum-etkinlikler">
            <h2>Tüm Etkinlikler</h2>
            <EventFilter 
              searchText={searchText} 
              category={selectedCategory} 
              categories={categories} 
              onSearchChange={setSearchText} 
              onCategoryChange={setSelectedCategory} 
            />
            <p>{filteredEvents.length === 0 ? "Sonuç bulunamadı." : `${filteredEvents.length} etkinlik listeleniyor.`}</p>
            <div className="etkinlik-vitrini-uc-sutun">
              <EventList events={filteredEvents} onShowDetail={(id) => go("detail", id)} emptyText="Sonuç bulunamadı." />
            </div>
          </section>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => go("events")} 
            onEdit={(id) => go("update", id)} 
          />
        )}

        {page === "add" && (
          <section className="etkinlik-ekle">
            <h2>Yeni Etkinlik Ekle</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}

        {page === "update" && (
          <section className="etkinlik-guncelle">
            <h2>Etkinliği Güncelle</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;