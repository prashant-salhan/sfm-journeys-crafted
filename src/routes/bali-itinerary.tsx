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
  Palmtree,
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
      { title: "Bali Packages: Honeymoon Special & Tropical Experience | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Bali Honeymoon Special (06N/07D) with Private Pool Villa, Floating Breakfast, Candlelight Dinner & Spa or Complete Bali Paradise with SFM Travels.",
      },
    ],
  }),
  component: BaliItineraryPage,
});

const BALI_HONEYMOON_PACKAGE = {
  id: "bali-honeymoon",
  title: "Bali Honeymoon Special",
  subtitle: "Kuta/Seminyak • Ubud Private Pool Villa • Spa • Floating Breakfast & Sunset Dinner",
  duration: "06 Nights / 07 Days",
  hotelsSummary: "04N Kuta/Seminyak 4★ Hotel + 02N Ubud Private Pool Villa",
  priceInr: 39999,
  rating: 5.0,
  reviewsCount: 580,
  badge: "Ultimate Honeymoon Escape",
  overview:
    "A romantic Bali escape combining tropical beaches, island adventures, sunset performances and a peaceful private-pool villa retreat. Enjoy 4 nights at a 4-star beachside resort in Kuta/Seminyak, 2 nights in a luxury Ubud Private Pool Villa, floating breakfast in your villa pool, 2-hour Balinese spa massage, romantic candlelight dinner with flower decoration, water sports (Jet Ski, Banana Boat, Flying Fish), Uluwatu Kecak Dance, Tanah Lot Temple, and Nusa Penida island speedboat excursion.",
  highlights: [
    { icon: Heart, title: "Private Pool Villa", desc: "02 Nights Ubud Luxury Stay" },
    { icon: Utensils, title: "Floating Breakfast", desc: "Served in Private Pool" },
    { icon: Sparkles, title: "Candlelight Dinner", desc: "Romantic Flowers Setup" },
    { icon: Flower2, title: "2-Hour Couple Spa", desc: "Traditional Balinese Massage" },
    { icon: Waves, title: "Water Sports & Penida", desc: "Jet Ski, Flying Fish & Boat" },
  ],
  inclusions: [
    "04 Nights accommodation in Kuta or Seminyak (4-Star Hotel)",
    "02 Nights accommodation in Ubud in a Luxury Private Pool Villa",
    "Daily Hotel Breakfast + 01 Romantic Floating Breakfast served in your Private Villa Pool",
    "01 Romantic Candlelight Dinner with Honeymoon Floral Table Setup",
    "02-Hour Traditional Balinese Spa & Massage Experience for Couples",
    "Water Sports Package at Tanjung Benoa: Jet Ski, Banana Boat Ride & Flying Fish",
    "Full-Day Nusa Penida Island Excursion (Kelingking Beach T-Rex Cliff, Broken Beach, Angel's Billabong, Crystal Bay)",
    "Half-Day Tanah Lot Sea Temple Sunset Excursion",
    "Uluwatu Cliffside Temple Tour & Open-Air Kecak Fire Dance Show Pass",
    "Return Airport Pick-Up & Drop Transfers in Private AC Car",
    "All Inter-Hotel & Sightseeing Transfers in Private AC Car with Driver",
  ],
  itinerary: [
    {
      day: 1,
      title: "Welcome to Bali – Romantic Arrival & Beachside Leisure",
      desc: "Arrive at Ngurah Rai International Airport (DPS) in Denpasar. Meet your private driver guide with a flower garland welcome and transfer in a private AC car to your 4-star resort in Kuta or Seminyak. Check in to your room and enjoy the rest of the day at leisure. Relax by the swimming pool or take a romantic sunset walk along the beach. Overnight in Kuta / Seminyak.",
      tags: ["Private Airport Transfer", "Flower Garland Welcome", "Kuta Beach Sunset"],
    },
    {
      day: 2,
      title: "Full-Day Nusa Penida Island Speedboat Adventure",
      desc: "Early morning transfer to Sanur Harbor for a fast boat ride to Nusa Penida Island. Meet your island driver to explore postcard-perfect natural wonders: Kelingking Beach viewpoint (the famous T-Rex shaped cliff headland), Broken Beach (natural circular rock arch cove), Angel's Billabong (natural tide pool), and Crystal Bay beach. Enjoy free time to relax on the beach before returning by fast boat to Bali mainland. Overnight in Kuta / Seminyak.",
      tags: ["Nusa Penida Fast Boat", "Kelingking Beach T-Rex View", "Broken Beach", "Angel's Billabong", "Crystal Bay"],
    },
    {
      day: 3,
      title: "Tanjung Benoa Water Sports, Uluwatu Temple & Kecak Fire Dance",
      desc: "After breakfast, head to Tanjung Benoa beach for thrilling water sports: ride a Jet Ski, enjoy the Banana Boat, and experience the Flying Fish. In the late afternoon, drive to the dramatic cliffside Uluwatu Temple perched 70 meters above the Indian Ocean. Watch an atmospheric open-air traditional Kecak & Fire Dance performance as the sun sets over the sea. Return to hotel for night stay.",
      tags: ["Water Sports (Jet Ski, Banana Boat, Flying Fish)", "Uluwatu Temple", "Kecak Fire Dance Show"],
    },
    {
      day: 4,
      title: "Tanah Lot Sea Temple Sunset & Romantic Candlelight Dinner",
      desc: "Spend a relaxed morning at your resort. In the afternoon, visit the famous Tanah Lot Temple, built on a rocky offshore formation surrounded by crashing ocean waves. Witness an unforgettable Balinese sunset. In the evening, enjoy a specially arranged romantic Candlelight Dinner with honeymoon flower decorations and candlelight ambiance. Overnight in Kuta / Seminyak.",
      tags: ["Tanah Lot Temple Sunset", "Romantic Candlelight Dinner", "Flower Decor Setup"],
    },
    {
      day: 5,
      title: "Transfer to Ubud Luxury Private Pool Villa & 2-Hour Balinese Spa",
      desc: "Check out from your resort and take a private AC transfer up into the lush hills of Ubud. Settle into your romantic Private Pool Villa surrounded by tropical greenery. In the afternoon, indulge in a luxurious 2-Hour Balinese Spa & Massage treatment designed for couples to relax and rejuvenate. Spend a peaceful evening in your villa. Overnight in Ubud Private Pool Villa.",
      tags: ["Private Pool Villa Check-in", "2-Hour Balinese Couple Spa", "Villa Relaxation"],
    },
    {
      day: 6,
      title: "Floating Breakfast in Villa Pool & Full Day Villa Leisure",
      desc: "Wake up to a special romantic morning with a Floating Breakfast tray served right in your private villa pool. Enjoy a full day at your own unhurried pace—swim in your private pool, sunbathe, or take an optional stroll through Ubud Art Market and rice terraces. Overnight in Ubud Private Pool Villa.",
      tags: ["Floating Breakfast in Pool", "Private Pool Leisure", "Ubud Romantic Stay"],
    },
    {
      day: 7,
      title: "Goodbye Bali – Private Airport Transfer & Return Flight",
      desc: "Enjoy your final breakfast at the villa. Check out and meet your private driver for transfer to Ngurah Rai International Airport (DPS) for your departure flight, taking home sweet honeymoon memories of Bali's beaches, culture, and private pool villa.",
      tags: ["Villa Check-out", "Private Airport Transfer", "Return Flight"],
    },
  ],
  transfers: [
    { service: "Airport ↔ Kuta/Seminyak Hotel", basis: "Private AC Vehicle" },
    { service: "Kuta/Seminyak ↔ Ubud Villa", basis: "Private AC Vehicle" },
    { service: "All Land Sightseeing & Excursions", basis: "Private AC Vehicle with Driver" },
    { service: "Nusa Penida Harbor Transfers", basis: "Private Land Vehicle Transfers" },
    { service: "Nusa Penida Fast Boat Crossing", basis: "Shared Speedboat Tickets Included" },
  ],
  importantNotes: [
    "Private transfer promise applies to all land vehicles; fast boat sea crossings to Nusa Penida operate on shared luxury speedboats.",
    "Floating breakfast service and candlelight dinner menu are pre-arranged on your booking voucher.",
    "Water sports activities operate under safety rules and sea weather guidelines.",
    "Complete Bali visa / VOA & tourist levy assistance provided.",
  ],
};

