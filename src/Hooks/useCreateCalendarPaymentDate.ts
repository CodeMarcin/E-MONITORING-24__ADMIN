export const useCreateCalendarPaymentDate = (daysOfPaymant: string, dateOfIssue: string) => {
  const dateOfIssueWords = dateOfIssue.split("-").map((el) => parseInt(el));
  const newPaymantDate = new Date(dateOfIssueWords[0], dateOfIssueWords[1] - 1, dateOfIssueWords[2]);
  newPaymantDate.setDate(newPaymantDate.getDate() + parseInt(daysOfPaymant));
  return newPaymantDate;
};
