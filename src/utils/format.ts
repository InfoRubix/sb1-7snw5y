export const formatCurrency = (amount: number): string => {
  return `RM ${amount.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};