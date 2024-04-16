export function formatPrice(
  price,
  currency = "CHF",
  hasCurrencySymbol = true,
  fractionDigits = 0
) {
  const formattedPrice = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
    .format(price)
    .replace(currency, "")
    .trim();
  return hasCurrencySymbol ? `CHF ${formattedPrice}` : formattedPrice;
}
