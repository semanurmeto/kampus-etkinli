import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <a href="#" className={current === "home" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>Ana Sayfa</a>
      <a href="#" className={current === "events" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); onNavigate("events"); }}>Etkinlikler</a>
      <a href="#" className={current === "add" ? "aktif" : ""} onClick={(e) => { e.preventDefault(); onNavigate("add"); }}>Ekle</a>
    </nav>
  );
}