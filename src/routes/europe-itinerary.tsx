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
  Train,
  Mountain,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Europe Package Images
import hero1Pic from "@/assets/europe/hero-1.jpeg";
import hero2Pic from "@/assets/europe/hero-2.jpeg";
import day1Pic from "@/assets/europe/day1.jpeg";
import day2Pic from "@/assets/europe/day2.jpg";
import day3Pic from "@/assets/europe/day3.webp";
import day4Pic from "@/assets/europe/day4.jpg";
import day5Pic from "@/assets/europe/day5.avif";
import day6Pic from "@/assets/europe/day6.jpeg";
import day7Pic from "@/assets/europe/day7.jpg";

export const Route = createFileRoute("/europe-itinerary")({
  head: () => ({
    meta: [
      { title: "Paris & Swiss Alps Special (7 Days / 6 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "03 Nights Paris + 03 Nights Switzerland with Eiffel Tower Summit, Disneyland, Swiss Travel Pass, Mount Titlis & Lindt Chocolate by SFM Travels.",
      },
    ],
  }),
  component: EuropeItineraryPage,
});

const INCLUSIONS = [
  "03 Nights accommodation in 4-Star Hotel in Paris",
  "03 Nights accommodation in 4-Star Hotel in Switzerland (Bern / Zurich)",
  "Daily Hotel Breakfast",
  "Return Economy-Class International Flights",
  "Paris Hop-On Hop-Off Sightseeing Bus Ticket",
  "1-Hour Seine River Sightseeing Cruise Pass",
  "Eiffel Tower Summit Access Entry Ticket by Lift",
  "Disneyland Paris: 1 Day / 1 Park Admission Pass",
  "High-Speed Train Ticket from Paris to Geneva or Basel (2nd Class)",
  "Swiss Travel Pass: 3 Consecutive Days (2nd Class)",
  "Lake Lucerne Sightseeing Cruise Pass",
  "Mount Titlis Excursion with Cable Car Ticket (Engelberg to Summit)",
  "Lindt Home of Chocolate Interactive Museum Admission Ticket",
  "Zurich City & Rhine Falls Waterfall Excursion",
  "Return Airport Transfers on Private Basis",
];

const HIGHLIGHTS = [
  { icon: Building, title: "Eiffel & Disneyland", desc: "Summit Lift & Theme Park" },
  { icon: Train, title: "High-Speed Rail", desc: "TGV Paris to Switzerland" },
  { icon: Mountain, title: "Mount Titlis Peak", desc: "Cable Car & Glacier Cave" },
  { icon: Waves, title: "Lake Lucerne Cruise", desc: "Scenic Swiss Waterway" },
  { icon: Utensils, title: "Lindt Chocolate", desc: "Fountain & Museum Pass" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Paris – City of Lights Welcome",
    desc: "Arrive at Paris International Airport (CDG/ORY), meet your private driver guide and transfer comfortably to your 4-star city hotel. Check in and relax. Spend the remainder of your day at leisure taking in the historic cafés, Haussmann architecture, and romantic atmosphere of Paris. Overnight in Paris.",
    tags: ["Private Airport Transfer", "Paris Arrival", "City of Lights"],
    image: day1Pic,
  },
  {
    day: 2,
    title: "Paris Hop-On Hop-Off City Tour, Seine River Cruise & Eiffel Tower Summit",
    desc: "After breakfast, explore Paris at your own pace using the Hop-On Hop-Off sightseeing bus. View iconic landmarks including Louvre Museum, Arc de Triomphe, Champs-Élysées, and Place de la Concorde. Enjoy a 1-hour Seine River Cruise sailing beneath historic bridges past riverside monuments. Ascend by lift to the Eiffel Tower Summit for breathtaking 360-degree panoramic views of Paris. Overnight in Paris.",
    tags: ["Hop-On Hop-Off Bus", "Seine River Cruise", "Eiffel Tower Summit Lift", "Arc de Triomphe"],
    image: day2Pic,
  },
  {
    day: 3,
    title: "Full Day Disneyland Paris Adventure (1 Day / 1 Park Pass)",
    desc: "After breakfast, travel to Disneyland Paris. Enjoy a full magical day at Disneyland Park with your included 1 Day / 1 Park pass. Step into fairytale lands: Main Street U.S.A., Fantasyland, Adventureland, Discoveryland, and Frontierland. Enjoy family rides, movie-inspired attractions, Disney character meet-and-greets, and spectacular evening shows. Return to hotel. Overnight in Paris.",
    tags: ["Disneyland Paris 1 Day Pass", "Fantasyland Rides", "Disney Parade & Shows"],
    image: day3Pic,
  },
  {
    day: 4,
    title: "High-Speed Train from Paris to Switzerland & Bern Old Town",
    desc: "Check out after breakfast and transfer to Paris railway station. Board your high-speed TGV train across the French countryside to Geneva or Basel (approx. 3 hrs). Continue via Swiss scenic rail to your confirmed 4-star hotel in Bern or Zurich. If time permits, explore the UNESCO World Heritage Bern Old Town with its medieval clock towers and arcade streets. Overnight in Switzerland.",
    tags: ["High-Speed TGV Train", "Paris to Switzerland", "Swiss Travel Pass", "Bern Old Town"],
    image: day4Pic,
  },
  {
    day: 5,
    title: "Mount Titlis Cable Car Excursion & Scenic Lake Lucerne Cruise",
    desc: "After breakfast, travel by Swiss public transport towards Engelberg. Ascend Mount Titlis via revolving TITLIS Rotair cable car up to 3,020 meters elevation. Walk across the thrilling Titlis Cliff Walk (Europe's highest suspension bridge), explore the natural Glacier Cave, and enjoy snow panoramas. Later, travel to Lucerne and board a scenic Lake Lucerne Cruise across mountain-framed blue waters. Overnight in Switzerland.",
    tags: ["Mount Titlis Cable Car", "Glacier Cave", "Titlis Cliff Walk", "Lake Lucerne Cruise"],
    image: day5Pic,
  },
  {
    day: 6,
    title: "Lindt Home of Chocolate, Zurich Old Town & Rhine Falls",
    desc: "After breakfast, travel by public transport to Kilchberg for the Lindt Home of Chocolate museum. Marvel at the 9-meter chocolate fountain, learn Swiss chocolate history, and enjoy interactive tastings. Next, walk through Zurich's historic Old Town along the Limmat River and Bahnhofstrasse shopping avenue. Continue to Rhine Falls near Schaffhausen to witness Europe's most powerful waterfall. Return to hotel. Overnight in Switzerland.",
    tags: ["Lindt Chocolate Museum", "Zurich Old Town", "Limmat River", "Rhine Falls Waterfall"],
    image: day6Pic,
  },
  {
    day: 7,
    title: "Departure from Switzerland",
    desc: "Enjoy breakfast at your hotel, check out, and take your private airport transfer to Zurich or Geneva Airport. Board your return economy-class flight home, carrying magical memories of Paris and the Swiss Alps.",
    tags: ["Hotel Check-out", "Private Airport Transfer", "Return Flight"],
    image: day7Pic,
  },
];

