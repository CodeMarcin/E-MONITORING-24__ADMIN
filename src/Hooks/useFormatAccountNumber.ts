export const useFromatAccountNumber = (accountNumber: string, prevLength: number) => {
  if (
    (accountNumber.length === 2 && prevLength !== 3) ||
    (accountNumber.length === 7 && prevLength !== 8) ||
    (accountNumber.length === 12 && prevLength !== 13) ||
    (accountNumber.length === 17 && prevLength !== 18) ||
    (accountNumber.length === 22 && prevLength !== 23) ||
    (accountNumber.length === 27 && prevLength !== 28) ||
    (prevLength === 2 && accountNumber.length !== 1) ||
    (prevLength === 7 && accountNumber.length !== 6) ||
    (prevLength === 12 && accountNumber.length !== 12) ||
    (prevLength === 17 && accountNumber.length !== 16) ||
    (prevLength === 22 && accountNumber.length !== 21) ||
    (prevLength === 27 && accountNumber.length !== 27)
  )
    return (accountNumber += " ");
  else if (
    (prevLength === 3 && accountNumber.length === 2) ||
    (prevLength === 8 && accountNumber.length === 7) ||
    (prevLength === 13 && accountNumber.length === 12) ||
    (prevLength === 18 && accountNumber.length === 17) ||
    (prevLength === 23 && accountNumber.length === 22) ||
    (prevLength === 28 && accountNumber.length === 27)
  )
    return accountNumber.slice(0, -1);
  else return accountNumber;
};
