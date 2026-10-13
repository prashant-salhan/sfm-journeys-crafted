import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Hotel,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Phone,
  MessageCircle,
  ExternalLink,
  HelpCircle,
  Award,
  Sun,
  Moon,
  Info,
  Compass,
  Utensils,
  Waves,
  Car,
  Ticket,
  Camera,
  Layers,
  Building,
  Ship,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Singapore Package Images
import hero1Pic from "@/assets/singapore/hero-1.jpg";
import hero2Pic from "@/assets/singapore/hero-2.jpg";
import nightSafariPic from "@/assets/singapore/night-safari.jpg";
import singaporeCityPic from "@/assets/singapore/singapore-city.jpeg";
import sentosaPic from "@/assets/singapore/sentosa.jpeg";
import universalPic from "@/assets/singapore/universal-studios.jpg";
import gardensByTheBayPic from "@/assets/singapore/gardens-by-the-bay.webp";
import skyParkPic from "@/assets/singapore/skypark.jpg";
import goodbyeSingaporePic from "@/assets/singapore/goodbye-singapore.jpeg";

export const Route = createFileRoute("/singapore-itinerary")({
  head: () => ({
    meta: [
      { title: "Singapore + Cruise Package (4 Nights / 5 Days) | SFM Travels" },
      {
        name: "description",
        content:
          "4 Nights / 5 Days Singapore + Cruise Package with 4-Star Property, Flights, Visa, Night Safari, Sentosa Island, Universal Studios, Gardens by the Bay & MBS Observation Deck with SFM Travels.",
      },
      {
        property: "og:title",
        content: "Singapore + Cruise Package (4 Nights / 5 Days) | SFM Travels",
      },
      {
        property: "og:description",
        content:
          "Singapore + Cruise Package (4 Nights / 5 Days) in 4-Star Property at INR 95,000 per person with flights, visa, Night Safari, Sentosa, and Universal Studios.",
      },
    ],
  }),
  component: SingaporeItineraryPage,
});

const INCLUSIONS = [
  "Return Economy-Class Flight Tickets",
  "04 Nights accommodation in 4-Star Property in Singapore with Daily Breakfast",
  "Cruise Component Included (Exact cruise sailing & cabin category confirmed during costing)",
  "Singapore Visa Assistance / Visa Included",
  "Meet and Greet at Singapore Changi Airport and Hotel Transfer",
  "Evening visit to Night Safari with Unlimited Tram Ride & Animal Show on SIC basis",
  "Full-Day Sentosa Island Experience (One-way Cable Car, Madame Tussauds, Images of Singapore, Ultimate Film Star Experience & Wings of Time) on SIC basis",
  "Full-Day visit to Universal Studios Singapore with Admission Ticket Included",
  "Half-Day Singapore City Tour exploring key landmarks and Merlion Park",
  "Gardens by the Bay Entry (Cloud Forest, Flower Dome & Jurassic Park)",
  "Marina Bay Sands Observation Deck Admission Ticket",
  "Hotel Check-out and Departure Transfer to Singapore Changi Airport",
  "All listed sightseeing and required transfers on SIC / arranged basis",
];

const HIGHLIGHTS = [
  { icon: Ship, title: "Singapore + Cruise", desc: "Cruise Component" },
  { icon: Hotel, title: "4-Star Property Stay", desc: "4 Nights Comfort" },
  { icon: Plane, title: "Return Flights", desc: "Flight Tickets Included" },
  { icon: Ticket, title: "Universal Studios", desc: "Full-Day Admission Ticket" },
  { icon: Waves, title: "Sentosa Full-Day", desc: "Cable Car, Madame Tussauds & Show" },
  { icon: Compass, title: "City Tour & Gardens", desc: "Cloud Forest, Flower Dome & MBS Deck" },
];