const COMPLETE_BALI_PACKAGE = {
  id: "complete-bali",
  title: "Complete Bali Experience",
  subtitle: "Kuta • Ubud • Uluwatu • Nusa Penida • Rice Terraces & Swing",
  duration: "05 Nights / 06 Days",
  hotelsSummary: "04N Kuta/Seminyak 4★ Hotel + 01N Private Pool Villa",
  priceInr: 34999,
  rating: 4.9,
  reviewsCount: 420,
  badge: "Best Seller Sightseeing Combo",
  overview:
    "Discover the island of gods in six exciting days. From Kuta's vibrant beaches and water sports to Ubud's lush rice terraces, Sacred Monkey Forest, Uluwatu Sunset Cliff Temple with Kecak Fire Dance, speed boat excursion to Nusa Penida's Kelingking Beach & Broken Beach, and a luxury private pool villa stay—this package brings together Bali's top highlights in one well-planned holiday.",
  highlights: [
    { icon: Hotel, title: "4★ Hotel & Villa", desc: "5 Nights Premium Stay" },
    { icon: Utensils, title: "Daily Breakfast", desc: "Plus Nusa Penida Lunch" },
    { icon: Waves, title: "Nusa Penida Boat", desc: "Kelingking Beach Tour" },
    { icon: Car, title: "Private AC Car", desc: "Airport & Sightseeing" },
    { icon: Ticket, title: "Kecak Dance Show", desc: "Uluwatu Sunset Temple" },
  ],
  inclusions: [
    "04 Nights accommodation in 4-Star Beachside Hotel in Kuta/Seminyak",
    "01 Night accommodation in a Luxury Private Pool Villa in Seminyak/Ubud",
    "Daily Breakfast & Special Nusa Penida Local Lunch",
    "Return Airport Pick-up & Drop Transfers in Private AC Car",
    "Nusa Penida Island Tour by Fast Boat (Kelingking Beach, Angel's Billabong, Broken Beach)",
    "Tanjung Benoa Water Sports (Banana Boat Ride & Jet Skiing included)",
    "Uluwatu Sunset Temple Tour with Traditional Kecak Fire Dance Show Entry",
    "Ubud Tour: Sacred Monkey Forest, Tegallalang Rice Terraces & Bali Jungle Swing",
    "Tanah Lot Sunset Sea Temple Visit",
    "Complimentary 60-Minute Balinese Spa Massage Session",
    "English-Speaking Driver Cum Guide & All Entrance Tickets/Passes",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Denpasar & Transfer to Kuta Beach Resort",
      desc: "Welcome to Bali! Upon arrival at Ngurah Rai International Airport (DPS), meet your private driver guide with a flower garland welcome. Transfer to your luxury 4-star beach resort in Kuta/Seminyak. Check in and spend the evening unwinding by the pool or taking a sunset stroll along Kuta Beach. Night stay in Kuta.",
      tags: ["Airport Transfer", "Kuta Beach Sunset", "Welcome Drink"],
    },
    {
      day: 2,
      title: "Water Sports at Benoa & Uluwatu Sunset Temple with Kecak Dance",
      desc: "After breakfast, head to Tanjung Benoa beach, the water sports capital of Bali. Enjoy included Banana Boat Ride and Jet Skiing with professional instructors. In the late afternoon, drive to the cliffside Uluwatu Temple overlooking the Indian Ocean. Experience the dramatic sunset and watch the legendary Kecak & Fire Dance performance. Return to Kuta for night stay.",
      tags: ["Water Sports", "Banana Boat & Jet Ski", "Uluwatu Cliff Temple", "Kecak Fire Dance"],
    },
    {
      day: 3,
      title: "Ubud Cultural Discovery, Sacred Monkey Forest & Tegallalang Rice Terraces",
      desc: "Depart for Bali's cultural hub, Ubud. Walk through the lush Sacred Monkey Forest Sanctuary, home to hundreds of long-tailed macaques. Visit the famous Tegallalang Rice Terraces and get thrilling photos on the Bali Jungle Swing over the valley. Stop at Celuk & Mas villages to see traditional silver, wood, and batik craftspeople. Night stay in Ubud/Kuta.",
      tags: ["Sacred Monkey Forest", "Tegallalang Rice Terraces", "Bali Jungle Swing", "Craft Villages"],
    },
    {
      day: 4,
      title: "Full Day Nusa Penida Island Speedboat Excursion",
      desc: "Early morning transfer to Sanur Harbor for a fast boat ride to Nusa Penida Island. Board your island transport to explore iconic landmarks: Kelingking Beach (the iconic T-Rex shaped cliff view), Broken Beach (Pasih Uug), and Angel's Billabong natural tide pool. Enjoy a delicious local lunch on the island. Return to Bali mainland by fast boat in the evening.",
      tags: ["Fast Boat Ticket", "Kelingking Beach", "Angel's Billabong", "Broken Beach", "Island Lunch"],
    },
    {
      day: 5,
      title: "Tanah Lot Sea Temple Sunset & Private Pool Villa Check-In",
      desc: "Check out from your resort and transfer to your luxury Private Pool Villa. In the afternoon, visit the mystical Tanah Lot Temple, perched on a rocky outcrop surrounded by crashing waves. Witness an unforgettable Balinese sunset behind the temple silhouette. Return to your villa for a romantic evening by your private swimming pool.",
      tags: ["Tanah Lot Temple", "Private Pool Villa Stay", "Sunset Views", "Villa Relaxation"],
    },
    {
      day: 6,
      title: "60-Min Balinese Massage, Shopping & Airport Departure",
      desc: "Indulge in a relaxing 60-minute traditional Balinese spa massage to unwind. Check out from your villa and visit Kuta Art Market or Krisna Oleh-Oleh for souvenir shopping. Transfer to Denpasar International Airport for your departure flight home with fond memories of Bali.",
      tags: ["60-Min Balinese Spa", "Art Market Shopping", "Airport Transfer"],
    },
  ],
  transfers: [
    { service: "Airport → Kuta Resort", basis: "Private AC Car" },
    { service: "Water Sports & Uluwatu Sightseeing", basis: "Private AC Car" },
    { service: "Ubud Cultural Tour", basis: "Private AC Car" },
    { service: "Nusa Penida Excursion", basis: "Private Land Car + Fast Boat Tickets" },
    { service: "Villa Check-in & Tanah Lot", basis: "Private AC Car" },
    { service: "Villa → Airport Departure", basis: "Private AC Car" },
  ],
  importantNotes: [
    "Private vehicle and driver guide provided for all land transfers.",
    "Nusa Penida boat crossing operates on shared luxury fast boat.",
    "VOA / E-visa assistance included.",
  ],
};

