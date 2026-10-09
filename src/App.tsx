import { useState, useTransition, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  MapPin,
  Calendar,
  Check,
  ArrowRight,
  MessageCircle,
  Star,
  Clock,
  Award,
  Users,
  Building,
  X,
  Plane,
  Globe,
  Linkedin,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CurrencyProvider, useCurrency } from "@/context/CurrencyContext";
import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { ItineraryModal } from "@/components/ItineraryModal";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { SingaporeItineraryPage } from "@/routes/singapore-itinerary";
import { VietnamItineraryPage } from "@/routes/vietnam-itinerary";
import { ThailandItineraryPage } from "@/routes/thailand-itinerary";
import { EuropeItineraryPage } from "@/routes/europe-itinerary";
import { JapanItineraryPage } from "@/routes/japan-itinerary";
import { BaliItineraryPage } from "@/routes/bali-itinerary";
import { MalaysiaItineraryPage } from "@/routes/malaysia-itinerary";
import { AboutPage } from "@/routes/about";
import {
  RegionsSection,
  TestimonialsSection,
  TravelEssentialsSection,
  FaqSection,
  WhyChooseUsSection,
  FooterSection,
  type IndiaPackage,
} from "@/components/Sections";

import sfmHero from "@/assets/sfm-hero.jpg";
import sfmKashmir from "@/assets/sfm-kashmir.jpg";
import sfmKerala from "@/assets/sfm-kerala.jpg";
import sfmRajasthan from "@/assets/sfm-rajasthan.jpg";
import sfmGoa from "@/assets/sfm-goa.jpg";
import sfmManali from "@/assets/sfm-manali.jpg";
import sfmDubai from "@/assets/sfm-dubai.jpg";

