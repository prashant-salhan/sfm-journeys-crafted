import { useState, useEffect, useRef, memo } from "react";
import { Calendar, Sparkles, X, MessageCircle, Compass, ArrowRight } from "lucide-react";

export const FloatingEventsWidget = memo(function FloatingEventsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="select-none">
      {/* Background Dim Backdrop on Mobile when Popover is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9990] transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Modal / Popover Card */}
      {isOpen && (
        <div className="fixed bottom-[4.75rem] sm:bottom-20 left-3 right-3 sm:left-6 sm:right-auto sm:w-[400px] max-w-[420px] mx-auto sm:mx-0 z-[9995] max-h-[calc(100dvh-5.5rem)] sm:max-h-[85vh] overflow-y-auto overscroll-contain bg-slate-950/98 backdrop-blur-2xl rounded-3xl border border-amber-500/40 p-4 sm:p-6 shadow-2xl shadow-slate-950/90 animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col gap-3.5 sm:gap-4 text-white">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-800/80 shrink-0">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span>SFM Exclusive Highlights</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close notification"
              className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-1.5 sm:p-2 rounded-full transition-all cursor-pointer border border-slate-800 hover:border-slate-700 active:scale-95 shrink-0"
            >
              <X className="w-4 h-4 font-bold" />
            </button>
          </div>

          {/* Central Banner: Prominent "Coming Soon" */}
          <div className="text-center py-3.5 sm:py-4 px-3 rounded-2xl bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/20 space-y-1.5 sm:space-y-2 shrink-0">
            <div className="inline-flex p-2.5 sm:p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shadow-inner">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-extrabold">
                Upcoming Events
              </h3>
              <div className="text-2xl sm:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 mt-0.5 sm:mt-1">
                Coming Soon
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto">
              We are curating handpicked seasonal departures, festive group tours & exclusive luxury holiday packages for 2026.
            </p>
          </div>

          {/* Sneak Peek Event Categories */}
          <div className="space-y-2 shrink-0">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              <span>What&apos;s In The Pipeline</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <Compass className="w-3 h-3" /> Stay Tuned
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-lg sm:text-xl shrink-0">🏔️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Winter Snow & Adventure Treks</p>
                  <p className="text-[11px] text-slate-400 truncate">Kashmir, Manali & Swiss Alps</p>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/30 whitespace-nowrap shrink-0">
                  Winter 2026
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-lg sm:text-xl shrink-0">🌸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Cherry Blossom & Spring Escapes</p>
                  <p className="text-[11px] text-slate-400 truncate">Japan, Vietnam & Europe</p>
                </div>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-2 py-0.5 rounded-md border border-pink-500/30 whitespace-nowrap shrink-0">
                  Spring 2026
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-lg sm:text-xl shrink-0">🚢</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Luxury Cruise & Island Departures</p>
                  <p className="text-[11px] text-slate-400 truncate">Singapore, Bali & Thailand</p>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-md border border-cyan-500/30 whitespace-nowrap shrink-0">
                  All Year
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA: WhatsApp Early Bird */}
          <div className="pt-0.5 shrink-0">
            <a
              href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20am%20interested%20in%20Upcoming%20Events%20and%20group%20departures!%20Please%20notify%20me."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 shrink-0" />
              <span className="truncate">Get Early Bird Alerts on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill on the Left Side at the Bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Upcoming Events notification"
        className={`fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[9990] h-12 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95 leading-none ${
          isOpen
            ? "bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/30"
            : "bg-slate-950/95 hover:bg-slate-900 text-white border-amber-500/50 shadow-slate-950/70 hover:border-amber-400 hover:shadow-amber-500/25"
        }`}
      >
        {/* Pulsing Beacon / Notification Indicator */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 items-center justify-center">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? "bg-slate-950" : "bg-amber-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 ${
              isOpen ? "bg-slate-950" : "bg-amber-500"
            }`}
          />
        </span>

        {/* Icon */}
        <div
          className={`p-1 sm:p-1.5 rounded-full shrink-0 flex items-center justify-center ${
            isOpen ? "bg-slate-950/20 text-slate-950" : "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
          }`}
        >
          {isOpen ? (
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          ) : (
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          )}
        </div>

        {/* Text Label */}
        <span
          className={`text-xs sm:text-sm font-black tracking-tight whitespace-nowrap leading-none ${
            isOpen ? "text-slate-950" : "text-white"
          }`}
        >
          Upcoming Events
        </span>

        {/* Badge */}
        <span
          className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-full tracking-wider shrink-0 leading-none ${
            isOpen
              ? "bg-slate-950 text-amber-400"
              : "bg-amber-500 text-slate-950 animate-pulse"
          }`}
        >
          Coming Soon
        </span>
      </button>
    </div>
  );
});
