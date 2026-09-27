import { useState, memo } from "react";
import { Sparkles, Menu, X, Zap, FileCheck, Phone } from "lucide-react";
import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";

interface NavbarProps {
  onPlanTripClick: () => void;
}

export const Navbar = memo(function Navbar({ onPlanTripClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner Contact Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-bold py-1.5 px-4 flex flex-wrap justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Explore Incredible India • Smile For Millions
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Approved India Tour Operator & E-Visa Assistance
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <a
            href="tel:+919876543210"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-950 hover:text-slate-900 transition-colors flex items-center gap-1 font-bold"
          >
            <Phone className="w-3 h-3" /> +91 98765 43210
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20India%20trip!"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-950 hover:opacity-90 transition-opacity flex items-center gap-1 font-black"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Modern Curved Floating Pill Navbar */}
      <header className="sticky top-2 sm:top-3 z-50 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl shadow-slate-200/60 flex items-center justify-between transition-all">
          {/* Logo */}
          <a
            href="#"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2.5 no-underline select-none"
          >
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-9 sm:h-10 w-auto object-contain" />
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block leading-none">
                SFM <span className="text-amber-500">INDIA</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-600 font-extrabold uppercase block mt-0.5">
                Smile For Millions
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-bold text-xs sm:text-sm text-slate-700">
            <a
              href="#packages"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-700 hover:text-amber-600 transition-colors"
            >
              India Packages
            </a>
            <a
              href="#regions"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-700 hover:text-amber-600 transition-colors"
            >
              Regions & Circuits
            </a>
            <a
              href="#essentials"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-700 hover:text-amber-600 transition-colors"
            >
              Travel Essentials
            </a>
            <a
              href="#why-us"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-700 hover:text-amber-600 transition-colors"
            >
              Why Choose Us
            </a>
          </nav>

          {/* Compact Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <CurrencySelector className="scale-95" />
            <button
              onClick={onPlanTripClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-full text-xs shadow-md shadow-amber-500/20 hover:scale-103 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Plan My Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border border-slate-200 mt-2 rounded-2xl p-5 shadow-2xl space-y-3.5 animate-fade-in">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-800 font-bold no-underline hover:text-amber-600 text-sm"
            >
              India Packages
            </a>
            <a
              href="#regions"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-800 font-bold no-underline hover:text-amber-600 text-sm"
            >
              Regions & Circuits
            </a>
            <a
              href="#essentials"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-800 font-bold no-underline hover:text-amber-600 text-sm"
            >
              Travel Essentials
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-800 font-bold no-underline hover:text-amber-600 text-sm"
            >
              Why Choose Us
            </a>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <CurrencySelector className="scale-90" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlanTripClick();
                }}
                className="bg-amber-500 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-full text-xs cursor-pointer"
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
