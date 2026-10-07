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

export const Route = createFileRoute("/europe-itinerary")({
  head: () => ({
    meta: [
      { title: "Grand Europe Highlights (8 Days / 7 Nights) | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Paris Eiffel Tower, Swiss Alps Mt. Titlis cable car, Lucerne Lake & Venice Canals with SFM Travels. 4-Star hotels with Schengen visa assistance.",
      },
    ],
  }),
  component: EuropeItineraryPage,
});

const INCLUSIONS = [
  "07 Nights accommodation in 4-Star Hotels (Paris, Lucerne & Venice)",
  "Daily Continental Breakfast at Hotels",
  "Return Economy Class International Flights",
  "2nd Class High-Speed Train Tickets (TGV / Eurocity Rail)",
  "Eiffel Tower 2nd Level Entry & Seine River Cruise Pass",
  "Mount Titlis Cable Car Excursion with Ice Flyer",
  "Venice Gondola Ride & Murano Glass Factory Tour",
  "Private Airport & Railway Station Transfers",
  "Schengen Visa Assistance & Travel Insurance Included",
];

const HIGHLIGHTS = [
  { icon: Hotel, title: "4-Star Hotels", desc: "7 Nights Europe Stay" },
  { icon: Utensils, title: "Daily Breakfast", desc: "Continental Buffet" },
  { icon: Plane, title: "Flights Included", desc: "Return International" },
  { icon: Car, title: "High-Speed Rail", desc: "TGV & Scenic Trains" },
  { icon: Ticket, title: "Eiffel & Mt. Titlis", desc: "All Entry Passes" },
];

export function EuropeItineraryPage() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const priceInr = 129999;
  const whatsappNumber = "919999779351";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi SFM Travels! I want to book / inquire about the Grand Europe Highlights (8 Days / 7 Nights, ₹1,29,999/person) package."
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
              <span className="text-amber-400 font-semibold">Europe</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Europe Special • 4★ Experience
                  </span>
                  <span className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    07 Nights / 08 Days
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Grand Europe Highlights
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Embark on an iconic European journey spanning Paris, Switzerland, and Venice. Marvel at the Eiffel Tower, ride mountain cable cars up Mt. Titlis in snow, glide along Venetian canals on a private gondola, and immerse yourself in classic European charm.
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
                      Includes Paris, Swiss Alps, Venice & Rail Pass
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
                    <span>Best Price Guaranteed • Schengen Visa Support</span>
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
            <div className="lg:col-span-8">
              {activeTab === "itinerary" && (
                <div className="space-y-8">
                  {/* Day 1 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 01</span>
                      <h3 className="text-xl font-bold text-white">Arrival in Paris & Evening Illumination</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Arrive at Paris Charles de Gaulle Airport. Private transfer to your 4-star Paris hotel. Check in and relax. In the evening, enjoy a scenic drive past illuminated landmarks including Arc de Triomphe and Champs-Élysées.
                    </p>
                  </div>

                  {/* Day 2 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 02</span>
                      <h3 className="text-xl font-bold text-white">Eiffel Tower Summit & Seine River Cruise</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Visit Eiffel Tower's 2nd level for panoramic views across Paris. Next, take a 1-hour relaxing cruise on the Seine River passing Notre Dame Cathedral and Louvre Museum. Afternoon free for shopping at Galeries Lafayette.
                    </p>
                  </div>

                  {/* Day 3 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 03</span>
                      <h3 className="text-xl font-bold text-white">High-Speed TGV Train to Switzerland (Lucerne)</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Board the high-speed TGV train from Paris to Basel / Zurich and transfer to scenic Lucerne. Check in to your Swiss hotel. Walk across Chapel Bridge and see the Lion Monument overlooking the lake.
                    </p>
                  </div>

                  {/* Day 4 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 04</span>
                      <h3 className="text-xl font-bold text-white">Mount Titlis Rotair Cable Car & Glacier Cave</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Excursion to Engelberg and board the world's first revolving cable car, Titlis Rotair, to 10,000 ft. Experience perpetual snow, walk the Cliff Walk suspension bridge, and ride the Ice Flyer chairlift.
                    </p>
                  </div>

                  {/* Day 5 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 05</span>
                      <h3 className="text-xl font-bold text-white">Scenic Alpine Train to Venice, Italy</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Travel aboard the Eurocity scenic train through the Swiss Alps and Italian lakes into Venice, Italy. Check in to your hotel. Relax with an evening walk around Saint Mark's Square.
                    </p>
                  </div>

                  {/* Day 6 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 06</span>
                      <h3 className="text-xl font-bold text-white">Venice Gondola Ride & Murano Glass Factory</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Guided walking tour of Venice including Doge's Palace, Bridge of Sighs, and St. Mark's Basilica. Enjoy a traditional Venetian Gondola ride through canals, followed by a Murano glass blowing demonstration.
                    </p>
                  </div>

                  {/* Day 7 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 07</span>
                      <h3 className="text-xl font-bold text-white">Leisure Shopping & Venetian Canals</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Free day for leisure, shopping for authentic Venetian masks and leather goods, or taking an optional boat trip to Burano island.
                    </p>
                  </div>

                  {/* Day 8 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl uppercase">DAY 08</span>
                      <h3 className="text-xl font-bold text-white">Departure from Venice Airport</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Enjoy breakfast at the hotel. Private water taxi / transfer to Venice Marco Polo Airport for return flight home.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Package Inclusions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INCLUSIONS.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Transfers & Visa Info</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Inter-city Rail:</strong> 2nd Class high-speed TGV & Eurocity reserved train tickets.<br />
                    <strong>Transfers:</strong> Private airport transfers & Venetian water taxis.<br />
                    <strong>Visa Assistance:</strong> Complete Schengen Visa documentation & appointment support included.
                  </p>
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
                  Want to add Rome, Amsterdam, or Jungfraujoch? Send us a message for a custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle="Grand Europe Highlights" source="europe_itinerary_page" />
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
