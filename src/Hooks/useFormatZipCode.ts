export const useFormatZipCode = (zipCode: string, prevLength: number) => {
  if ((zipCode.length === 2 && prevLength !== 3) || (prevLength === 2 && zipCode.length !== 3)) return (zipCode += "-");
  else if (prevLength === 3 && zipCode.length === 2) return zipCode.slice(0, -1);
  else return zipCode;
};
