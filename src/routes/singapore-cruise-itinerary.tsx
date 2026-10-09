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

export const Route = createFileRoute("/singapore-cruise-itinerary")({
  head: () => ({
    meta: [
      { title: "Singapore with Luxury Cruise (7 Days / 6 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "4 Nights Singapore 4-Star Hotel + 2 Nights Luxury Balcony Cruise with Night Safari, Universal Studios, Gardens by the Bay & Sentosa with SFM Travels.",
      },
    ],
  }),
  component: SingaporeCruiseItineraryPage,
});

const INCLUSIONS = [
  "04 Nights accommodation at 4-Star Hotel in Singapore with Daily Breakfast",
  "02 Nights accommodation on a Luxury Cruise in a Private Balcony Cabin",
  "Standard Meals at Included Dining Venues onboard the Cruise",
  "Return Economy-Class Flight Tickets",
  "Night Safari Experience with Tram Ride & Creatures of the Night Show",
  "Half-Day Singapore City Tour (Merlion Park, Chinatown & Little India)",
  "Full-Day Sentosa 5-in-1 Combo (Cable Car, Oceanarium & Wings of Time 7:30 PM Show)",
  "Full-Day Universal Studios Singapore Admission Pass",
  "Gardens by the Bay (Flower Dome & Cloud Forest) + Sands SkyPark Deck Pass",
  "Private Airport Pick-up Transfer & Arranged Cruise Terminal Transfers",
  "Sightseeing & Attraction Transfers on SIC / Shared Coach Basis",
];

const HIGHLIGHTS = [
  { icon: Ship, title: "Balcony Cruise Stay", desc: "2 Nights Ocean Balcony" },
  { icon: Hotel, title: "4★ Singapore Hotel", desc: "4 Nights City Resort" },
  { icon: Ticket, title: "Universal Studios", desc: "Full Day Pass Included" },
  { icon: Waves, title: "Sentosa 5-in-1", desc: "Cable Car & Oceanarium" },
  { icon: Compass, title: "Night Safari & SkyPark", desc: "Gardens & Tram Ride" },
];

const ITINERARY_DAYS = [
  {
    day: 1,
    title: "Arrival in Singapore & Night Safari Wildlife Experience",
    desc: "Arrive at Singapore Changi Airport, complete immigration and meet your representative for a private hotel transfer. Check in to your 4-star hotel and relax. In the evening, head out for the Night Safari—the world's first nocturnal wildlife park. Board the guided tram passing through different wildlife zones to observe animals active after dark. Enjoy the Creatures of the Night presentation showcasing nocturnal animal abilities. Return by shared coach for night stay in Singapore.",
    tags: ["Private Airport Transfer", "Night Safari Tram Ride", "Creatures of the Night Show", "4★ Singapore Hotel"],
  },
  {
    day: 2,
    title: "City Tour, Gardens by the Bay (Flower Dome & Cloud Forest) & Sands SkyPark",
    desc: "After breakfast, join a half-day Singapore City Tour highlighting Merlion Park, the Civic District, and cultural precincts like Chinatown or Little India. In the afternoon, visit Gardens by the Bay to explore the seasonal floral displays of the Flower Dome and the misty indoor mountain waterfall of Cloud Forest. Ascend to the Sands SkyPark Observation Deck at Marina Bay Sands for breathtaking 360-degree skyline views. Return to hotel on SIC basis for overnight stay.",
    tags: ["Half-Day City Tour", "Merlion Park", "Gardens by the Bay", "Cloud Forest & Flower Dome", "Sands SkyPark"],
  },
  {
    day: 3,
    title: "Sentosa Island 5-in-1 Combo (Cable Car, Oceanarium & Wings of Time)",
    desc: "Embark on a full-day excursion to Sentosa Island. Take the scenic Singapore Cable Car ride above the harbor with spectacular aerial views. Visit the Singapore Oceanarium to explore immersive marine habitats and marvel at diverse underwater species. In the evening, witness the mesmerising Wings of Time 7:30 PM waterfront show featuring music, lasers, water jets, and pyrotechnics. Return by shared coach for night stay in Singapore.",
    tags: ["Sentosa Cable Car", "Singapore Oceanarium", "Wings of Time 7:30 PM Show", "5-in-1 Combo"],
  },
  {
    day: 4,
    title: "Full-Day Universal Studios Singapore Theme Park",
    desc: "Enjoy breakfast at your hotel before traveling on SIC coach to Universal Studios Singapore on Resort World Sentosa. Spend an action-packed day exploring 7 movie-inspired zones: Hollywood, New York, Sci-Fi City (Transformers & Battlestar Galactica), Ancient Egypt, The Lost World, Far Far Away, and Minion Land. Experience thrilling rides, character meet-and-greets, and live shows. Return to hotel for night stay.",
    tags: ["Universal Studios Singapore", "Transformers 3D Ride", "Battlestar Galactica Coasters", "Minion Land"],
  },
  {
    day: 5,
    title: "Hotel Check-out & Embarkation on Luxury Cruise (Balcony Cabin)",
    desc: "Enjoy breakfast, check out from your hotel, and transfer to the Singapore Cruise Terminal. Complete check-in, customs, and security procedures to board your luxury cruise ship. Settle into your spacious Private Balcony Cabin with spectacular sea views. Explore the ship's floating resort amenities, swimming pools, lounges, and enjoy delicious gourmet dinners at included dining venues. Overnight aboard the cruise in a balcony cabin.",
    tags: ["Cruise Terminal Transfer", "Luxury Cruise Boarding", "Private Balcony Cabin", "Included Onboard Dining"],
  },
  {
    day: 6,
    title: "Full Day Cruise Leisure, Ocean Views, Dining & Entertainment at Sea",
    desc: "Wake up to endless ocean views from your private balcony. Enjoy breakfast onboard and spend the day at your own leisure. Take advantage of shipboard facilities including swimming pools, waterslides, fitness centers, whirlpools, live music lounges, and scheduled Broadway-style evening shows. Enjoy complimentary lunch and dinner at designated main dining rooms. Overnight aboard the cruise in a balcony cabin.",
    tags: ["Ocean Views from Balcony", "Deck Pools & Waterslides", "Broadway Live Shows", "Gourmet Meals at Sea"],
  },
  {
    day: 7,
    title: "Cruise Disembarkation & Return Flight to Home City",
    desc: "Enjoy breakfast onboard as the ship docks at the Singapore Cruise Terminal. Complete disembarkation formalities and transfer to Singapore Changi Airport for your return economy-class flight. Depart with unforgettable memories of your Singapore city exploration and luxury balcony cruise vacation.",
    tags: ["Cruise Disembarkation", "Changi Airport Transfer", "Return Flight"],
  },
];

