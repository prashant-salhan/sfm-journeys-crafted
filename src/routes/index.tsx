import { useState, useEffect, useRef, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Compass,
  FileCheck,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
  Clock,
  Send,
  CheckCircle2,
  Award,
  Calendar,
  Globe,
  Sun,
  Camera,
  Utensils,
} from "lucide-react";

import kashmirImage from "@/assets/sfm-kashmir.jpg";
import keralaImage from "@/assets/sfm-kerala.jpg";
import rajasthanImage from "@/assets/sfm-rajasthan.jpg";
import goaImage from "@/assets/sfm-goa.jpg";
import manaliImage from "@/assets/sfm-manali.jpg";
import heroImage from "@/assets/sfm-hero.jpg";
import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SFM Travels India | Incredible India Holidays, Kerala, Kashmir & Rajasthan Tours" },
      {
        name: "description",
        content:
          "Official India Tourism Portal. Book luxury Incredible India holiday packages, Golden Triangle tours, Kashmir snow escapes, Kerala backwater houseboats, and Goa beach vacations.",
      },
      {
        property: "og:title",
        content: "SFM Travels India | Incredible India Tourism & Custom Tour Packages",
      },
      {
        property: "og:description",
        content:
          "Discover Incredible India with SFM Travels. Best price guarantee for Kerala houseboats, Kashmir tours, Rajasthan royal palaces, and Goa beach holidays.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndiaPortal,
});

type PackageItinerary = {
  day: number;
  title: string;
  desc: string;
};

type IndiaPackage = {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  priceInr: number;
  image: string;
  badge: string;
  inclusions: string[];
  itinerary: PackageItinerary[];
};