export const FEATURED_PACKAGES: IndiaPackage[] = [
  {
    id: "kashmir-paradise",
    title: "Kashmir Paradise: Srinagar, Gulmarg & Pahalgam",
    category: "Himalayas & Snow",
    duration: "6 Days / 5 Nights",
    description: "Shikara ride on Dal Lake, luxury houseboats, Gondola cable car ride in Gulmarg snow, and Pahalgam valley.",
    priceInr: 14999,
    image: sfmKashmir,
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 340,
    inclusions: ["Luxury Houseboat & 4★ Hotel", "Daily Breakfast & Dinner", "Gulmarg Gondola Tickets", "Private Cab & Driver"],
    itinerary: [
      { day: 1, title: "Arrival Srinagar & Shikara Sunset", desc: "Traditional welcome at Srinagar airport. Check-in to luxury houseboat on Dal Lake and enjoy evening Shikara ride." },
      { day: 2, title: "Srinagar to Gulmarg Snow Resort", desc: "Drive to Gulmarg. Take Phase 1 & 2 Gondola ride up to 14,000 ft for panoramic snow views." },
      { day: 3, title: "Gulmarg to Pahalgam Valley of Shepherds", desc: "Scenic drive along Lidder river, visit saffron fields and Betaab Valley." },
      { day: 4, title: "Pahalgam Aru Valley & Baisaran Excursion", desc: "Explore Mini-Switzerland (Baisaran) on horseback and local sightseeing." },
      { day: 5, title: "Pahalgam back to Srinagar Mughal Gardens", desc: "Visit Shalimar & Nishat Bagh, local handicrafts shopping." },
      { day: 6, title: "Srinagar Airport Departure", desc: "Breakfast and transfer to Srinagar Airport with unforgettable Kashmir memories." },
    ],
  },
  {
    id: "kerala-backwaters",
    title: "Kerala Emerald: Munnar, Thekkady & Houseboat",
    category: "Tropics & Backwaters",
    duration: "5 Days / 4 Nights",
    description: "Tea gardens in Munnar, spice plantations in Thekkady, and overnight private houseboat cruise in Alleppey.",
    priceInr: 12999,
    image: sfmKerala,
    badge: "Top Rated",
    rating: 5.0,
    reviewsCount: 280,
    inclusions: ["Private Deluxe Houseboat", "Munnar Tea Villa", "Spice Plantation Tour", "All Houseboat Meals Included"],
    itinerary: [
      { day: 1, title: "Cochin Arrival to Munnar Hill Station", desc: "Pickup from Cochin, visit Cheeyappara waterfalls on drive to Munnar tea estates." },
      { day: 2, title: "Munnar Tea Gardens & Eravikulam National Park", desc: "Visit Tea Museum, Mattupetty Dam, and spot Nilgiri Tahr." },
      { day: 3, title: "Munnar to Thekkady Wildlife Sanctuary", desc: "Drive through spice hills, boat safari in Periyar Lake, and Kathakali cultural show." },
      { day: 4, title: "Thekkady to Alleppey Houseboat Cruise", desc: "Board private houseboat in Alleppey backwaters. Enjoy freshly prepared Keralan meals." },
      { day: 5, title: "Alleppey to Cochin Departure", desc: "Disembark houseboat, visit Fort Kochi Chinese fishing nets, drop at Cochin airport." },
    ],
  },
  {
    id: "royal-rajasthan",
    title: "Royal Rajasthan: Jaipur, Udaipur & Jaisalmer",
    category: "Heritage & Deserts",
    duration: "7 Days / 6 Nights",
    description: "Amer Fort in Jaipur, City Palace in Udaipur, and Thar desert camel safari glamping under the stars.",
    priceInr: 18999,
    image: sfmRajasthan,
    badge: "Royal Heritage",
    rating: 4.9,
    reviewsCount: 410,
    inclusions: ["Heritage Palace Stays", "Thar Desert Tent & Folk Dance", "Elephant Ride at Amer Fort", "Buffet Breakfasts"],
    itinerary: [
      { day: 1, title: "Arrival Jaipur - Pink City", desc: "Check-in hotel, evening visit to Birla Temple and Chokhi Dhani ethnic village." },
      { day: 2, title: "Jaipur Forts & Palaces", desc: "Visit Amer Fort, Hawa Mahal, Jal Mahal, and Jantar Mantar observatory." },
      { day: 3, title: "Jaipur to Jodhpur Blue City", desc: "Drive to Jodhpur, visit grand Mehrangarh Fort and Jaswant Thada." },
      { day: 4, title: "Jodhpur to Jaisalmer Desert Camp", desc: "Head to Thar Desert. Sunset camel ride, Rajasthani folk dance, and luxury tent night." },
      { day: 5, title: "Jaisalmer Golden Fort to Udaipur", desc: "Explore Golden Fort and Patwon Ki Haveli, drive towards Udaipur Lake City." },
      { day: 6, title: "Udaipur Lake City & Boat Ride", desc: "Visit City Palace, Saheliyon Ki Bari, and romantic sunset boat ride on Lake Pichola." },
      { day: 7, title: "Udaipur Departure", desc: "Breakfast and drop at Udaipur Airport / Railway station." },
    ],
  },
  {
    id: "goa-beach-bliss",
    title: "Goa Sun & Beach Bliss Holiday",
    category: "Beaches & Nightlife",
    duration: "4 Days / 3 Nights",
    description: "Baga & Calangute beaches, Mandovi River cruise, Dudhsagar waterfall jeep safari, and water sports.",
    priceInr: 9999,
    image: sfmGoa,
    badge: "Fun & Leisure",
    rating: 4.8,
    reviewsCount: 195,
    inclusions: ["Beach Resort Stay", "Mandovi Sunset Cruise", "South & North Goa Sightseeing", "Airport Pickup & Drop"],
    itinerary: [
      { day: 1, title: "Goa Arrival & Beach Sunset", desc: "Warm welcome at Goa airport/station. Check-in to resort and relax at Baga Beach." },
      { day: 2, title: "North Goa Beaches & Water Sports", desc: "Visit Calangute, Anjuna, Aguada Fort, and enjoy water sports at Vagator." },
      { day: 3, title: "South Goa Heritage & River Cruise", desc: "Old Goa churches (Basilica of Bom Jesus), Mangueshi Temple, and Mandovi river cruise." },
      { day: 4, title: "Goa Departure", desc: "Breakfast, local souvenir shopping, and transfer to airport/station." },
    ],
  },
  {
    id: "manali-snow-escape",
    title: "Manali & Solang Valley Snow Escape",
    category: "Himalayas & Adventure",
    duration: "5 Days / 4 Nights",
    description: "Solang Valley adventure sports, Atal Tunnel, Rohtang Pass snow point, and Mall Road shopping.",
    priceInr: 11999,
    image: sfmManali,
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 220,
    inclusions: ["3★ Hill Resort Stay", "Atal Tunnel Excursion", "Solang Adventure Tour", "Volvo Bus / Cab Transfer"],
    itinerary: [
      { day: 1, title: "Arrival Manali & Local Sightseeing", desc: "Check-in hotel, visit Hadimba Temple, Vashisht hot springs, and Mall Road." },
      { day: 2, title: "Solang Valley & Snow Point", desc: "Excursion to Solang Valley for paragliding, skiing, and snow activities." },
      { day: 3, title: "Atal Tunnel & Sissu Valley Drive", desc: "Drive through historic Atal Tunnel to Lahaul valley, waterfalls & snow bridges." },
      { day: 4, title: "Manali to Kasol & Manikaran Sahib", desc: "Day trip to Parvati Valley, Kasol cafe culture, and hot springs at Manikaran." },
      { day: 5, title: "Manali Departure", desc: "Breakfast, check-out and return journey home with mountain memories." },
    ],
  },
  {
    id: "dubai-glamour",
    title: "Dubai Glamour & Desert Safari Experience",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description: "Burj Khalifa 124th floor, Desert Safari with BBQ dinner, Dhow Cruise, and Miracle Garden.",
    priceInr: 34999,
    image: sfmDubai,
    badge: "International",
    rating: 5.0,
    reviewsCount: 160,
    inclusions: ["4★ Dubai City Hotel", "Burj Khalifa Ticket", "Desert Safari + BBQ", "Marina Dhow Cruise"],
    itinerary: [
      { day: 1, title: "Dubai Arrival & Dhow Dinner Cruise", desc: "Arrival at Dubai International Airport. Check-in hotel. Evening Marina Dhow Cruise with buffet dinner." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa", desc: "Half-day city tour visiting Dubai Frame, Jumeirah Beach, and Burj Khalifa 124th floor observatory." },
      { day: 3, title: "Dune Bashing Desert Safari", desc: "Morning at leisure. Afternoon 4x4 Desert Safari with dune bashing, camel rides, belly dance & BBQ dinner." },
      { day: 4, title: "Miracle Garden & Dubai Mall Shopping", desc: "Visit world's largest natural flower garden and Dubai Mall fountain show." },
      { day: 5, title: "Dubai Airport Departure", desc: "Breakfast, free time for gold souk shopping, transfer to airport." },
    ],
  },
  {
    id: "thailand-tropical-escape",
    title: "Thailand Tropical Escape & Island Adventure",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description: "Bangkok city tour, Chao Phraya River experience, Phuket island excursion, Thai cultural attractions, and leisure time.",
    priceInr: 39999,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    badge: "Thailand Special",
    rating: 4.9,
    reviewsCount: 260,
    inclusions: [
      "4★ Thailand City/Beach Hotel",
      "Bangkok City Tour",
      "Phuket Island Excursion",
      "Chao Phraya River Experience"
    ],
    itinerary: [
      { day: 1, title: "Thailand Arrival & Bangkok Evening", desc: "Arrival at Bangkok International Airport. Check-in at hotel. Evening at leisure to explore nearby markets and local attractions." },
      { day: 2, title: "Bangkok City Tour & Temples", desc: "Visit Bangkok's iconic temples and cultural landmarks, including Wat Pho and Wat Arun. Enjoy a Chao Phraya River experience and evening at leisure." },
      { day: 3, title: "Bangkok to Phuket & Beach Leisure", desc: "Morning flight to Phuket. Hotel check-in followed by leisure time at the beach. Evening free to explore Phuket's vibrant surroundings." },
      { day: 4, title: "Phi Phi Island Adventure", desc: "Full-day island excursion to Phi Phi Islands with scenic beaches, turquoise waters, sightseeing, and opportunities for swimming and relaxation." },
      { day: 5, title: "Thailand Airport Departure", desc: "Breakfast at hotel. Free time for shopping and leisure before transfer to the airport for departure." }
    ]
  },
  {
    id: "swiss-alps-lakes",
    title: "Swiss Alps, Lakes & Scenic Rail Experience",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description: "Zurich city tour, Lucerne, Interlaken, Swiss Alps experience, scenic train journey, and picturesque mountain landscapes.",
    priceInr: 89999,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    badge: "Swiss Special",
    rating: 5.0,
    reviewsCount: 310,
    inclusions: [
      "4★ Switzerland Hotel",
      "Zurich City Tour",
      "Swiss Alps Excursion",
      "Scenic Train Experience"
    ],
    itinerary: [
      { day: 1, title: "Switzerland Arrival & Zurich", desc: "Arrival at Zurich International Airport. Check-in at hotel. Evening at leisure to explore Zurich's charming old town and lakeside surroundings." },
      { day: 2, title: "Zurich City Tour & Lucerne", desc: "Explore Zurich's major attractions before travelling to Lucerne. Visit the picturesque Old Town, Chapel Bridge, and Lake Lucerne. Return to hotel." },
      { day: 3, title: "Interlaken & Swiss Alps", desc: "Travel to Interlaken, surrounded by the Swiss Alps. Enjoy spectacular mountain views and leisure time in this scenic resort town." },
      { day: 4, title: "Jungfrau Region & Scenic Experience", desc: "Enjoy a memorable Swiss mountain excursion with panoramic Alpine views, followed by free time for shopping and exploring local attractions." },
      { day: 5, title: "Switzerland Airport Departure", desc: "Breakfast at hotel. Free time for last-minute shopping before transfer to the airport for departure." }
    ]
  },
  {
    id: "singapore-complete-experience",
    title: "Complete Singapore Experience",
    category: "International & Luxury",
    duration: "5 Days / 4 Nights",
    description: "Night Safari with tram ride, Sentosa Island cable car & Oceanarium, full day Universal Studios, and Gardens by the Bay & Sands SkyPark.",
    priceInr: 44999,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    badge: "Singapore Special",
    detailsUrl: "/singapore-itinerary",
    rating: 4.9,
    reviewsCount: 320,
    inclusions: [
      "4★ Hotel & Return Flights",
      "Daily Breakfast Included",
      "Night Safari & Sentosa Cable Car",
      "Universal Studios & Sands SkyPark"
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Singapore & Night Safari",
        desc: "Arrive at Changi Airport, enjoy a private transfer to your hotel, and settle in. In the evening, explore the famous Night Safari with a guided tram ride and live fire show."
      },
      {
        day: 2,
        title: "Singapore City Tour & Sentosa Island",
        desc: "Discover Merlion Park and Singapore's iconic skyline before heading to Sentosa. Enjoy a cable car ride, Singapore Oceanarium, selected 5-in-1 attractions, and the 7:30 PM Wings of Time show."
      },
      {
        day: 3,
        title: "Universal Studios Singapore",
        desc: "Spend a full day exploring movie-themed zones, thrilling rides, family attractions, entertainment, and immersive experiences at Universal Studios Singapore."
      },
      {
        day: 4,
        title: "Gardens by the Bay & Sands SkyPark",
        desc: "Explore the Flower Dome and misty Cloud Forest before enjoying panoramic city views from the Sands SkyPark Observation Deck."
      },
      {
        day: 5,
        title: "Goodbye Singapore",
        desc: "Enjoy breakfast, check out from the hotel, and take your private transfer to Changi Airport for your return flight."
      }
    ]
  },
];

