import { useState, useRef, useEffect, memo } from "react";
import { Camera, MousePointer, Sparkles } from "lucide-react";

interface GuestFrame {
  id: number;
  src: string;
  alt: string;
}

const GUEST_FRAMES: GuestFrame[] = [
  { id: 1, src: "/guest-frames/frame-01.webp", alt: "SFM Travels Guest Moment 1" },
  { id: 2, src: "/guest-frames/frame-02.webp", alt: "SFM Travels Guest Moment 2" },
  { id: 3, src: "/guest-frames/frame-03.webp", alt: "SFM Travels Guest Moment 3" },
  { id: 4, src: "/guest-frames/frame-04.webp", alt: "SFM Travels Guest Moment 4" },
  { id: 5, src: "/guest-frames/frame-05.webp", alt: "SFM Travels Guest Moment 5" },
  { id: 6, src: "/guest-frames/frame-06.webp", alt: "SFM Travels Guest Moment 6" },
  { id: 7, src: "/guest-frames/frame-07.webp", alt: "SFM Travels Guest Moment 7" },
  { id: 8, src: "/guest-frames/frame-08.webp", alt: "SFM Travels Guest Moment 8" },
  { id: 9, src: "/guest-frames/frame-09.webp", alt: "SFM Travels Guest Moment 9" },
  { id: 10, src: "/guest-frames/frame-10.webp", alt: "SFM Travels Guest Moment 10" },
  { id: 11, src: "/guest-frames/frame-11.webp", alt: "SFM Travels Guest Moment 11" },
  { id: 12, src: "/guest-frames/frame-12.webp", alt: "SFM Travels Guest Moment 12" },
  { id: 13, src: "/guest-frames/frame-13.webp", alt: "SFM Travels Guest Moment 13" },
  { id: 14, src: "/guest-frames/frame-14.webp", alt: "SFM Travels Guest Moment 14" },
  { id: 15, src: "/guest-frames/frame-15.webp", alt: "SFM Travels Guest Moment 15" },
  { id: 16, src: "/guest-frames/frame-16.webp", alt: "SFM Travels Guest Moment 16" },
  { id: 17, src: "/guest-frames/frame-17.webp", alt: "SFM Travels Guest Moment 17" },
  { id: 18, src: "/guest-frames/frame-18.webp", alt: "SFM Travels Guest Moment 18" },
  { id: 19, src: "/guest-frames/frame-19.webp", alt: "SFM Travels Guest Moment 19" },
  { id: 20, src: "/guest-frames/frame-20.webp", alt: "SFM Travels Guest Moment 20" },
  { id: 21, src: "/guest-frames/frame-21.webp", alt: "SFM Travels Guest Moment 21" },
  { id: 22, src: "/guest-frames/frame-22.webp", alt: "SFM Travels Guest Moment 22" },
  { id: 23, src: "/guest-frames/frame-23.jpg", alt: "SFM Travels Guest Moment 23" },
  { id: 24, src: "/guest-frames/frame-24.webp", alt: "SFM Travels Guest Moment 24" },
  { id: 25, src: "/guest-frames/frame-25.webp", alt: "SFM Travels Guest Moment 25" },
  { id: 26, src: "/guest-frames/frame-26.webp", alt: "SFM Travels Guest Moment 26" },
  { id: 27, src: "/guest-frames/frame-27.webp", alt: "SFM Travels Guest Moment 27" },
  { id: 28, src: "/guest-frames/frame-28.webp", alt: "SFM Travels Guest Moment 28" },
  { id: 29, src: "/guest-frames/frame-29.jpg", alt: "SFM Travels Guest Moment 29" },
  { id: 30, src: "/guest-frames/frame-30.webp", alt: "SFM Travels Guest Moment 30" },
  { id: 31, src: "/guest-frames/frame-31.jpg", alt: "SFM Travels Guest Moment 31" },
  { id: 32, src: "/guest-frames/frame-32.webp", alt: "SFM Travels Guest Moment 32" },
  { id: 33, src: "/guest-frames/frame-33.webp", alt: "SFM Travels Guest Moment 33" },
  { id: 34, src: "/guest-frames/frame-34.webp", alt: "SFM Travels Guest Moment 34" },
  { id: 35, src: "/guest-frames/frame-35.webp", alt: "SFM Travels Guest Moment 35" },
  { id: 36, src: "/guest-frames/frame-36.webp", alt: "SFM Travels Guest Moment 36" },
  { id: 37, src: "/guest-frames/frame-37.webp", alt: "SFM Travels Guest Moment 37" },
  { id: 38, src: "/guest-frames/frame-38.jpeg", alt: "SFM Travels Guest Moment 38" },
  { id: 39, src: "/guest-frames/frame-39.jpeg", alt: "SFM Travels Guest Moment 39" },
  { id: 40, src: "/guest-frames/frame-40.jpeg", alt: "SFM Travels Guest Moment 40" },
  { id: 41, src: "/guest-frames/frame-41.jpeg", alt: "SFM Travels Guest Moment 41" },
  { id: 42, src: "/guest-frames/frame-42.jpeg", alt: "SFM Travels Guest Moment 42" },
  { id: 43, src: "/guest-frames/frame-43.jpeg", alt: "SFM Travels Guest Moment 43" },
  { id: 44, src: "/guest-frames/frame-44.jpeg", alt: "SFM Travels Guest Moment 44" },
  { id: 45, src: "/guest-frames/frame-45.jpeg", alt: "SFM Travels Guest Moment 45" },
  { id: 46, src: "/guest-frames/frame-46.jpeg", alt: "SFM Travels Guest Moment 46" },
  { id: 47, src: "/guest-frames/frame-47.jpeg", alt: "SFM Travels Guest Moment 47" },
  { id: 48, src: "/guest-frames/frame-48.jpeg", alt: "SFM Travels Guest Moment 48" },
  { id: 49, src: "/guest-frames/frame-49.jpeg", alt: "SFM Travels Guest Moment 49" },
  { id: 50, src: "/guest-frames/frame-50.jpeg", alt: "SFM Travels Guest Moment 50" },
  { id: 51, src: "/guest-frames/frame-51.jpeg", alt: "SFM Travels Guest Moment 51" },
  { id: 52, src: "/guest-frames/frame-52.jpeg", alt: "SFM Travels Guest Moment 52" },
  { id: 53, src: "/guest-frames/frame-53.jpeg", alt: "SFM Travels Guest Moment 53" },
  { id: 54, src: "/guest-frames/frame-54.jpeg", alt: "SFM Travels Guest Moment 54" },
  { id: 55, src: "/guest-frames/frame-55.jpeg", alt: "SFM Travels Guest Moment 55" },
  { id: 56, src: "/guest-frames/frame-56.jpeg", alt: "SFM Travels Guest Moment 56" },
  { id: 57, src: "/guest-frames/frame-57.jpeg", alt: "SFM Travels Guest Moment 57" },
  { id: 58, src: "/guest-frames/frame-58.jpeg", alt: "SFM Travels Guest Moment 58" },
  { id: 59, src: "/guest-frames/frame-59.jpeg", alt: "SFM Travels Guest Moment 59" },
  { id: 60, src: "/guest-frames/frame-60.jpeg", alt: "SFM Travels Guest Moment 60" },
  { id: 61, src: "/guest-frames/frame-61.jpeg", alt: "SFM Travels Guest Moment 61" },
];

