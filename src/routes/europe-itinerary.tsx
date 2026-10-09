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

export const Route = createFileRoute("/europe-itinerary")({
  head: () => ({
    meta: [
      { title: "Europe Packages: Paris & Swiss Alps | SFM Travels" },
      {
        name: "description",
        content:
          "Explore Paris & Swiss Alps Special (06N/07D) with Eiffel Tower Summit, Disneyland, Swiss Travel Pass, Mount Titlis & Lindt Chocolate by SFM Travels.",
      },
    ],
  }),
  component: EuropeItineraryPage,
});

const PARIS_SWISS_PACKAGE = {
  id: "paris-swiss",
  title: "Paris & Swiss Alps",
  subtitle: "Paris • Switzerland • Landmarks, Disneyland, Swiss Travel Pass & Alpine Peaks",
  duration: "06 Nights / 07 Days",
  hotelsSummary: "03 Nights Paris + 03 Nights Switzerland (Bern/Zurich 4★ Hotels)",
  priceInr: 119999,
  rating: 4.9,
  reviewsCount: 540,
  badge: "Best Seller Europe Combo",
  overview:
    "A memorable journey through Parisian landmarks, scenic Swiss railways, Alpine peaks, lakes and chocolate experiences. Features prebooked Eiffel Tower summit lift access, Seine River Cruise, Disneyland Paris 1 Day/1 Park pass, high-speed train to Switzerland, 3-consecutive-day Swiss Travel Pass, Mount Titlis cable car, Lake Lucerne cruise, Lindt Home of Chocolate, and Rhine Falls.",
  highlights: [
    { icon: Building, title: "Eiffel & Disneyland", desc: "Summit Lift & Theme Park" },
    { icon: Train, title: "High-Speed Rail", desc: "TGV Paris to Switzerland" },
    { icon: Mountain, title: "Mount Titlis Peak", desc: "Cable Car & Glacier Cave" },
    { icon: Waves, title: "Lake Lucerne Cruise", desc: "Scenic Swiss Waterway" },
    { icon: Utensils, title: "Lindt Chocolate", desc: "Fountain & Museum Pass" },
  ],
  inclusions: [
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
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Paris – City of Lights Welcome",
      desc: "Arrive at Paris International Airport (CDG/ORY), meet your private driver guide and transfer comfortably to your 4-star city hotel. Check in and relax. Spend the remainder of your day at leisure taking in the historic cafés, Haussmann architecture, and romantic atmosphere of Paris. Overnight in Paris.",
      tags: ["Private Airport Transfer", "Paris Arrival", "City of Lights"],
    },
    {
      day: 2,
      title: "Paris Hop-On Hop-Off City Tour, Seine River Cruise & Eiffel Tower Summit",
      desc: "After breakfast, explore Paris at your own pace using the Hop-On Hop-Off sightseeing bus. View iconic landmarks including Louvre Museum, Arc de Triomphe, Champs-Élysées, and Place de la Concorde. Enjoy a 1-hour Seine River Cruise sailing beneath historic bridges past riverside monuments. Ascend by lift to the Eiffel Tower Summit for breathtaking 360-degree panoramic views of Paris. Overnight in Paris.",
      tags: ["Hop-On Hop-Off Bus", "Seine River Cruise", "Eiffel Tower Summit Lift", "Arc de Triomphe"],
    },
    {
      day: 3,
      title: "Full Day Disneyland Paris Adventure (1 Day / 1 Park Pass)",
      desc: "After breakfast, travel to Disneyland Paris. Enjoy a full magical day at Disneyland Park with your included 1 Day / 1 Park pass. Step into fairytale lands: Main Street U.S.A., Fantasyland, Adventureland, Discoveryland, and Frontierland. Enjoy family rides, movie-inspired attractions, Disney character meet-and-greets, and spectacular evening shows. Return to hotel. Overnight in Paris.",
      tags: ["Disneyland Paris 1 Day Pass", "Fantasyland Rides", "Disney Parade & Shows"],
    },
    {
      day: 4,
      title: "High-Speed Train from Paris to Switzerland & Bern Old Town",
      desc: "Check out after breakfast and transfer to Paris railway station. Board your high-speed TGV train across the French countryside to Geneva or Basel (approx. 3 hrs). Continue via Swiss scenic rail to your confirmed 4-star hotel in Bern or Zurich. If time permits, explore the UNESCO World Heritage Bern Old Town with its medieval clock towers and arcade streets. Overnight in Switzerland.",
      tags: ["High-Speed TGV Train", "Paris to Switzerland", "Swiss Travel Pass", "Bern Old Town"],
    },
    {
      day: 5,
      title: "Mount Titlis Cable Car Excursion & Scenic Lake Lucerne Cruise",
      desc: "After breakfast, travel by Swiss public transport towards Engelberg. Ascend Mount Titlis via revolving TITLIS Rotair cable car up to 3,020 meters elevation. Walk across the thrilling Titlis Cliff Walk (Europe's highest suspension bridge), explore the natural Glacier Cave, and enjoy snow panoramas. Later, travel to Lucerne and board a scenic Lake Lucerne Cruise across mountain-framed blue waters. Overnight in Switzerland.",
      tags: ["Mount Titlis Cable Car", "Glacier Cave", "Titlis Cliff Walk", "Lake Lucerne Cruise"],
    },
    {
      day: 6,
      title: "Lindt Home of Chocolate, Zurich Old Town & Rhine Falls",
      desc: "After breakfast, travel by public transport to Kilchberg for the Lindt Home of Chocolate museum. Marvel at the 9-meter chocolate fountain, learn Swiss chocolate history, and enjoy interactive tastings. Next, walk through Zurich's historic Old Town along the Limmat River and Bahnhofstrasse shopping avenue. Continue to Rhine Falls near Schaffhausen to witness Europe's most powerful waterfall. Return to hotel. Overnight in Switzerland.",
      tags: ["Lindt Chocolate Museum", "Zurich Old Town", "Limmat River", "Rhine Falls Waterfall"],
    },
    {
      day: 7,
      title: "Departure from Switzerland",
      desc: "Enjoy breakfast at your hotel, check out, and take your private airport transfer to Zurich or Geneva Airport. Board your return economy-class flight home, carrying magical memories of Paris and the Swiss Alps.",
      tags: ["Hotel Check-out", "Private Airport Transfer", "Return Flight"],
    },
  ],
  transfers: [
    { journey: "Paris Arrival Airport → Hotel", arrangement: "Private AC Vehicle Transfer" },
    { journey: "Paris City Sightseeing & Disneyland", arrangement: "Hop-On Hop-Off Bus & Public Transport" },
    { journey: "Paris → Geneva or Basel", arrangement: "High-Speed TGV Train (2nd Class Ticket)" },
    { journey: "Swiss Travel Pass", arrangement: "3 Consecutive Days (2nd Class Pass Included)" },
    { journey: "Mount Titlis Cable Car", arrangement: "Public Rail + Summit Cable Car Pass" },
    { journey: "Lake Lucerne Cruise", arrangement: "Scheduled Lake Steamer Cruise Pass" },
    { journey: "Switzerland Hotel → Airport Departure", arrangement: "Private AC Vehicle Transfer" },
  ],
  importantNotes: [
    "The Swiss Travel Pass covers 3 consecutive days for public trains, buses, and boats across Switzerland.",
    "Mount Titlis cable car pass and Lake Lucerne cruise tickets are included in the contracted package.",
    "Eiffel Tower summit lift access, Disneyland Paris 1 Day/1 Park, and Lindt Chocolate tickets carry confirmed timed-entry slots.",
    "Self-guided sightseeing using Swiss public transport network with 24/7 travel coordination support.",
  ],
};

