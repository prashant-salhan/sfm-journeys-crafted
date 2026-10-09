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
  Anchor,
  Palmtree,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

export const Route = createFileRoute("/thailand-itinerary")({
  head: () => ({
    meta: [
      { title: "Thailand Packages: Bangkok, Pattaya, Phuket & Krabi | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Bangkok & Pattaya Special (05N/06D) or Phuket & Krabi Island Special (05N/06D) with 4-Star hotels, island cruises, and transfers by SFM Travels.",
      },
    ],
  }),
  component: ThailandItineraryPage,
});

const BANGKOK_PATTAYA_PACKAGE = {
  id: "bangkok-pattaya",
  title: "Thailand – Bangkok & Pattaya Special",
  subtitle: "Bangkok & Pattaya • City, Beaches, Wildlife & Cabaret Shows",
  duration: "05 Nights / 06 Days",
  hotelsSummary: "03 Nights Pattaya + 02 Nights Bangkok (4-Star Hotels)",
  priceInr: 29999,
  rating: 4.9,
  reviewsCount: 520,
  badge: "Bestseller City & Beach Combo",
  overview:
    "Enjoy tropical island beaches, lively Pattaya entertainment, Bangkok’s famous sights and an exciting day among wildlife. This itinerary combines memorable experiences with convenient shared-coach arrangements.",
  highlights: [
    { icon: Hotel, title: "4★ Hotels Stay", desc: "3N Pattaya + 2N Bangkok" },
    { icon: Waves, title: "Coral Island Boat", desc: "Speedboat & Lunch" },
    { icon: Ticket, title: "Alcazar Cabaret", desc: "Evening Show Pass" },
    { icon: Compass, title: "Safari World", desc: "Marine Park & Lunch" },
    { icon: Building, title: "Bangkok City Tour", desc: "Wat Traimit & Marble Temple" },
  ],
  inclusions: [
    "03 Nights accommodation in 4-Star Hotel in Pattaya",
    "02 Nights accommodation in 4-Star Hotel in Bangkok",
    "Daily Buffet Breakfast at hotel",
    "Return Airport Transfers on SIC (Seat-in-Coach) basis",
    "Coral Island by Speedboat with Lunch on SIC basis",
    "Full-Day Safari World with Marine Park and Buffet Lunch",
    "Evening Alcazar Cabaret Show Pass & SIC Transfers",
    "Half-Day Bangkok City & Temple Tour (Wat Traimit Golden Buddha & Marble Temple)",
    "All Tolls, Driver Fees & Sightseeing Passes",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Bangkok • Transfer to Pattaya & Evening at Leisure",
      desc: "Arrive at Bangkok Airport, meet your local SFM representative and join your shared SIC transfer to Pattaya (approx. 2 hours). Check in at your 4-star hotel in Pattaya and relax. Spend the evening exploring Pattaya's lively beachfront, local night markets, and dining venues at your own leisure. Overnight in Pattaya.",
      tags: ["Bangkok Airport SIC Transfer", "Pattaya Arrival", "Beachfront Leisure"],
    },
    {
      day: 2,
      title: "Coral Island (Koh Larn) Speedboat Adventure with Lunch",
      desc: "After breakfast, join the shared excursion to Coral Island (Koh Larn) by speedboat. Relax on white sandy beaches, swim in clear waters, or participate in optional water sports (parasailing, sea walking, banana boat). Enjoy an included local lunch on the island before returning by boat to Pattaya. Overnight in Pattaya.",
      tags: ["Coral Island Speedboat", "Koh Larn Beach", "Included Lunch", "Water Sports"],
    },
    {
      day: 3,
      title: "Pattaya Leisure & Evening Alcazar Cabaret Show",
      desc: "Enjoy breakfast at your hotel and free time for shopping or independent sightseeing in Pattaya. In the evening, transfer on SIC basis for the famous Alcazar Cabaret Show. Watch a colorful theatrical performance featuring elaborate costumes, music, dance, and high-energy stage productions. Overnight in Pattaya.",
      tags: ["Pattaya Free Day", "Alcazar Cabaret Show", "Entertainment"],
    },
    {
      day: 4,
      title: "Pattaya to Bangkok Transfer & Half-Day City Tour",
      desc: "After breakfast, check out and travel to Bangkok. Join the contracted half-day Bangkok City Tour on SIC basis. Visit traditional temples such as Wat Traimit (Golden Buddha Temple with solid-gold Buddha image) and Wat Benchamabophit (Marble Temple). Check in to your 4-star Bangkok hotel and spend the evening shopping at Siam Paragon or CentralWorld. Overnight in Bangkok.",
      tags: ["Pattaya to Bangkok Transfer", "Bangkok City Tour", "Golden Buddha", "Marble Temple"],
    },
    {
      day: 5,
      title: "Full-Day Safari World & Marine Park with Lunch",
      desc: "After breakfast, enjoy a full-day excursion to Safari World and Marine Park. Drive through the open animal habitats of Safari Park to observe giraffes, zebras, lions, and tigers. At the Marine Park, enjoy spectacular live shows including Dolphin Show, Sea Lion Show, and stunt performances. Includes a buffet lunch. Return to Bangkok hotel for overnight stay.",
      tags: ["Safari World Drive-Through", "Marine Park Dolphin Show", "Buffet Lunch"],
    },
    {
      day: 6,
      title: "Departure from Bangkok",
      desc: "Enjoy breakfast at your hotel, check out, and join the scheduled SIC transfer to Bangkok Airport for your return flight home. Tour ends with wonderful Thailand memories.",
      tags: ["Hotel Check-out", "Bangkok Airport SIC Transfer", "Return Flight"],
    },
  ],
  transfers: [
    { service: "Bangkok Airport → Pattaya Hotel", basis: "SIC (Seat-in-Coach)" },
    { service: "Coral Island Speedboat Excursion", basis: "SIC + Shared Speedboat" },
    { service: "Alcazar Cabaret Show Transfers", basis: "SIC" },
    { service: "Pattaya → Bangkok Hotel Transfer", basis: "Shared Transfer" },
    { service: "Bangkok City & Temple Tour", basis: "SIC" },
    { service: "Safari World & Marine Park Excursion", basis: "Shared Excursion" },
    { service: "Bangkok Hotel → Airport Transfer", basis: "SIC" },
  ],
  importantNotes: [
    "Operating hours and tour pick-up times are indicative and reconfirmed for actual travel dates.",
    "Coral Island speedboats depend on sea and weather conditions.",
    "Safari World is normally closed on Mondays; itinerary schedule will be adjusted if Day 05 falls on a Monday.",
    "Bangkok City Tour temple stops and entry fees depend on contracted supplier itinerary.",
  ],
};

