export function formatDate(dateString) {
  if (!dateString) return "—";

  const date = dateString.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${month}/${day}/${year}`;
}