const GRAND_EUROPE_PACKAGE = {
  id: "grand-europe",
  title: "Grand Europe Highlights",
  subtitle: "Paris • Swiss Alps • Lucerne • Zurich • Rhine Falls • Venice Canals",
  duration: "07 Nights / 08 Days",
  hotelsSummary: "03N Paris + 02N Lucerne/Zurich + 02N Venice (4-Star Hotels)",
  priceInr: 139999,
  rating: 5.0,
  reviewsCount: 610,
  badge: "Grand European Highlights",
  overview:
    "An extended 8-day European journey taking you through Paris, the majestic Swiss Alps, Lucerne, Zurich, Rhine Falls, and romantic Venice. Features Eiffel Tower access, Seine River Cruise, High-Speed Eurail passes, Mt. Titlis cable car, and Venice Gondola ride.",
  highlights: [
    { icon: Building, title: "Paris Landmarks", desc: "Eiffel Tower & Seine Cruise" },
    { icon: Mountain, title: "Swiss Alps", desc: "Mt. Titlis & Lucerne Lake" },
    { icon: Waves, title: "Venice Canals", desc: "Gondola Ride & St. Mark's" },
    { icon: Train, title: "Eurail High-Speed", desc: "TGV & Scenic Express Trains" },
    { icon: Plane, title: "Flights Included", desc: "Return International Airfare" },
  ],
  inclusions: [
    "07 Nights accommodation in 4-Star Hotels (Paris, Lucerne & Venice)",
    "Daily Buffet Breakfast at all hotels",
    "Return International Economy-Class Flights",
    "2nd Class High-Speed Train Passes (Paris - Switzerland - Italy)",
    "Eiffel Tower Access Ticket & Seine River Cruise Pass",
    "Mount Titlis Cable Car Excursion with Ice Flyer Chairlift",
    "Lake Lucerne Steamer Cruise",
    "Rhine Falls Viewpoint Excursion",
    "Venice Gondola Ride & Murano Glass Demonstration",
    "Private Airport Transfers in Paris & Venice",
    "Schengen Visa Processing Assistance & Travel Insurance",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Paris • City Center Check-In",
      desc: "Arrive at Paris Airport, meet your private driver, and transfer to your 4-star hotel. Evening free to explore Champs-Élysées or enjoy traditional French bistro dining. Overnight in Paris.",
      tags: ["Private Airport Transfer", "Paris Hotel Check-in", "Champs-Élysées"],
    },
    {
      day: 2,
      title: "Paris Sightseeing, Eiffel Tower Access & Seine Cruise",
      desc: "Full-day Paris sightseeing tour. Visit Louvre Museum exterior, Notre-Dame Cathedral, Arc de Triomphe, and Eiffel Tower. Sail along the Seine River on an evening sightseeing cruise. Overnight in Paris.",
      tags: ["Eiffel Tower Access", "Seine River Cruise", "Louvre Museum", "Arc de Triomphe"],
    },
    {
      day: 3,
      title: "Disneyland Paris or Versailles Palace Excursion",
      desc: "Choice of a full day at Disneyland Paris Park or guided excursion to Palace of Versailles gardens and royal apartments. Evening free in Montmartre. Overnight in Paris.",
      tags: ["Disneyland Paris", "Versailles Palace", "Montmartre"],
    },
    {
      day: 4,
      title: "High-Speed Rail Paris to Switzerland (Lucerne)",
      desc: "Board high-speed TGV Lyria train from Paris to Basel/Zurich, continuing to Lucerne. Walk across Chapel Bridge and see the Lion Monument. Overnight in Lucerne.",
      tags: ["TGV High-Speed Rail", "Lucerne Arrival", "Chapel Bridge"],
    },
    {
      day: 5,
      title: "Mount Titlis Snow Summit & Lake Lucerne Cruise",
      desc: "Excursion to Engelberg for Mt. Titlis Rotair revolving cable car, Ice Flyer chairlift, and Glacier Cave. Afternoon Lake Lucerne cruise. Overnight in Lucerne/Zurich.",
      tags: ["Mt Titlis Rotair", "Ice Flyer", "Glacier Cave", "Lake Lucerne Cruise"],
    },
    {
      day: 6,
      title: "Zurich, Rhine Falls & Scenic Train to Venice",
      desc: "Morning visit to Rhine Falls waterfall near Schaffhausen. Board scenic Eurocity train through Swiss Alps and Italian Lakes down to Venice. Overnight in Venice.",
      tags: ["Rhine Falls", "Zurich Old Town", "Eurocity Scenic Train", "Venice Arrival"],
    },
    {
      day: 7,
      title: "Venice Gondola Ride, St. Mark's Square & Murano Glass",
      desc: "Guided walking tour of St. Mark's Square, Doge's Palace exterior, and Bridge of Sighs. Enjoy an authentic Venetian Gondola ride through romantic canals. Murano glass factory demo. Overnight in Venice.",
      tags: ["Venice Gondola Ride", "St. Mark's Square", "Doge's Palace", "Murano Glass"],
    },
    {
      day: 8,
      title: "Departure from Venice",
      desc: "Breakfast, check out, and private transfer by water taxi / vehicle to Venice Marco Polo Airport for return flight home.",
      tags: ["Hotel Check-out", "Venice Airport Transfer", "Return Flight"],
    },
  ],
  transfers: [
    { journey: "Paris Arrival Airport → Hotel", arrangement: "Private AC Vehicle" },
    { journey: "Paris City Tour & Eiffel Access", arrangement: "Included Sightseeing Pass" },
    { journey: "Paris → Lucerne / Zurich Rail", arrangement: "High-Speed TGV Train Pass" },
    { journey: "Swiss Mountain & Lake Sightseeing", arrangement: "Public Rail & Cable Car Passes" },
    { journey: "Zurich → Venice Rail", arrangement: "Scenic Eurocity Rail Ticket" },
    { journey: "Venice Airport Departure", arrangement: "Private Vehicle / Water Taxi" },
  ],
  importantNotes: [
    "Schengen Visa required for Indian passport holders (complete processing assistance provided).",
    "Swiss Travel Pass & Eurocity rail tickets issued in advance with seat reservations.",
    "Mount Titlis Rotair cable car and Venice Gondola ride passes guaranteed in package.",
  ],
};