const TRANSFERS = [
  { journey: "Paris Arrival Airport → Hotel", arrangement: "Private AC Vehicle Transfer" },
  { journey: "Paris City Sightseeing & Disneyland", arrangement: "Hop-On Hop-Off Bus & Public Transport" },
  { journey: "Paris → Geneva or Basel", arrangement: "High-Speed TGV Train (2nd Class Ticket)" },
  { journey: "Swiss Travel Pass", arrangement: "3 Consecutive Days (2nd Class Pass Included)" },
  { journey: "Mount Titlis Cable Car", arrangement: "Public Rail + Summit Cable Car Pass" },
  { journey: "Lake Lucerne Cruise", arrangement: "Scheduled Lake Steamer Cruise Pass" },
  { journey: "Switzerland Hotel → Airport Departure", arrangement: "Private AC Vehicle Transfer" },
];

export function EuropeItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 119999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Paris & Swiss Alps Special (7 Days / 6 Nights, ₹1,19,999/person) package."
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
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">International Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Paris & Swiss Alps</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Best Seller Europe Combo • 3N Paris + 3N Switzerland</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Paris & Swiss Alps Special
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 06 Nights / 07 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> 03N Paris 4★ Hotel + 03N Swiss 4★ Hotel
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9 (540+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Top 2 Banner Pictures */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Paris & Eiffel Tower"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Paris & Eiffel Tower
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Swiss Alps & Mount Titlis"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Swiss Alps & Mount Titlis
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  A memorable journey through Parisian landmarks, scenic Swiss railways, Alpine peaks, lakes and chocolate experiences. Features prebooked Eiffel Tower summit lift access, Seine River Cruise, Disneyland Paris 1 Day/1 Park pass, high-speed TGV train to Switzerland, 3-consecutive-day Swiss Travel Pass, Mount Titlis cable car, Lake Lucerne cruise, Lindt Home of Chocolate, and Rhine Falls.
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
                    Bestseller Europe Combo
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
                        ✔ Includes 4★ Hotels, Flights, TGV Train & Passes
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
                        <span>Prebooked Eiffel Summit & Disneyland Passes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Includes 3-Day Swiss Travel Pass</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Schengen Visa Document Support</span>
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
              Transfers & Rail Pass Summary
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

                      <h3 className="text-lg font-bold text-white">{day.title}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-800/90 aspect-[16/10] relative group">
                          <img
                            src={day.image}
                            alt={day.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="md:col-span-7 space-y-3">
                          <p className="text-slate-300 text-sm leading-relaxed font-normal">{day.desc}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
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
                      <span>Important Europe Travel Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>Schengen Visa assistance and flight/hotel proof vouchers are provided upon booking confirmation.</li>
                      <li>Swiss Travel Pass grants unlimited access to Swiss Travel System trains, buses, panoramas, and public boats for 3 consecutive days.</li>
                      <li>Eiffel Tower Summit Lift tickets and Disneyland Paris admission passes are pre-reserved.</li>
                      <li>City tourist taxes (approx. €3-€7 per person per night) are payable directly at hotel reception in Paris and Switzerland.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Train className="w-5 h-5 text-amber-400" />
                      <span>Transfers & Rail Pass Breakdown</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Journey Leg</th>
                            <th className="py-2.5 px-3">Transfer Basis / Ticket Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {TRANSFERS.map((t, idx) => (
                            <tr key={idx}>
                              <td className="py-2.5 px-3 font-semibold text-white">{t.journey}</td>
                              <td className="py-2.5 px-3 text-emerald-400 font-medium">{t.arrangement}</td>
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
                  <span>Customize This Europe Trip</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add Jungfraujoch, Mount Pilatus, or extra nights in Paris/Zurich? Send us a message for a custom itinerary.
                </p>
                <InlineEnquiryForm initialPackageTitle="Paris & Swiss Alps Special (06N/07D)" source="europe_itinerary_page" />
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
