import { useState, useEffect, useCallback, useMemo, useRef, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";

import kashmirImage from "@/assets/sfm-kashmir.jpg";
import keralaImage from "@/assets/sfm-kerala.jpg";
import rajasthanImage from "@/assets/sfm-rajasthan.jpg";
import goaImage from "@/assets/sfm-goa.jpg";
import manaliImage from "@/assets/sfm-manali.jpg";
import heroImage from "@/assets/sfm-hero.jpg";

import baliHeroPic from "@/assets/bali/hero-1.jpg";
import vietnamHeroPic from "@/assets/vietnam/hero-1.webp";
import europeHeroPic from "@/assets/europe/hero-1.jpeg";
import malaysiaHeroPic from "@/assets/malaysia/hero-1.jpeg";
import thailandHeroPic from "@/assets/thailand/hero-1.avif";
import singaporeHeroPic from "@/assets/singapore/hero-1.jpg";

import { useCurrency } from "@/context/CurrencyContext";
import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { ItineraryModal } from "@/components/ItineraryModal";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import {
  RegionsSection,
  TravelEssentialsSection,
  WhyChooseUsSection,
  FooterSection,
  type IndiaPackage,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SFM Travels | Incredible India & World International Holiday Packages" },
      {
        name: "description",
        content:
          "Official SFM Travels Portal. Book luxury holiday packages for Singapore, Bali, Vietnam, Europe, Malaysia, Thailand, Kashmir, Kerala, Rajasthan & Goa.",
      },
      {
        property: "og:title",
        content: "SFM Travels | Incredible India & International Holiday Packages",
      },
      {
        property: "og:description",
        content:
          "Discover Incredible India & Worldwide International Destinations with SFM Travels. Best price guarantee with custom day-wise itineraries.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndiaPortal,
});

export type { IndiaPackage };

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
  {
    id: "singapore-complete-experience",
    title: "Complete Singapore Experience",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description:
      "Night Safari with tram ride, Sentosa Island cable car & Oceanarium, full day Universal Studios, and Gardens by the Bay & Sands SkyPark.",
    priceInr: 44999,
    image: singaporeHeroPic,
    badge: "Singapore Special",
    detailsUrl: "/singapore-itinerary",
    inclusions: [
      "4★ Hotel & Return Flights",
      "Daily Breakfast Included",
      "Night Safari & Sentosa Cable Car",
      "Universal Studios & Sands SkyPark",
    ],
    itinerary: [
      { day: 1, title: "Welcome to Singapore & Night Safari", desc: "Arrive at Changi Airport, private transfer to hotel. In the evening, explore the famous Night Safari with tram ride." },
      { day: 2, title: "Singapore City Tour & Sentosa Island", desc: "Merlion Park, city sights, Sentosa cable car, Oceanarium, 5-in-1 combo & Wings of Time show." },
      { day: 3, title: "Universal Studios Singapore", desc: "Full day at Universal Studios theme park with thrilling rides & character meet-and-greets." },
      { day: 4, title: "Gardens by the Bay & Sands SkyPark", desc: "Flower Dome, Cloud Forest conservatory, and 360-degree views from Sands SkyPark." },
      { day: 5, title: "Goodbye Singapore", desc: "Breakfast, hotel checkout, and private airport transfer for return flight." },
    ],
  },
  {
    id: "bali-honeymoon-special",
    title: "Bali Honeymoon Special",
    category: "International & Luxury",
    duration: "7 Days / 6 Nights",
    description:
      "Private pool villa, Kintamani volcano, Ubud swing & rice terraces, Nusa Penida island tour, Tanah Lot & Uluwatu Kecak dance.",
    priceInr: 39999,
    image: baliHeroPic,
    badge: "Bali Special",
    detailsUrl: "/bali-itinerary",
    inclusions: [
      "06N Stay (Hotel & Pool Villa)",
      "Romantic Candle Light Dinner",
      "Nusa Penida Island Tour",
      "Ubud Swing & Tanah Lot Sunset",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali & Private Check-in", desc: "Meet & greet at Denpasar Airport, private transfer to hotel, welcome flower garland and leisure evening." },
      { day: 2, title: "Kintamani Volcano & Ubud Swing", desc: "Batur volcano views, Tegalalang rice terraces, jungle swing ride, and Luwak coffee plantation." },
      { day: 3, title: "Full-Day West Nusa Penida Island Tour", desc: "Fast boat to Nusa Penida. Visit Kelingking T-Rex Beach, Broken Beach, Angel's Billabong, and Crystal Bay." },
      { day: 4, title: "Bedugul Water Temple & Tanah Lot", desc: "Ulun Danu Beratan Temple on Lake Beratan and iconic Tanah Lot ocean temple sunset." },
      { day: 5, title: "Uluwatu Temple & Kecak Dance", desc: "Waterblow Beach, Uluwatu cliffside temple, Kecak dance performance, and Jimbaran Bay seafood dinner." },
      { day: 6, title: "Private Pool Villa & Candlelight Dinner", desc: "Transfer to luxury private pool villa. Floating breakfast experience & evening romantic candlelight dinner." },
      { day: 7, title: "Hotel Check-out & Airport Transfer", desc: "Breakfast, free time for souvenir shopping at Kuta art market, and drop at Denpasar airport." },
    ],
  },
  {
    id: "vietnam-amazing-tour",
    title: "Amazing Vietnam North-to-South",
    category: "International & Luxury",
    duration: "10 Days / 9 Nights",
    description:
      "North-to-South Vietnam tour: Hanoi Train Street, Ha Long Bay day cruise, Ninh Binh, Hoi An lanterns, Ba Na Hills Golden Bridge & Mekong Delta.",
    priceInr: 54999,
    image: vietnamHeroPic,
    badge: "Vietnam Special",
    detailsUrl: "/vietnam-itinerary",
    inclusions: [
      "4★ Hotel Stays in 3 Cities",
      "Ha Long Bay Cruise & Lunch",
      "Ba Na Hills Golden Bridge Pass",
      "Cu Chi Tunnels & Mekong Cruise",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Hanoi & Train Street", desc: "Private airport pickup, Hanoi Old Quarter walk, Hoan Kiem Lake, and Train Street viewing." },
      { day: 2, title: "Ha Long Bay Cruise Excursion & Kayaking", desc: "Luxury shuttle bus to Ha Long Bay. Sail past limestone karsts, Sung Sot cave & seafood lunch." },
      { day: 3, title: "Ninh Binh – Hoa Lu & Trang An Boat Tour", desc: "Ancient capital Hoa Lu, Trang An UNESCO sampan boat ride, and optional Mua Cave climb." },
      { day: 4, title: "Flight to Da Nang & Coastal Relaxation", desc: "Fly to Da Nang, check-in beachside hotel, My Khe Beach relaxation." },
      { day: 5, title: "Coconut Forest, Marble Mountains & Hoi An", desc: "Bamboo basket boat ride, Marble Mountains caves, and Hoi An Ancient Town lantern night." },
      { day: 6, title: "Ba Na Hills & Golden Bridge", desc: "World record cable car ride, Golden Bridge held by giant hands, and French Village." },
      { day: 7, title: "Flight to Ho Chi Minh City (Saigon)", desc: "Internal flight to Saigon, private hotel transfer, Ben Thanh night market leisure." },
      { day: 8, title: "Cu Chi Tunnels & Mekong Delta Cruise", desc: "Historical Cu Chi underground tunnels and Mekong River fruit orchard boat cruise." },
      { day: 9, title: "Saigon City Leisure & Landmarks", desc: "French colonial landmarks, Central Post Office, Notre-Dame Cathedral, and shopping." },
      { day: 10, title: "Saigon Check-out & Flight Home", desc: "Breakfast, souvenir shopping, and private transfer to Tan Son Nhat airport." },
    ],
  },
  {
    id: "europe-paris-swiss-alps",
    title: "Paris & Swiss Alps Special",
    category: "International & Luxury",
    duration: "7 Days / 6 Nights",
    description:
      "03N Paris + 03N Switzerland with Eiffel Tower Summit lift, Seine cruise, Disneyland, high-speed TGV train, Swiss Travel Pass & Mount Titlis.",
    priceInr: 119999,
    image: europeHeroPic,
    badge: "Europe Special",
    detailsUrl: "/europe-itinerary",
    inclusions: [
      "03N Paris + 03N Swiss 4★ Hotels",
      "Eiffel Summit Lift & Seine Cruise",
      "Disneyland Paris Admission Ticket",
      "Mount Titlis & Swiss Travel Pass",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Paris – City of Lights", desc: "Private transfer to Paris 4★ hotel. Evening at leisure exploring Parisian cafés." },
      { day: 2, title: "Paris Hop-On Bus, Seine Cruise & Eiffel Summit", desc: "Hop-On Hop-Off city tour, 1-hr Seine River cruise, and lift access to Eiffel Tower summit." },
      { day: 3, title: "Full Day Disneyland Paris Adventure", desc: "Full magical day at Disneyland Park with included 1 Day / 1 Park pass." },
      { day: 4, title: "High-Speed TGV Train to Switzerland & Bern", desc: "High-speed train to Geneva/Basel, scenic rail to hotel in Bern/Zurich." },
      { day: 5, title: "Mount Titlis Cable Car & Lake Lucerne Cruise", desc: "Revolving TITLIS Rotair cable car to 3,020m, Cliff Walk, and Lake Lucerne steamer cruise." },
      { day: 6, title: "Lindt Chocolate Museum, Zurich & Rhine Falls", desc: "Lindt chocolate fountain museum, Zurich Old Town walk, and Rhine Falls waterfall." },
      { day: 7, title: "Departure from Switzerland", desc: "Hotel breakfast, private airport transfer to Zurich/Geneva airport for return flight." },
    ],
  },
  {
    id: "malaysia-budget-friendly",
    title: "Malaysia Budget Friendly Tour",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description:
      "Kuala Lumpur city tour, Petronas Twin Towers photo stop, Batu Caves temple, Genting Highlands Awana SkyWay cable car, and Chin Swee temple.",
    priceInr: 29999,
    image: malaysiaHeroPic,
    badge: "Malaysia Special",
    detailsUrl: "/malaysia-itinerary",
    inclusions: [
      "4★ Kuala Lumpur Hotel Stay",
      "Daily Hotel Breakfast",
      "Petronas Towers & Batu Caves",
      "Genting Awana SkyWay Cable Car",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kuala Lumpur & Hotel Check-in", desc: "Airport pickup, hotel check-in. Evening free to explore Bukit Bintang & Jalan Alor night market." },
      { day: 2, title: "Half-Day KL City Tour & Petronas Towers", desc: "King's Palace, National Monument, Independence Square, chocolate boutique, and Petronas Twin Towers." },
      { day: 3, title: "Genting Highlands & Awana SkyWay Cable Car", desc: "Enroute visit rainbow Batu Caves temple. Cable car ride up Genting Highlands & Chin Swee Caves Temple." },
      { day: 4, title: "Full Day Free for Shopping & Exploration", desc: "Leisure day for shopping at Pavilion KL, Suria KLCC, Mid Valley, or Sunway Lagoon theme park." },
      { day: 5, title: "Hotel Check-out & Airport Departure", desc: "Breakfast, checkout, and private transfer to KLIA for return flight." },
    ],
  },
  {
    id: "thailand-tropical-escape",
    title: "Thailand Tropical Escape & Island Adventure",
    category: "International & Luxury",
    duration: "6 Days / 5 Nights",
    description:
      "Bangkok Golden Buddha, Pattaya Coral Island speedboat ride, Alcazar Cabaret Show, Phuket Phi Phi island cruise & Promthep Cape sunset.",
    priceInr: 39999,
    image: thailandHeroPic,
    badge: "Thailand Special",
    detailsUrl: "/thailand-itinerary",
    inclusions: [
      "4★ Bangkok & Island Hotels",
      "Coral Island Speedboat Tour & Lunch",
      "Alcazar Cabaret Show Pass",
      "Phi Phi Island Speedboat Cruise",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", desc: "Airport pickup, transfer to Pattaya, hotel check-in. Evening Alcazar Cabaret Show." },
      { day: 2, title: "Coral Island Speedboat Excursion & Lunch", desc: "Speedboat to Coral Island (Koh Larn) for water sports & Indian buffet lunch." },
      { day: 3, title: "Pattaya to Bangkok Temple & City Tour", desc: "Drive to Bangkok, visit Golden Buddha & Marble Temple, Gems Gallery, and shopping." },
      { day: 4, title: "Flight to Phuket & Beach Relaxation", desc: "Fly to Phuket, check-in beach resort, Patong Beach nightlife & Bangla Road." },
      { day: 5, title: "Phi Phi Island Speedboat Cruise & Lunch", desc: "Full-day speedboat excursion to Maya Bay, Pileh Lagoon, Monkey Beach & Phi Phi Don." },
      { day: 6, title: "Hotel Check-out & Phuket Airport Departure", desc: "Breakfast, souvenir shopping, and airport transfer for return flight." },
    ],
  },
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
  return "https://sfm-backend-5skx.onrender.com";
};