export function SingaporeItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 95000;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Singapore + Cruise Package (4 Nights / 5 Days, ₹95,000/person) package."
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar / Header Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back to Home</span>
            </a>
            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
            <a href="/" className="flex items-center gap-2">
              <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 w-auto object-contain" />
              <div className="hidden md:block">
                <span className="text-base font-extrabold text-white tracking-tight block">SFM TRAVELS</span>
                <span className="text-[10px] text-amber-400 font-medium tracking-widest block uppercase">
                  Smile For Millions
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <CurrencySelector />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">International Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Singapore + Cruise Package</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Singapore + Cruise • 4-Star Property
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    04 Nights / 05 Days
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5" />
                    Customizable Package
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    SINGAPORE + CRUISE PACKAGE
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-400/90 font-semibold tracking-wide">
                    4 Nights / 5 Days &nbsp;|&nbsp; 4-Star Property &nbsp;|&nbsp; Customizable Package
                  </p>
                </div>

                {/* Package Quick Summary Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-800 text-center">
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Duration</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white">4 Nights / 5 Days</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Hotel Category</span>
                      <span className="text-xs sm:text-sm font-extrabold text-amber-400">4-Star Property</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Package Type</span>
                      <span className="text-xs sm:text-sm font-extrabold text-cyan-400">Singapore + Cruise</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Package Price</span>
                      <span className="text-xs sm:text-sm font-black text-amber-400">{formatPrice(priceInr)} / person</span>
                    </div>
                  </div>
                </div>

                {/* Top Showcase Images (Photos 1 & 2) placed before description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-2">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Singapore City Skyline & Marina Bay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Singapore City Skyline
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Singapore Iconic Waterfront & Cruise Experience"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Futuristic Skyline & Waterfront
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-slate-800 font-normal">
                    Proposed package includes flights, 4-star hotel accommodation, visa, sightseeing as listed, and cruise component. Experience Night Safari with unlimited tram, full-day Sentosa Island sightseeing, full-day Universal Studios Singapore, half-day Singapore City Tour, Gardens by the Bay (Cloud Forest, Flower Dome & Jurassic Park), and Marina Bay Sands Observation Deck.
                  </p>

                  {/* Technical Note Callout Box */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-amber-300 block">Package Inclusions & Technical Note:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                        The technical team must confirm the exact cruise sailing, cabin category, and all final inclusions before confirming the quotation. (The itinerary currently lists five days of Singapore activities but does not specify the cruise schedule. Please confirm cruise placement and duration before the package is costed or shared as a final offer.)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                  {HIGHLIGHTS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center space-y-1 hover:border-amber-500/40 transition-colors min-w-0"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-white leading-tight break-words">{item.title}</h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 break-words">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Price & Quick Booking Box */}
              <div className="lg:col-span-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 sticky top-24">
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="inline-block bg-amber-500/10 text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-amber-500/20 mb-1">
                      Singapore + Cruise Offer
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Package Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">
                        {formatPrice(priceInr)}
                      </span>
                      <span className="text-xs text-slate-400">/ person</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      4-Star Hotel, Cruise Component, Flights & Visa
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-950/40 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Book Via WhatsApp</span>
                    </a>

                    <a
                      href="tel:+919999779351"
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Call Expert (+91 99997 79351)</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>4 Nights in 4-Star Property</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Cruise Component Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Return Flight Tickets & Visa Included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Universal Studios & Sentosa Full-Day Pass</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Gardens by the Bay & MBS SkyPark Deck</span>
                    </div>
                  </div>

                  <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Best Price Guaranteed • 24/7 Guest Assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "itinerary"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Day-by-Day Detailed Itinerary</span>
            </button>

            <button
              onClick={() => setActiveTab("inclusions")}
              className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "inclusions"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Package Inclusions</span>
            </button>

            <button
              onClick={() => setActiveTab("transfers")}
              className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === "transfers"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Transfers & Important Notes</span>
            </button>
          </div>
        </section>

        {/* Tab Contents */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Area */}
            <div className="lg:col-span-8">
              {activeTab === "itinerary" && (
                <div className="space-y-8">
                  {/* Day 1 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">
                          DAY 01
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Arrival in Singapore | Night Safari
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Meet & Greet • SIC Night Safari
                      </span>
                    </div>

                    {/* Day 1 Image & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                        <img
                          src={nightSafariPic}
                          alt="Singapore Night Safari Tram Ride & Wildlife"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-7 space-y-3">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Meet and greet at Singapore Changi Airport. Transfer from the airport to the 4-star hotel; check-in subject to hotel policy. In the evening, visit the world-famous Night Safari, including unlimited tram ride and animal show. Sightseeing basis: SIC (Seat-in-Coach).
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-amber-400" />
                        <span>Evening – Night Safari with Unlimited Tram & Animal Show</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Proceed on SIC basis to Singapore's famous Night Safari. Unlike a traditional daytime zoo, Night Safari lets you explore nocturnal wildlife in simulated natural habitats after dark aboard the guided Safari Tram.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🚋 Unlimited Tram Ride</span>
                          <p className="text-[11px] text-slate-400">
                            Sit back and explore different geographical wildlife zones aboard the guided tram journey with unlimited access.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🐾 Animal Show & Presentation</span>
                          <p className="text-[11px] text-slate-400">
                            Watch the exciting live animal presentation showcasing the unique natural behaviors and abilities of nocturnal creatures.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                        <div>
                          <span className="block font-semibold text-slate-300">Operational Days</span>
                          <span>Monday – Sunday</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Opening Time</span>
                          <span>Around 7:15 PM</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Sightseeing Basis</span>
                          <span className="text-amber-400 font-semibold">SIC (Seat-in-Coach)</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Recommended Duration</span>
                          <span>3–4 Hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>Return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in 4-Star Singapore Hotel</span>
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">
                          DAY 02
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Sentosa Island – Full-Day Experience
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Full-Day Sentosa Sightseeing (SIC)
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy breakfast at the hotel. Full-day Sentosa Island sightseeing on SIC (Seat-in-Coach) basis. Includes one-way cable car, Madame Tussauds, Images of Singapore, Ultimate Film Star Experience, and Wings of Time night show.
                    </p>

                    {/* Sentosa Section with Photo */}
                    <div className="bg-slate-950/70 border border-sky-500/20 rounded-2xl p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                          <img
                            src={sentosaPic}
                            alt="Sentosa Island Cable Car & Cableway Experience"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <h4 className="text-base font-bold text-sky-400 flex items-center gap-2">
                            <Waves className="w-5 h-5 text-sky-400" />
                            <span>🏝️ Included Sentosa Island Attractions</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Discover Singapore's premier island resort destination packed with panoramic cable cars, wax celebrity galleries, film experiences, and a world-class waterfront night show.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🚡 One-Way Cable Car Ride
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Travel towards Sentosa aboard the scenic cable car and enjoy breathtaking aerial views of Singapore's harbour, ships, and coastline.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🎭 Madame Tussauds & Images of Singapore
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Pose with lifelike wax figures of world celebrities and sports icons, and journey through Singapore's compelling historical story.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌟 Ultimate Film Star Experience
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Step into the spotlight with an interactive movie journey featuring glamour, dance, and cinema effects.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌊 Wings of Time Night Show
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Spectacular multi-sensory waterfront show featuring laser lights, water jets, music, pyrotechnics, and fireworks against open sea.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>After Wings of Time, return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in 4-Star Singapore Hotel</span>
                    </div>
                  </div>

                  {/* Day 3 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">
                          DAY 03
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Universal Studios Singapore
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Full-Day Admission Ticket Included
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                        <img
                          src={universalPic}
                          alt="Universal Studios Singapore Globe & Theme Park"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-7 space-y-3">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Enjoy breakfast at the hotel. Full-day visit to Universal Studios Singapore on Resorts World Sentosa. Admission ticket to be included; transfer arrangement and ticket type to be confirmed in final costing.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-amber-400" />
                        <span>🎢 Movie-Themed Zones, Coasters & Entertainment</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Experience Southeast Asia's first and only Universal Studios theme park featuring cutting-edge rides, shows, and attractions based on blockbuster films and television series across themed zones.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🚀 Sci-Fi City & Ancient Egypt</span>
                          <p className="text-[11px] text-slate-400">
                            Experience Transformers The Ride: The Ultimate 3D Battle, the Battlestar Galactica dueling coasters, and Revenge of the Mummy indoor roller coaster.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🎬 Hollywood, New York & Lost World</span>
                          <p className="text-[11px] text-slate-400">
                            Walk down iconic movie sets, meet beloved movie characters, and experience Jurassic Park Rapids Adventure.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                        <div>
                          <span className="block font-semibold text-slate-300">Admission Ticket</span>
                          <span className="text-emerald-400 font-semibold">Included in Package</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Operational Days</span>
                          <span>Daily</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Recommended Duration</span>
                          <span>Full Day (6–8 Hours)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>After an action-packed day, return to hotel as per transfer arrangement.</span>
                      <span className="font-semibold text-slate-300">Overnight in 4-Star Singapore Hotel</span>
                    </div>
                  </div>

                  {/* Day 4 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">
                          DAY 04
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Singapore City Tour | Gardens by the Bay | Marina Bay Sands
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Half-Day City Tour + Gardens + SkyPark
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy breakfast at the hotel. Half-day Singapore City Tour. Visit Gardens by the Bay, including Cloud Forest, Flower Dome, and the requested “Jurassic Park” item. Continue to the Marina Bay Sands Observation Deck. Confirm attraction tickets, sightseeing sequence, and transfer arrangements.
                    </p>

                    {/* City Tour with Photo */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                        <img
                          src={singaporeCityPic}
                          alt="Singapore City Tour & Merlion Park"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-7 space-y-3">
                        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <Building className="w-4 h-4 text-amber-400" />
                            <span>🏙️ Half-Day Singapore City Tour</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Discover Singapore's architectural highlights and civic landmarks. Stop at iconic Merlion Park for classic photos with the Merlion statue and Marina Bay Sands in the backdrop.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Gardens by the Bay with Photo */}
                    <div className="bg-slate-950/70 border border-emerald-500/20 rounded-2xl p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                          <img
                            src={gardensByTheBayPic}
                            alt="Gardens by the Bay Supertree Grove & Domes"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                            <Sun className="w-5 h-5 text-emerald-400" />
                            <span>🌿 Gardens by the Bay (Cloud Forest, Flower Dome & Jurassic Park)</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Step into one of Singapore's crown jewels featuring giant climate-controlled conservatories and lush botanical spectacles.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌺 Flower Dome
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Spectacular glass conservatory filled with exotic plants and seasonal flower displays from 5 continents.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌫️ Cloud Forest
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Cool mist-filled mountain environment dominated by lush greenery, aerial walkways, and an indoor waterfall.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            🦕 Jurassic Park Experience
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Prehistoric dinosaur displays and walkthrough integrated into the Gardens by the Bay experience.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sands SkyPark with Photo */}
                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                          <img
                            src={skyParkPic}
                            alt="Marina Bay Sands SkyPark Observation Deck"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:col-span-7 space-y-2">
                          <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-400" />
                            <span>🌆 Marina Bay Sands Observation Deck</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Ascend 57 levels above the heart of Singapore to the iconic Sands SkyPark Observation Deck at Marina Bay Sands. Enjoy panoramic 360-degree vistas overlooking Marina Bay, Gardens by the Bay, and Singapore Strait.
                          </p>
                          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                            <span className="font-semibold text-slate-200 block">Recommended Duration:</span>
                            <span>Approximately 1–1.5 Hours</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>Return to hotel as per transfer arrangement.</span>
                      <span className="font-semibold text-slate-300">Overnight in 4-Star Singapore Hotel</span>
                    </div>
                  </div>

                  {/* Day 5 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">
                          DAY 05
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Departure from Singapore
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Hotel Check-out & Airport Transfer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 flex items-center justify-center p-2 relative group aspect-square md:aspect-auto max-h-80">
                        <img
                          src={goodbyeSingaporePic}
                          alt="Goodbye Singapore Flight & Departure"
                          className="w-full h-auto max-h-72 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="md:col-span-7 space-y-3">
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Enjoy breakfast at the hotel. Hotel check-out as per hotel policy. Transfer to Singapore Changi Airport for departure. Enjoy world-famous Jewel Changi before your scheduled flight back home!
                        </p>

                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center space-y-1">
                          <h4 className="text-sm font-bold text-emerald-400">Tour Ends – Memories Continue!</h4>
                          <p className="text-xs text-slate-300">
                            SFM Travels thanks you for choosing us for your Singapore + Cruise holiday.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-4">
                    Package Inclusions & Components
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INCLUSIONS.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Note Callout Box */}
                  <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
                    <h4 className="font-bold text-amber-400 flex items-center gap-2 text-sm">
                      <Info className="w-4 h-4 text-amber-400" />
                      <span>Technical Team Note on Cruise Component:</span>
                    </h4>
                    <p className="leading-relaxed">
                      Proposed package includes flights, 4-star hotel accommodation, visa, sightseeing as listed, and cruise component. The technical team must confirm the exact cruise sailing, cabin category, and all final inclusions before confirming the quotation.
                    </p>
                    <p className="text-amber-200/90 font-medium leading-relaxed">
                      Note: The itinerary currently lists five days of Singapore activities but does not specify the cruise schedule. Please confirm cruise placement and duration before the package is costed or shared as a final offer.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
                    <h4 className="font-bold text-white">General Inclusions & Exclusions Summary:</h4>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      <li>Return flights, 4-star hotel stay with breakfast, visa assistance, and listed attraction entries included</li>
                      <li>Personal expenses, laundry, tips, and optional activities outside the brief not included</li>
                      <li>Travel insurance coverage available on request</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
                    <Car className="w-6 h-6 text-amber-400" />
                    <span>Transfers & Important Information</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-amber-400">🚐 Transfer Breakdown</h4>
                      <p className="text-xs text-slate-300">
                        <strong>Airport Transfers:</strong> Changi Airport to Hotel & Hotel to Changi Airport (Arranged/Private)<br />
                        <strong>Sightseeing Transfers:</strong> Night Safari & Sentosa Island on SIC (Seat-in-Coach) basis<br />
                        <strong>Universal Studios & City Tour:</strong> Transfers and sequence confirmed in final quotation
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-sky-400">💡 What does SIC mean?</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        SIC stands for <strong>Seat-In-Coach</strong>. Guests travel in a shared vehicle with other travellers visiting the same attraction. Pick-up and drop timings are planned according to the SIC schedule and may include stops at other hotels.
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-emerald-400">📌 Important Information & Notes</h4>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
                        <li>Proposed package price: <strong>INR 95,000 per person</strong> (Singapore package with cruise, subject to final confirmed inclusions).</li>
                        <li>Exact cruise sailing dates, ship name, cabin category, and embarkation/disembarkation schedule to be confirmed before final booking.</li>
                        <li>Attraction operating hours, show timings, maintenance dates and SIC pick-up schedules are subject to change by attraction management.</li>
                        <li>Flight timings, baggage allowance and fare conditions will be according to the selected airline at time of booking.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Inquiry Form */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Customize This Cruise Trip</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to confirm cruise sailing dates, upgrade hotel, or request private transfers? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Singapore + Cruise Package (04N/05D)" source="singapore_itinerary_page" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <FooterSection />
      <CircularSocialMenu />
    </div>
  );
}
