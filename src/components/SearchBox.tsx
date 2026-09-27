import { useState, useTransition, type ChangeEvent } from "react";
import { Search, ArrowRight } from "lucide-react";

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

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl max-w-3xl mx-auto shadow-2xl space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-slate-800 pb-3">
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
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
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="sfm_search_query"
            name="searchQuery"
            type="text"
            aria-label="Search destinations"
            placeholder="Search destinations, e.g. Kashmir, Houseboat, Taj Mahal, Goa..."
            value={localQuery}
            onChange={handleInputChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-semibold caret-amber-400"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", backgroundColor: "#020617" }}
          />
        </div>
        <button
          onClick={onGetQuote}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shrink-0 cursor-pointer"
        >
          Get Custom Quote <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
