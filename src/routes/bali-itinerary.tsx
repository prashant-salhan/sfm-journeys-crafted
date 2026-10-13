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
  Heart,
  Flower2,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Bali Package Images
import hero1Pic from "@/assets/bali/hero-1.jpg";
import hero2Pic from "@/assets/bali/hero-2.avif";
import nusaPenidaPic from "@/assets/bali/nusa-penida.jpeg";
import kecakDancePic from "@/assets/bali/kecak-dance.jpg";
import candleDinnerPic from "@/assets/bali/candle-dinner.jpg";
import ubudVillaPic from "@/assets/bali/ubud-villa.jpeg";
import floatingBreakfastPic from "@/assets/bali/floating-breakfast.jpeg";
import goodbyeBaliPic from "@/assets/bali/goodbye-bali.jpg";

export const Route = createFileRoute("/bali-itinerary")({
  head: () => ({
    meta: [
      { title: "Bali Escape (6 Nights / 7 Days) | SFM Travels" },
      {
        name: "description",
        content:
          "Bali Escape: 4 Nights Kuta/Seminyak 4-Star Hotel + 2 Nights Ubud Private Pool Villa, Flights Included, Water Sports, Uluwatu, Nusa Penida, ATV Quad & Cretya at INR 88,000 per person.",
      },
      {
        property: "og:title",
        content: "Bali Escape (6 Nights / 7 Days) | SFM Travels",
      },
      {
        property: "og:description",
        content:
          "Complete Bali Escape with Flights: 4 Nights Kuta/Seminyak + 2 Nights Ubud Private Pool Villa with Floating Breakfast, Nusa Penida Tour, ATV Quad Biking & Candlelight Dinner.",
      },
    ],
  }),
  component: BaliItineraryPage,
});

const INCLUSIONS = [
  "Return Flights Included (Economy Class)",
  "04 Nights accommodation in Kuta/Seminyak (4-Star Property: Kuta Central Park Hotel or similar, subject to availability)",
  "02 Nights accommodation in Ubud in a Private Pool Villa (Ladera Villas / Kori Maharani Villas / Freddies Villas Ubud, subject to availability)",
  "Daily Breakfast & 01 Floating Breakfast served in your Private Villa Pool in Ubud",
  "01 Romantic Candlelight Dinner (venue, menu & transfers confirmed upon final booking)",
  "Water Sports Package: Banana Boat, Jet Ski, and Couple Parasailing (subject to operator/weather restrictions)",
  "Evening Uluwatu Temple cliffside excursion & open-air Kecak & Fire Dance Show entry pass",
  "Full-Day Nusa Penida Island Tour (Kelingking Beach, Angel's Billabong, Broken Beach / Pasih Uug & Bubu Beach)",
  "Complimentary Snorkelling & Canoeing in Nusa Penida (subject to sea/weather conditions)",
  "Return Fast-Boat Tickets to Nusa Penida, Island Land Transport, Guide, Lunch & Local Entrance Fees",
  "ATV Quad Biking (quad-sharing option, ~90 minutes including preparation & safety briefing)",
  "Alas Harum / Cretya area basic entrance combo (Angel Swing, Bed Swing, and Sky Bike)",
  "Kintamani Viewpoint Tour overlooking Mount Batur & scenic Coffee Plantation visit",
  "Scenic Waterfall & Emerald Rice Terraces sightseeing in Ubud",
  "Inter-hotel transfer from Kuta/Seminyak to Ubud Private Pool Villa",
  "Return Airport Pick-Up & Drop-Off Transfers",
  "All Sightseeing & Excursion Transfers as per itinerary",
];

