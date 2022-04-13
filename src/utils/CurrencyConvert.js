export default function convertValToCurrency(val) {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(val);
}
