export const useFirstLetterUppercase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
