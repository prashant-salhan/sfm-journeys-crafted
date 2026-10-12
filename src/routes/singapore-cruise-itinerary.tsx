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
  Anchor,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Singapore Cruise Package Images
import hero1Pic from "@/assets/singapore-cruise/hero-1.webp";
import hero2Pic from "@/assets/singapore-cruise/hero-2.jpeg";
import day1Pic from "@/assets/singapore-cruise/day1-night-safari.jpeg";
import day2Pic from "@/assets/singapore-cruise/day2-gardens-skypark.jpg";
import day3Pic from "@/assets/singapore-cruise/day3-sentosa.jpeg";
import day4Pic from "@/assets/singapore-cruise/day4-universal.jpg";
import day5Pic from "@/assets/singapore-cruise/day5-cruise-embarkation.jpeg";
import day6Pic from "@/assets/singapore-cruise/day6-cruise-leisure.jpeg";
import day7Pic from "@/assets/singapore-cruise/day7-cruise-disembarkation.webp";

export const Route = createFileRoute("/singapore-cruise-itinerary")({
  head: () => ({
    meta: [
      { title: "Singapore + Genting Dream Cruise (6 Nights / 7 Days) | SFM Travels" },
      {
        name: "description",
        content:
          "4 Nights 4-Star Singapore Hotel + 2 Nights Genting Dream Cruise with Return Flights, Visa, Night Safari, Sentosa Island, Universal Studios & Gardens by the Bay with SFM Travels.",
      },
    ],
  }),
  component: SingaporeCruiseItineraryPage,
});

const INCLUSIONS = [
  "Return Flight Tickets Included",
  "04 Nights accommodation in 4-Star Property in Singapore with Daily Breakfast",
  "02 Nights accommodation onboard Genting Dream Cruise",
  "Standard Meals at Included Dining Venues onboard Genting Dream Cruise",
  "Singapore Visa Assistance / Visa Included",
  "Day 1: Arrival Meet & Greet, Changi Airport Transfer & Evening Night Safari (Unlimited Tram & Animal Show) on SIC basis",
  "Day 2: Full-Day Sentosa Island Experience (One-way Cable Car, Madame Tussauds, Images of Singapore, Ultimate Film Star & Wings of Time) on SIC basis",
  "Day 3: Full-Day Universal Studios Singapore Admission Ticket",
  "Day 4: Half-Day Singapore City Tour + Gardens by the Bay (Cloud Forest, Flower Dome & Jurassic Park) + Marina Bay Sands Observation Deck",
  "Day 5: Hotel Check-out & Transfer to Singapore Cruise Port for Genting Dream embarkation",
  "Day 6: Full Day onboard Genting Dream Cruise at Sea with Entertainment & Meals",
  "Day 7: Cruise Disembarkation & Transfer to Singapore Changi Airport for Departure",
  "All listed sightseeing and required transfers on SIC / arranged basis",
];

