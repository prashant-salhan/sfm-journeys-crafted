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
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { FooterSection } from "@/components/Sections";

// Vietnam Package Images
import hero1Pic from "@/assets/vietnam/hero-1.webp";
import hero2Pic from "@/assets/vietnam/hero-2.jpg";
import day1Pic from "@/assets/vietnam/day1.webp";
import day2Pic from "@/assets/vietnam/day2.jpg";
import day3Pic from "@/assets/vietnam/day3.jpg";
import day4Pic from "@/assets/vietnam/day4.jpeg";
import day5Pic from "@/assets/vietnam/day5.jpg";
import day6Pic from "@/assets/vietnam/day6.jpg";
import day7Pic from "@/assets/vietnam/day7.jpg";
import day8Pic from "@/assets/vietnam/day8.jpg";
import day9Pic from "@/assets/vietnam/day9.jpg";
import day10Pic from "@/assets/vietnam/day10.jpg";

export const Route = createFileRoute("/vietnam-itinerary")({
  head: () => ({
    meta: [
      { title: "Amazing Vietnam (10 Days / 9 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "North-to-South Vietnam tour: Hanoi, Ha Long Bay, Ninh Binh, Hoi An, Ba Na Hills Golden Bridge, Cu Chi Tunnels & Mekong Delta with SFM Travels.",
      },
    ],
  }),
  component: VietnamItineraryPage,
});

const INCLUSIONS = [
  "03 Nights accommodation in 4-Star Hotel in Hanoi",
  "03 Nights accommodation in 4-Star Beachside Hotel in Da Nang",
  "03 Nights accommodation in 4-Star Hotel in Ho Chi Minh City (Saigon)",
  "Daily Hotel Buffet Breakfast",
  "Return International Economy-Class Flights & Domestic Internal Flights (Hanoi - Da Nang - Saigon)",
  "Private Hanoi City Tour including Hoan Kiem Lake, Old Quarter & Train Street",
  "Ha Long Bay Day Cruise Excursion with Shared Shuttle Bus & Onboard Seafood Lunch",
  "Full-Day Ninh Binh Excursion: Hoa Lu Ancient Capital, Trang An Sampan Boat Tour & Mua Cave",
  "Cam Thanh Coconut Forest, Marble Mountains & UNESCO Hoi An Ancient Town Excursion",
  "Full-Day Ba Na Hills Excursion including Cable Car & Golden Bridge Pass",
  "Full-Day Excursion to Cu Chi Tunnels & Mekong Delta River Cruise",
  "All Airport Transfers in Hanoi, Da Nang & Ho Chi Minh City on Private AC Basis",
  "All Sightseeing Transfers on SIC / Shared Coach Basis (Except Private Hanoi City Tour)",
];