const HIGHLIGHTS = [
  { icon: Plane, title: "Flights Included", desc: "Return Airfare Included" },
  { icon: Hotel, title: "4N Kuta/Seminyak", desc: "4-Star Hotel Stay" },
  { icon: Heart, title: "2N Ubud Villa", desc: "Private Pool Villa Stay" },
  { icon: Waves, title: "Water Sports & Penida", desc: "Jet Ski, Parasailing & Penida" },
  { icon: Compass, title: "ATV Quad & Cretya", desc: "90-Min ATV & Jungle Swings" },
  { icon: Utensils, title: "Floating Breakfast", desc: "Served in Villa Pool" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Bali | Hotel Transfer",
    desc: "Meet and greet at Bali International Airport. Transfer to the Kuta/Seminyak hotel and check-in, subject to hotel policy. Settle into your room and spend the rest of the day at leisure exploring the vibrant beach town or relaxing at the resort. Overnight in Kuta/Seminyak.",
    tags: ["Airport Meet & Greet", "Kuta/Seminyak Hotel", "Hotel Transfer", "Overnight Kuta"],
    image: hero1Pic,
  },
  {
    day: 2,
    title: "Water Sports | Uluwatu Temple | Kecak Dance",
    desc: "Begin the morning with an action-packed water sports session: banana boat, jet ski, and couple parasailing (subject to operator and weather restrictions). In the late afternoon, head out for an evening half-day visit to the cliffside Uluwatu Temple perched dramatically above the Indian Ocean. Attend the mesmerizing Kecak Dance and Fire Show at sunset. Return transfer to hotel; confirm activity timings and transfer inclusions.",
    tags: ["Banana Boat & Jet Ski", "Couple Parasailing", "Uluwatu Cliff Temple", "Kecak & Fire Show"],
    image: kecakDancePic,
  },
  {
    day: 3,
    title: "Nusa Penida Island Tour | Candlelight Dinner",
    desc: "Embark on a full-day Nusa Penida tour covering iconic Kelingking Beach (T-Rex cliff), Angel’s Billabong, Broken Beach (Pasih Uug), and Bubu Beach (confirm route feasibility and exact beach name with supplier). Enjoy complimentary snorkelling and canoeing, subject to sea/weather conditions and supplier confirmation. In the evening, savor a romantic candlelight dinner; confirm venue, menu, transfers, and whether it is on Bali mainland or Nusa Penida. Includes fast-boat tickets, island transfers, lunch, guide, and local entrance fees.",
    tags: ["Fast Boat Tickets", "Kelingking Beach", "Broken Beach", "Snorkelling & Canoeing", "Candlelight Dinner"],
    image: nusaPenidaPic,
  },
  {
    day: 4,
    title: "ATV Quad Biking | Alas Harum / Cretya",
    desc: "Gear up for an adrenaline-pumping ATV quad biking adventure – quad-sharing option, approximately 90 minutes including preparation and safety briefing (confirm actual ride duration with operator). Afterward, visit the picturesque Alas Harum / Cretya area with basic entrance combo. Experience the thrilling Angel Swing, Bed Swing, and scenic Sky Bike suspended high above Bali’s lush rice terraces.",
    tags: ["ATV Quad Biking (90 Min)", "Alas Harum / Cretya", "Angel Swing & Bed Swing", "Sky Bike"],
    image: hero2Pic,
  },
  {
    day: 5,
    title: "Kintamani Tour | Waterfall | Rice Terraces | Ubud Transfer",
    desc: "Take an excursion to the iconic Kintamani viewpoint overlooking Mount Batur and its crater lake. Visit a traditional Balinese coffee plantation for a coffee-tasting experience. Visit a refreshing waterfall and scenic rice terraces (confirm specific locations in final itinerary). Proceed with your inter-hotel transfer from Kuta/Seminyak to Ubud and check in to your confirmed private-pool villa.",
    tags: ["Kintamani Volcano View", "Coffee Plantation", "Scenic Waterfall", "Rice Terraces", "Ubud Pool Villa Check-in"],
    image: ubudVillaPic,
  },
  {
    day: 6,
    title: "Leisure Day in Ubud | Floating Breakfast",
    desc: "Enjoy a relaxing day at leisure to unwind in your private villa and explore Ubud’s art markets, cafés, and cultural galleries independently. Indulge in an iconic Floating Breakfast served right in your private villa pool (subject to property facilities and advance booking).",
    tags: ["Floating Breakfast in Pool", "Private Pool Villa", "Ubud Leisure & Exploration"],
    image: floatingBreakfastPic,
  },
  {
    day: 7,
    title: "Departure from Bali",
    desc: "Enjoy breakfast and check out from your villa as per hotel policy. Meet your driver for your transfer to Bali International Airport (DPS) for departure flight back home. Pickup time is coordinated based on your flight departure schedule and local traffic conditions.",
    tags: ["Villa Check-out", "Airport Transfer", "Flight Departure"],
    image: goodbyeBaliPic,
  },
];

