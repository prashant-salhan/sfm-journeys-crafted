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
  Tag,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Malaysia Package Images
import hero1Pic from "@/assets/malaysia/hero-1.jpeg";
import hero2Pic from "@/assets/malaysia/hero-2.avif";
import day1Pic from "@/assets/malaysia/day1-arrival.jpeg";
import day2Pic from "@/assets/malaysia/day2-city-tour.jpeg";
import day3Pic from "@/assets/malaysia/day3-genting.jpeg";
import day4Pic from "@/assets/malaysia/day4-departure.jpeg";

export const Route = createFileRoute("/malaysia-itinerary")({
  head: () => ({
    meta: [
      { title: "Malaysia Budget Friendly (4 Days / 3 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Kuala Lumpur City Tour, Petronas Twin Towers photo stop, Batu Caves, and Awana SkyWay Cable Car to Genting Highlands with SFM Travels.",
      },
    ],
  }),
  component: MalaysiaItineraryPage,
});

const INCLUSIONS = [
  "03 Nights accommodation in a 3-Star Hotel in Kuala Lumpur",
  "Daily Breakfast at the hotel",
  "Half-Day Kuala Lumpur City Tour on SIC (Seat-in-Coach) basis",
  "Full-Day Genting Highlands Excursion on SIC basis",
  "Two-Way Awana SkyWay Cable Car Tickets (Standard Gondola Pass)",
  "Malaysia Visa Assistance & E-Visa Processing Support",
  "Return Airport Transfers on SIC (Shared Coach) basis",
  "All Listed Sightseeing Transfers on SIC basis",
];

const HIGHLIGHTS = [
  { icon: Hotel, title: "3★ KL Hotel", desc: "03 Nights Budget Stay" },
  { icon: Utensils, title: "Daily Breakfast", desc: "Hotel Breakfast Included" },
  { icon: Ticket, title: "Two-Way Cable Car", desc: "Awana SkyWay Tickets" },
  { icon: Car, title: "SIC Transfers", desc: "Shared Airport & Tours" },
  { icon: Camera, title: "KL City Tour", desc: "Twin Towers & Merdeka Sq" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Kuala Lumpur & Shared Coach Transfer",
    desc: "Arrive at Kuala Lumpur International Airport (KLIA), complete immigration and meet your local SFM representative for a shared coach (SIC) transfer to your 3-star hotel. Check in and enjoy the remaining day at leisure. Explore nearby cafés, shopping streets, or street food markets at your own pace. Overnight stay in Kuala Lumpur.",
    tags: ["KLIA SIC Airport Transfer", "3★ KL Hotel", "Evening Leisure"],
    image: day1Pic,
  },
  {
    day: 2,
    title: "Half-Day Kuala Lumpur City Sightseeing Tour",
    desc: "After breakfast, proceed on a shared coach (SIC) city tour. Enjoy photo stops at the famous Petronas Twin Towers (exterior skybridge view), Merdeka Square (historic independence square with colonial architecture), National Mosque (Masjid Negara exterior view), and King's Palace (Istana Negara ornate entrance gates). Return to hotel. Afternoon and evening at leisure. Overnight in Kuala Lumpur.",
    tags: ["Petronas Twin Towers Photo Stop", "Merdeka Square", "National Mosque", "King's Palace"],
    image: day2Pic,
  },
  {
    day: 3,
    title: "Genting Highlands Excursion & Two-Way Awana SkyWay Cable Car",
    desc: "After breakfast, depart on SIC basis for a full-day excursion to Genting Highlands, a mountain resort known for cooler weather and forest views. Board the Awana SkyWay cable car for a scenic two-way ride in a standard gondola above lush rainforests. Enjoy free time to explore resort shopping, restaurants, and entertainment areas independently, with an optional stop at Chin Swee Caves Temple. Return to KL by shared coach. Overnight in Kuala Lumpur.",
    tags: ["Genting Highlands Excursion", "Awana SkyWay Two-Way Cable Car", "Chin Swee Temple", "Resort Free Time"],
    image: day3Pic,
  },
  {
    day: 4,
    title: "Hotel Check-out & Departure Transfer",
    desc: "Enjoy breakfast at your hotel, check out, and take your scheduled SIC transfer to Kuala Lumpur International Airport. Depart with fond memories of Kuala Lumpur's landmarks and Genting's mountain scenery.",
    tags: ["Hotel Check-out", "KLIA SIC Airport Transfer", "Return Flight"],
    image: day4Pic,
  },
];