const HIGHLIGHTS = [
  { icon: Ship, title: "Genting Dream Cruise", desc: "2 Nights Ocean Cruise" },
  { icon: Hotel, title: "4★ Property Stay", desc: "4 Nights Singapore 4-Star Hotel" },
  { icon: Plane, title: "Return Flights", desc: "Flight Tickets Included" },
  { icon: Ticket, title: "Universal Studios", desc: "Full-Day Admission Ticket" },
  { icon: Waves, title: "Sentosa Full-Day", desc: "Cable Car, Madame Tussauds & Wings of Time" },
  { icon: Compass, title: "City Tour & Gardens", desc: "Cloud Forest, Flower Dome & MBS Deck" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Singapore | Night Safari",
    desc: "Meet and greet at Singapore Changi Airport. Private/arranged transfer from the airport to the 4-star hotel; check-in (subject to hotel check-in time). In the evening, visit the world-renowned Night Safari, including unlimited tram ride and animal show. Sightseeing basis: SIC (Seat-in-Coach).",
    tags: ["Changi Airport Meet & Greet", "Hotel Transfer", "Night Safari", "Unlimited Tram Ride", "Animal Show", "SIC Basis"],
    image: day1Pic,
  },
  {
    day: 2,
    title: "Sentosa Island Full-Day Experience",
    desc: "Full-day Sentosa Island sightseeing on SIC basis. Includes one-way scenic cable car, Madame Tussauds, Images of Singapore, Ultimate Film Star Experience, and the iconic Wings of Time waterfront night show. Return to hotel for night stay.",
    tags: ["Sentosa Full-Day Tour", "One-Way Cable Car", "Madame Tussauds", "Images of Singapore", "Ultimate Film Star", "Wings of Time", "SIC Basis"],
    image: day3Pic,
  },
  {
    day: 3,
    title: "Universal Studios Singapore",
    desc: "Full-day visit to Universal Studios Singapore on Resorts World Sentosa. Admission ticket is included so you can experience world-class themed zones, cutting-edge rides, and shows. Transfers and ticket type confirmed in final booking.",
    tags: ["Universal Studios Singapore", "Full-Day Visit", "Admission Ticket Included", "Resorts World Sentosa"],
    image: day4Pic,
  },
  {
    day: 4,
    title: "Singapore City Tour | Gardens by the Bay | Marina Bay Sands",
    desc: "Half-day Singapore City Tour exploring key landmarks and civic districts. Visit Gardens by the Bay, including Cloud Forest, Flower Dome, and Jurassic Park. Continue to the Marina Bay Sands Observation Deck for breathtaking panoramic views of Singapore.",
    tags: ["Singapore City Tour", "Gardens by the Bay", "Cloud Forest & Flower Dome", "Jurassic Park", "Marina Bay Sands SkyPark"],
    image: day2Pic,
  },
  {
    day: 5,
    title: "Hotel Check-out | Transfer to Cruise Port (Genting Dream Embarkation)",
    desc: "Check out from the hotel as per hotel policy. Transfer to Singapore Cruise Port for Genting Dream cruise embarkation. Cruise check-in, boarding time, port terminal, and luggage arrangements confirmed against sailing schedule. Settle onboard and enjoy the ship's luxury facilities.",
    tags: ["Hotel Check-out", "Cruise Port Transfer", "Genting Dream Embarkation", "Sailing Check-in"],
    image: day5Pic,
  },
  {
    day: 6,
    title: "Genting Dream Cruise (Full Day Onboard)",
    desc: "Full day onboard Genting Dream cruise. Cruise itinerary, meals, cabin category, onboard inclusions, and entertainment at sea. Enjoy swimming pools, waterslides, Broadway-style theater shows, and delicious dining at included venues.",
    tags: ["Genting Dream Cruise", "Full Day at Sea", "Onboard Meals Included", "Live Shows & Activities"],
    image: day6Pic,
  },
  {
    day: 7,
    title: "Cruise Disembarkation | Changi Airport Departure",
    desc: "Disembark from Genting Dream cruise as per the ship's arrival schedule. Transfer to Singapore Changi Airport. Enjoy Singapore Changi Airport and Jewel before departure; flight timing allows sufficient time after disembarkation.",
    tags: ["Cruise Disembarkation", "Changi Airport Transfer", "Jewel Changi", "Departure Flight"],
    image: day7Pic,
  },
];

