import { useState } from "react";
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
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

export const Route = createFileRoute("/singapore-itinerary")({
  head: () => ({
    meta: [
      { title: "Complete Singapore Experience (5 Days / 4 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Singapore's Night Safari, Sentosa Island, Universal Studios, Gardens by the Bay, and Sands SkyPark with SFM Travels. 4-Star hotel stay with return flights included.",
      },
      {
        property: "og:title",
        content: "Complete Singapore Experience Itinerary | SFM Travels",
      },
      {
        property: "og:description",
        content:
          "5 Days / 4 Nights Singapore Tour Package with Night Safari, Universal Studios, Sentosa Cable Car & SkyPark.",
      },
    ],
  }),
  component: SingaporeItineraryPage,
});

const INCLUSIONS = [
  "04 Night accommodation in a 4-Star Hotel",
  "Daily Breakfast at the Hotel",
  "Return Economy Class Flights",
  "Return Airport Transfers on Private Basis",
  "All Sightseeing & Attraction Transfers on SIC / Shared Coach Basis",
  "Evening Night Safari with Guided Tram Ride & Live Fire Show",
  "Half-Day Guided Singapore City Tour & Merlion Park Visit",
  "Full-Day Sentosa Island Experience with 5-in-1 Combo",
  "One-Way Scenic Cable Car Ride to Sentosa",
  "Singapore Oceanarium Entry Pass",
  "Wings of Time Night Show (7:30 PM Show)",
  "Full-Day Universal Studios Singapore Pass",
  "Gardens by the Bay (Flower Dome & Cloud Forest Entry)",
  "Sands SkyPark Observation Deck Ticket",
];

const HIGHLIGHTS = [
  { icon: Hotel, title: "4-Star Hotel Stay", desc: "4 Nights Comfort" },
  { icon: Utensils, title: "Daily Breakfast", desc: "Morning Buffet" },
  { icon: Plane, title: "Flight Included", desc: "Return Economy" },
  { icon: Car, title: "Private Transfers", desc: "Airport Pick-up & Drop" },
  { icon: Ticket, title: "All Sightseeing", desc: "Universal, Sentosa, SkyPark" },
];

function SingaporeItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  const priceInr = 44999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Complete Singapore Experience (5 Days / 4 Nights, ₹44,999/person) package."
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
              <span className="text-amber-400 font-semibold">Singapore</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Singapore Special • 4★ Experience
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    04 Nights / 05 Days
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Complete Singapore Experience
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Discover the best of Singapore in five exciting days. From the city's futuristic skyline and world-famous attractions to wildlife after dark, Sentosa Island, Universal Studios, Gardens by the Bay, and Sands SkyPark—this package brings together Singapore's must-have experiences in one well-planned holiday.
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
                  {HIGHLIGHTS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center space-y-1 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column - Price & Quick Booking Box */}
              <div className="lg:col-span-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 sticky top-24">
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Package Price Starts From
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">
                        {formatPrice(priceInr)}
                      </span>
                      <span className="text-xs text-slate-400">/ Person</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Inclusive of 4★ Hotel, Flights, Transfers & Sightseeing
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 fill-slate-950" />
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
                          Welcome to Singapore + Night Safari
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Private Transfer & Shared Tour
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Arrive at Singapore Changi Airport, complete the immigration formalities and meet our representative for your private transfer to the hotel. Check in, relax and get ready to begin your Singapore holiday with one of the city's most unique wildlife experiences.
                    </p>

                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                        <Moon className="w-5 h-5 text-amber-400" />
                        <span>Evening – Night Safari</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        As the sun goes down, proceed on SIC basis to Singapore's famous Night Safari. Unlike a traditional zoo visit, Night Safari lets you discover the fascinating world of nocturnal wildlife after dark. Travel through different geographical zones aboard the Safari Tram, surrounded by tropical vegetation and animals that become more active at night.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🚋 Tram Ride</span>
                          <p className="text-[11px] text-slate-400">
                            Sit back and explore different wildlife habitats aboard the guided tram journey. One of the easiest and most interesting ways to experience Night Safari for families.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-white block">🔥 Fire Show</span>
                          <p className="text-[11px] text-slate-400">
                            Enjoy an energetic live performance featuring impressive fire techniques and tribal-inspired entertainment.
                          </p>
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl space-y-1 text-xs">
                        <span className="font-bold text-amber-400 block">✨ What Makes Night Safari Special</span>
                        <p className="text-slate-300">
                          The darkness, tropical surroundings, animal sounds and specially designed lighting create an experience completely different from visiting a normal daytime zoo.
                        </p>
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
                          <span className="block font-semibold text-slate-300">Closing Time</span>
                          <span>Around 12:00 Midnight</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Recommended Duration</span>
                          <span>3–4 Hours</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>Return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in Singapore</span>
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
                          Singapore City Tour + Sentosa Island Adventure
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        SIC Sightseeing & Attractions
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy breakfast at the hotel. Start your day with a Half-Day Singapore City Tour on SIC basis, giving you an introduction to the city's modern architecture, multicultural neighbourhoods and famous landmarks.
                    </p>

                    {/* City Tour & Merlion */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Building className="w-4 h-4 text-amber-400" />
                          <span>🏙️ Singapore City Tour</span>
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Drive through Singapore's most interesting areas while experiencing how beautifully the country combines modern skyscrapers, heritage neighbourhoods and greenery.
                        </p>
                      </div>

                      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Camera className="w-4 h-4 text-amber-400" />
                          <span>🦁 Merlion Park</span>
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Stop at Singapore's iconic Merlion (half-lion, half-fish). Enjoy views across Marina Bay with Marina Bay Sands and Singapore's skyline as your background.
                        </p>
                      </div>
                    </div>

                    {/* Sentosa Section */}
                    <div className="bg-slate-950/70 border border-sky-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-sky-400 flex items-center gap-2">
                        <Waves className="w-5 h-5 text-sky-400" />
                        <span>🏝️ Sentosa Island – Full-Day Experience</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Continue towards Singapore's famous entertainment island—Sentosa. Sentosa brings together beaches, entertainment, attractions, marine experiences and beautiful views, making it one of the most enjoyable days of the holiday.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🚡 One-Way Cable Car Ride
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Travel towards the island aboard the cable car and enjoy aerial views of Singapore's harbour, ships, greenery and Sentosa below.
                          </p>
                          <span className="text-[10px] text-amber-400 block pt-1">
                            Operating Hours: ~8:45 AM – 10:00 PM | Duration: 15–30 Mins
                          </span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🐠 Singapore Oceanarium
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Enter an extraordinary underwater world and walk through immersive marine exhibits with enormous viewing panels.
                          </p>
                          <span className="text-[10px] text-amber-400 block pt-1">
                            Recommended Duration: 2–3 Hours
                          </span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🎡 Sentosa 5-in-1 Combo
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Enjoy a collection of selected Sentosa experiences bundled together for maximum fun and entertainment.
                          </p>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌊 Wings of Time (7:30 PM Show)
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Spectacular night show with water fountains, colourful projections, lasers, music, fire effects and fireworks against open sea.
                          </p>
                          <span className="text-[10px] text-amber-400 block pt-1">
                            Selected Show: 7:30 PM | Duration: ~20 Minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>After the show, return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in Singapore</span>
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
                          Universal Studios Singapore – Full Day
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Full Day Theme Park Experience
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy breakfast at the hotel. Today is dedicated to one of Singapore's most exciting attractions—Universal Studios Singapore. Transfer to Sentosa on SIC basis and spend the day inside a world inspired by movies, adventure and imagination.
                    </p>

                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                        <Ticket className="w-5 h-5 text-amber-400" />
                        <span>🎢 Universal Studios Singapore</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Explore themed zones packed with thrilling rides, family attractions, live entertainment, movie characters and immersive experiences. From high-speed roller coasters and action-packed attractions to colourful family-friendly experiences, Universal Studios has something for almost every age group.
                      </p>

                      <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl space-y-1 text-xs">
                        <span className="font-bold text-amber-400 block">⭐ What Makes It Special</span>
                        <p className="text-slate-300">
                          You don't simply visit different rides—the detailed sets, characters, music and attractions make you feel as though you have stepped inside different movie worlds.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                        <div>
                          <span className="block font-semibold text-slate-300">Operational Days</span>
                          <span>Monday – Sunday</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Opening & Closing</span>
                          <span>Varies by date</span>
                        </div>
                        <div>
                          <span className="block font-semibold text-slate-300">Recommended Duration</span>
                          <span>Full Day (6–8 Hours)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>After an exciting day, return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in Singapore</span>
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
                          Gardens by the Bay + Sands SkyPark Observation Deck
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Nature & Architecture Highlights
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      After breakfast, get ready to experience Singapore's famous combination of nature, architecture and futuristic city planning. Proceed for the sightseeing on SIC basis.
                    </p>

                    <div className="bg-slate-950/70 border border-emerald-500/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-emerald-400" />
                        <span>🌿 Gardens by the Bay</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Step into one of Singapore's most extraordinary attractions. Gardens by the Bay combines plants from around the world with enormous glass conservatories and futuristic architecture.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌺 Flower Dome
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Walk through an enormous glass conservatory filled with beautiful plants and flowers from different regions of the world.
                          </p>
                          <span className="text-[10px] text-emerald-400 block pt-1">
                            Opening: 9:00 AM – 9:00 PM | Duration: 45–60 Mins
                          </span>
                        </div>

                        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            🌫️ Cloud Forest
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Enter a cool, mist-filled mountain environment dominated by lush greenery and a giant indoor waterfall.
                          </p>
                          <span className="text-[10px] text-emerald-400 block pt-1">
                            Opening: 9:00 AM – 9:00 PM | Duration: 60–90 Mins
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Sands SkyPark */}
                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                      <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <span>🌆 Sands SkyPark Observation Deck</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Finish the sightseeing experience by travelling high above Singapore to the Sands SkyPark Observation Deck at Marina Bay Sands. From high above the city, enjoy panoramic views across Marina Bay, Gardens by the Bay and Singapore's spectacular skyline.
                      </p>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-200 block">Recommended Duration:</span>
                        <span>Approximately 1–1.5 Hours</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800 pt-3">
                      <span>Return to hotel on SIC basis.</span>
                      <span className="font-semibold text-slate-300">Overnight in Singapore</span>
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
                          Goodbye Singapore
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg">
                        Departure & Private Airport Transfer
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy your final breakfast at the hotel. Depending upon your flight schedule, enjoy some free time for last-minute shopping or relaxation. Check out from the hotel and meet your driver for your Private Transfer to Singapore Changi Airport. Board your return economy-class flight with wonderful memories of Singapore!
                    </p>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center space-y-1">
                      <h4 className="text-sm font-bold text-emerald-400">Tour Ends – Memories Continue!</h4>
                      <p className="text-xs text-slate-300">
                        SFM Travels thanks you for choosing us for your Singapore holiday.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-4">
                    Complete Package Inclusions
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

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
                    <h4 className="font-bold text-white">Exclusions & Notes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      <li>Personal expenses, laundry, tips, and optional tours</li>
                      <li>Singapore Visa fees (unless assistance is requested)</li>
                      <li>Travel insurance coverage</li>
                      <li>Items not specifically listed under package inclusions</li>
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
                        <strong>Airport Transfers:</strong> Private Basis (Dedicated vehicle for your family/group)<br />
                        <strong>Sightseeing Transfers:</strong> SIC / Shared Coach Basis
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-sky-400">💡 What does SIC mean?</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        SIC stands for <strong>Seat-In-Coach</strong>. Guests travel in a shared vehicle with other travellers visiting the same attraction. Pick-up and drop timings are planned according to the SIC schedule and may include stops at other hotels.
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-emerald-400">📌 Important Information</h4>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 leading-relaxed">
                        <li>Attraction operating hours, show timings, maintenance dates and SIC pick-up schedules are subject to change. Final timings will be reconfirmed according to your selected travel date.</li>
                        <li>The exact inclusions of the Sentosa 5-in-1 Combo will be mentioned at the time of quotation/booking.</li>
                        <li>Flight timings, baggage allowance and fare conditions will be according to the selected airline and fare class at the time of booking.</li>
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
                  <span>Customize This Itinerary</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add extra days, upgrade your hotel, or request private transfers? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm defaultDestination="Singapore - Complete Experience" />
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
