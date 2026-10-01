import { useState, memo, useRef, useEffect } from "react";
import { Menu, X, Zap, FileCheck, Phone, Award, MapPin, Sparkles, ChevronDown } from "lucide-react";
import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";

interface NavbarProps {
  onPlanTripClick: (title?: string) => void;
  onSelectCategory?: (category: string) => void;
}

const INTERNATIONAL_GROUPS = [
  {
    column: 1,
    groups: [
      {
        title: "Asia",
        items: [
          "Bali",
          "Singapore",
          "Thailand",
          "Phuket Krabi",
          "Malaysia",
          "Vietnam",
          "Hong Kong",
          "Japan",
          "Philippines",
        ],
      },
      {
        title: "Africa",
        items: ["Kenya", "South Africa"],
      },
    ],
  },
  {
    column: 2,
    groups: [
      {
        title: "Middle East",
        items: ["Egypt", "Abu dhabi", "Dubai", "Oman"],
      },
      {
        title: "Pacific",
        items: ["Australia", "New Zealand"],
      },
      {
        title: "Turkey",
        items: ["Turkey"],
      },
      {
        title: "North America",
        items: ["USA and Canada"],
      },
    ],
  },
  {
    column: 3,
    groups: [
      {
        title: "EUROPE",
        items: [
          "Paris",
          "Europe",
          "Switzerland",
          "Italy",
          "Greece",
          "Spain",
          "Amsterdam",
          "Finland",
          "Iceland",
          "Austria",
          "Belgium",
          "Croatia",
          "Prague",
          "Portugal",
          "Norway",
        ],
      },
    ],
  },
  {
    column: 4,
    groups: [
      {
        title: "United Kingdom",
        items: ["London"],
      },
      {
        title: "Island",
        items: ["Maldives", "Mauritius", "Sri Lanka", "Seychelles"],
      },
    ],
  },
];

