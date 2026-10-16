import { useState, useEffect, useRef, memo } from "react";
import { Calendar, Sparkles, X, MessageCircle, Compass, ArrowRight, Bell } from "lucide-react";

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
        <div className="fixed bottom-20 left-4 sm:left-6 z-[9995] w-[calc(100vw-2rem)] sm:w-[400px] max-w-[420px] bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-amber-500/40 p-5 sm:p-6 shadow-2xl shadow-slate-950/80 animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col gap-4 text-white">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SFM Exclusive Highlights</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close notification"
              className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-2 rounded-full transition-all cursor-pointer border border-slate-800 hover:border-slate-700 active:scale-95"
            >
              <X className="w-4 h-4 font-bold" />
            </button>
          </div>

          {/* Central Banner: Prominent "Coming Soon" */}
          <div className="text-center py-4 px-3 rounded-2xl bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/20 space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 shadow-inner">
              <Calendar className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-slate-400 font-extrabold">
                Upcoming Events
              </h3>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 mt-1">
                Coming Soon
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xs mx-auto">
              We are curating handpicked seasonal departures, festive group tours & exclusive luxury holiday packages for 2026.
            </p>
          </div>

          {/* Sneak Peek Event Categories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              <span>What&apos;s In The Pipeline</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <Compass className="w-3 h-3" /> Stay Tuned
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-xl">🏔️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Winter Snow & Adventure Treks</p>
                  <p className="text-[11px] text-slate-400">Kashmir, Manali & Swiss Alps</p>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/30 whitespace-nowrap">
                  Winter 2026
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-xl">🌸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Cherry Blossom & Spring Escapes</p>
                  <p className="text-[11px] text-slate-400">Japan, Vietnam & Europe</p>
                </div>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 font-bold px-2 py-0.5 rounded-md border border-pink-500/30 whitespace-nowrap">
                  Spring 2026
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-xl">🚢</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Luxury Cruise & Island Departures</p>
                  <p className="text-[11px] text-slate-400">Singapore, Bali & Thailand</p>
                </div>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-md border border-cyan-500/30 whitespace-nowrap">
                  All Year
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA: WhatsApp Early Bird */}
          <div className="pt-1">
            <a
              href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20am%20interested%20in%20Upcoming%20Events%20and%20group%20departures!%20Please%20notify%20me."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Get Early Bird Alerts on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill on the Left Side at the Bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Upcoming Events notification"
        className={`fixed bottom-6 left-4 sm:left-6 z-[9990] flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/30"
            : "bg-slate-950/95 hover:bg-slate-900 text-white border-amber-500/50 shadow-slate-950/70 hover:border-amber-400 hover:shadow-amber-500/25"
        }`}
      >
        {/* Pulsing Beacon / Notification Indicator */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? "bg-slate-950" : "bg-amber-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              isOpen ? "bg-slate-950" : "bg-amber-500"
            }`}
          />
        </span>

        {/* Icon */}
        <div
          className={`p-1 rounded-full ${
            isOpen ? "bg-slate-950/20 text-slate-950" : "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
          }`}
        >
          {isOpen ? (
            <X className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <Calendar className="w-4 h-4 stroke-[2.5]" />
          )}
        </div>

        {/* Text Label */}
        <span
          className={`text-xs sm:text-sm font-black tracking-tight whitespace-nowrap ${
            isOpen ? "text-slate-950" : "text-white"
          }`}
        >
          Upcoming Events
        </span>

        {/* Badge */}
        <span
          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shrink-0 ${
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