export function IndiaPortal() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Package Selection & Smooth Scroll States
  const [selectedPackageTitle, setSelectedPackageTitle] = useState("");
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<IndiaPackage | null>(null);

  // Pre-warm Render backend on page load so cold-starts are eliminated
  useEffect(() => {
    const apiBase = getApiBase();
    if (apiBase) {
      fetch(`${apiBase}/api/enquiries`, { method: "GET" }).catch(() => {});
    }
  }, []);

  const handleScrollToEnquiry = useCallback(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById("enquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  const handleOpenEnquiryForPkg = useCallback((pkg: IndiaPackage) => {
    setSelectedPackageTitle(pkg.title);
    handleScrollToEnquiry();
  }, [handleScrollToEnquiry]);

  const filteredPackages = useMemo(() => {
    return INDIA_PACKAGES.filter((pkg) => {
      const isIntl = Boolean(pkg.detailsUrl) || pkg.id.includes("singapore") || pkg.id.includes("bali") || pkg.id.includes("vietnam") || pkg.id.includes("europe") || pkg.id.includes("malaysia") || pkg.id.includes("thailand") || pkg.category.toLowerCase().includes("international");
      let matchesTab = true;
      if (activeTab === "north") matchesTab = pkg.category.toLowerCase().includes("mountain") || pkg.category.toLowerCase().includes("heritage");
      else if (activeTab === "kerala") matchesTab = pkg.category.toLowerCase().includes("backwaters");
      else if (activeTab === "rajasthan") matchesTab = pkg.category.toLowerCase().includes("royal");
      else if (activeTab === "goa") matchesTab = pkg.category.toLowerCase().includes("beach");
      else if (activeTab === "singapore") matchesTab = pkg.id.includes("singapore") || pkg.title.toLowerCase().includes("singapore");
      else if (activeTab === "international") matchesTab = isIntl;
      else if (activeTab === "domestic") matchesTab = !isIntl;

      const matchesSearch =
        !searchQuery ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 w-full max-w-full overflow-x-hidden">
      {/* Isolated Navbar component */}
      <Navbar onPlanTripClick={handleScrollToEnquiry} />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 sm:py-20 px-4">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Incredible India Tourism Taj Mahal & World Travel"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4" /> SFM Travels • Incredible India & International Holidays
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">WORLD & INDIA TOURS</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Experience Singapore, Bali, Vietnam, Paris & Swiss Alps, Malaysia, Thailand, Kashmir, Kerala, Rajasthan, and Goa with curated handcrafted packages.
          </p>

          {/* Isolated SearchBox widget */}
          <SearchBox
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearchChange={setSearchQuery}
            onGetQuote={handleScrollToEnquiry}
          />

          {/* Highlights Badges */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> 100% Best Rate Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> Custom Private Itineraries
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" /> 24/7 Dedicated Guest Assistance
            </span>
          </div>
        </div>
      </section>

      {/* Curated Packages Section */}
      <section id="packages" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            SFM Handcrafted Journeys
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Tour Packages
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            All packages include luxury accommodations, private cab transfers, daily breakfast, sightseeing passes, and 24/7 dedicated support.
          </p>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-white">No packages matching "{searchQuery}"</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Don't worry! We build 100% customized tour itineraries for any destination in India or worldwide.
            </p>
            <button
              onClick={handleScrollToEnquiry}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Request Custom Itinerary Quote
            </button>
          </div>
        ) : (
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
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                      >
                        Itinerary
                      </button>
                      <button
                        onClick={() => handleOpenEnquiryForPkg(pkg)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1 shadow-md shadow-amber-500/10 cursor-pointer"
                      >
                        Book Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pure Static Sections Wrapped with React.memo */}
      <RegionsSection />
      <TravelEssentialsSection />
      <WhyChooseUsSection />

      {/* Inline Quick Enquiry Section on Page */}
      <section id="enquiry" className="py-20 px-4 bg-slate-900 border-y border-amber-500/30">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> Direct Travel Quote
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Request Callback & Custom Quote
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm">
              Fill out your travel details below and our senior holiday specialist will contact you with custom itineraries and best price guarantees.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-2xl text-left text-slate-900">
            <InlineEnquiryForm initialPackageTitle={selectedPackageTitle} />
          </div>
        </div>
      </section>

      <FooterSection />
      <CircularSocialMenu />

      {/* Day-by-Day Itinerary Modal */}
      <ItineraryModal
        packageData={selectedItineraryPkg}
        onClose={() => setSelectedItineraryPkg(null)}
        onBook={(pkg) => {
          setSelectedItineraryPkg(null);
          handleOpenEnquiryForPkg(pkg);
        }}
        formatPrice={formatPrice}
      />
    </div>
  );
}
