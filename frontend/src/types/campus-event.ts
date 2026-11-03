export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | "Diğer";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  image?: string;
}

export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
  image?: string;
}