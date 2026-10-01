import { useState, memo } from "react";
import { Linkedin, Instagram, Facebook, MessageCircle, Share2, Sparkles } from "lucide-react";

export const CircularSocialMenu = memo(function CircularSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const socialLinks = [
    {
      id: "linkedin",
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/sfmtravels/",
      icon: Linkedin,
      bg: "bg-[#0A66C2] hover:bg-[#084e96] border-blue-400/40",
      shadow: "shadow-blue-500/50",
      angle: 0, // 12 o'clock
    },
    {
      id: "instagram",
      name: "Instagram",
      href: "https://www.instagram.com/official_sfm_travel?stkn=b25sZnBucTJndnZi",
      icon: Instagram,
      bg: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 border-pink-400/40",
      shadow: "shadow-pink-500/50",
      angle: 90, // 3 o'clock
    },
    {
      id: "facebook",
      name: "Facebook",
      href: "https://www.facebook.com/share/1DyCGDjNKN/",
      icon: Facebook,
      bg: "bg-[#1877F2] hover:bg-[#0c63d4] border-blue-400/40",
      shadow: "shadow-blue-600/50",
      angle: 180, // 6 o'clock
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      href: "https://wa.me/919999779351?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20trip!",
      icon: MessageCircle,
      bg: "bg-emerald-500 hover:bg-emerald-600 border-emerald-300/40",
      shadow: "shadow-emerald-500/50",
      angle: 270, // 9 o'clock
    },
  ];

  const radius = 90; // distance from center in px

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] pointer-events-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setIsPaused(false);
      }}
    >
      {/* Large Invisible Hit Area Ring to prevent premature onMouseLeave */}
      {isOpen && (
        <div
          className="absolute -inset-28 rounded-full pointer-events-auto z-10"
          onMouseEnter={() => setIsOpen(true)}
        />
      )}

      {/* Outer Revolving Orbit Ring */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20 ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
        }`}
      >
        {/* Revolving container wrapper */}
        <div
          className={`relative w-0 h-0 ${isOpen ? "animate-spin-orbit" : ""}`}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {socialLinks.map((item) => {
            const IconComponent = item.icon;
            const rad = (item.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={item.id}
                className="absolute flex items-center justify-center pointer-events-auto z-30"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  width: "56px",
                  height: "56px",
                  marginLeft: "-28px",
                  marginTop: "-28px",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Counter-rotating anchor so icon stays upright */}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  style={{
                    textDecoration: "none",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                  className={`no-underline ${item.bg} text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-130 cursor-pointer border ${item.shadow} ${
                    isOpen ? "animate-counter-spin-orbit" : ""
                  }`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Single Central Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Connect with Social Media"
        className={`relative z-40 p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer border float-3d group ${
          isOpen
            ? "bg-amber-500 text-slate-950 border-amber-300 scale-110 shadow-amber-500/50"
            : "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-300/40 shadow-emerald-500/40 hover:scale-110"
        }`}
      >
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <Share2 className="w-6 h-6 sm:w-7 sm:h-7 transition-transform rotate-45" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
            </>
          )}
        </span>

        {/* Hover Badge / Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-slate-950/90 backdrop-blur-md text-amber-300 text-xs font-black px-3.5 py-1.5 rounded-full border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {isOpen ? (isPaused ? "Click to Visit Social Page" : "Revolving Social Media Links") : "Connect & WhatsApp Us"}
        </span>
      </button>
    </div>
  );
});
