import React, { createContext, useContext, useEffect, useState } from "react";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // exchange rate relative to 1 INR
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", rate: 1.0 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", rate: 0.012 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺", rate: 0.011 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", rate: 0.0093 },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", flag: "🇦🇪", rate: 0.0441 },
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦", rate: 0.0163 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺", rate: 0.0181 },
};

interface CurrencyContextType {
  currency: string;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: string) => void;
  rates: Record<string, number>;
  convertPrice: (amountInINR: number) => number;
  formatPrice: (amountInINR: number) => string;
  isRatesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = "sfm_travels_currency";

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_CURRENCIES[saved]) {
        return saved;
      }
    }
    return "INR";
  });

  const [rates, setRates] = useState<Record<string, number>>(() => {
    const initialRates: Record<string, number> = {};
    Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
      initialRates[code] = SUPPORTED_CURRENCIES[code].rate;
    });
    return initialRates;
  });

  const [isRatesLoading, setIsRatesLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/INR");
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && isMounted) {
            const newRates: Record<string, number> = { INR: 1.0 };
            Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
              if (data.rates[code]) {
                newRates[code] = data.rates[code];
              } else {
                newRates[code] = SUPPORTED_CURRENCIES[code].rate;
              }
            });
            setRates(newRates);
          }
        }
      } catch (err) {
        console.warn("[Currency Rates Note]: Using fallback exchange rates", err);
      } finally {
        if (isMounted) setIsRatesLoading(false);
      }
    };

    fetchLiveRates();

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = (code: string) => {
    if (SUPPORTED_CURRENCIES[code]) {
      setCurrencyState(code);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, code);
      }
    }
  };

  const currencyConfig = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.INR;
  const currentRate = rates[currency] || currencyConfig.rate;

  const convertPrice = (amountInINR: number): number => {
    if (currency === "INR") return amountInINR;
    return Math.round(amountInINR * currentRate * 100) / 100;
  };

  const formatPrice = (amountInINR: number): string => {
    const converted = convertPrice(amountInINR);
    const symbol = currencyConfig.symbol;

    if (currency === "INR") {
      return `${symbol}${Math.round(converted).toLocaleString("en-IN")}`;
    }

    return `${symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyConfig,
        setCurrency,
        rates,
        convertPrice,
        formatPrice,
        isRatesLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