const PHUKET_KRABI_PACKAGE = {
  id: "phuket-krabi",
  title: "Thailand – Phuket & Krabi Special",
  subtitle: "Krabi & Phuket • Dramatic Limestone Cliffs, Islands & Phi Phi Cruise",
  duration: "05 Nights / 06 Days",
  hotelsSummary: "02 Nights Krabi + 03 Nights Phuket (4-Star Hotels)",
  priceInr: 34999,
  rating: 5.0,
  reviewsCount: 480,
  badge: "Tropical Island Paradise",
  overview:
    "A tropical escape combining Krabi’s dramatic limestone cliffs, island sunsets and Phuket’s beautiful beaches with a memorable Phi Phi Islands adventure. Experience Seven Islands sunset boat tour, Maya Bay, Pileh Lagoon, and private airport transfers.",
  highlights: [
    { icon: Hotel, title: "4★ Resort Hotels", desc: "2N Krabi + 3N Phuket" },
    { icon: Palmtree, title: "7 Islands Sunset", desc: "Boat Excursion & Dinner" },
    { icon: Waves, title: "Phi Phi Islands", desc: "Maya Bay & Pileh Lagoon" },
    { icon: Car, title: "Private Transfers", desc: "Airport & Inter-Hotel" },
    { icon: Sun, title: "Phuket Leisure", desc: "Old Town & Beach Time" },
  ],
  inclusions: [
    "02 Nights accommodation in 4-Star Hotel in Krabi",
    "03 Nights accommodation in 4-Star Hotel in Phuket",
    "Daily Buffet Breakfast at hotel",
    "Seven Islands Sunset Boat Tour in Krabi with Dinner Included",
    "Full-Day Phi Phi Islands Speedboat Tour from Phuket on SIC basis",
    "Return Airport Transfers on Private Basis (Krabi arrival & Phuket departure)",
    "Krabi to Phuket Inter-Hotel Transfer in Private AC Vehicle",
    "National Park Passes & Snorkelling Equipment (as per operator)",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Krabi • Private Transfer & Ao Nang Beach",
      desc: "Arrive at Krabi International Airport (KBV) and meet your driver for a private transfer to your 4-star hotel in Krabi. Check in and spend the afternoon at leisure. Explore Ao Nang beach, waterfront cafés, and scenic limestone rock cliffs. Overnight in Krabi.",
      tags: ["Krabi Airport Private Transfer", "Ao Nang Beach", "Limestone Cliffs"],
    },
    {
      day: 2,
      title: "Seven Islands Sunset Boat Tour with Dinner",
      desc: "Enjoy breakfast and free time in the morning. In the afternoon, embark on the Seven Islands boat excursion. Visit Chicken Island (famous chicken-head rock), Poda Island (white sand beaches & cliffs), and Tup Island (walk across the natural sandbar at low tide). Enjoy a breathtaking Andaman Sea sunset and included dinner before returning to Krabi. Overnight in Krabi.",
      tags: ["Seven Islands Boat Tour", "Chicken Island", "Poda Island", "Tup Sandbar", "Sunset Dinner"],
    },
    {
      day: 3,
      title: "Private Transfer from Krabi to Phuket",
      desc: "After breakfast, check out and travel by private AC vehicle to Phuket (approx. 3–4 hours scenic drive). Check in to your 4-star hotel in Phuket. Spend the rest of the day relaxing on Patong, Kata, or Karon beach, or exploring local night markets. Overnight in Phuket.",
      tags: ["Private Inter-Hotel Transfer", "Krabi to Phuket Drive", "Phuket Beach Leisure"],
    },
    {
      day: 4,
      title: "Full-Day Phi Phi Islands Speedboat Tour",
      desc: "After breakfast, depart for a full-day Phi Phi Islands speedboat excursion on SIC basis. Visit Maya Bay (famous sheltered bay surrounded by limestone cliffs), swim in the crystal-clear emerald waters of Pileh Lagoon, visit Phi Phi Don island for lunch, and enjoy snorkelling among tropical coral reefs. Return to Phuket hotel for night stay.",
      tags: ["Phi Phi Islands Speedboat", "Maya Bay", "Pileh Lagoon", "Phi Phi Don", "Snorkelling"],
    },
    {
      day: 5,
      title: "Phuket Leisure Day • Beach, Old Town & Promthep Cape",
      desc: "Enjoy a buffet breakfast and a full free day to relax at the beach, explore colorful Sino-Portuguese architecture in Phuket Old Town, or visit Promthep Cape for sunset views. Optional excursions available. Overnight in Phuket.",
      tags: ["Phuket Free Day", "Phuket Old Town", "Beach Relaxation", "Promthep Sunset"],
    },
    {
      day: 6,
      title: "Departure from Phuket",
      desc: "After breakfast, check out from hotel and meet your private driver for transfer to Phuket International Airport (HKT) according to your flight schedule. Tour ends with wonderful southern Thailand island memories.",
      tags: ["Hotel Check-out", "Phuket Airport Private Transfer", "Return Flight"],
    },
  ],
  transfers: [
    { service: "Krabi Airport → Krabi Hotel", basis: "Private AC Car" },
    { service: "Seven Islands Sunset Boat Tour", basis: "Shared Excursion with Dinner" },
    { service: "Krabi Hotel → Phuket Hotel Transfer", basis: "Private AC Vehicle" },
    { service: "Phi Phi Islands Speedboat Excursion", basis: "SIC / Shared Boat" },
    { service: "Phuket Hotel → Phuket Airport Transfer", basis: "Private AC Car" },
  ],
  importantNotes: [
    "Assumes arrival at Krabi Airport (KBV) and departure from Phuket International Airport (HKT).",
    "Island boat excursions and Maya Bay entry are subject to marine weather conditions & seasonal conservation rules.",
    "National park entry fees, snorkelling equipment, and pick-up times reconfirmed per operator.",
  ],
};