function PackagesCarousel({
  packages,
  formatPrice,
  setSelectedPackage,
  scrollToEnquiry,
}: {
  packages: IndiaPackage[];
  formatPrice: (price: number) => string;
  setSelectedPackage: (pkg: IndiaPackage) => void;
  scrollToEnquiry: (title?: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollState, { passive: true });
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, [checkScrollState, packages]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/carousel px-2 sm:px-4">
      {/* Left Manual Arrow Button */}
      <button
        onClick={handleScrollLeft}
        type="button"
        aria-label="Scroll left"
        disabled={!canScrollLeft}
        className={`absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
          canScrollLeft
            ? "opacity-90 hover:opacity-100 hover:bg-amber-500 hover:text-slate-950 hover:scale-110 active:scale-95 shadow-amber-500/20"
            : "opacity-30 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/50"
        }`}
      >
        <ChevronLeft className="w-6 h-6 stroke-[3]" />
      </button>

      {/* Right Manual Arrow Button */}
      <button
        onClick={handleScrollRight}
        type="button"
        aria-label="Scroll right"
        disabled={!canScrollRight}
        className={`absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
          canScrollRight
            ? "opacity-90 hover:opacity-100 hover:bg-amber-500 hover:text-slate-950 hover:scale-110 active:scale-95 shadow-amber-500/20"
            : "opacity-30 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-900/50"
        }`}
      >
        <ChevronRight className="w-6 h-6 stroke-[3]" />
      </button>

      {/* Manual Horizontal Sliding Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 select-none scroll-smooth snap-x snap-mandatory"
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="w-[85vw] max-w-[360px] min-w-[270px] shrink-0 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col group shadow-xl shadow-slate-200/60 hover-card-3d snap-start"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {pkg.badge}
              </span>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                </span>
                <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {pkg.rating} ({pkg.reviewsCount})
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-amber-600 font-extrabold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> {pkg.category}
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 font-medium">
                  {pkg.description}
                </p>

                <div className="pt-2 space-y-2">
                  {pkg.inclusions.slice(0, 4).map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase font-extrabold tracking-wider">
                    Starting From
                  </span>
                  <span className="text-xl font-black text-amber-600">
                    {formatPrice(pkg.priceInr)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => scrollToEnquiry(pkg.title)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-amber-500/20 hover:scale-105"
                  >
                    Book <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MainContent() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const [selectedPackage, setSelectedPackage] = useState<IndiaPackage | null>(null);
  const [enquiryPackageTitle, setEnquiryPackageTitle] = useState("");
  const enquiryFormRef = useRef<HTMLDivElement>(null);

  const [isAutoPopUpOpen, setIsAutoPopUpOpen] = useState(false);

  useEffect(() => {
    // 1. Force initial scroll to top header/hero section on initial mount and page refresh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      const timerId = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);

      const timer1 = setTimeout(() => {
        setIsAutoPopUpOpen(true);
      }, 45000);

      const timer2 = setTimeout(() => {
        setIsAutoPopUpOpen(true);
      }, 120000);

      return () => {
        clearTimeout(timerId);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isAutoPopUpOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [isAutoPopUpOpen]);

  const closeAutoPopUp = () => {
    setIsAutoPopUpOpen(false);
  };

  const filteredPackages = useMemo(() => {
    return FEATURED_PACKAGES.filter((pkg) => {
      const isIntl = pkg.id.includes("dubai") || pkg.id.includes("thailand") || pkg.id.includes("swiss") || pkg.id.includes("singapore") || pkg.category.toLowerCase().includes("international");
      let matchesTab = true;
      if (activeTab === "north") matchesTab = pkg.id.includes("kashmir") || pkg.id.includes("manali");
      else if (activeTab === "kerala") matchesTab = pkg.id.includes("kerala");
      else if (activeTab === "rajasthan") matchesTab = pkg.id.includes("rajasthan");
      else if (activeTab === "goa") matchesTab = pkg.id.includes("goa");
      else if (activeTab === "singapore") matchesTab = pkg.id.includes("singapore") || pkg.title.toLowerCase().includes("singapore");
      else if (activeTab === "international") matchesTab = isIntl;
      else if (activeTab === "domestic") matchesTab = !isIntl;

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          pkg.title.toLowerCase().includes(q) ||
          pkg.category.toLowerCase().includes(q) ||
          pkg.description.toLowerCase().includes(q);
      }

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const scrollToEnquiry = (pkgTitle?: string) => {
    if (pkgTitle) {
      setEnquiryPackageTitle(pkgTitle);
    }
    enquiryFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 relative">
      {/* Top Navbar Sticky across full page */}
      <div className="sticky top-0 z-50 w-full pointer-events-auto">
        <Navbar
          onPlanTripClick={() => scrollToEnquiry("Custom Tour Plan")}
          onSelectCategory={(cat) => {
            setActiveTab(cat);
            document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* Hero & Video Background Container */}
      <div className="relative -mt-20 sm:-mt-24 pt-20 sm:pt-24 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between bg-slate-950 border-b border-slate-200">
        {/* Full-width Video/Hero Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
          {/* Crisp High-Res Hero Image for Mobile Devices */}
          <img
            src={sfmHero}
            alt="SFM Travels Hero"
            className="w-full h-full object-cover object-center opacity-50 filter brightness-105 contrast-105 block md:hidden pointer-events-none"
          />

          {/* Smooth Video Background for Desktop/Tablet */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={sfmHero}
            className="w-full h-full object-cover opacity-60 filter brightness-110 contrast-105 saturate-110 hidden md:block pointer-events-none"
          >
            <source src="/assets/india.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay gradients for high readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90 pointer-events-none" />
        </div>

        {/* Hero Central Text & Search box */}
        <section className="relative z-10 py-12 sm:py-16 px-4 max-w-5xl mx-auto text-center space-y-8 my-auto">
          <div className="inline-flex items-center gap-2.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full uppercase tracking-widest shadow-xl backdrop-blur-md float-3d">
            <Plane className="w-4 h-4 text-amber-400 -rotate-12 animate-pulse" />
            <span>We Plan - You Travel - Memories Follow</span>
            <Globe className="w-4 h-4 text-amber-400 animate-spin-slow" />
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
            Travel Professionals <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Office In Delhi & Dubai
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            We Understand the true value of your vacation & make sure it goes above your expectations!!
          </p>

          <div className="relative z-30 translate-y-10 sm:translate-y-16 -mb-12 sm:-mb-20">
            <SearchBox
              activeTab={activeTab}
              onTabChange={(tab) => {
                startTransition(() => setActiveTab(tab));
              }}
              onSearchChange={(q) => setSearchQuery(q)}
              onGetQuote={() => scrollToEnquiry("Customized Destination Plan")}
            />
          </div>
        </section>
      </div>

      {/* Trust & Stats Ticker Bar */}
      <section className="bg-slate-50 border-b border-slate-200 pt-16 sm:pt-24 pb-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 font-black text-xl sm:text-2xl">
              <Users className="w-5 h-5 text-amber-600" /> 50,000+
            </div>
            <p className="text-slate-600 text-xs font-bold">Happy Travelers Hosted</p>
          </div>
          <div className="space-y-1 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 font-black text-xl sm:text-2xl">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" /> 4.9 / 5.0
            </div>
            <p className="text-slate-600 text-xs font-bold">Google & TripAdvisor Rating</p>
          </div>
          <div className="space-y-1 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 font-black text-xl sm:text-2xl">
              <Building className="w-5 h-5 text-amber-600" /> 200+
            </div>
            <p className="text-slate-600 text-xs font-bold">Direct Partner Hotels</p>
          </div>
          <div className="space-y-1 hover:scale-105 transition-transform">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 font-black text-xl sm:text-2xl">
              <Clock className="w-5 h-5 text-amber-600" /> 24 / 7
            </div>
            <p className="text-slate-600 text-xs font-bold">On-Ground Concierge Support</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5" /> Tailormade Packages
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Dream Destinations, One Journey Away.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            All-inclusive itineraries with luxury stays, private air-conditioned vehicles, driver-cum-guides, and 24/7 on-ground assistance.
          </p>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto shadow-sm">
            <p className="text-slate-700 text-base font-bold">No packages found matching your query.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <PackagesCarousel
            packages={filteredPackages}
            formatPrice={formatPrice}
            setSelectedPackage={setSelectedPackage}
            scrollToEnquiry={scrollToEnquiry}
          />
        )}
      </section>

      {/* Customer Testimonials */}
      <TestimonialsSection />

      {/* FAQs Section */}
      <FaqSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Enquiry Form Section - Translucent Glass */}
      <section ref={enquiryFormRef} id="enquiry" className="py-24 px-4 bg-gradient-to-b from-slate-50 via-amber-50/20 to-slate-100 border-t border-slate-200/60 relative">
        <div className="max-w-4xl mx-auto bg-white/75 backdrop-blur-xl border border-white/80 p-8 sm:p-12 rounded-3xl shadow-2xl shadow-slate-300/50 space-y-8 relative z-10 hover-card-3d">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Free Instant Quote
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Plan Your Customized India Trip
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed font-medium">
              Fill in your trip details below and our senior India destination manager will prepare a customized day-wise itinerary & best pricing quote within 30 minutes.
            </p>
          </div>

          <InlineEnquiryForm initialPackageTitle={enquiryPackageTitle} source="india_portal_inline" />
        </div>
      </section>

      {/* Detailed Itinerary Modal */}
      <ItineraryModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={(pkg) => {
          setSelectedPackage(null);
          scrollToEnquiry(pkg.title);
        }}
        formatPrice={formatPrice}
      />

      {/* Footer */}
      <FooterSection />

      {/* Floating Circular Revolving Social Menu */}
      <CircularSocialMenu />

      {/* Auto Pop-Up Enquiry Form Modal */}
      {isAutoPopUpOpen && (
        <div
          onClick={closeAutoPopUp}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/30 max-h-[90vh] overflow-y-auto hover-card-3d cursor-default"
          >
            <button
              onClick={closeAutoPopUp}
              aria-label="Close form"
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-950 bg-slate-100 hover:bg-amber-100 p-2.5 rounded-full transition-all cursor-pointer z-10 shadow-sm"
            >
              <X className="w-5 h-5 font-bold" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" /> Free Custom Trip Quote
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Plan Your Dream India Trip
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Fill in your travel details to get a customized day-wise itinerary & best pricing quote within 30 minutes!
              </p>
            </div>

            <InlineEnquiryForm initialPackageTitle="Customized India Vacation" source="india_portal_popup" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const onPopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [pathname]);

  if (pathname.includes("/singapore-itinerary") || pathname.includes("/singapore")) {
    return (
      <CurrencyProvider>
        <SingaporeItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/vietnam-itinerary") || pathname.includes("/vietnam")) {
    return (
      <CurrencyProvider>
        <VietnamItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/thailand-itinerary") || pathname.includes("/thailand")) {
    return (
      <CurrencyProvider>
        <ThailandItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/europe-itinerary") || pathname.includes("/europe")) {
    return (
      <CurrencyProvider>
        <EuropeItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/japan-itinerary") || pathname.includes("/japan")) {
    return (
      <CurrencyProvider>
        <JapanItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/bali-itinerary") || pathname.includes("/bali")) {
    return (
      <CurrencyProvider>
        <BaliItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/malaysia-itinerary") || pathname.includes("/malaysia")) {
    return (
      <CurrencyProvider>
        <MalaysiaItineraryPage />
      </CurrencyProvider>
    );
  }

  if (pathname.includes("/about")) {
    return (
      <CurrencyProvider>
        <AboutPage />
      </CurrencyProvider>
    );
  }

  return (
    <CurrencyProvider>
      <MainContent />
    </CurrencyProvider>
  );
}
