import { useState, memo } from "react";
import { Menu, X, Zap, FileCheck, Phone, Award, MapPin, Sparkles } from "lucide-react";
import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";

interface NavbarProps {
  onPlanTripClick: (title?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar = memo(function Navbar({ onPlanTripClick, onSelectCategory }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Phone className="w-3 h-3 text-amber-400" /> 🇦🇪 +971 526973378
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20trip!"
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
        <div className="bg-amber-50/95 backdrop-blur-xl rounded-xl sm:rounded-full px-4 sm:px-7 py-1.5 sm:py-2 shadow-xl shadow-slate-950/15 border border-amber-200/90 flex items-center justify-between transition-all">
          {/* Logo */}
          <a
            href="#"
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
          <nav className="hidden lg:flex items-center gap-7 font-black text-xs sm:text-sm text-slate-800">
            <a
              href="#packages"
              onClick={() => onSelectCategory?.("domestic")}
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-800 hover:text-amber-600 hover:scale-105 transition-all drop-shadow-sm"
            >
              Domestic Packages
            </a>
            <a
              href="#packages"
              onClick={() => onSelectCategory?.("international")}
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-800 hover:text-amber-600 hover:scale-105 transition-all drop-shadow-sm"
            >
              International Packages
            </a>
            <a
              href="#enquiry"
              onClick={() => onPlanTripClick?.("Hotel & Flight Services")}
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-800 hover:text-amber-600 hover:scale-105 transition-all drop-shadow-sm"
            >
              Hotel & Flight Services
            </a>
            <a
              href="#enquiry"
              onClick={() => onPlanTripClick?.("Cruise Booking")}
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-800 hover:text-amber-600 hover:scale-105 transition-all drop-shadow-sm"
            >
              Cruise
            </a>
            <a
              href="#why-us"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-800 hover:text-amber-600 hover:scale-105 transition-all drop-shadow-sm"
            >
              Why Choose Us
            </a>
          </nav>

          {/* Compact Right Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <CurrencySelector className="scale-95" />
            <button
              onClick={() => onPlanTripClick()}
              className="text-amber-700 hover:text-amber-800 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all bg-transparent border-none px-2 py-1"
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
          <div className="lg:hidden bg-amber-50/98 backdrop-blur-2xl border border-amber-200 mt-2 rounded-2xl p-5 shadow-2xl space-y-3.5 animate-fade-in">
            <a
              href="#packages"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectCategory?.("domestic");
              }}
              style={{ textDecoration: "none" }}
              className="block text-slate-900 font-extrabold no-underline hover:text-amber-600 text-sm"
            >
              Domestic Packages
            </a>
            <a
              href="#packages"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectCategory?.("international");
              }}
              style={{ textDecoration: "none" }}
              className="block text-slate-900 font-extrabold no-underline hover:text-amber-600 text-sm"
            >
              International Packages
            </a>
            <a
              href="#enquiry"
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick?.("Hotel & Flight Services");
              }}
              style={{ textDecoration: "none" }}
              className="block text-slate-900 font-extrabold no-underline hover:text-amber-600 text-sm"
            >
              Hotel & Flight Services
            </a>
            <a
              href="#enquiry"
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick?.("Cruise Booking");
              }}
              style={{ textDecoration: "none" }}
              className="block text-slate-900 font-extrabold no-underline hover:text-amber-600 text-sm"
            >
              Cruise
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-900 font-extrabold no-underline hover:text-amber-600 text-sm"
            >
              Why Choose Us
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
