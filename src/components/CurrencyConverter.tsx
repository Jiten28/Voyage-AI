import React, { useState } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';

export const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'INR', symbol: '₹', rate: 87.15 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 154.20 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', symbol: 'C$', rate: 1.38 },
  { code: 'AED', symbol: 'د.إ', rate: 3.67 },
  { code: 'SGD', symbol: 'S$', rate: 1.34 },
];

interface CurrencyConverterProps {
  originalTotal: number;
  originalCurrency: string;
  onCurrencyChange: (currency: { code: string; symbol: string; rate: number }) => void;
}

export default function CurrencyConverter({ originalTotal, originalCurrency, onCurrencyChange }: CurrencyConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = currencies.find((c) => c.code === e.target.value) || currencies[0];
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  const originalCurrencyData = currencies.find(c => c.code === originalCurrency) || currencies[0];
  const convertedAmount = (originalTotal / originalCurrencyData.rate) * selectedCurrency.rate;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-900 dark:text-blue-400" />
        <h3 className="text-lg font-light text-blue-950 dark:text-blue-200 serif">Currency Converter</h3>
      </div>
      
      <select 
        value={selectedCurrency.code}
        onChange={handleCurrencyChange}
        className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
        ))}
      </select>
      
      <div className="text-sm text-slate-500 dark:text-slate-400">
        <p>Original Budget: {originalCurrency} {originalTotal.toLocaleString()}</p>
        <p className="font-bold text-blue-900 dark:text-blue-300">Converted Budget: {selectedCurrency.symbol} {convertedAmount.toLocaleString()} {selectedCurrency.code}</p>
        <p className="text-xs mt-2 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" /> Exchange Rate: 1 {originalCurrency} = {selectedCurrency.rate} {selectedCurrency.code}
        </p>
      </div>
    </div>
  );
}