const TRANSFERS = [
  { service: "Airport → Kuala Lumpur Hotel", basis: "SIC (Seat-in-Coach)" },
  { service: "Kuala Lumpur City Tour", basis: "SIC" },
  { service: "Genting Highlands Excursion", basis: "SIC" },
  { service: "Awana SkyWay Cable Car", basis: "Two-Way Standard Gondola Pass" },
  { service: "Kuala Lumpur Hotel → Airport", basis: "SIC" },
];

export function MalaysiaItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 18999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Malaysia Budget Friendly (4 Days / 3 Nights, ₹18,999/person) package."
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
              <span className="text-amber-400 font-semibold">Malaysia Budget Friendly</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-sky-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Malaysia Budget Friendly • 3★ Hotel + Genting Cable Car</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Malaysia Budget Friendly
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 03 Nights / 04 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> 03 Nights 3-Star Hotel in Kuala Lumpur
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.8 (350+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Top Showcase Images (Photos 1 & 2) placed before description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-2">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Kuala Lumpur City Skyline & Petronas Twin Towers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Kuala Lumpur Petronas Towers
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Batu Caves & Genting Highlands Awana SkyWay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Batu Caves & Genting Cable Car
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  Explore Malaysia’s lively capital, striking architecture and cool mountain scenery in one affordable getaway. Enjoy a Kuala Lumpur city tour with Petronas Twin Towers photo stop, Batu Caves, and a scenic cable car journey to Genting Highlands aboard Awana SkyWay, with shared coach transfers throughout.
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {HIGHLIGHTS.map((h, i) => {
                    const IconComp = h.icon;
                    return (
                      <div
                        key={i}
                        className="bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 p-3.5 rounded-xl transition-all flex items-start gap-3"
                      >
                        <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg shrink-0">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-snug">{h.title}</h4>
                          <p className="text-[11px] text-slate-400 font-medium">{h.desc}</p>
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
                    Budget Offer
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
                        <span className="text-xs text-slate-400">/ person (twin sharing)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ Includes 3★ Hotel, Breakfast, Awana SkyWay & Sightseeing
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
                        <span>100% Customized Itinerary Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Malaysia Visa / E-Visa Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>24/7 Guest Assistance Included</span>
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
              Transfers & Service Summary
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
                      <span>Important Information & Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>SIC transfers follow fixed pick-up schedules and include stops at hotel routes.</li>
                      <li>City tour stops are exterior photo stops.</li>
                      <li>Cable car operation subject to weather & maintenance schedules; Genting SkyWorlds theme park passes excluded.</li>
                      <li>Malaysia tourism tax (MYR 10/room/night) payable directly at hotel reception.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span>Transfers & Service Basis Summary</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Service / Excursion</th>
                            <th className="py-2.5 px-3">Transfer Basis & Arrangement</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {TRANSFERS.map((t, idx) => (
                            <tr key={idx}>
                              <td className="py-2.5 px-3 font-semibold text-white">{t.service}</td>
                              <td className="py-2.5 px-3 text-emerald-400 font-medium">{t.basis}</td>
                            </tr>
                          ))}
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
                  <span>Customize This Package</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to upgrade your hotel to 4-star, add extra nights, or request private transfers? Send us a message for a custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Malaysia Budget Friendly (03N/04D)" source="malaysia_itinerary_page" />
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
