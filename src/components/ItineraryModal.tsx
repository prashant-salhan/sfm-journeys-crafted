import { memo } from "react";
import { X, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { IndiaPackage } from "@/components/Sections";

interface ItineraryModalProps {
  packageData: IndiaPackage | null;
  onClose: () => void;
  onBook: (pkg: IndiaPackage) => void;
  formatPrice: (price: number) => string;
}

export const ItineraryModal = memo(function ItineraryModal({
  packageData,
  onClose,
  onBook,
  formatPrice,
}: ItineraryModalProps) {
  if (!packageData) return null;

  const hasDetailsPage = Boolean(packageData.detailsUrl || packageData.id.includes("singapore"));
  const detailsTarget = packageData.detailsUrl || "/singapore-itinerary";

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-[99998] bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[99999] overflow-y-auto p-4 sm:p-6 flex items-center justify-center pointer-events-none">
        {/* Modal Card */}
        <div
          className="pointer-events-auto relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-left text-white select-text"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              JNTO-Style Day-by-Day Tour Itinerary
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              {packageData.title}
            </h3>
            <p className="text-slate-400 text-xs">
              {packageData.duration} | {packageData.category}
            </p>
          </div>

          <div className="space-y-4 relative border-l-2 border-amber-500/30 pl-6 ml-2">
            {packageData.itinerary.map((item) => (
              <div key={item.day} className="relative space-y-1">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900" />
                <span className="text-xs font-bold text-amber-400 block">DAY {item.day}</span>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-slate-400 text-[11px] block">Price Per Person</span>
              <span className="text-xl font-extrabold text-amber-400">
                {formatPrice(packageData.priceInr)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {hasDetailsPage && (
                <Link
                  to={detailsTarget}
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 hover:border-amber-400 font-bold px-4 py-3 rounded-xl text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>More Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}

              <button
                type="button"
                onClick={() => onBook(packageData)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Book This Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
