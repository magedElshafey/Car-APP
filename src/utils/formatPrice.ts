export function formatPrice(value: number, lang: string = "ar") {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "ar-EG").format(value);
}
