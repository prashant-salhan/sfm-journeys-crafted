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
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-semibold py-2 px-4 flex flex-wrap justify-between items-center z-50">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Explore Incredible India • Smile For Millions
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Approved India Tour Operator & E-Visa Assistance
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+919876543210"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-950 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> +91 98765 43210
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20India%20trip!"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-950 hover:opacity-90 transition-opacity flex items-center gap-1 font-bold"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-3 no-underline select-none"
          >
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 sm:h-12 w-auto object-contain" />
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white block leading-tight">
                SFM <span className="text-amber-400">INDIA</span>
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-amber-400/90 font-bold uppercase block mt-0.5">
                Smile For Millions
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-300">
            <a
              href="#packages"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-300 hover:text-amber-400 transition-colors"
            >
              India Packages
            </a>
            <a
              href="#regions"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-300 hover:text-amber-400 transition-colors"
            >
              Regions & Circuits
            </a>
            <a
              href="#essentials"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-300 hover:text-amber-400 transition-colors"
            >
              Travel Essentials
            </a>
            <a
              href="#why-us"
              style={{ textDecoration: "none" }}
              className="no-underline text-slate-300 hover:text-amber-400 transition-colors"
            >
              Why Choose Us
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <CurrencySelector />
            <button
              onClick={onPlanTripClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Plan My India Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-200 font-semibold no-underline hover:text-amber-400"
            >
              India Packages
            </a>
            <a
              href="#regions"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-200 font-semibold no-underline hover:text-amber-400"
            >
              Regions & Circuits
            </a>
            <a
              href="#essentials"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-200 font-semibold no-underline hover:text-amber-400"
            >
              Travel Essentials
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
              className="block text-slate-200 font-semibold no-underline hover:text-amber-400"
            >
              Why Choose Us
            </a>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <CurrencySelector />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlanTripClick();
                }}
                className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-full text-xs cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
});
