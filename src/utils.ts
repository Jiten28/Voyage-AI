export const formatCurrency = (amount: number, currency: { symbol: string, code: string }) => {
  return `${currency.symbol}${amount.toLocaleString()} ${currency.code}`;
};

export const parseAmount = (amountString: string) => {
  return parseFloat(amountString.replace(/[^0-9.-]+/g, ""));
};