export const Navbar = memo(function Navbar({ onPlanTripClick, onSelectCategory }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);
  const [mobileInternationalOpen, setMobileInternationalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLElement>,
    targetId?: string,
    category?: string,
    tripTitle?: string
  ) => {
    e.preventDefault();
    setIsInternationalOpen(false);
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory?.(category);
    }
    if (tripTitle) {
      onPlanTripClick?.(tripTitle);
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleDestinationClick = (e: React.MouseEvent<HTMLElement>, destination: string) => {
    e.preventDefault();
    setIsInternationalOpen(false);
    setMobileMenuOpen(false);
    onPlanTripClick?.(`International Package - ${destination}`);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsInternationalOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsInternationalOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsInternationalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Top Subtle Sliding Banner */}
      <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-xs font-bold py-1.5 px-4 flex justify-between items-center z-50 shadow-sm overflow-hidden">
        {/* Sliding Ticker Marquee */}
        <div className="overflow-hidden flex-1 max-w-full mr-4">
          <div className="animate-marquee-slide flex items-center gap-8 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Explore India & Worldwide • Smile For Millions
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-black">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Indian & UAE-Dubai Registered Company
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <FileCheck className="w-3.5 h-3.5 text-sky-400" /> Approved Tour Operator & E-Visa Assistance
            </span>
            <span className="text-slate-700">|</span>

            {/* Duplicate for seamless infinite loop */}
            <span className="flex items-center gap-1.5 text-amber-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Explore India & Worldwide • Smile For Millions
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-black">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Indian & UAE-Dubai Registered Company
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <FileCheck className="w-3.5 h-3.5 text-sky-400" /> Approved Tour Operator & E-Visa Assistance
            </span>
            <span className="text-slate-700">|</span>
          </div>
        </div>

        {/* Right Direct Phone & WhatsApp Links */}
        <div className="hidden md:flex items-center gap-4 text-xs shrink-0">
          <a
            href="tel:+919876543210"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1 font-extrabold"
          >
            <Phone className="w-3 h-3 text-amber-400" /> 🇮🇳 +91 98765 43210
          </a>
          <a
            href="tel:+971526973378"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-200 hover:text-amber-400 transition-colors flex items-center gap-1 font-extrabold"
          >
            <Phone className="w-3 h-3 text-amber-400" /> 🇦🇪 +971 52 697 3378
          </a>
          <a
            href="https://wa.me/919999779351?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20trip!"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="no-underline text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-black"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Modern Subtle Light Warm Orange Floating Curved Navbar */}
      <header className="sticky top-2 sm:top-3 z-50 px-2 sm:px-4 max-w-[95%] xl:max-w-[1440px] mx-auto my-1.5">
        <div className="bg-amber-50/95 backdrop-blur-xl rounded-xl sm:rounded-full px-4 sm:px-7 py-1.5 sm:py-2 shadow-xl shadow-slate-950/15 border border-amber-200/90 flex items-center justify-between transition-all relative">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e)}
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2.5 no-underline select-none"
          >
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-7 sm:h-8 w-auto object-contain filter drop-shadow" />
            <div>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-950 block leading-none drop-shadow-sm">
                SFM <span className="text-amber-600">TRAVELS</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest text-amber-700 font-black uppercase block mt-0.5 drop-shadow-sm">
                Smile For Millions
              </span>
            </div>
          </a>

          {/* High-Contrast Nav Links for Light Background */}
          <nav className="hidden lg:flex items-center gap-7 font-black text-xs sm:text-sm">
            <a
              href="#packages"
              onClick={(e) => handleNavClick(e, "packages", "domestic")}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="nav-link-item hover:scale-105 transition-all drop-shadow-sm"
            >
              Domestic Packages
            </a>

            {/* International Packages Mega Dropdown */}
            <div
              ref={dropdownRef}
              className="py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory?.("international");
                  setIsInternationalOpen(!isInternationalOpen);
                  const el = document.getElementById("packages");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ color: "#0f172a" }}
                className="nav-link-item flex items-center gap-1 hover:scale-105 transition-all drop-shadow-sm font-black text-xs sm:text-sm bg-transparent border-none cursor-pointer py-1 uppercase"
              >
                <span>International Packages</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${
                    isInternationalOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              {isInternationalOpen && (
                <div
                  className="absolute top-full left-0 right-0 mx-auto mt-2 w-[95vw] max-w-5xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-950/20 z-[100] animate-fade-in text-slate-900"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-4 gap-8 text-left">
                    {INTERNATIONAL_GROUPS.map((colData, colIdx) => (
                      <div key={colIdx} className="space-y-6">
                        {colData.groups.map((group, groupIdx) => (
                          <div key={groupIdx} className="space-y-2">
                            <h4
                              onClick={(e) => handleDestinationClick(e, group.title)}
                              className="text-sm font-extrabold text-slate-800 tracking-tight hover:text-amber-600 hover:underline cursor-pointer"
                            >
                              {group.title}
                            </h4>
                            <div className="flex flex-col space-y-1">
                              {group.items.map((item, itemIdx) => (
                                <button
                                  key={itemIdx}
                                  onClick={(e) => handleDestinationClick(e, item)}
                                  className="text-left text-xs font-semibold text-slate-600 hover:text-amber-600 transition-colors py-0.5 bg-transparent border-none cursor-pointer w-full"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#enquiry"
              onClick={(e) => handleNavClick(e, "enquiry", undefined, "Hotel & Flight Services")}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="nav-link-item hover:scale-105 transition-all drop-shadow-sm"
            >
              Hotel & Flight Services
            </a>
            <a
              href="#enquiry"
              onClick={(e) => handleNavClick(e, "enquiry", undefined, "Cruise Booking")}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="nav-link-item hover:scale-105 transition-all drop-shadow-sm"
            >
              Cruise
            </a>
            <a
              href="#why-us"
              onClick={(e) => handleNavClick(e, "why-us")}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="nav-link-item hover:scale-105 transition-all drop-shadow-sm"
            >
              About Us
            </a>
          </nav>

          {/* Compact Right Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <CurrencySelector className="scale-95" />
            <button
              onClick={() => onPlanTripClick()}
              className="font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all bg-transparent border-none px-2 py-1 nav-link-item"
              style={{ color: "#d97706" }}
            >
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Plan My Trip</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-950 hover:text-amber-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-amber-50/98 backdrop-blur-2xl border border-amber-200 mt-2 rounded-2xl p-5 shadow-2xl space-y-3.5 animate-fade-in max-h-[80vh] overflow-y-auto">
            <a
              href="#packages"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, "packages", "domestic");
              }}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="block font-extrabold text-sm nav-link-item"
            >
              Domestic Packages
            </a>

            {/* Mobile International Packages Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileInternationalOpen(!mobileInternationalOpen)}
                className="w-full flex items-center justify-between font-extrabold text-sm text-slate-900 bg-transparent border-none cursor-pointer py-1"
              >
                <span>International Packages</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-600 transition-transform ${
                    mobileInternationalOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileInternationalOpen && (
                <div className="pl-3 border-l-2 border-amber-400 space-y-4 py-2">
                  {INTERNATIONAL_GROUPS.flatMap((col) => col.groups).map((group, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h5
                        onClick={(e) => handleDestinationClick(e, group.title)}
                        className="text-xs font-black text-slate-800 uppercase cursor-pointer hover:text-amber-600 hover:underline"
                      >
                        {group.title}
                      </h5>
                      <div className="grid grid-cols-2 gap-1 pl-1">
                        {group.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={(e) => handleDestinationClick(e, item)}
                            className="text-left text-xs font-medium text-slate-700 hover:text-amber-600 py-1 bg-transparent border-none cursor-pointer"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#enquiry"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, "enquiry", undefined, "Hotel & Flight Services");
              }}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="block font-extrabold text-sm nav-link-item"
            >
              Hotel & Flight Services
            </a>
            <a
              href="#enquiry"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, "enquiry", undefined, "Cruise Booking");
              }}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="block font-extrabold text-sm nav-link-item"
            >
              Cruise
            </a>
            <a
              href="#why-us"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, "why-us");
              }}
              style={{ color: "#0f172a", textDecoration: "none" }}
              className="block font-extrabold text-sm nav-link-item"
            >
              About Us
            </a>
            <div className="pt-3 border-t border-amber-200 flex items-center justify-between">
              <CurrencySelector className="scale-90" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlanTripClick();
                }}
                className="bg-amber-500 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-full text-xs cursor-pointer shadow-sm"
              >
                Plan My Trip
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
});
