export const useCreateItemValue = (price: number, quantity = 1): string => {
  const newItemValue = (price * quantity).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).split(".");
  if (!newItemValue[1]) return `${newItemValue[0]} zł 00 gr`;
  return `${newItemValue[0]} zł ${newItemValue[1]} gr`;
};
