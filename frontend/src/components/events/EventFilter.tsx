import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (cat: Category | "") => void;
}

export default function EventFilter({
  searchText, category, categories, onSearchChange, onCategoryChange
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="search">Etkinlik ara</label>
        <input 
          type="search" 
          id="search" 
          placeholder="Örn: atölye..." 
          value={searchText} 
          onChange={(e) => onSearchChange(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="category">Kategori</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
    </form>
  );
}