const INDIA_PACKAGES: IndiaPackage[] = [
  {
    id: "pkg-kashmir-paradise",
    title: "Kashmir Paradise & Golden Triangle Special",
    category: "Mountain & Heritage",
    duration: "6 Days / 5 Nights",
    description:
      "Explore Delhi, Agra Taj Mahal, Srinagar Dal Lake romantic Shikara ride, Gulmarg Gondola cable car, and Pahalgam Betaab Valley.",
    priceInr: 39999,
    image: kashmirImage,
    badge: "Bestseller",
    inclusions: [
      "4★ Hotel & Houseboat Stay",
      "Daily Breakfast & Dinner",
      "Taj Mahal Sunrise Tour",
      "Dal Lake Shikara Ride",
      "Gulmarg Gondola Pass",
      "Private Cab & Airport Transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Delhi & City Tour", desc: "VIP Airport transfer. Visit Qutub Minar, India Gate, Rashtrapati Bhavan & Red Fort." },
      { day: 2, title: "Delhi to Agra & Taj Mahal Sunset", desc: "Drive to Agra via Yamuna Expressway. Guided tour of Taj Mahal at sunset and Agra Fort." },
      { day: 3, title: "Flight to Srinagar & Dal Lake Shikara Ride", desc: "Fly to Srinagar. Check-in to luxury wooden houseboat on Dal Lake. Evening romantic sunset Shikara ride." },
      { day: 4, title: "Gulmarg Snow Point & Gondola Cable Car", desc: "Excursion to Gulmarg. Ride Asia's highest Gondola cable car up to Apharwat peak for skiing & snow views." },
      { day: 5, title: "Pahalgam Valley of Shepherds & Betaab Valley", desc: "Visit Pahalgam, Aru Valley, Betaab Valley, and Lidder River bank walks." },
      { day: 6, title: "Srinagar Departure", desc: "Check out after breakfast and private drop-off at Srinagar Airport." },
    ],
  },
  {
    id: "pkg-kerala-backwaters",
    title: "Kerala Backwaters & Houseboat Sanctuary",
    category: "Backwaters & Nature",
    duration: "5 Days / 4 Nights",
    description:
      "Serene Kerala tour covering Cochin heritage, Munnar tea garden hills, Thekkady spice plantations, and Alleppey private luxury houseboat cruise.",
    priceInr: 28999,
    image: keralaImage,
    badge: "Trending",
    inclusions: [
      "4★ Resort & Houseboat Stay",
      "Daily Breakfast & Houseboat Meals",
      "Alleppey Private Houseboat Cruise",
      "Munnar Tea Plantation Tour",
      "Kathakali Cultural Show",
      "Cochin Airport Transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cochin & Transfer to Munnar", desc: "Airport pickup and scenic drive to Munnar. Enroute visit Cheeyappara and Valara waterfalls." },
      { day: 2, title: "Full Day Munnar Tea Gardens & Eravikulam", desc: "Visit Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Echo Point, and Tea Museum." },
      { day: 3, title: "Munnar to Thekkady Spice Plantation", desc: "Drive to Thekkady. Spice garden tour, elephant ride, and Periyar lake boat safari." },
      { day: 4, title: "Thekkady to Alleppey Luxury Houseboat", desc: "Board your private luxury houseboat in Alleppey. Cruise through narrow backwater canals with fresh Kerala meals." },
      { day: 5, title: "Departure from Cochin", desc: "Houseboat breakfast, checkout, and drop-off at Cochin Airport." },
    ],
  },
  {
    id: "pkg-rajasthan-royal",
    title: "Royal Rajasthan Forts & Thar Desert Glamping",
    category: "Royal Heritage",
    duration: "6 Days / 5 Nights",
    description:
      "Experience royal majesty in Jaipur Pink City forts, Jodhpur Mehrangarh, Udaipur Lake Palace, and Thar Desert glamping with camel safari.",
    priceInr: 34999,
    image: rajasthanImage,
    badge: "Royal Special",
    inclusions: [
      "4★ Heritage Haveli Stay",
      "Thar Desert Swiss Tent Camp",
      "Camel Safari & Dune Bashing",
      "Folk Dance & Rajasthani BBQ",
      "Lake Pichola Sunset Boat Ride",
      "Intercity Transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur (Pink City)", desc: "Airport/Station pickup. Evening visit to Chokhi Dhani cultural village for authentic Rajasthani thali dinner." },
      { day: 2, title: "Jaipur Forts & Palaces Sightseeing", desc: "Jeep ride up Amber Fort, photo stop at Hawa Mahal, Jal Mahal, and guided tour of City Palace & Jantar Mantar." },
      { day: 3, title: "Jaipur to Jodhpur (Blue City)", desc: "Drive to Jodhpur. Explore Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace." },
      { day: 4, title: "Jodhpur to Jaisalmer Thar Desert Camp", desc: "Drive to Jaisalmer. Evening 4x4 dune bashing, camel safari, Kalbelia folk dance, and glamping under desert stars." },
      { day: 5, title: "Jaisalmer Golden Fort & Transfer to Udaipur", desc: "Explore Sonar Qila (Living Fort) and Patwon Ki Haveli. Transfer to Udaipur (City of Lakes)." },
      { day: 6, title: "Udaipur Lake Pichola & Departure", desc: "Romantic boat ride at Lake Pichola, Jagmandir visit, and drop-off at Udaipur Airport." },
    ],
  },
  {
    id: "pkg-goa-beaches",
    title: "Goa Sun, Sand & Sunset Cruise Escape",
    category: "Beach & Nightlife",
    duration: "4 Days / 3 Nights",
    description:
      "Relax on Goa's finest beaches, experience Dudhsagar waterfall jeep safari, Old Goa heritage churches, and Mandovi river sunset cruise.",
    priceInr: 22999,
    image: goaImage,
    badge: "Beach Favorite",
    inclusions: [
      "4★ Beach Resort near Calangute",
      "Daily Breakfast",
      "North & South Goa Tour",
      "Dudhsagar Waterfall Jeep Safari",
      "Mandovi River Sunset Cruise",
      "Airport / Railway Transfers",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Goa & Beach Relaxation", desc: "Airport pickup & welcome drinks at resort. Evening walk at Calangute beach & Baga market." },
      { day: 2, title: "North Goa Beaches & Fort Aguada", desc: "Visit Fort Aguada, Chapora Fort (Dil Chahta Hai point), Anjuna, Vagator & Baga water sports." },
      { day: 3, title: "South Goa Heritage & Sunset Cruise", desc: "Explore Basilica of Bom Jesus, Se Cathedral, Mangueshi Temple, and evening Mandovi River sunset cruise with music." },
      { day: 4, title: "Departure", desc: "Hotel checkout and transfer to Goa Airport (GOI/GOX) or Madgaon station." },
    ],
  },
  {
    id: "pkg-manali-snow",
    title: "Himachal Snow Peaks & Solang Valley Tour",
    category: "Mountain Adventure",
    duration: "6 Days / 5 Nights",
    description:
      "Scenic mountain retreat through Shimla Mall Road, Kufri snow point, Kullu river rafting, and Manali Solang Valley & Atal Tunnel.",
    priceInr: 26999,
    image: manaliImage,
    badge: "Mountain Escape",
    inclusions: [
      "3★/4★ Mountain View Hotel",
      "Daily Breakfast & Dinner",
      "Shimla & Kufri Sightseeing",
      "Solang Valley Snow Point Pass",
      "Atal Tunnel & Sissu Excursion",
      "Private Cab Transfers",
    ],
    itinerary: [
      { day: 1, title: "Pickup from Delhi/Chandigarh & Shimla Drive", desc: "Drive to Shimla via Himalayan expressway. Check-in to hill resort." },
      { day: 2, title: "Shimla Local Tour & Kufri Snow Point", desc: "Visit Kufri horse riding point, Ridge, Christ Church, and Mall Road shopping." },
      { day: 3, title: "Shimla to Manali via Kullu Valley", desc: "Scenic drive past Pandoh Dam, Kullu Shawl Factory, and white-water rafting point." },
      { day: 4, title: "Solang Valley Snow Adventure & Atal Tunnel", desc: "Excursion to Solang Valley for paragliding, zorbing, snow scooter rides, and crossing Atal Tunnel to Sissu." },
      { day: 5, title: "Manali Local Sights & Vashisht Springs", desc: "Visit Hadimba Temple, Club House, Vashisht hot springs, and Tibetan Monastery." },
      { day: 6, title: "Return Drop to Chandigarh/Delhi", desc: "Drive back with fond Himalayan memories for evening drop." },
    ],
  },
];

