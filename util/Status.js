export function getDateMinusStatus(date, status) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
