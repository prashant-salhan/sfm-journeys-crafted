import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export interface CountryOption {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  formatHint?: string;
}

export const COUNTRIES: CountryOption[] = [
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳", formatHint: "10 digits" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪", formatHint: "9 digits" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸", formatHint: "10 digits" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧", formatHint: "10 digits" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", formatHint: "10 digits" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺", formatHint: "9 digits" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬", formatHint: "8 digits" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾", formatHint: "9-10 digits" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭", formatHint: "9 digits" },
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩", formatHint: "9-11 digits" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳", formatHint: "9-10 digits" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦", formatHint: "9 digits" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦", formatHint: "8 digits" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼", formatHint: "8 digits" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭", formatHint: "8 digits" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲", formatHint: "8 digits" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", formatHint: "10-11 digits" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷", formatHint: "9 digits" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹", formatHint: "10 digits" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭", formatHint: "9 digits" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿", formatHint: "9-10 digits" },
  { name: "Nepal", code: "NP", dialCode: "+977", flag: "🇳🇵", formatHint: "10 digits" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", flag: "🇱🇰", formatHint: "9 digits" },
  { name: "Maldives", code: "MV", dialCode: "+960", flag: "🇲🇻", formatHint: "7 digits" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩", formatHint: "10 digits" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦", formatHint: "9 digits" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵", formatHint: "10 digits" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭", formatHint: "10 digits" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸", formatHint: "9 digits" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱", formatHint: "9 digits" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪", formatHint: "9 digits" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪", formatHint: "9 digits" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴", formatHint: "8 digits" },
  { name: "Denmark", code: "DK", dialCode: "+45", flag: "🇩🇰", formatHint: "8 digits" },
  { name: "Finland", code: "FI", dialCode: "+358", flag: "🇫🇮", formatHint: "9-10 digits" },
  { name: "Belgium", code: "BE", dialCode: "+32", flag: "🇧🇪", formatHint: "9 digits" },
  { name: "Austria", code: "AT", dialCode: "+43", flag: "🇦🇹", formatHint: "10-11 digits" },
  { name: "Greece", code: "GR", dialCode: "+30", flag: "🇬🇷", formatHint: "10 digits" },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷", formatHint: "10 digits" },
  { name: "Mauritius", code: "MU", dialCode: "+230", flag: "🇲🇺", formatHint: "8 digits" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪", formatHint: "9 digits" },
  { name: "Hong Kong", code: "HK", dialCode: "+852", flag: "🇭🇰", formatHint: "8 digits" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳", formatHint: "11 digits" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺", formatHint: "10 digits" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷", formatHint: "11 digits" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽", formatHint: "10 digits" },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // India +91

interface CountryCodeSelectorProps {
  selectedCountry: CountryOption;
  onSelectCountry: (country: CountryOption) => void;
  disabled?: boolean;
  className?: string;
}

export function CountryCodeSelector({
  selectedCountry,
  onSelectCountry,
  disabled = false,
  className = "",
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country code"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-3 py-3 bg-slate-50 hover:bg-slate-100/90 active:bg-slate-200 border-r border-slate-200 text-xs font-black text-slate-800 transition-colors select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 h-full border-t-0 border-b-0 border-l-0"
      >
        <span className="text-base leading-none select-none" role="img" aria-label={selectedCountry.name}>
          {selectedCountry.flag}
        </span>
        <span className="font-mono text-xs font-bold text-slate-900 tracking-tight">
          {selectedCountry.dialCode}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-amber-600" : ""
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden font-outfit animate-scale-in">
          {/* Header & Search */}
          <div className="p-2.5 bg-slate-50/80 border-b border-slate-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code (e.g. UAE, +971)"
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* List of Countries */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 py-1" role="listbox">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 font-medium">
                No matching country found
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.code === selectedCountry.code;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => {
                      onSelectCountry(c);
                      setIsOpen(false);
                    }}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer border-none ${
                      isSelected
                        ? "bg-amber-50/80 text-amber-950 font-bold"
                        : "bg-white hover:bg-slate-50 text-slate-700 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg leading-none shrink-0">{c.flag}</span>
                      <div className="truncate">
                        <span className="text-xs block text-slate-900 truncate">
                          {c.name}
                        </span>
                        {c.formatHint && (
                          <span className="text-[10px] text-slate-400 block font-normal leading-tight">
                            {c.formatHint}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                        {c.dialCode}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            SFM Travels official global dialing codes
          </div>
        </div>
      )}
    </div>
  );
}