const INDIA_REGIONS = [
  { name: "North India & Himalayas", location: "Kashmir, Himachal, Golden Triangle, Ladakh", desc: "Majestic snow peaks, Taj Mahal, hill stations, and ancient heritage." },
  { name: "South India & Tropics", location: "Kerala, Munnar, Coorg, Hampi, Rameshwaram", desc: "Emerald backwaters, lush tea estates, palm groves, and grand Dravidian temples." },
  { name: "West & Royal Rajasthan", location: "Jaipur, Udaipur, Jaisalmer Desert, Goa", desc: "Royal fortresses, Thar desert camel glamping, and sun-kissed beaches." },
  { name: "East & North-East", location: "Darjeeling, Sikkim, Meghalaya, Assam", desc: "Living root bridges, tea gardens, Kaziranga rhinos, and Himalayan monasteries." },
];

declare global {
  interface Window {
    __SFM_API_URL__?: string;
  }
}

const getApiBase = () => {
  if (typeof window !== "undefined" && window.__SFM_API_URL__) {
    return window.__SFM_API_URL__;
  }
  let url = (import.meta.env["VITE_API_URL"] as string | undefined) || "";
  if (url.includes("api.sfmtravels.co.in")) url = "";
  if (url) return url;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:5000";
  }
  return "";
};