export function BaliItineraryPage() {
  const { formatPrice } = useCurrency();
  const [selectedPkgId, setSelectedPkgId] = useState<"bali-honeymoon" | "complete-bali">("bali-honeymoon");
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const currentPkg = selectedPkgId === "bali-honeymoon" ? BALI_HONEYMOON_PACKAGE : COMPLETE_BALI_PACKAGE;

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
                Choose Your Preferred Bali Escape
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Select a Bali Special Package Below
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Button Package 1 */}
              <button
                onClick={() => {
                  setSelectedPkgId("bali-honeymoon");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "bali-honeymoon"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "bali-honeymoon"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Option 01
                    </span>
                    <span className="text-xs font-extrabold text-white">06N / 07D</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">
                    Bali Honeymoon Special
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    04N Kuta + 02N Ubud Pool Villa • Floating Breakfast & Spa
                  </p>
                </div>
              </button>

              {/* Button Package 2 */}
              <button
                onClick={() => {
                  setSelectedPkgId("complete-bali");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "complete-bali"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "complete-bali"
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
                    Complete Bali Experience
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    04N Kuta + 01N Villa • Monkey Forest, Swing & Penida
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>

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
              <span className="text-amber-400 font-semibold">{currentPkg.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
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
                    Special Offer
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
                        ✔ Includes 4★ Hotel, Private Pool Villa, Spa & Excursions
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
                        <span>Private AC Vehicle for All Land Transfers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>24/7 Local Coordination Support</span>
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
                      <span>Important Information & Booking Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      {currentPkg.importantNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                      <li>Indonesia VOA / E-visa (approx. $35 USD) and Bali Tourist Levy (approx. $10 USD) are handled smoothly with our guide assistance.</li>
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
                            <th className="py-2.5 px-3">Transfer Basis & Vehicle</th>
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
                  <span>Customize This Honeymoon</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add Gili Islands, photo shoot, or extend villa nights? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle={currentPkg.title} source="bali_itinerary_page" />
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
