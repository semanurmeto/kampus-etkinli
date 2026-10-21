export function formatDate(dateString: string) {
  const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const [y, m, d] = dateString.split("-");
  return `${parseInt(d, 10)} ${aylar[parseInt(m, 10) - 1]} ${y}`;
}