const HIGHLIGHTS = [
  { icon: Hotel, title: "3 Key Destinations", desc: "09 Nights 4★ Hotel Stay" },
  { icon: Waves, title: "Ha Long & Trang An", desc: "Crater & Karst Cruises" },
  { icon: Ticket, title: "Ba Na Hills Bridge", desc: "Golden Bridge Cable Car" },
  { icon: Car, title: "Private Transfers", desc: "Airport & City Sightseeing" },
  { icon: Compass, title: "Cu Chi & Mekong", desc: "Tunnels & River Tour" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Hanoi – Private City Tour & Train Street Experience",
    desc: "Welcome to Vietnam! Arrive at Noi Bai International Airport in Hanoi. Meet your SFM representative for a private transfer to your 4-star hotel. After check-in, embark on a private Hanoi City Tour: visit serene Hoan Kiem Lake, Ngoc Son Temple, and walk through the historic Old Quarter with its lively shopfronts and 36 traditional streets. Visit the famous Hanoi Train Street from an authorized viewing area to watch life along the railway. Overnight in Hanoi.",
    tags: ["Private Airport Transfer", "Hoan Kiem Lake", "Hanoi Old Quarter", "Train Street"],
    image: day1Pic,
  },
  {
    day: 2,
    title: "Full-Day Ha Long Bay Cruise Excursion & Kayaking",
    desc: "After breakfast, depart Hanoi by shared luxury shuttle bus through the Red River Delta to Tuan Chau Harbor in Ha Long Bay. Board a traditional cruise vessel and sail past thousands of towering limestone karst islands rising from emerald waters. Enjoy a freshly prepared seafood lunch onboard. Explore natural limestone caves (such as Sung Sot Cave), and enjoy kayaking or a bamboo boat ride through tranquil lagoons. Return to Hanoi by shuttle bus for overnight stay.",
    tags: ["Ha Long Bay Cruise", "Limestone Karsts", "Sung Sot Cave", "Seafood Lunch", "Kayaking"],
    image: day2Pic,
  },
  {
    day: 3,
    title: "Ninh Binh – Hoa Lu Ancient Capital, Trang An Boat Tour & Mua Cave",
    desc: "Embark on a full-day excursion to Ninh Binh, known as 'Ha Long Bay on Land'. Visit Hoa Lu, the 10th-century feudal capital of Vietnam, and admire Dinh & Le dynasty temples. Continue to Trang An UNESCO World Heritage site for a 2-hour scenic rowboat journey through winding waterways, limestone valleys, and water caves. Optional climb up 500 steep stone steps at Mua Cave for panoramic views over Tam Coc rice fields and rivers. Return to Hanoi for night stay.",
    tags: ["Hoa Lu Ancient Capital", "Trang An Sampan Boat", "Water Caves", "Mua Cave Viewpoint"],
    image: day3Pic,
  },
  {
    day: 4,
    title: "Flight from Hanoi to Da Nang & Coastal Relaxation",
    desc: "Enjoy breakfast at your hotel, check out, and meet your driver for a private transfer to Hanoi Airport. Board your domestic flight to Da Nang, the coastal capital of central Vietnam. Upon arrival, private transfer to your 4-star beachside hotel. Spend the rest of the day relaxing on My Khe Beach or strolling along the Dragon Bridge and Han River waterfront. Overnight in Da Nang.",
    tags: ["Domestic Flight", "Private Transfers", "Da Nang Arrival", "My Khe Beach"],
    image: day4Pic,
  },
  {
    day: 5,
    title: "Cam Thanh Coconut Forest, Marble Mountains & Hoi An Evening Lanterns",
    desc: "After breakfast, head to Cam Thanh Coconut Village to navigate peaceful waterways in traditional bamboo basket boats. Continue to the Marble Mountains to explore limestone caves, Buddhist pagodas, and panoramic coastal views. In the late afternoon, arrive in UNESCO-listed Hoi An Ancient Town. Stroll along historic Japanese Covered Bridge, ancient merchant houses, and night market illuminated by thousands of silk lanterns. Return to Da Nang for night stay.",
    tags: ["Coconut Basket Boat", "Marble Mountains", "Hoi An Ancient Town", "Evening Lanterns"],
    image: day5Pic,
  },
  {
    day: 6,
    title: "Full-Day Ba Na Hills – Golden Bridge & French Village",
    desc: "Travel to Sun World Ba Na Hills mountain resort. Ride the world-record non-stop cable car up to 1,487 meters elevation. Walk across the world-famous Golden Bridge held up by giant stone hands offering breathtaking views over the Annamite Mountains. Explore the picturesque French Village, Le Jardin D'Amour flower gardens, Linh Ung Pagoda, and ride the thrilling Alpine Coaster. Return to Da Nang for overnight stay.",
    tags: ["Ba Na Hills Cable Car", "Golden Bridge", "French Village", "Alpine Coaster"],
    image: day6Pic,
  },
  {
    day: 7,
    title: "Flight from Da Nang to Ho Chi Minh City (Saigon) & Leisure",
    desc: "After breakfast, check out from hotel and private transfer to Da Nang Airport for your flight to Ho Chi Minh City (Saigon). Upon arrival at Tan Son Nhat Airport, private transfer to your 4-star city center hotel. Balance of the day is free to explore Saigon's vibrant cafés, Ben Thanh Night Market, or Nguyen Hue Walking Street at your own pace. Overnight in Ho Chi Minh City.",
    tags: ["Domestic Flight", "Ho Chi Minh City Arrival", "Saigon Night Life"],
    image: day7Pic,
  },
  {
    day: 8,
    title: "Cu Chi Tunnels Historical Tour & Mekong Delta River Cruise",
    desc: "Full-day historical and countryside excursion. First, visit the famous Cu Chi Tunnels—a 250km underground network built during the Vietnam War. Crawl through historic tunnel sections, see hidden trapdoors, and learn about guerrilla strategies. Next, head to the fertile Mekong Delta region. Board a riverboat at My Tho to cruise past fruit orchards, coconut groves, and river island communities. Taste local honey tea, tropical fruits, and coconut candy. Return to Saigon for night stay.",
    tags: ["Cu Chi Tunnels", "Mekong Delta Cruise", "Fruit Orchards", "Coconut Candy Workshop"],
    image: day8Pic,
  },
  {
    day: 9,
    title: "Ho Chi Minh City Day at Leisure – Markets & French Colonial Landmarks",
    desc: "Enjoy a relaxing free day in Ho Chi Minh City. Shop for souvenirs, coffee, and silk at Ben Thanh Market or Takashimaya Mall. Take self-guided photos at French colonial landmarks including the historic Central Post Office, Saigon Notre-Dame Cathedral, War Remnants Museum, and Independence Palace. Overnight in Ho Chi Minh City.",
    tags: ["Ben Thanh Market", "Saigon Post Office", "Notre-Dame Cathedral", "Free Shopping Day"],
    image: day9Pic,
  },
  {
    day: 10,
    title: "Hotel Check-out, Private Airport Transfer & Return Flight",
    desc: "Enjoy your final hotel breakfast in Saigon. Check out and meet your private driver for transfer to Tan Son Nhat International Airport. Board your return international flight home, carrying unforgettable memories of Vietnam's grand north-to-south journey.",
    tags: ["Hotel Check-out", "Private Airport Transfer", "Return International Flight"],
    image: day10Pic,
  },
];

