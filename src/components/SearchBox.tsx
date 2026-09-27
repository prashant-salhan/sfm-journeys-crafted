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
      onSearchChange(tag);
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-slate-200 p-5 sm:p-7 rounded-3xl max-w-3xl mx-auto shadow-2xl shadow-slate-200/80 space-y-5 transition-all hover:border-amber-400/60">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-slate-100 pb-4">
        {[
          { id: "all", label: "All India Tours" },
          { id: "north", label: "Kashmir & Himalayas" },
          { id: "kerala", label: "Kerala Backwaters" },
          { id: "rajasthan", label: "Royal Rajasthan" },
          { id: "goa", label: "Goa & Beaches" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-102 font-extrabold"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input & Action */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="sfm_search_query" className="sr-only">Search India Destinations</label>
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-amber-500 pointer-events-none" />
          <input
            id="sfm_search_query"
            name="searchQuery"
            type="text"
            aria-label="Search destinations"
            placeholder="Search destinations, e.g. Kashmir, Houseboat, Taj Mahal, Goa..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-semibold transition-all outline-none"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>
        <button
          onClick={onGetQuote}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shrink-0 cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-102"
        >
          <Sparkles className="w-4 h-4" /> Get Custom Quote <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Search Tag Shortcuts */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
        <span className="font-bold text-slate-600">Popular:</span>
        {["Kashmir", "Kerala Houseboat", "Rajasthan Palace", "Solang Snow", "Dubai"].map((tag, idx) => (
          <button
            key={idx}
            onClick={() => setQuickTag(tag)}
            className="hover:text-amber-600 font-medium underline decoration-slate-300 underline-offset-4 cursor-pointer"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
