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

export const Route = createFileRoute("/bali-itinerary")({
  head: () => ({
    meta: [
      { title: "Bali Honeymoon Special (7 Days / 6 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "04 Nights Kuta/Seminyak 4-Star Hotel + 02 Nights Ubud Private Pool Villa with Floating Breakfast, Candlelight Dinner, 2-Hour Spa & Nusa Penida by SFM Travels.",
      },
    ],
  }),
  component: BaliItineraryPage,
});

const INCLUSIONS = [
  "04 Nights accommodation in Kuta or Seminyak (4-Star Hotel)",
  "02 Nights accommodation in Ubud in a Luxury Private Pool Villa",
  "Daily Breakfast & 01 Romantic Floating Breakfast served in your Private Villa Pool",
  "01 Romantic Candlelight Dinner with Honeymoon Floral Table Setup",
  "02-Hour Traditional Balinese Spa & Massage Experience for Couples",
  "Return Economy-Class Flights",
  "Water Sports Package at Tanjung Benoa: Jet Ski, Banana Boat Ride & Flying Fish",
  "Full-Day Nusa Penida Island Excursion (Kelingking Beach T-Rex Cliff, Broken Beach, Angel's Billabong, Crystal Bay)",
  "Half-Day Tanah Lot Sea Temple Sunset Excursion",
  "Uluwatu Cliffside Temple Tour & Open-Air Kecak Fire Dance Show Pass",
  "Return Airport Pick-Up & Drop Transfers on Private Basis",
  "All Land Sightseeing & Inter-Hotel Transfers on Private Basis",
];

const HIGHLIGHTS = [
  { icon: Heart, title: "Private Pool Villa", desc: "02 Nights Ubud Luxury Stay" },
  { icon: Utensils, title: "Floating Breakfast", desc: "Served in Private Pool" },
  { icon: Sparkles, title: "Candlelight Dinner", desc: "Romantic Flowers Setup" },
  { icon: Flower2, title: "2-Hour Couple Spa", desc: "Traditional Balinese Massage" },
  { icon: Waves, title: "Water Sports & Penida", desc: "Jet Ski, Flying Fish & Boat" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Welcome to Bali – Romantic Arrival",
    desc: "Arrive at Ngurah Rai International Airport (DPS) in Denpasar and meet your driver for a private transfer to your 4-star hotel in Kuta or Seminyak. Check in and enjoy the rest of the day at leisure. Bali’s tropical atmosphere, beaches and relaxed hospitality offer a lovely beginning to your honeymoon. Overnight in Kuta / Seminyak.",
    tags: ["Private Airport Transfer", "Kuta / Seminyak 4★ Hotel", "Beachside Leisure"],
  },
  {
    day: 2,
    title: "Nusa Penida Island Adventure",
    desc: "Full-day trip to Nusa Penida Island. Admire the famous T-Rex-shaped headland at Kelingking Beach viewpoint with soaring cliffs and bright blue sea. See Broken Beach's circular coastal cove connected to the ocean through a natural stone arch. View rock pools at Angel's Billabong, and relax by the scenic beach and clear waters of Crystal Bay. Return by fast boat to Bali mainland. Overnight in Kuta / Seminyak.",
    tags: ["Nusa Penida Fast Boat", "Kelingking Beach T-Rex View", "Broken Beach", "Angel's Billabong", "Crystal Bay"],
  },
  {
    day: 3,
    title: "Water Sports, Uluwatu Sunset & Kecak Dance",
    desc: "Enjoy included Jet Ski, Banana Boat and Flying Fish activities under operator supervision at Tanjung Benoa beach. In the late afternoon, explore the cliffside Uluwatu Temple precinct overlooking the Indian Ocean at sunset. Watch a traditional open-air Kecak & Fire Dance performance featuring chanting, storytelling and fire effects. Private land transfers. Overnight in Kuta / Seminyak.",
    tags: ["Jet Ski & Banana Boat", "Flying Fish Water Sport", "Uluwatu Temple Sunset", "Kecak Fire Dance Show"],
  },
  {
    day: 4,
    title: "Tanah Lot Temple & Romantic Candlelight Dinner",
    desc: "Visit the famous Tanah Lot Sea Temple on a rocky offshore outcrop surrounded by crashing waves. In the evening, enjoy a specially arranged romantic Candlelight Dinner with honeymoon decorations and a cozy atmosphere. Private transfers. Overnight in Kuta / Seminyak.",
    tags: ["Tanah Lot Sea Temple", "Romantic Candlelight Dinner", "Honeymoon Floral Setup"],
  },
  {
    day: 5,
    title: "Ubud Private Pool Villa Check-in & 2-Hour Balinese Spa",
    desc: "Check out from your resort and transfer privately to Ubud. Settle into your luxury Private Pool Villa surrounded by tropical greenery. Unwind with an included 2-Hour traditional Balinese Spa & Massage treatment designed for couples to relax and rejuvenate. Overnight in Ubud Private Pool Villa.",
    tags: ["Ubud Private Pool Villa", "2-Hour Balinese Couple Spa", "Tropical Villa Relaxation"],
  },
  {
    day: 6,
    title: "Floating Breakfast & Villa Leisure",
    desc: "Enjoy a specially arranged Floating Breakfast tray served right in your private villa pool. Keep the rest of the day free to relax at the villa or independently explore nearby Ubud art markets, Monkey Forest and rice terraces without a fixed tour schedule. Overnight in Ubud Private Pool Villa.",
    tags: ["Floating Breakfast in Pool", "Private Pool Villa Leisure", "Ubud Exploration"],
  },
  {
    day: 7,
    title: "Goodbye Bali – Departure",
    desc: "After breakfast, check out from your villa and meet your driver for a private transfer to Ngurah Rai International Airport for your return flight home. Take home unforgettable memories of island scenery, culture and villa relaxation.",
    tags: ["Villa Check-out", "Private Airport Transfer", "Return Flight"],
  },
];

