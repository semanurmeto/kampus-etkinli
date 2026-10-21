interface EventFormProps {
  onSubmit: () => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label>Etkinlik Adı</label>
        <input type="text" placeholder="Örn. Kariyer Günleri 2026" />
      </div>
      <div>
        <label>Kategori</label>
        <select>
          <option>Seçiniz</option>
          <option>Seminer</option>
          <option>Atölye</option>
          <option>Söyleşi</option>
          <option>Yarışma</option>
        </select>
      </div>
      <div>
        <label>Tarih</label>
        <input type="date" />
      </div>
      <div>
        <label>Saat</label>
        <input type="time" />
      </div>
      <div>
        <label>Yer</label>
        <input type="text" placeholder="Örn. A Blok Konferans Salonu" />
      </div>
      <div>
        <label>Kontenjan</label>
        <input type="number" />
      </div>
      <div>
        <label>Açıklama</label>
        <textarea rows={4}></textarea>
      </div>
      <button type="submit">Kaydet</button>
    </form>
  );
}