import React, { useState, useRef, useEffect } from "react";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/context/CurrencyContext";
import { ChevronDown, Globe } from "lucide-react";

import flagIn from "@/assets/flags/in.svg";
import flagUs from "@/assets/flags/us.svg";
import flagEu from "@/assets/flags/eu.svg";
import flagGb from "@/assets/flags/gb.svg";
import flagAe from "@/assets/flags/ae.svg";
import flagCa from "@/assets/flags/ca.svg";
import flagAu from "@/assets/flags/au.svg";

const CURRENCY_FLAGS: Record<string, string> = {
  INR: flagIn,
  USD: flagUs,
  EUR: flagEu,
  GBP: flagGb,
  AED: flagAe,
  CAD: flagCa,
  AUD: flagAu,
};

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

  const activeFlag = CURRENCY_FLAGS[currencyConfig.code] || flagIn;

  return (
    <div className={`relative inline-flex items-center text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-black text-[11px] xl:text-xs flex items-center gap-1 px-1.5 py-1 nav-link-item cursor-pointer hover:scale-105 transition-all bg-transparent border-none focus:outline-none whitespace-nowrap"
        aria-label="Select Currency"
      >
        <img
          src={activeFlag}
          alt={`${currencyConfig.code} flag`}
          className="w-4 h-3 sm:w-[16px] sm:h-[11px] object-cover rounded-[2px] shadow-xs border border-slate-300/80 shrink-0 inline-block"
        />
        <span>
          {currencyConfig.code} ({currencyConfig.symbol})
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-amber-600 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl border border-amber-200 bg-white p-1.5 shadow-2xl backdrop-blur-xl z-[99]">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 border-b border-amber-100 flex items-center justify-between">
            <span>Select Currency</span>
            <Globe size={12} />
          </div>
          <div className="mt-1 space-y-0.5">
            {Object.values(SUPPORTED_CURRENCIES).map((item) => {
              const isSelected = item.code === currency;
              const flagSrc = CURRENCY_FLAGS[item.code] || flagIn;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setCurrency(item.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/20 text-amber-800 font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={flagSrc}
                      alt={`${item.code} flag`}
                      className="w-5 h-3.5 object-cover rounded-[2px] shadow-xs border border-slate-300/80 shrink-0 inline-block"
                    />
                    <span className="font-semibold">{item.code}</span>
                    <span className="text-[11px] text-slate-500 font-normal">({item.name})</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-800">{item.symbol}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