export function SingaporeCruiseItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 124000;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Singapore + Genting Dream Cruise (6 Nights / 7 Days, ₹124,000/person) package."
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
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">Cruise Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Singapore + Genting Dream Cruise</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Ship className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Singapore Special • 4★ Property + Genting Dream Cruise</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Singapore + Genting Dream Cruise
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 06 Nights / 07 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> 04N 4★ Property + 02N Genting Dream Cruise
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 5.0 (520+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Top Showcase Images (Photos 1 & 2) placed before description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-2">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Singapore City & Genting Dream Cruise Experience 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Singapore + Genting Dream Cruise
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Genting Dream Cruise Deck & Ocean Views 2"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Genting Dream Cruise Experience
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  A comprehensive 6 Nights / 7 Days vacation combining 4 nights in a 4-star Singapore property with 2 nights onboard the Genting Dream cruise. Includes return flights, visa assistance, Night Safari with unlimited tram, full-day Sentosa Island experience, Universal Studios Singapore, Singapore City Tour, Gardens by the Bay (Cloud Forest, Flower Dome & Jurassic Park), and Marina Bay Sands Observation Deck.
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {HIGHLIGHTS.map((h, i) => {
                    const IconComp = h.icon;
                    return (
                      <div
                        key={i}
                        className="bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 p-3 sm:p-3.5 rounded-xl transition-all flex items-start gap-3 min-w-0"
                      >
                        <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-snug break-words">{h.title}</h4>
                          <p className="text-[11px] sm:text-xs text-slate-400 font-medium break-words mt-0.5">{h.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Pricing & Instant Booking Box */}
              <div className="lg:col-span-4">
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl shadow-slate-950/80 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                    All-Inclusive Package
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Special Package Price
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">
                          {formatPrice(priceInr)}
                        </span>
                        <span className="text-xs text-slate-400">/ person (min 02 person)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ Flights, 4★ Hotel, Genting Dream Cruise & Visa Included
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book via WhatsApp Now</span>
                      </a>

                      <a
                        href="#enquiry-section"
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-950/40"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Get Free Customized Quote</span>
                      </a>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>4-Star Property Accommodation (4 Nights)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Genting Dream Cruise Experience (2 Nights)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Universal Studios & Sentosa Full Day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Return Flights & Visa Assistance Included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex border-b border-slate-800 space-x-8 mb-8">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === "itinerary"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Day-Wise Itinerary
            </button>
            <button
              onClick={() => setActiveTab("inclusions")}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === "inclusions"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Inclusions & Exclusions
            </button>
            <button
              onClick={() => setActiveTab("transfers")}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === "transfers"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Hotels & Transfers Basis
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Area (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              {activeTab === "itinerary" && (
                <div className="space-y-6">
                  {ITINERARY_DAYS.map((day) => (
                    <div
                      key={day.day}
                      className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-slate-700 transition-all space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-3 py-1 rounded-lg border border-amber-500/30">
                          DAY {day.day}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Confirmed Itinerary
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white">{day.title}</h3>

                      {/* Day Photo & Description Card Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group bg-slate-950 flex items-center justify-center">
                          <img
                            src={day.image}
                            alt={day.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:col-span-7 space-y-3">
                          <p className="text-slate-300 text-sm leading-relaxed font-normal">{day.desc}</p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {day.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-800/80 text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-slate-700/60"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Package Inclusions</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {INCLUSIONS.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-amber-400" />
                      <span>Important Operational & Booking Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>Technical costing brief based on the requested itinerary. All timings, cruise details, attraction access, hotel allocation, transfers, and final inclusions are subject to availability and supplier confirmation.</li>
                      <li>Package components include: Return flights, 4-star property accommodation with daily breakfast, visa assistance/visa, listed sightseeing on SIC basis, required transfers, and Genting Dream cruise.</li>
                      <li>Standard meals are included at designated dining venues onboard Genting Dream cruise; specialty dining restaurants, beverages, gratuities, and optional shore excursions carry extra charges if selected.</li>
                      <li>Universal Studios Singapore full-day admission ticket included; transfers and ticket type confirmed in final costing.</li>
                      <li>Genting Dream cruise check-in, boarding time, port terminal, and luggage arrangements to be confirmed against confirmed sailing schedule.</li>
                      <li>Flight timing must allow sufficient buffer time after cruise disembarkation on Day 7.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Ship className="w-5 h-5 text-amber-400" />
                      <span>Transfers & Service Basis Summary</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Service Leg</th>
                            <th className="py-2.5 px-3">Transfer Basis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Changi Airport → Singapore 4★ Hotel</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Arranged / Private Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Night Safari / Sentosa / Universal Studios / City Tour / Gardens / MBS</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">SIC (Seat-in-Coach) Basis</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Singapore Hotel → Singapore Cruise Port</td>
                            <td className="py-2.5 px-3 text-slate-300">Arranged Cruise Port Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Singapore Cruise Port → Changi Airport</td>
                            <td className="py-2.5 px-3 text-slate-300">Arranged Airport Departure Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Flights & Visa</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Return Economy Flights + Visa Assistance Included</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Custom Quick Inquiry Form (4 Cols) */}
            <div className="lg:col-span-4" id="enquiry-section">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sticky top-28 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Customize This Cruise Trip</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to upgrade your cabin, extend nights, or customize flights? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Singapore + Genting Dream Cruise (06N/07D)" source="singapore_cruise_itinerary_page" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
      <CircularSocialMenu />
    </div>
  );
}
