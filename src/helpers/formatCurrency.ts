export function formatCurrency(num: number) {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "EGP",
  }).format(num);
}
