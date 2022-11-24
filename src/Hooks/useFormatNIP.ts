export const useFormatNIP = (NIP: string, prevLength: number) => {
if (
  (NIP.length === 3 && prevLength !== 4) ||
  (NIP.length === 7 && prevLength !== 8) ||
  (NIP.length === 10 && prevLength !== 11) ||
  (prevLength === 3 && NIP.length !== 2) ||
  (prevLength === 7 && NIP.length !== 6) ||
  (prevLength === 10 && NIP.length !== 9)
)
  return (NIP += "-");
else if ((prevLength === 4 && NIP.length === 3) || (prevLength === 8 && NIP.length === 7) || (prevLength === 11 && NIP.length === 10)) return NIP.slice(0, -1);
else return NIP;
};