export function BaliItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 88000;
  const whatsappNumber = "919711038584";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Bali Escape Package (6 Nights / 7 Days, ₹88,000/person with flights)."
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
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">International Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Bali Escape</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Bali Escape • 4-Star Properties
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    06 Nights / 07 Days
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" />
                    Flights Included
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    BALI ESCAPE
                  </h1>
                  <p className="text-xs sm:text-sm text-amber-400/90 font-semibold tracking-wide">
                    6 Nights / 7 Days &nbsp;|&nbsp; 4-Star Properties &nbsp;|&nbsp; Flights Included
                  </p>
                </div>

                {/* Package Quick Summary Table */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-800 text-center">
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Duration</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white">6 Nights / 7 Days</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Kuta/Seminyak</span>
                      <span className="text-xs sm:text-sm font-extrabold text-amber-400">4 Nights (4-Star)</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Ubud Stay</span>
                      <span className="text-xs sm:text-sm font-extrabold text-cyan-400">2 Nights (Pool Villa)</span>
                    </div>
                    <div className="p-3 sm:p-4 space-y-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Package Price</span>
                      <span className="text-xs sm:text-sm font-black text-amber-400">{formatPrice(priceInr)} / person</span>
                    </div>
                  </div>
                </div>

                {/* Proposed Hotel Options Box */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-amber-400" />
                    <span>Proposed Hotel Options:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl space-y-1">
                      <span className="text-amber-400 font-bold block">Kuta/Seminyak (4 nights):</span>
                      <p className="text-slate-200 font-medium">Kuta Central Park Hotel</p>
                      <p className="text-[11px] text-slate-400 italic">Subject to availability and final confirmation.</p>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl space-y-1">
                      <span className="text-cyan-400 font-bold block">Ubud (2 nights, private pool villa):</span>
                      <p className="text-slate-200 font-medium">Ladera Villas / Kori Maharani Villas / Freddies Villas Ubud</p>
                      <p className="text-[11px] text-slate-400 italic">Confirm exact property, villa category, and private-pool availability.</p>
                    </div>
                  </div>
                </div>

                {/* Top Showcase Images (Photos 1 & 2) placed before description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pb-2">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Bali Tropical Beach & Resort Stay"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Tropical Beach & Resort Stay (Kuta)
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Bali Luxury Private Pool Villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Luxury Private Pool Villa (Ubud)
                    </span>
                  </div>
                </div>

                {/* Package Overview Description */}
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-slate-800 font-normal">
                    Experience the ultimate Bali Escape with flights included, combining vibrant 4-star beachside resort living in Kuta/Seminyak (4 Nights) and a tranquil private-pool villa sanctuary in Ubud (2 Nights). Enjoy exhilarating water sports (banana boat, jet ski, couple parasailing), cliffside Uluwatu Temple & sunset Kecak Dance, full-day Nusa Penida island exploration with snorkeling & canoeing, romantic candlelight dinner, 90-min ATV quad biking & Alas Harum / Cretya swings, Kintamani tour with waterfalls and rice terraces, and an iconic floating breakfast served right in your private villa pool.
                  </p>

                  {/* Technical Note Callout Box */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-xs text-amber-200/90 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-amber-300 block">Technical Costing Note:</span>
                      <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                        This document is a costing brief based on the requested package. All hotel names, activity combinations, schedules, inclusions, and rates are subject to supplier availability and confirmation.
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

              {/* Right Column: Pricing & Instant Booking Box */}
              <div className="lg:col-span-4">
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl shadow-slate-950/80 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                    Flights Included
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Package Cost (With Flights)
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">
                          {formatPrice(priceInr)}
                        </span>
                        <span className="text-xs text-slate-400">/ person</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ 4★ Hotel + Ubud Private Pool Villa + Flights Included
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
                        <span>4N Kuta Central Park + 2N Ubud Pool Villa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Water Sports + Nusa Penida + ATV Quad Included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Candlelight Dinner & Floating Pool Breakfast</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Airport & Sightseeing Transfers Included</span>
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
              Inclusions & Components
            </button>
            <button
              onClick={() => setActiveTab("transfers")}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === "transfers"
                  ? "text-amber-400 border-b-2 border-amber-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Transport & Hotel Notes
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
                        <div className="md:col-span-5 overflow-hidden rounded-xl border border-slate-800/90 bg-slate-950 flex items-center justify-center relative group aspect-[16/10] max-h-72">
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
                      <span>Package Inclusions & Components</span>
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

                  {/* Technical Note Callout Box in Tab */}
                  <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
                    <h4 className="font-bold text-amber-400 flex items-center gap-2 text-sm">
                      <Info className="w-4 h-4 text-amber-400" />
                      <span>Technical Team Note on Package Costing:</span>
                    </h4>
                    <p className="leading-relaxed">
                      This document is a costing brief based on the requested package. All hotel names, activity combinations, schedules, inclusions, and rates are subject to supplier availability and confirmation.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-amber-400" />
                      <span>Important Inclusions & Exclusions Summary</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>Return flights, accommodation (4N Kuta hotel + 2N Ubud private pool villa), daily breakfast, and listed activities are included.</li>
                      <li>Water sports (banana boat, jet ski, couple parasailing) and boat transfers are subject to operator safety rules and sea/weather conditions.</li>
                      <li>Floating breakfast in villa pool and romantic candlelight dinner menu are subject to property facilities and advance scheduling.</li>
                      <li>Personal expenses, tips, optional upgrades, and items not specifically listed in the itinerary are not included.</li>
                      <li>Indonesia Visa on Arrival (VOA) and Bali Tourist Levy assistance provided by SFM Travels.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span>Transport & Service Basis Breakdown</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Service Leg</th>
                            <th className="py-2.5 px-3">Transfer Basis & Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Airport ↔ Kuta/Seminyak Hotel</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Meet & Greet + Dedicated Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Water Sports & Uluwatu Kecak Tour</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Arranged Tour Transfers (timings confirmed prior to tour)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Nusa Penida Island Excursion</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">Return Fast Boat Tickets + Island Transport & Local Guide</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">ATV Quad Biking & Alas Harum / Cretya</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Arranged Activity Transfers (~90 min ATV ride)</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Kintamani, Waterfall, Rice Terrace & Ubud Transfer</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Inter-Hotel Transfer & Full-Day Tour Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Ubud Villa ↔ Bali Airport Departure</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Coordinated Departure Transfer based on flight schedule</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-cyan-400" />
                      <span>Hotel & Villa Confirmation Details</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Kuta Central Park Hotel:</strong> 4 Nights in Kuta/Seminyak, subject to room category and availability at time of booking.<br />
                      <strong>Ubud Private Pool Villa:</strong> 2 Nights at Ladera Villas / Kori Maharani Villas / Freddies Villas Ubud. Exact property and private pool category confirmed upon final booking.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Custom Quick Inquiry Form (4 Cols) */}
            <div className="lg:col-span-4" id="enquiry-section">
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sticky top-28 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Customize This Bali Escape</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to confirm specific villa options, modify sightseeing, or add extra days? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Bali Escape (06N/07D) - INR 88,000" source="bali_itinerary_page" />
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
