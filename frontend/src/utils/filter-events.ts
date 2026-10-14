// frontend/src/utils/filter-events.ts

import type { CampusEvent, Category } from "../types/campus-event";

// 1. ARAMA FONKSİYONU
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
    const q = text.trim().toLocaleLowerCase("tr-TR");
    return list.filter((e) => 
        e.title.toLocaleLowerCase("tr-TR").includes(q) || 
        e.description.toLocaleLowerCase("tr-TR").includes(q)
    );
}

// 2. KATEGORİ FİLTRELEME FONKSİYONU
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
    if (category === "") return list;
    return list.filter((e) => e.category === category);
}

// 3. ID'YE GÖRE TEK ETKİNLİK BULMA FONKSİYONU
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
    return list.find((e) => e.id === id);
}