export const JourneyInFramesSection = memo(function JourneyInFramesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [isGrabbed, setIsGrabbed] = useState(false);

  // Smooth sliding animation loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const animate = () => {
      if (containerRef.current && trackRef.current) {
        const maxScroll = Math.max(0, trackRef.current.scrollWidth - containerRef.current.clientWidth);
        targetScrollRef.current = Math.max(0, Math.min(maxScroll, targetScrollRef.current));

        const diff = targetScrollRef.current - currentScrollRef.current;
        if (Math.abs(diff) > 0.4) {
          currentScrollRef.current += diff * (isDraggingRef.current ? 0.35 : 0.08);
          containerRef.current.scrollLeft = currentScrollRef.current;
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Slide purely with cursor movement across container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x: e.clientX, y: e.clientY, visible: true });

    if (isDraggingRef.current) {
      const dx = e.clientX - startXRef.current;
      targetScrollRef.current = scrollStartRef.current - dx;
      return;
    }

    // Direct cursor position sliding
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const maxScroll = trackRef.current.scrollWidth - containerRef.current.clientWidth;
    if (maxScroll > 0) {
      targetScrollRef.current = ratio * maxScroll;
    }
  };

  const handleMouseEnter = () => {
    setCursorPos((prev) => ({ ...prev, visible: true }));
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, visible: false }));
    isDraggingRef.current = false;
    setIsGrabbed(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsGrabbed(true);
    startXRef.current = e.clientX;
    scrollStartRef.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsGrabbed(false);
  };

  // Touch Support for mobile / touch devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsGrabbed(true);
      startXRef.current = e.touches[0].clientX;
      scrollStartRef.current = containerRef.current?.scrollLeft || 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current && e.touches.length === 1 && containerRef.current && trackRef.current) {
      const dx = e.touches[0].clientX - startXRef.current;
      targetScrollRef.current = scrollStartRef.current - dx;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsGrabbed(false);
  };

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/90 border-t border-slate-200 relative overflow-hidden select-none">
      {/* Background ambient showroom floor glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-slate-200/50 via-slate-100/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8">
        {/* Exact Header matching user requirement */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-amber-500" />
            <span>Real SFM Travelers Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-wider uppercase font-sans">
            JOURNEY IN FRAMES
          </h2>
          {/* Yellow decorative accent bar */}
          <div className="w-16 h-1 bg-[#fbbf24] mx-auto rounded-full my-2.5 shadow-sm" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold tracking-wide">
            Pictures Perfect Moments
          </p>

          {/* Interactive Cursor Hint Pill */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white/90 border border-slate-200/90 px-4 py-1.5 rounded-full shadow-sm">
              <MousePointer className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Hover & move cursor to slide frames smoothly</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sliding Gallery Container with Cursor Control */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full overflow-x-hidden pt-4 pb-20 no-scrollbar select-none ${
          isGrabbed ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          ref={trackRef}
          className="flex items-start gap-6 sm:gap-8 px-6 sm:px-12 w-max"
        >
          {GUEST_FRAMES.map((frame) => (
            <div
              key={frame.id}
              className="flex flex-col items-center shrink-0 group select-none"
              style={{ width: "270px" }}
            >
              {/* Main Photo Frame Card */}
              <div
                className="w-full h-[360px] sm:h-[390px] rounded-2xl overflow-hidden bg-white p-2.5 shadow-xl shadow-slate-300/40 border border-slate-200/90 transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-amber-500/15 group-hover:border-amber-400/60 relative flex flex-col"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-100">
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                  />

                  {/* Elegant Gloss Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                    <span className="bg-slate-900/85 backdrop-blur-md text-[11px] text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>SFM Guest Moment #{frame.id}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Realistic Contact Plane Line */}
              <div className="w-[85%] h-[2px] bg-gradient-to-r from-transparent via-slate-400/40 to-transparent blur-[0.5px] mt-2 mb-1" />

              {/* Pure CSS Realistic Glass Floor Reflection */}
              <div
                className="w-full h-[120px] sm:h-[140px] rounded-2xl overflow-hidden p-2.5 pointer-events-none select-none transition-all duration-300 group-hover:scale-[1.03] group-hover:translate-y-2"
                style={{
                  transform: "scaleY(-1)",
                  opacity: 0.38,
                  filter: "blur(1.2px)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 35%, transparent 75%)",
                  maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.25) 35%, transparent 75%)",
                }}
                aria-hidden="true"
              >
                <div className="w-full h-[360px] sm:h-[390px] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={frame.src}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
