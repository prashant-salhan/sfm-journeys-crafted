import React, { useState, useRef, useEffect } from "react";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/context/CurrencyContext";
import { ChevronDown, DollarSign, Globe } from "lucide-react";

export const CurrencySelector: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currency, currencyConfig, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-black text-slate-800 hover:text-amber-600 transition-colors focus:outline-none bg-transparent cursor-pointer"
        aria-label="Select Currency"
      >
        <span className="text-sm leading-none">{currencyConfig.flag}</span>
        <span>{currencyConfig.code} ({currencyConfig.symbol})</span>
        <ChevronDown size={14} className={`text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-amber-200 bg-white p-1.5 shadow-2xl backdrop-blur-xl z-[99]">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 flex items-center justify-between">
            <span>Select Currency</span>
            <Globe size={12} />
          </div>
          <div className="mt-1 space-y-0.5">
            {Object.values(SUPPORTED_CURRENCIES).map((item) => {
              const isSelected = item.code === currency;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setCurrency(item.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                    isSelected
                      ? "bg-amber-500/20 text-amber-800 font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span>{item.code}</span>
                  </div>
                  <span className="font-mono text-xs opacity-75">{item.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
