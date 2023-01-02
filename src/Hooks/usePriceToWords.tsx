import n2words from "n2words";

export const usePriceToWords = (price: number | string) => {
  const priceToLocalString = price.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).split(".");
  if (!priceToLocalString[1]) return `${n2words(priceToLocalString[0].replaceAll(",", ""), { lang: "pl" }).toUpperCase()} ZŁ`;
  return `${n2words(priceToLocalString[0].replaceAll(",", ""), { lang: "pl" }).toUpperCase()} ZŁ ${n2words(priceToLocalString[1], { lang: "pl" }).toUpperCase()} GR`;
};