export function BaliItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 39999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Bali Honeymoon Special (7 Days / 6 Nights, ₹39,999/person) package."
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
              <span className="text-amber-400 font-semibold">Bali Honeymoon Special</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Heart className="w-4 h-4 text-rose-400 animate-pulse fill-rose-400" />
                  <span>Bali Honeymoon Special • 4★ Hotel + 2N Ubud Private Pool Villa</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Bali Honeymoon Special
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 06 Nights / 07 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> 04N Kuta / Seminyak + 02N Ubud Private Pool Villa
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 5.0 (580+ Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  A romantic Bali escape combining tropical beaches, island adventures, sunset performances and a peaceful private-pool villa retreat. Enjoy 4 nights at a 4-star beachside resort in Kuta/Seminyak, 2 nights in a luxury Ubud Private Pool Villa, floating breakfast in your villa pool, 2-hour Balinese spa massage, romantic candlelight dinner with flower decoration, water sports (Jet Ski, Banana Boat, Flying Fish), Uluwatu Kecak Dance, Tanah Lot Temple, and Nusa Penida island speedboat excursion.
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
                    Honeymoon Special
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Special Honeymoon Price
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">
                          {formatPrice(priceInr)}
                        </span>
                        <span className="text-xs text-slate-400">/ person (twin sharing)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ Includes Pool Villa, Floating Breakfast, Candlelight Dinner & Spa
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
                        <span>100% Customized Honeymoon Itinerary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Private AC Vehicles for All Land Sightseeing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Indonesia VOA & Tourist Levy Assistance</span>
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
              Transport & Service Basis
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
                      <span>Important Information & Booking Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>The private transfer guarantee applies to all land vehicles; fast boat crossings to Nusa Penida operate on shared luxury speedboats.</li>
                      <li>Floating breakfast in pool and romantic candlelight dinner menu arrangements are pre-booked on your travel voucher.</li>
                      <li>Water sports (Jet Ski, Banana Boat & Flying Fish) operate under operator safety rules and sea weather conditions.</li>
                      <li>Indonesia VOA / E-visa (approx. $35 USD) and Bali Tourist Levy (approx. $10 USD) are supported with guide assistance.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span>Transport & Service Basis Summary</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Service Leg</th>
                            <th className="py-2.5 px-3">Transfer Basis & Vehicle</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Airport ↔ Hotel / Villa Transfers</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Kuta / Seminyak ↔ Ubud Villa Transfer</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">All Bali Land Sightseeing & Excursions</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle with Driver Guide</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Nusa Penida Harbor Land Transfers</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private Land Transfers</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Nusa Penida Fast Boat Crossing</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">Shared Fast Boat Crossing Included</td>
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
                  <span>Customize This Honeymoon</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add extra villa nights, Gili Islands, or a private photographer? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Bali Honeymoon Special (06N/07D)" source="bali_itinerary_page" />
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
