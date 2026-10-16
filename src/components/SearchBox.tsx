import { useState, useTransition, type ChangeEvent } from "react";
import { Search, ArrowRight, Sparkles } from "lucide-react";

interface SearchBoxProps {
  onSearchChange: (query: string) => void;
  onGetQuote: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SearchBox({
  onSearchChange,
  onGetQuote,
  activeTab,
  onTabChange,
}: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState("");
  const [, startTransition] = useTransition();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);
    startTransition(() => {
      onSearchChange(val);
    });
  };

  const setQuickTag = (tag: string) => {
    setLocalQuery(tag);
    startTransition(() => {
      onTabChange("all");
      onSearchChange(tag);
    });
    const el = document.getElementById("packages");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-950/65 backdrop-blur-2xl border border-white/20 p-4 sm:p-6 sm:px-8 rounded-2xl sm:rounded-3xl max-w-3xl mx-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_-15px_rgba(240,92,43,0.25)] space-y-4 sm:space-y-5 transition-all relative z-30 ring-1 ring-white/10">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center border-b border-white/10 pb-3 sm:pb-4">
        {[
          { id: "all", label: "All Packages" },
          { id: "singapore", label: "Singapore" },
          { id: "bali", label: "Bali" },
          { id: "thailand", label: "Thailand" },
          { id: "vietnam", label: "Vietnam" },
          { id: "europe", label: "Europe and Swiss" },
          { id: "malaysia", label: "Malaysia" },
          { id: "international", label: "All International" },
          { id: "domestic", label: "Domestic Tours" },
          { id: "kashmir", label: "Kashmir" },
          { id: "kerala", label: "Kerala" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setLocalQuery("");
              onTabChange(tab.id);
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer font-outfit ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#F05C2B] via-[#FF7A3D] to-[#F8A51C] text-white shadow-[0_4px_16px_rgba(240,92,43,0.5)] scale-105 font-black ring-1 ring-white/40"
                : "bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white hover:scale-102 border border-white/10 backdrop-blur-md"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input & Action */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="sfm_search_query" className="sr-only">Search India & International Destinations</label>
          <Search className="absolute left-3.5 top-3.5 sm:top-4 w-4 h-4 text-amber-400 pointer-events-none transition-transform group-hover:scale-110" />
          <input
            id="sfm_search_query"
            name="searchQuery"
            type="text"
            aria-label="Search destinations"
            placeholder="Search destinations, e.g. Kashmir, Houseboat, Taj Mahal, Goa, Thailand..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 backdrop-blur-md border border-white/25 focus:border-[#F8A51C] focus:ring-4 focus:ring-[#F05C2B]/20 rounded-xl pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-3.5 text-base sm:text-sm text-white placeholder:text-slate-300 font-medium transition-all outline-none font-outfit"
          />
        </div>
        <button
          onClick={onGetQuote}
          className="bg-gradient-to-r from-[#AD2627] via-[#F05C2B] to-[#FF7A3D] hover:from-[#7A1518] hover:to-[#F05C2B] text-white font-extrabold px-6 py-3 sm:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0 cursor-pointer shadow-[0_8px_25px_-5px_rgba(240,92,43,0.5)] hover:scale-105 active:scale-95 duration-200 font-outfit"
        >
          <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          <span>Get Custom Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Tag Shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-300 font-outfit">
        <span className="font-bold text-slate-200">Popular:</span>
        {["Singapore", "Bali", "Thailand", "Vietnam", "Europe", "Malaysia", "Kashmir", "Kerala"].map((tag, idx) => (
          <button
            key={idx}
            onClick={() => setQuickTag(tag)}
            className="text-amber-300/90 hover:text-amber-200 font-semibold underline decoration-amber-400/40 underline-offset-4 hover:scale-105 transition-all cursor-pointer"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
