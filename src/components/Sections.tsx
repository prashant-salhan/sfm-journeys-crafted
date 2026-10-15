import { useState, useRef, useEffect, memo } from "react";
import {
  Compass,
  Globe,
  Sun,
  Camera,
  Utensils,
  ShieldCheck,
  Clock,
  FileCheck,
  Users,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  BadgeCheck,
  Headphones,
  Car,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import sfmLogo from "@/assets/sfm-logo.png";

export type PackageItinerary = {
  day: number;
  title: string;
  desc: string;
};

export type IndiaPackage = {
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
  rating?: number;
  reviewsCount?: number;
  detailsUrl?: string;
};

export const INDIA_REGIONS = [
  {
    name: "North India & Himalayas",
    location: "Kashmir, Himachal, Golden Triangle, Ladakh",
    desc: "Majestic snow peaks, Dal Lake houseboats, Taj Mahal, hill stations, and ancient spiritual heritage.",
    tags: ["Srinagar", "Gulmarg", "Pahalgam", "Manali", "Taj Mahal"],
    borderAccent: "hover:border-sky-400 hover:shadow-sky-400/20",
  },
  {
    name: "South India & Tropics",
    location: "Kerala, Munnar, Coorg, Hampi, Rameshwaram",
    desc: "Emerald backwaters, lush tea estates, palm groves, and grand Dravidian temples.",
    tags: ["Munnar", "Alleppey", "Thekkady", "Kovalam", "Coorg"],
    borderAccent: "hover:border-emerald-400 hover:shadow-emerald-400/20",
  },
  {
    name: "West & Royal Rajasthan",
    location: "Jaipur, Udaipur, Jaisalmer Desert, Goa",
    desc: "Royal fortresses, Thar desert camel glamping under stars, and sun-kissed tropical beaches.",
    tags: ["Jaipur", "Udaipur", "Jaisalmer", "Baga Beach", "Old Goa"],
    borderAccent: "hover:border-amber-400 hover:shadow-amber-400/20",
  },
  {
    name: "East & North-East",
    location: "Darjeeling, Sikkim, Meghalaya, Assam",
    desc: "Living root bridges, organic tea gardens, Kaziranga rhinos, and Himalayan monasteries.",
    tags: ["Gangtok", "Darjeeling", "Shillong", "Kaziranga", "Tawang"],
    borderAccent: "hover:border-purple-400 hover:shadow-purple-400/20",
  },
];

export const RegionsSection = memo(function RegionsSection() {
  return (
    <section id="regions" className="py-24 px-4 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Globe className="w-3.5 h-3.5 animate-spin-slow" /> Regional Circuits & Destinations
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Explore India by Popular Circuits
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            From snow-draped Himalayan mountain passes in the North to serene emerald backwater lagoons in the South, select your dream destination circuit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIA_REGIONS.map((reg, i) => (
            <div
              key={i}
              className={`bg-white border border-slate-200/90 p-7 rounded-3xl space-y-5 transition-all duration-300 group shadow-xl shadow-slate-200/60 hover-card-3d ${reg.borderAccent}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-widest">{reg.name}</span>
                <div className="p-2 rounded-xl bg-slate-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                  <Compass className="w-4 h-4 group-hover:rotate-45 group-hover:scale-125 transition-transform" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">{reg.location}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">{reg.desc}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {reg.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-transform hover:scale-105">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const TestimonialsSection = memo(function TestimonialsSection() {
  const reviews = [
    {
      name: "Naveen Vattani",
      info: "Verified Google Reviewer",
      date: "4 months ago",
      tour: "Singapore Customized Tour",
      rating: 5,
      comment:
        "We had an amazing experience exploring Singapore, all thanks to the fantastic team at SFM Tours. They tailored the itinerary beautifully to match our preferences, ensuring we got to experience the best of the city without any hassle. The local execution, coordination, and on-ground support were top-notch and highly professional. We will definitely be booking our future international trips with them!\n\nSpecial Thanks to there team Members Mr. Raj Sharma and Mr. Rahul Sunar.",
      avatar: "/avatars/user-1.jpg",
      reviewUrl: "https://maps.app.goo.gl/uEf6qR2xuYQLBZpeA",
    },
    {
      name: "Rajveer Singh Rawat",
      info: "Verified Google Reviewer",
      date: "4 months ago",
      tour: "Goa Customized Tour",
      rating: 5,
      comment:
        "Thank you Sudhanshu Ji and Yashika for planning such a wonderful Goa trip. Everything was very well managed, from the hotel and food to the cab arrangements. I especially appreciated how your team regularly checked if everything was going smoothly. It was a great experience and truly enjoyable. Thanks again for making the trip memorable!",
      avatar: "/avatars/user-2.jpg",
      reviewUrl: "https://maps.app.goo.gl/LSyBaARBENy9HnRP9",
    },
    {
      name: "Pankaj Damahe",
      info: "Verified Google Reviewer",
      date: "5 months ago",
      tour: "Singapore Family Tour",
      rating: 5,
      comment:
        "Thank you SFM tour and travels team for making my family trip to Singapore memorable. Thank you Sudhanshu, Rahul and Raj means a lot ❤️🙏",
      avatar: "/avatars/user-3.jpg",
      reviewUrl: "https://maps.app.goo.gl/XLx8UQL1xB7cJV4b8",
    },
    {
      name: "Suraj Thakur",
      info: "Verified Google Reviewer",
      date: "1 year ago",
      tour: "Bali Vacation Package",
      rating: 5,
      comment:
        "I recently booked a Bali package with SFM Tour and Travel, and I was blown away by the experience! The itinerary was well-planned, and the accommodations were top-notch. The team was responsive and helpful throughout the trip.\n\nSpecial thanks to Rahul for his exceptional corporation and coordination. He went above and beyond to ensure that our trip was seamless and enjoyable. His attention to detail and knowledge of Bali were impressive. Highly recommend SFM Tour and Travel!",
      avatar: "/avatars/user-4.jpg",
      reviewUrl: "https://maps.app.goo.gl/8BxKp26AzU5sCuvB8",
    },
    {
      name: "Santosh Choudhary",
      info: "Verified Google Reviewer",
      date: "2 months ago",
      tour: "SFM Holiday Tour Package",
      rating: 5,
      comment:
        "I had a wonderful experience with this Sfm Tour & Travels. The entire trip was well organized, and everything went smoothly from start to finish. Their team was professional, responsive, and always ready to help. The booking process was easy, and all arrangements were made on time. I highly recommend their services to anyone looking for a reliable and hassle-free travel experience. Thank you for making my trip memorable!",
      avatar: "/avatars/user-5.jpg",
      reviewUrl: "https://maps.app.goo.gl/FCVVBiLvdzRi2e6FA",
    },
    {
      name: "Kanika Kanika",
      info: "Verified Google Reviewer",
      date: "3 months ago",
      tour: "Singapore Delight Package",
      rating: 5,
      comment:
        "We recently had the pleasure of traveling to Singapore with the exceptional assistance of SFM TRAVEL and I am delighted to share my wonderful experience. From start to finish, every detail of the plan exceeded our expectations in planning and executing our Singapore trip. Their attention to detail, commitment to punctuality, and focus on our comfort made this one of the best travel experiences we've ever had. I highly recommend their services to anyone looking for a perfectly planned and stress-free vacation. Thanks to SFM TEAM.",
      avatar: "/avatars/user-6.jpg",
      reviewUrl: "https://maps.app.goo.gl/VuRgmRurJLD9ShPB7",
    },
  ];

  const googleReviewLink =
    "https://www.google.com/search?q=sfm+travellers#lrd=0x390d03dc5d40d6db:0x592245231a9d04af,1,,,,";

  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Scroll to a specific card index
  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const containerWidth = container.clientWidth;
      const cardWidth = card.offsetWidth;
      const targetScroll = card.offsetLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIdx);
  };

  // Sync activeIndex with user manual scroll (touch or mouse wheel)
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const center = container.scrollLeft + container.clientWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;

        Array.from(container.children).forEach((child, idx) => {
          const el = child as HTMLElement;
          const childCenter = el.offsetLeft + el.offsetWidth / 2;
          const diff = Math.abs(center - childCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);
      }, 80);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Subtle auto-scroll timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % reviews.length;
        if (sliderRef.current) {
          const container = sliderRef.current;
          const card = container.children[nextIdx] as HTMLElement;
          if (card) {
            const containerWidth = container.clientWidth;
            const cardWidth = card.offsetWidth;
            const targetScroll = card.offsetLeft - (containerWidth - cardWidth) / 2;
            container.scrollTo({
              left: Math.max(0, targetScroll),
              behavior: "smooth",
            });
          }
        }
        return nextIdx;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  return (
    <section className="py-24 px-4 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce-subtle" /> Verified Google Reviews
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Loved by 5,000+ Happy Travelers
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-amber-600 font-extrabold text-sm">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-slate-900 font-black text-base">4.9 / 5.0</span>
            <span className="text-slate-500 text-xs font-semibold">(435+ Real Reviews on Google)</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>View All 435+ Reviews on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Slider Prev / Next floating buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 hover:border-amber-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next review"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200/80 hover:border-amber-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className={`min-w-[85vw] sm:min-w-[340px] md:min-w-[370px] lg:min-w-[390px] max-w-[400px] shrink-0 snap-center bg-white border rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-slate-200/50 relative group transition-all duration-300 ${
                  activeIndex === idx
                    ? "border-amber-400 ring-2 ring-amber-400/20 scale-[1.01]"
                    : "border-slate-200 hover:border-amber-300 hover:shadow-xl"
                }`}
              >
                {/* Background decorative quote */}
                <Quote className="absolute top-4 right-4 w-12 h-12 text-slate-100 group-hover:text-amber-100/70 transition-colors pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Stars + Google Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <a
                      href={rev.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200/60 shadow-xs transition-colors"
                      title="View original review on Google Maps"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      Google Review
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                    </a>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-sm leading-relaxed font-medium italic break-words whitespace-pre-line min-h-[90px]">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Reviewer Profile with Real Portrait Face Photo */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-3.5 relative z-10">
                  <a
                    href={rev.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative shrink-0 group/avatar block"
                    title={`View ${rev.name}'s review on Google Maps`}
                  >
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400/80 shadow-md group-hover/avatar:ring-amber-500 transition-all"
                      loading="lazy"
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-black shadow-xs"
                      title="Verified Traveler"
                    >
                      ✓
                    </span>
                  </a>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <a
                        href={rev.reviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold text-slate-900 text-sm truncate hover:text-amber-600 transition-colors"
                      >
                        {rev.name}
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{rev.info}</p>
                    <p className="text-[11px] text-amber-600 font-bold truncate">{rev.tour} • {rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? "w-8 h-2.5 bg-amber-500 shadow-sm shadow-amber-500/50"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export const TravelEssentialsSection = memo(function TravelEssentialsSection() {
  return (
    <section id="essentials" className="py-24 px-4 bg-slate-50/60 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Traveler's Handbook
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          India Travel Essentials & Tips
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-medium">
          Essential insights prepared by our local destination experts to help you plan a smooth and enjoyable trip across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200/90 p-8 rounded-3xl space-y-5 hover-card-3d shadow-xl shadow-slate-200/50">
          <div className="p-3.5 w-fit rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 float-3d shadow-sm">
            <Sun className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Best Season to Visit</h3>
          <p className="text-slate-600 text-xs leading-relaxed space-y-2 font-medium">
            <strong className="text-amber-700 block">October to March:</strong> Ideal season for Golden Triangle, Rajasthan desert glamping, Kerala backwaters, and Goa beaches.  
            <strong className="text-amber-700 block mt-2">April to July:</strong> Peak time for Himalayan snow points in Kashmir, Ladakh, and Himachal Pradesh.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 p-8 rounded-3xl space-y-5 hover-card-3d shadow-xl shadow-slate-200/50">
          <div className="p-3.5 w-fit rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 float-3d shadow-sm">
            <Camera className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Culture & Etiquette</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            India warmly welcomes travelers with the ethos of <em>"Atithi Devo Bhava"</em> (Guest is God). Respectful, modest attire is customary when visiting ancient temples, shrines, and heritage monuments.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 p-8 rounded-3xl space-y-5 hover-card-3d shadow-xl shadow-slate-200/50">
          <div className="p-3.5 w-fit rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 float-3d shadow-sm">
            <Utensils className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Cuisine & Hospitality</h3>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Indulge in rich culinary diversity — from authentic Kashmiri Wazwan and Mughlai kebabs in North India to Rajasthani Royal Thali and traditional Keralan Sadhya served on banana leaves.
          </p>
        </div>
      </div>
    </section>
  );
});

export const FaqSection = memo(function FaqSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is included in the package cost?",
      a: "Our packages typically include deluxe hotel / houseboat accommodations with breakfast & dinner, private air-conditioned vehicle with dedicated driver, airport transfers, sightseeing tours, and entry tickets as specified in the itinerary.",
    },
    {
      q: "Can I customize the itinerary according to my schedule?",
      a: "Yes! 100% of our India tour packages are fully customizable. You can adjust the duration, upgrade hotel categories, or add custom destinations like Taj Mahal or houseboat extensions.",
    },
    {
      q: "How do I confirm and secure my booking?",
      a: "Submit an online enquiry or contact our specialist on WhatsApp. Once your itinerary is finalized, a nominal token advance booking deposit reserves your hotels, driver, and cabs.",
    },
    {
      q: "What is your on-ground support system during the tour?",
      a: "We assign a dedicated tour manager available 24/7 on WhatsApp & phone throughout your trip from your airport arrival until your departure drop-off.",
    },
    {
      q: "Are vehicles private or shared?",
      a: "All transfers and sightseeing are strictly in private, well-maintained air-conditioned vehicles (Sedan, SUV, or Tempo Traveller) reserved exclusively for your family or group.",
    },
  ];

  return (
    <section className="py-24 px-4 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Everything you need to know about booking with SFM Travels India.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isExpanded = hoveredIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isExpanded ? null : idx)}
                className={`bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm cursor-pointer group ${
                  isExpanded
                    ? "border-amber-400 bg-amber-50/25 shadow-md ring-1 ring-amber-400/30"
                    : "border-slate-200 hover:border-amber-300 hover:bg-slate-50/80"
                }`}
              >
                <div className="w-full text-left p-6 flex items-center gap-4 transition-colors">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 transition-colors ${
                      isExpanded
                        ? "bg-amber-500 text-slate-950 shadow-sm"
                        : "bg-slate-200 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-bold transition-colors ${
                      isExpanded ? "text-amber-700" : "text-slate-900 group-hover:text-amber-700"
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                {/* Smooth Slide Down / Collapse on Cursor Hover with Pure CSS Grid */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/70 font-medium">
                      <p className="mt-3 text-slate-700 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export const WhyChooseUsSection = memo(function WhyChooseUsSection() {
  const PILLARS = [
    {
      num: "01",
      tag: "Best Rate Promise",
      title: "Direct Rates Guarantee",
      desc: "Direct contracting with 4★/5★ luxury resorts, boutique heritage palaces & verified houseboat owners.",
      icon: ShieldCheck,
      gradient: "from-amber-500 via-amber-400 to-yellow-400",
      accentBg: "bg-amber-500/10 text-amber-700 border-amber-500/25",
      iconShadow: "shadow-amber-500/30",
      highlights: [
        "Zero hidden markups",
        "Direct resort tie-ups",
        "Best price assurance",
      ],
    },
    {
      num: "02",
      tag: "Live Concierge Desk",
      title: "24/7 On-Ground Support",
      desc: "Dedicated personal India tour manager assisting you from airport arrival, hotel check-ins, to final departure.",
      icon: Headphones,
      gradient: "from-orange-500 via-amber-500 to-amber-400",
      accentBg: "bg-orange-500/10 text-orange-700 border-orange-500/25",
      iconShadow: "shadow-orange-500/30",
      highlights: [
        "Instant WhatsApp helpline",
        "Real-time flight tracking",
        "Local language assistance",
      ],
    },
    {
      num: "03",
      tag: "Safety & Comfort Fleet",
      title: "Verified Cab Drivers",
      desc: "Professional, uniform-clad local drivers with well-maintained, sanitized, GPS-tracked air-conditioned vehicles.",
      icon: Car,
      gradient: "from-amber-600 via-orange-500 to-amber-400",
      accentBg: "bg-amber-500/10 text-amber-700 border-amber-500/25",
      iconShadow: "shadow-amber-600/30",
      highlights: [
        "Sanitized private AC cabs",
        "Police-verified chauffeurs",
        "Experienced route guides",
      ],
    },
    {
      num: "04",
      tag: "12+ Years Heritage",
      title: "5,000+ Happy Guests",
      desc: "Over a decade of handcrafted hospitality creating unforgettable bespoke holiday memories across India.",
      icon: HeartHandshake,
      gradient: "from-yellow-500 via-amber-400 to-amber-500",
      accentBg: "bg-yellow-500/10 text-yellow-800 border-yellow-500/25",
      iconShadow: "shadow-yellow-500/30",
      highlights: [
        "4.9★ Google & TripAdvisor",
        "94% repeat & referral guests",
        "100% custom-tailored pacing",
      ],
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-28 px-4 bg-gradient-to-b from-white via-slate-50/60 to-amber-50/20 border-t border-slate-200/80 relative overflow-hidden">
      {/* Ambient background radiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-400/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header with Luxury Editorial Styling */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 text-xs font-black uppercase tracking-widest shadow-sm font-outfit">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Why SFM Travels ?</span>
          </div>

          <h2
            className="font-display text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontVariationSettings: '"SOFT" 100, "WONK" 1',
            }}
          >
            Your Trusted{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Worldwide
            </span>{" "}
            Destination Specialist
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Direct resort contracts, 100% transparent pricing, and handcrafted bespoke vacations managed with personal warmth.
          </p>
        </div>

        {/* 4 Elevated Dynamic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative bg-white/95 backdrop-blur-xl border border-slate-200/90 hover:border-amber-400/60 rounded-3xl p-7 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Gradient Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number Watermark in Background */}
                <span className="absolute -top-3 -right-2 font-display text-7xl font-black text-slate-100 group-hover:text-amber-500/10 transition-colors duration-500 pointer-events-none select-none">
                  {pillar.num}
                </span>

                <div className="space-y-5 relative z-10">
                  {/* Top Row: 3D Gradient Icon + Tag Chip */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} text-slate-950 flex items-center justify-center shadow-lg ${pillar.iconShadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                    >
                      <IconComponent className="w-7 h-7 text-slate-950 stroke-[2.3]" />
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${pillar.accentBg}`}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 text-left">
                    <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight group-hover:text-amber-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                </div>

                {/* Highlights Checkmark List */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-left relative z-10">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 font-bold" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Ribbon */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-500/25 rounded-2xl py-3.5 px-6 shadow-sm flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-slate-800">
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-emerald-600" /> 100% Verified Accommodations
          </span>
          <span className="hidden sm:inline text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" /> Transparent Pricing
          </span>
          <span className="hidden sm:inline text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-4 h-4 text-amber-600" /> Dedicated Tour Manager
          </span>
          <span className="hidden sm:inline text-amber-400">•</span>
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-600" /> 5,000+ Happy Explorers
          </span>
        </div>
      </div>
    </section>
  );
});

export const FooterSection = memo(function FooterSection() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4 text-slate-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 w-auto" />
            <div>
              <span className="text-lg font-black text-white block leading-tight">SFM TRAVELS</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Smile For Millions</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            SFM Travels specializes in handcrafted Incredible India tour packages, Kerala houseboats, Kashmir snow holidays, Rajasthan palace tours, Dubai luxury holidays, and international beach getaways.
          </p>
          <div className="flex items-center gap-2.5 text-xs text-amber-400 font-bold pt-1">
            <Award className="w-4 h-4 shrink-0" /> <span>Indian & UAE-Dubai Registered company</span>
          </div>
        </div>

        {/* Aesthetic Quick Links */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
          </div>
          <ul className="space-y-2.5 text-xs font-medium text-slate-300">
            <li>
              <a
                href="#packages"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
                className="no-underline text-slate-300 hover:text-amber-400 transition-all inline-flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                <span>Domestic Tour Packages</span>
              </a>
            </li>
            <li>
              <a
                href="#packages"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
                className="no-underline text-slate-300 hover:text-amber-400 transition-all inline-flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                <span>International Tour Packages</span>
              </a>
            </li>
            <li>
              <a
                href="#enquiry"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
                className="no-underline font-bold text-amber-400 hover:text-amber-300 transition-all inline-flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-all" />
                <span>Get Free Custom Quote</span>
              </a>
            </li>
            <li>
              <a
                href="#why-us"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
                className="no-underline text-slate-300 hover:text-amber-400 transition-all inline-flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a
                href="#visit-office"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("visit-office")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none" }}
                className="no-underline text-slate-300 hover:text-amber-400 transition-all inline-flex items-center gap-2 group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                <span>Visit Our Office</span>
              </a>
            </li>
            <li>
              <a
                href="/admin"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, "", "/admin");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                }}
                style={{ textDecoration: "none" }}
                className="no-underline text-slate-400 hover:text-amber-400 transition-all inline-flex items-center gap-2 group font-semibold"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                <span>Admin Portal Login</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Contact & Offices</h4>
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
          </div>
          <div className="space-y-2.5 text-xs text-slate-300">
            <p className="leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>India:</strong> SFM Tour And Travels, Prateek Apartments, DDA Flats, A2/53, A 2 Block, Paschim Vihar, Delhi – 110063</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-amber-400">India:</span>
              <a href="tel:+919711038584" style={{ textDecoration: "none" }} className="no-underline text-slate-300 hover:text-amber-400 transition-colors">+91 97110 38584</a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-amber-400">UAE / Dubai:</span>
              <a href="tel:+971526973378" style={{ textDecoration: "none" }} className="no-underline text-slate-300 hover:text-amber-400 transition-colors">+971 52 697 3378</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:info@sfmtravels.co.in" style={{ textDecoration: "none" }} className="no-underline text-slate-300 hover:text-amber-400 transition-colors">info@sfmtravels.co.in</a>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Need Custom Plan?</h4>
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Speak to our senior travel consultant on WhatsApp for instant customized day-wise itineraries.
          </p>
          <a
            href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20trip!"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="no-underline inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-600/20"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} SFM Travels. All rights reserved. Smile For Millions</div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Cancellation Policy</a>
          <span>•</span>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, "", "/admin");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            style={{ textDecoration: "none" }}
            className="no-underline text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-bold"
          >
            <span>🔐 Admin Portal</span>
          </a>
        </div>
      </div>
    </footer>
  );
});