export function EuropeItineraryPage() {
  const { formatPrice } = useCurrency();
  const [selectedPkgId, setSelectedPkgId] = useState<"paris-swiss" | "grand-europe">("paris-swiss");
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "transfers">("itinerary");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const currentPkg = selectedPkgId === "paris-swiss" ? PARIS_SWISS_PACKAGE : GRAND_EUROPE_PACKAGE;

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
                Choose Your Preferred European Vacation
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Select a Europe Special Package Below
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {/* Button Package 1 */}
              <button
                onClick={() => {
                  setSelectedPkgId("paris-swiss");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "paris-swiss"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "paris-swiss"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Mountain className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Option 01
                    </span>
                    <span className="text-xs font-extrabold text-white">06N / 07D</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">
                    Paris & Swiss Alps
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    03N Paris + 03N Swiss • Eiffel Summit, Disneyland & Mt. Titlis
                  </p>
                </div>
              </button>

              {/* Button Package 2 */}
              <button
                onClick={() => {
                  setSelectedPkgId("grand-europe");
                  setActiveTab("itinerary");
                }}
                className={`p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedPkgId === "grand-europe"
                    ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    selectedPkgId === "grand-europe"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Option 02
                    </span>
                    <span className="text-xs font-extrabold text-white">07N / 08D</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white mt-0.5">
                    Grand Europe Highlights
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Paris, Swiss Alps & Venice • Eiffel, Mt Titlis & Gondola Ride
                  </p>
                </div>
              </button>
            </div>
          </div>
        </section>

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
              <span className="text-amber-400 font-semibold">{currentPkg.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
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
                    Premium Europe Offer
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
                        ✔ Includes 4★ Hotel Stay, Breakfast, Flights & High-Speed Rail
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
                        <span>100% Customized European Itinerary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Complete Schengen Visa Assistance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>24/7 On-Trip Support & Rail Coordination</span>
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
              Transport & Service Summary
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
                      <li>Schengen Visa fees and mandatory European tourist city taxes payable directly at hotels unless specified.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "transfers" && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Train className="w-5 h-5 text-amber-400" />
                      <span>Transport & Journey Arrangements ({currentPkg.title})</span>
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-amber-400 font-bold">
                            <th className="py-2.5 px-3">Journey / Leg</th>
                            <th className="py-2.5 px-3">Arrangement & Transport Basis</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {currentPkg.transfers.map((t, idx) => (
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
                  <span>Customize This Package</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Want to add Rome, Amsterdam, or extra nights in Switzerland? Send us a message for an instant custom quote.
                </p>
                <InlineEnquiryForm initialPackageTitle={currentPkg.title} source="europe_itinerary_page" />
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
