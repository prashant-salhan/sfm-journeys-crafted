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

import { useCurrency } from "@/context/CurrencyContext";
import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { ItineraryModal } from "@/components/ItineraryModal";
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
        !searchQuery ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase());

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
            alt="Incredible India Tourism Taj Mahal & Himalayas"
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

          {/* Isolated SearchBox widget — typing only updates SearchBox internal state */}
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

      {/* Pure Footer Component */}
      <FooterSection />

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

function InlineEnquiryForm({ initialPackageTitle }: { initialPackageTitle?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const travelRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const [submittedData, setSubmittedData] = useState<{ name: string; phone: string; travel: string } | null>(null);

  useEffect(() => {
    if (initialPackageTitle && travelRef.current) {
      travelRef.current.value = initialPackageTitle;
    }
  }, [initialPackageTitle]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanName = nameRef.current?.value.trim() || "";
    const cleanPhone = phoneRef.current?.value.trim() || "";
    const cleanEmail = emailRef.current?.value.trim() || "";
    const cleanTravel = travelRef.current?.value.trim() || "Incredible India Holiday Package";
    const cleanDesc = descRef.current?.value.trim() || "";

    if (!cleanName || !cleanPhone) {
      setSubmitError("Please enter your name and phone number.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const apiBase = getApiBase();
    const payload = {
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      destination: cleanTravel,
      message: cleanDesc,
      source: "india_portal_inline",
    };

    if (apiBase) {
      fetch(`${apiBase}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("Backend Enquiry API warning:", err));
    }

    setSubmitting(false);
    setSubmittedData({ name: cleanName, phone: cleanPhone, travel: cleanTravel });
    setSubmitSuccess(true);
  };

  if (submitSuccess && submittedData) {
    const waMsg = `Hi SFM Travels India! I submitted an enquiry for ${encodeURIComponent(submittedData.travel)} (Name: ${encodeURIComponent(submittedData.name)}, Phone: ${encodeURIComponent(submittedData.phone)}).`;
    const waUrl = `https://wa.me/919876543210?text=${waMsg}`;

    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h4 className="text-xl font-bold text-slate-900">Request Submitted Successfully!</h4>
        <p className="text-slate-700 text-sm max-w-md mx-auto">
          Thank you <strong>{submittedData.name}</strong>! Your enquiry has been received. Our travel specialist will contact you on phone/WhatsApp shortly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            💬 Chat on WhatsApp Now
          </a>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setSubmittedData(null);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleFormSubmit} className="space-y-4">
      {submitError && (
        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-rose-700 text-xs font-semibold">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          defaultValue=""
          autoComplete="off"
          placeholder="Enter your name"
          required
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            ref={phoneRef}
            defaultValue=""
            autoComplete="off"
            placeholder="Enter phone number"
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            defaultValue=""
            autoComplete="off"
            placeholder="Enter your email"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="travel" className="text-xs font-bold text-slate-700 block mb-1">Where are you planning to travel? *</label>
        <input
          id="travel"
          type="text"
          name="travel"
          ref={travelRef}
          defaultValue={initialPackageTitle || ""}
          autoComplete="off"
          placeholder="Europe, Kashmir, Kerala, Dubai, Singapore....."
          required
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div>
        <label htmlFor="description" className="text-xs font-bold text-slate-700 block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          ref={descRef}
          defaultValue=""
          rows={3}
          placeholder="Enter additional details..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-base cursor-pointer"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