export function IndiaPortal() {
  const { formatPrice } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Enquiry Modal States
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<IndiaPackage | null>(null);
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<IndiaPackage | null>(null);

  // Auto-pop enquiry modal 1.5 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasClosedBefore = sessionStorage.getItem("sfm_india_enquiry_opened");
      if (!hasClosedBefore) {
        sessionStorage.setItem("sfm_india_enquiry_opened", "true");
        setEnquiryModalOpen(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseEnquiryModal = () => {
    setEnquiryModalOpen(false);
    sessionStorage.setItem("sfm_india_enquiry_opened", "true");
  };

  const handleOpenEnquiryForPkg = (pkg: IndiaPackage) => {
    setSelectedPackage(pkg);
    setEnquiryModalOpen(true);
  };

  const filteredPackages = INDIA_PACKAGES.filter((pkg) => {
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "north"
        ? pkg.category.toLowerCase().includes("mountain") || pkg.category.toLowerCase().includes("heritage")
        : activeTab === "kerala"
        ? pkg.category.toLowerCase().includes("backwaters")
        : activeTab === "rajasthan"
        ? pkg.category.toLowerCase().includes("royal")
        : activeTab === "goa"
        ? pkg.category.toLowerCase().includes("beach")
        : true;

    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 w-full max-w-full overflow-x-hidden">
      {/* Top Banner Contact Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-semibold py-2 px-4 flex flex-wrap justify-between items-center z-50">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Incredible India Tourism Specialists — Best Price Guarantee
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Approved India Tour Operator & E-Visa Assistance
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+919876543210" className="hover:underline flex items-center gap-1">
            <Phone className="w-3 h-3" /> +91 98765 43210
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20India%20trip!"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1 font-bold"
          >
            💬 WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 sm:h-12 w-auto object-contain" />
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white block">
                SFM <span className="text-amber-400">INDIA</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-semibold block">
                Incredible India Tourism Portal
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-300">
            <a href="#packages" className="hover:text-amber-400 transition-colors">
              India Packages
            </a>
            <a href="#regions" className="hover:text-amber-400 transition-colors">
              Regions & Circuits
            </a>
            <a href="#essentials" className="hover:text-amber-400 transition-colors">
              Travel Essentials
            </a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">
              Why Choose Us
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <CurrencySelector />
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" /> Plan My India Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 font-medium hover:text-amber-400"
            >
              India Packages
            </a>
            <a
              href="#regions"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 font-medium hover:text-amber-400"
            >
              Regions & Circuits
            </a>
            <a
              href="#essentials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 font-medium hover:text-amber-400"
            >
              Travel Essentials
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 font-medium hover:text-amber-400"
            >
              Why Choose Us
            </a>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <CurrencySelector />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-full text-xs"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 px-4">
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Incredible India TourismTaj Mahal & Himalayas"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4" /> Official Incredible India Tourism Portal
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">INCREDIBLE INDIA</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Experience royal Rajasthan palaces, Kashmir paradise snow peaks, Kerala backwater houseboats, Goa tropical beaches, and Golden Triangle heritage tours.
          </p>

          {/* Quick Search & Filter Widget */}
          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl max-w-3xl mx-auto shadow-2xl space-y-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center border-b border-slate-800 pb-3">
              {[
                { id: "all", label: "All India Tours" },
                { id: "north", label: "Kashmir & Himalayas" },
                { id: "kerala", label: "Kerala Backwaters" },
                { id: "rajasthan", label: "Royal Rajasthan" },
                { id: "goa", label: "Goa & Beaches" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Input & Action */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <label htmlFor="sfm_search_query" className="sr-only">Search India Destinations</label>
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  id="sfm_search_query"
                  name="searchQuery"
                  type="text"
                  aria-label="Search destinations"
                  placeholder="Search destinations, e.g. Kashmir, Houseboat, Taj Mahal, Goa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shrink-0"
              >
                Get Custom Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Highlights Badges */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> 100% Best Rate Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Custom Private Itineraries
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> 24/7 On-Ground India Support
            </span>
          </div>
        </div>
      </section>

      {/* Curated India Packages Section */}
      <section id="packages" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            JNTO-Inspired Curated Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Handcrafted India Holiday Packages
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            All packages include luxury accommodations, private cab transfers, daily breakfast, sightseeing passes, and 24/7 dedicated local tour guides.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group flex flex-col"
            >
              {/* Image & Badge */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {pkg.badge}
                </span>
                <span className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {pkg.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                    {pkg.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Inclusions List */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 block">Package Inclusions:</span>
                  <div className="flex flex-wrap gap-2">
                    {pkg.inclusions.map((inc, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-amber-400" /> {inc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider block">Starting From</span>
                    <span className="text-2xl font-extrabold text-amber-400">
                      {formatPrice(pkg.priceInr)}
                    </span>
                    <span className="text-slate-400 text-xs"> / person</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItineraryPkg(pkg)}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => handleOpenEnquiryForPkg(pkg)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-md shadow-amber-500/10"
                    >
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regions of India (JNTO Explorer Section) */}
      <section id="regions" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
              <Globe className="w-4 h-4" /> Regions & Circuits
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore India by Regions & Experiences
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              From snow-capped Himalayan peaks in the North to emerald backwaters in the South, choose your destination circuit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDIA_REGIONS.map((reg, i) => (
              <div
                key={i}
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">{reg.name}</span>
                  <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-white">{reg.location}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{reg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Essentials & JNTO India Guide */}
      <section id="essentials" className="py-24 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Traveler's Handbook
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            India Travel Essentials & Tips
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <Sun className="w-10 h-10 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Best Season to Visit</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>October to March:</strong> Ideal season for Golden Triangle, Rajasthan deserts, Kerala backwaters, and beaches.  
              <strong>April to July:</strong> Best time for Himalayan snow points in Kashmir, Ladakh, and Himachal.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <Camera className="w-10 h-10 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Culture & Etiquette</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              India warmly welcomes guests with <em>"Atithi Devo Bhava"</em> (Guest is God). Modest attire is appreciated at spiritual shrines, temples, and heritage monuments.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <Utensils className="w-10 h-10 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Cuisine & Hospitality</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Experience authentic Mughlai kebabs in North India, Rajasthani Royal Thali, spicy Goa seafood, and traditional Kerala Sadhya served on banana leaves.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 px-4 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Why SFM Travels India
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Your Trusted Incredible India Destination Specialist
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Direct Rates Guarantee</h3>
              <p className="text-slate-400 text-xs">Direct contracting with 4★/5★ luxury resorts & verified houseboat owners.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <Clock className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white text-base">24/7 On-Ground Support</h3>
              <p className="text-slate-400 text-xs">Dedicated India tour manager assisting you from arrival to final drop.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <FileCheck className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Verified Cab Drivers</h3>
              <p className="text-slate-400 text-xs">Professional, uniform-clad local drivers with well-maintained air-conditioned vehicles.</p>
            </div>
            <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
              <Users className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-bold text-white text-base">50,000+ Happy Guests</h3>
              <p className="text-slate-400 text-xs">Over 10 years of experience creating unforgettable journeys across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Quick Enquiry Section on Page */}
      <section id="enquiry" className="py-20 px-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-y border-amber-500/30">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> Direct India Travel Quote
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Request Your Custom India Itinerary
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
              Fill out your travel details below and our senior India holiday specialist will craft a personalized itinerary with instant discounts.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-700 p-6 sm:p-10 rounded-3xl shadow-2xl text-left">
            <InlineEnquiryForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 w-auto" />
              <span className="text-lg font-bold text-white">SFM INDIA</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              SFM Travels India is a licensed Destination Management Company specializing in Incredible India tour packages, Kerala houseboats, Kashmir snow holidays, and Rajasthan palace tours.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#packages" className="hover:text-amber-400">India Packages</a></li>
              <li><a href="#regions" className="hover:text-amber-400">Regions & Circuits</a></li>
              <li><a href="#enquiry" className="hover:text-amber-400 font-bold text-amber-400">Get Free Quote</a></li>
              <li><a href="#essentials" className="hover:text-amber-400">Travel Essentials</a></li>
              <li><a href="#why-us" className="hover:text-amber-400">Why Choose Us</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">India Operations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connaught Place, New Delhi, India - 110001
            </p>
            <p className="text-xs text-slate-400">Call: +91 98765 43210</p>
            <p className="text-xs text-slate-400">Email: info@sfmtravels.co.in</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Custom Plan?</h4>
            <p className="text-xs text-slate-400">
              Speak to our senior India travel consultant on WhatsApp for instant customized itineraries.
            </p>
            <a
              href="#enquiry"
              className="inline-block bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SFM Travels India. All rights reserved. Hosted on sfmtravels.co.in
        </div>
      </footer>

      {/* Floating WhatsApp Agent */}
      <a
        href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20India%20trip!"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all flex items-center justify-center group"
      >
        <Send className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </a>

      {/* Auto-Popping Fast Enquiry Modal */}
      <FastEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={handleCloseEnquiryModal}
        initialPackageTitle={selectedPackage?.title}
      />

      {/* Day-by-Day Itinerary Modal */}
      {selectedItineraryPkg && (
        <div className="fixed inset-0 z-[99998] overflow-y-auto p-4 sm:p-6 flex items-center justify-center min-h-screen">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedItineraryPkg(null)}
          />

          {/* Modal Card */}
          <div
            className="relative z-10 bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItineraryPkg(null)}
              type="button"
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                JNTO-Style Day-by-Day Tour Itinerary
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                {selectedItineraryPkg.title}
              </h3>
              <p className="text-slate-400 text-xs">
                {selectedItineraryPkg.duration} | {selectedItineraryPkg.category}
              </p>
            </div>

            <div className="space-y-4 relative border-l-2 border-amber-500/30 pl-6 ml-2">
              {selectedItineraryPkg.itinerary.map((item) => (
                <div key={item.day} className="relative space-y-1">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900" />
                  <span className="text-xs font-bold text-amber-400 block">DAY {item.day}</span>
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px] block">Price Per Person</span>
                <span className="text-xl font-extrabold text-amber-400">
                  {formatPrice(selectedItineraryPkg.priceInr)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const pkg = selectedItineraryPkg;
                  setSelectedItineraryPkg(null);
                  handleOpenEnquiryForPkg(pkg);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors"
              >
                Book This Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InlineEnquiryForm({ initialPackageTitle }: { initialPackageTitle?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2 Travellers (Couple)");
  const [destinationPkg, setDestinationPkg] = useState(initialPackageTitle || "Incredible India Holiday Package");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (initialPackageTitle) {
      setDestinationPkg(initialPackageTitle);
    }
  }, [initialPackageTitle]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanDate = travelDate.trim();
    const cleanTravellers = travellers || "2 Travellers (Couple)";
    const cleanPkg = destinationPkg || "Incredible India Holiday Package";
    const cleanMsg = userMessage.trim();

    if (!cleanName || !cleanPhone) {
      setSubmitError("Please provide your name and phone number.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const apiBase = getApiBase();
    const payload = {
      fullName: cleanName,
      phone: cleanPhone,
      destination: cleanPkg,
      travelDate: cleanDate,
      travellers: cleanTravellers,
      message: cleanMsg,
      source: "india_portal_inline",
    };

    if (apiBase) {
      fetch(`${apiBase}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("Backend Enquiry API warning:", err));
    }

    const waMsg = `Hi SFM Travels India! I want a custom quote for my India trip:%0A- Name: ${encodeURIComponent(cleanName)}%0A- Phone: ${encodeURIComponent(cleanPhone)}%0A- Package: ${encodeURIComponent(cleanPkg)}%0A- Travel Date: ${encodeURIComponent(cleanDate || "Flexible")}%0A- Travellers: ${encodeURIComponent(cleanTravellers)}${cleanMsg ? `%0A- Notes: ${encodeURIComponent(cleanMsg)}` : ""}`;
    const waUrl = `https://wa.me/919876543210?text=${waMsg}`;

    setSubmitSuccess(true);
    setSubmitting(false);

    try {
      const win = window.open(waUrl, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = waUrl;
      }
    } catch (_) {
      window.location.href = waUrl;
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-emerald-950/60 border border-emerald-800 p-8 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
        <h4 className="text-xl font-bold text-white">Enquiry Received Successfully!</h4>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Thank you! Our senior India holiday specialist will contact you on phone/WhatsApp shortly with your customized itinerary.
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setFullName("");
            setPhone("");
            setTravelDate("");
            setUserMessage("");
          }}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleFormSubmit} className="space-y-5 select-text">
      {submitError && (
        <div className="bg-rose-950/60 border border-rose-800 p-3.5 rounded-xl text-rose-300 text-xs">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="inline_destination_pkg" className="text-xs font-semibold text-slate-200 block mb-1.5">Select Package / Region</label>
        <select
          id="inline_destination_pkg"
          name="destinationPkg"
          value={destinationPkg}
          onChange={(e) => setDestinationPkg(e.target.value)}
          onInput={(e) => setDestinationPkg(e.currentTarget.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold cursor-pointer select-text touch-manipulation"
          style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
        >
          <option value="Incredible India Holiday Package">General Incredible India Package</option>
          <option value="Kashmir Paradise & Golden Triangle (6D/5N)">Kashmir Paradise & Golden Triangle (6D/5N)</option>
          <option value="Kerala Backwaters & Houseboat Sanctuary (5D/4N)">Kerala Backwaters & Houseboat (5D/4N)</option>
          <option value="Royal Rajasthan Forts & Thar Desert Glamping (6D/5N)">Royal Rajasthan & Desert Glamping (6D/5N)</option>
          <option value="Goa Sun, Sand & Sunset Cruise Escape (4D/3N)">Goa Sun, Sand & Sunset Cruise (4D/3N)</option>
          <option value="Himachal Snow Peaks & Solang Valley (6D/5N)">Himachal Snow Peaks & Manali (6D/5N)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inline_full_name" className="text-xs font-semibold text-slate-200 block mb-1.5">Full Name *</label>
          <input
            id="inline_full_name"
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onInput={(e) => setFullName(e.currentTarget.value)}
            onPointerDown={(e) => e.stopPropagation()}
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text select-text touch-manipulation relative z-30"
            style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
          />
        </div>
        <div>
          <label htmlFor="inline_phone_number" className="text-xs font-semibold text-slate-200 block mb-1.5">Phone / WhatsApp *</label>
          <input
            id="inline_phone_number"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onInput={(e) => setPhone(e.currentTarget.value)}
            onPointerDown={(e) => e.stopPropagation()}
            autoComplete="tel"
            placeholder="e.g. +91 9876543210"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text select-text touch-manipulation relative z-30"
            style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inline_travel_date" className="text-xs font-semibold text-slate-200 block mb-1.5">Travel Month / Date</label>
          <input
            id="inline_travel_date"
            type="text"
            name="travelDate"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            onInput={(e) => setTravelDate(e.currentTarget.value)}
            onPointerDown={(e) => e.stopPropagation()}
            placeholder="e.g. Next Month / Oct 15"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text select-text touch-manipulation relative z-30"
            style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
          />
        </div>
        <div>
          <label htmlFor="inline_travellers_count" className="text-xs font-semibold text-slate-200 block mb-1.5">Travellers Count</label>
          <select
            id="inline_travellers_count"
            name="travellers"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            onInput={(e) => setTravellers(e.currentTarget.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold cursor-pointer select-text touch-manipulation"
            style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
          >
            <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
            <option value="2 Travellers (Couple)">2 Travellers (Couple)</option>
            <option value="3-5 Travellers (Family/Group)">3-5 Travellers (Family)</option>
            <option value="6+ Travellers (Group)">6+ Travellers (Group)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="inline_user_message" className="text-xs font-semibold text-slate-200 block mb-1.5">Special Requirements (Optional)</label>
        <textarea
          id="inline_user_message"
          name="userMessage"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onInput={(e) => setUserMessage(e.currentTarget.value)}
          onPointerDown={(e) => e.stopPropagation()}
          rows={3}
          placeholder="e.g. Prefer 5★ resort, houseboat, vegetarian food, train/flight booking..."
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text select-text touch-manipulation relative z-30"
          style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-base cursor-pointer"
      >
        {submitting ? "Submitting Request..." : "Request Free India Quote Now"}
      </button>
    </form>
  );
}

function FastEnquiryModal({
  isOpen,
  onClose,
  initialPackageTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPackageTitle?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("2 Travellers (Couple)");
  const [destinationPkg, setDestinationPkg] = useState(initialPackageTitle || "Incredible India Holiday Package");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    if (initialPackageTitle) {
      setDestinationPkg(initialPackageTitle);
    }
  }, [initialPackageTitle]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanDate = travelDate.trim();
    const cleanTravellers = travellers || "2 Travellers (Couple)";
    const cleanPkg = destinationPkg || initialPackageTitle || "Incredible India Holiday Package";
    const cleanMsg = userMessage.trim();

    if (!cleanName || !cleanPhone) {
      setSubmitError("Please provide your name and phone number.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const apiBase = getApiBase();
    const payload = {
      fullName: cleanName,
      phone: cleanPhone,
      destination: cleanPkg,
      travelDate: cleanDate,
      travellers: cleanTravellers,
      message: cleanMsg,
      source: "india_portal_popup",
    };

    if (apiBase) {
      fetch(`${apiBase}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("Backend Enquiry API warning:", err));
    }

    const waMsg = `Hi SFM Travels India! I want a custom quote for my India trip:%0A- Name: ${encodeURIComponent(cleanName)}%0A- Phone: ${encodeURIComponent(cleanPhone)}%0A- Package: ${encodeURIComponent(cleanPkg)}%0A- Travel Date: ${encodeURIComponent(cleanDate || "Flexible")}%0A- Travellers: ${encodeURIComponent(cleanTravellers)}${cleanMsg ? `%0A- Notes: ${encodeURIComponent(cleanMsg)}` : ""}`;
    const waUrl = `https://wa.me/919876543210?text=${waMsg}`;

    setSubmitSuccess(true);
    setSubmitting(false);

    try {
      const win = window.open(waUrl, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = waUrl;
      }
    } catch (_) {
      window.location.href = waUrl;
    }

    setTimeout(() => {
      setSubmitSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Centering Wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        {/* Modal Card */}
        <div
          className="relative z-10 bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl space-y-5 text-left text-white transform transition-all my-8 select-text"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors z-30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Fast India Travel Quote
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Plan Your Dream India Trip
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fill in your details below and our senior India travel expert will contact you within 15 minutes with customized quotes & discounts.
            </p>
          </div>

          {submitSuccess ? (
            <div className="bg-emerald-950/60 border border-emerald-800 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Enquiry Received Successfully!</h4>
              <p className="text-slate-300 text-xs">
                Thank you! Our senior India specialist will call or WhatsApp you shortly.
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={handleFormSubmit} className="space-y-4 select-text">
              {submitError && (
                <div className="bg-rose-950/60 border border-rose-800 p-3 rounded-xl text-rose-300 text-xs">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="sfm_destination_pkg" className="text-xs font-medium text-slate-300 block mb-1">Select Package / Region</label>
                <select
                  id="sfm_destination_pkg"
                  name="destinationPkg"
                  value={destinationPkg}
                  onChange={(e) => setDestinationPkg(e.target.value)}
                  onInput={(e) => setDestinationPkg(e.currentTarget.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold cursor-pointer relative z-20 select-text touch-manipulation"
                  style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                >
                  <option value="Incredible India Holiday Package">General Incredible India Package</option>
                  <option value="Kashmir Paradise & Golden Triangle (6D/5N)">Kashmir Paradise & Golden Triangle (6D/5N)</option>
                  <option value="Kerala Backwaters & Houseboat Sanctuary (5D/4N)">Kerala Backwaters & Houseboat (5D/4N)</option>
                  <option value="Royal Rajasthan Forts & Thar Desert Glamping (6D/5N)">Royal Rajasthan & Desert Glamping (6D/5N)</option>
                  <option value="Goa Sun, Sand & Sunset Cruise Escape (4D/3N)">Goa Sun, Sand & Sunset Cruise (4D/3N)</option>
                  <option value="Himachal Snow Peaks & Solang Valley (6D/5N)">Himachal Snow Peaks & Manali (6D/5N)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sfm_full_name" className="text-xs font-medium text-slate-300 block mb-1">Full Name *</label>
                  <input
                    id="sfm_full_name"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onInput={(e) => setFullName(e.currentTarget.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text relative z-20 select-text touch-manipulation"
                    style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                  />
                </div>
                <div>
                  <label htmlFor="sfm_phone_number" className="text-xs font-medium text-slate-300 block mb-1">Phone / WhatsApp *</label>
                  <input
                    id="sfm_phone_number"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onInput={(e) => setPhone(e.currentTarget.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    autoComplete="tel"
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text relative z-20 select-text touch-manipulation"
                    style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sfm_travel_date" className="text-xs font-medium text-slate-300 block mb-1">Travel Month / Date</label>
                  <input
                    id="sfm_travel_date"
                    type="text"
                    name="travelDate"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    onInput={(e) => setTravelDate(e.currentTarget.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    placeholder="e.g. Next Month / Oct 15"
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text relative z-20 select-text touch-manipulation"
                    style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                  />
                </div>
                <div>
                  <label htmlFor="sfm_travellers_count" className="text-xs font-medium text-slate-300 block mb-1">Travellers Count</label>
                  <select
                    id="sfm_travellers_count"
                    name="travellers"
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    onInput={(e) => setTravellers(e.currentTarget.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-semibold cursor-pointer relative z-20 select-text touch-manipulation"
                    style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                  >
                    <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
                    <option value="2 Travellers (Couple)">2 Travellers (Couple)</option>
                    <option value="3-5 Travellers (Family/Group)">3-5 Travellers (Family)</option>
                    <option value="6+ Travellers (Group)">6+ Travellers (Group)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="sfm_user_message" className="text-xs font-medium text-slate-300 block mb-1">Special Requirements (Optional)</label>
                <textarea
                  id="sfm_user_message"
                  name="userMessage"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onInput={(e) => setUserMessage(e.currentTarget.value)}
                  onPointerDown={(e) => e.stopPropagation()}
                  rows={2}
                  placeholder="e.g. Prefer 5★ resort, houseboat, vegetarian food, train/flight booking..."
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 font-semibold cursor-text relative z-20 select-text touch-manipulation"
                  style={{ color: "#ffffff", backgroundColor: "#1e293b", opacity: 1 }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm cursor-pointer relative z-20"
              >
                {submitting ? "Submitting Request..." : "Request Free India Quote Now"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