export function ThailandItineraryPage() {
  const { formatPrice } = useCurrency();
  const [selectedPkgId, setSelectedPkgId] = useState<"bangkok-pattaya" | "phuket-krabi">("bangkok-pattaya");
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const currentPkg = selectedPkgId === "bangkok-pattaya" ? BANGKOK_PATTAYA_PACKAGE : PHUKET_KRABI_PACKAGE;

  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi SFM Travels! I want to book / inquire about the ${currentPkg.title} (${currentPkg.duration}, ${formatPrice(currentPkg.priceInr)}/person) package.`
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
        {/* Package Selector Banner / Tabs */}
        <section className="bg-slate-900 border-b border-slate-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                Choose Your Preferred Thailand Holiday
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Select a Thailand Special Package Below
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Button Package 1 */}
              <button
                onClick={() => {
                  setSelectedPkgId("bangkok-pattaya");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "bangkok-pattaya"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "bangkok-pattaya"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Option 01
                    </span>
                    <span className="text-xs font-extrabold text-white">05N / 06D</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">
                    Bangkok & Pattaya Special
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    03N Pattaya + 02N Bangkok • Coral Island & Safari World
                  </p>
                </div>
              </button>

              {/* Button Package 2 */}
              <button
                onClick={() => {
                  setSelectedPkgId("phuket-krabi");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "phuket-krabi"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "phuket-krabi"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Palmtree className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Option 02
                    </span>
                    <span className="text-xs font-extrabold text-white">05N / 06D</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">
                    Phuket & Krabi Special
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    02N Krabi + 03N Phuket • Phi Phi & 7 Islands Sunset
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">International Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">{currentPkg.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-teal-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>{currentPkg.badge}</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    {currentPkg.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> {currentPkg.duration}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> {currentPkg.hotelsSummary}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {currentPkg.rating} ({currentPkg.reviewsCount}+ Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  {currentPkg.overview}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {currentPkg.highlights.map((h, i) => {
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
                    Featured Thailand Special
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Special Package Price
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">
                          {formatPrice(currentPkg.priceInr)}
                        </span>
                        <span className="text-xs text-slate-400">/ person (twin sharing)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ Includes 4★ Hotel Stay, Breakfast, Boat Excursions & Transfers
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
                        <span>Instant E-Visa / VOA Assistance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>24/7 On-Trip Support Included</span>
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
                  {currentPkg.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 hover:border-slate-700 transition-all space-y-3"
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
                      <p className="text-slate-300 text-sm leading-relaxed font-normal">{day.desc}</p>

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
                      <span>Package Inclusions ({currentPkg.title})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentPkg.inclusions.map((item, idx) => (
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
                      {currentPkg.importantNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                      <li>Flight tickets, entry visas, travel insurance, and meals not explicitly listed under inclusions are separate.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span>Transfers & Service Basis ({currentPkg.title})</span>
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
                          {currentPkg.transfers.map((t, idx) => (
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
                  Want to combine Bangkok, Pattaya, Phuket & Krabi into one 10-day trip or upgrade hotels? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle={currentPkg.title} source="thailand_itinerary_page" />
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