export function VietnamItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 54999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Amazing Vietnam North-to-South (10 Days / 9 Nights, ₹54,999/person) package."
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
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
              <span>/</span>
              <span className="text-slate-300 font-medium">International Packages</span>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Vietnam</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Amazing Vietnam • North-to-South Grand Experience</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Amazing Vietnam
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 09 Nights / 10 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-emerald-400" /> Hanoi • Da Nang • Ho Chi Minh City
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9 (460+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Top 2 Banner Pictures */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero1Pic}
                      alt="Vietnam Ha Long Bay & Karsts"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Ha Long Bay & Limestone Karsts
                    </span>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl border border-slate-800/90 shadow-xl aspect-[16/10]">
                    <img
                      src={hero2Pic}
                      alt="Vietnam Golden Bridge & Heritage"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                      Golden Bridge & Cultural Wonders
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  A memorable north-to-south Vietnam journey featuring Ha Long Bay, Ninh Binh, Hoi An Ancient Town, Ba Na Hills Golden Bridge, Cu Chi Tunnels, and the Mekong Delta. Discover historic Hanoi Train Street, cruise among limestone karst islands, ride basket boats in coconut palm groves, walk the famous bridge held by giant hands, and experience authentic southern river life.
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
                    Bestseller Grand Tour
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
                        ✔ Includes 4★ Hotels, Flights, Ha Long Cruise & All Excursions
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
                        <span>Private Airport Transfers in All 3 Cities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Vietnam E-Visa Assistance Included</span>
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
              Hotels & Transport Summary
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
                      <span>Important Booking & Operational Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>International return flights and domestic flights (Hanoi → Da Nang & Da Nang → Ho Chi Minh City) are included and confirmed.</li>
                      <li>Train Street access in Hanoi is regulated by local authorities; viewing is conducted from authorized local spots.</li>
                      <li>Ha Long Bay day cruise sailing and water activities (kayaking / bamboo boat) depend on weather & maritime safety rules.</li>
                      <li>Mua Cave viewpoint involves climbing ~500 steep stone steps (optional activity).</li>
                      <li>Coconut Forest basket boat ride, Ba Na Hills cable car & Golden Bridge passes are included.</li>
                      <li>Lunches and dinners not explicitly mentioned under inclusions are at leisure.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span>Transport & Services Summary</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Service Leg / Excursion</th>
                            <th className="py-2.5 px-3">Transfer Basis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Airport Transfers (Hanoi, Da Nang & Ho Chi Minh City)</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Hanoi City Tour with Train Street</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Ha Long Bay Cruise Excursion</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">Shared Luxury Shuttle Bus</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Ninh Binh, Da Nang & Ho Chi Minh Excursions</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">SIC / Shared Coach</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Domestic Flights (Hanoi → Da Nang & Da Nang → Saigon)</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Domestic Internal Airfare Included</td>
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
                  <span>Customize This Itinerary</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add Phu Quoc Island, Sapa rice terraces, or extend nights? Send us a message for a custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Amazing Vietnam (09N/10D Grand Tour)" source="vietnam_itinerary_page" />
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