export function SingaporeCruiseItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 59999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Singapore with Luxury Cruise (7 Days / 6 Nights, ₹59,999/person) package."
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
              <span className="text-amber-400 font-semibold">Singapore with Luxury Cruise</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
                  <Ship className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Singapore Cruise Special • 4★ Hotel + 2N Balcony Cruise</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Singapore with Luxury Cruise
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                      <Clock className="w-4 h-4" /> 06 Nights / 07 Days
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Hotel className="w-4 h-4 text-emerald-400" /> 04N Singapore 4★ Hotel + 02N Balcony Cruise
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-amber-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 5.0 (490+ Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
                  A memorable combination of Singapore’s iconic attractions, wildlife encounters, island adventures, theme-park thrills and two relaxing nights at sea in a private balcony cabin. Explore Night Safari, Universal Studios Singapore, Gardens by the Bay, Sands SkyPark, and Sentosa Island before embarking on a luxury ocean liner.
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
                    Luxury Combination
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                        Special Package Offer
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">
                          {formatPrice(priceInr)}
                        </span>
                        <span className="text-xs text-slate-400">/ person (twin sharing)</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">
                        ✔ Includes 4★ Hotel, 2N Balcony Cruise, Universal Studios & Flights
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
                        <span>Private Balcony Cabin Guaranteed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>All Meals Included Onboard Cruise</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Singapore E-Visa Assistance Included</span>
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
                      <span>Important Operational & Booking Notes</span>
                    </h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                      <li>Confirm cruise line, ship, sailing dates, terminal, and balcony cabin category before final booking confirmation.</li>
                      <li>Standard meals are included at designated dining venues onboard the cruise; specialty dining restaurants, beverages, gratuities, and shore excursions carry extra charges if selected.</li>
                      <li>Gardens by the Bay tickets include Flower Dome & Cloud Forest; Sands SkyPark admission slots are subject to availability.</li>
                      <li>Flight details, baggage allowance, and visa/entry requirements verified based on passport nationality.</li>
                      <li>Schedules, attraction opening hours, show availability, and park maintenance are subject to management changes.</li>
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
                            <td className="py-2.5 px-3 font-semibold text-white">Airport → Singapore Hotel</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Private AC Vehicle</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Night Safari / City Tour / Gardens / SkyPark / Sentosa / Universal Studios</td>
                            <td className="py-2.5 px-3 text-amber-300 font-medium">SIC / Shared Coach</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Singapore Hotel → Cruise Terminal</td>
                            <td className="py-2.5 px-3 text-slate-300">Arranged / Included Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Cruise Terminal → Singapore Airport</td>
                            <td className="py-2.5 px-3 text-slate-300">Arranged / Included Transfer</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 font-semibold text-white">Flight Tickets</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-medium">Return Economy Class</td>
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
                <InlineEnquiryForm initialPackageTitle="Singapore with Luxury Cruise (06N/07D)" source="singapore_cruise_itinerary_page" />
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
