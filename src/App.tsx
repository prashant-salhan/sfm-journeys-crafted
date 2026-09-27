import { useState, useTransition, useMemo, useRef } from "react";
import { Sparkles, MapPin, Calendar, Check, ArrowRight, MessageCircle } from "lucide-react";

import { CurrencyProvider, useCurrency } from "@/context/CurrencyContext";
import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";
import { ItineraryModal } from "@/components/ItineraryModal";
import {
  RegionsSection,
  TravelEssentialsSection,
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
    description: "Shikara ride on Dal Lake, houseboats, Gondola cable car ride in Gulmarg snow, and Pahalgam valley.",
    priceInr: 14999,
    image: sfmKashmir,
    badge: "Bestseller",
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
    inclusions: ["4★ Dubai City Hotel", "Burj Khalifa Ticket", "Desert Safari + BBQ", "Marina Dhow Cruise"],
    itinerary: [
      { day: 1, title: "Dubai Arrival & Dhow Dinner Cruise", desc: "Arrival at Dubai International Airport. Check-in hotel. Evening Marina Dhow Cruise with buffet dinner." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa", desc: "Half-day city tour visiting Dubai Frame, Jumeirah Beach, and Burj Khalifa 124th floor observatory." },
      { day: 3, title: "Dune Bashing Desert Safari", desc: "Morning at leisure. Afternoon 4x4 Desert Safari with dune bashing, camel rides, belly dance & BBQ dinner." },
      { day: 4, title: "Miracle Garden & Dubai Mall Shopping", desc: "Visit world's largest natural flower garden and Dubai Mall fountain show." },
      { day: 5, title: "Dubai Airport Departure", desc: "Breakfast, free time for gold souk shopping, transfer to airport." },
    ],
  },
];

function MainContent() {
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const [selectedPackage, setSelectedPackage] = useState<IndiaPackage | null>(null);
  const [enquiryPackageTitle, setEnquiryPackageTitle] = useState("");
  const enquiryFormRef = useRef<HTMLDivElement>(null);

  const filteredPackages = useMemo(() => {
    return FEATURED_PACKAGES.filter((pkg) => {
      // Tab filter logic
      let matchesTab = true;
      if (activeTab === "north") matchesTab = pkg.id.includes("kashmir") || pkg.id.includes("manali");
      else if (activeTab === "kerala") matchesTab = pkg.id.includes("kerala");
      else if (activeTab === "rajasthan") matchesTab = pkg.id.includes("rajasthan");
      else if (activeTab === "goa") matchesTab = pkg.id.includes("goa");

      // Search query logic
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      <Navbar onPlanTripClick={() => scrollToEnquiry("Custom India Tour Plan")} />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-4 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src={sfmHero}
            alt="Incredible India Taj Mahal & Himalayas"
            className="w-full h-full object-cover object-center opacity-30 scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Incredible India DMC & Tour Packages
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-md">
            Crafting Unforgettable <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Journeys Across India
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Kashmir snow heights, Kerala emerald backwaters, Rajasthan royal palaces & Goa beaches. Tailor-made itineraries with 100% price transparency.
          </p>

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

      {/* Packages Section */}
      <section id="packages" className="py-24 px-4 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Handcrafted Itineraries
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured India Tour Packages
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            All-inclusive packages featuring luxury stays, private AC vehicles, driver-cum-guides, and 24/7 on-ground support.
          </p>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
            <p className="text-slate-300 text-base">No packages found matching your filter or query.</p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col group shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {pkg.badge}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {pkg.duration}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                      <MapPin className="w-3.5 h-3.5" /> {pkg.category}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {pkg.inclusions.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-semibold">Starting From</span>
                      <span className="text-xl font-extrabold text-amber-400">
                        {formatPrice(pkg.priceInr)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPackage(pkg)}
                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
                      >
                        Itinerary
                      </button>
                      <button
                        onClick={() => scrollToEnquiry(pkg.title)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Book <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Regions Section */}
      <RegionsSection />

      {/* Travel Essentials */}
      <TravelEssentialsSection />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Enquiry Form Section */}
      <section ref={enquiryFormRef} id="enquiry" className="py-24 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Free Instant Quote
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Plan Your Customized India Trip
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Fill in your details below and our senior India destination specialist will prepare a customized day-wise itinerary & best pricing quote within 30 minutes.
            </p>
          </div>

          <InlineEnquiryForm initialPackageTitle={enquiryPackageTitle} />
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

      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20India%20trip!"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Chat with Specialist
        </span>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <MainContent />
    </CurrencyProvider>
  );
}
