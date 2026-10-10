import { useState, memo } from "react";
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
  ChevronDown,
  ChevronRight,
  Award,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
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
      name: "Rajveer Singh Rawat",
      info: "5 reviews · 10 photos",
      date: "4 months ago",
      tour: "Goa Customized Package",
      rating: 5,
      comment:
        "Thank you Sudhanshu Ji and Yashika for planning such a wonderful Goa trip. Everything was very well managed, from the hotel and food to the cab arrangements. I especially appreciated how your team regularly checked if everything was going well during our stay. Looking forward to planning our next trip with you!",
      avatarBg: "bg-blue-600",
      initials: "R",
    },
    {
      name: "Aman Sharma",
      info: "Local Guide · 14 reviews",
      date: "2 months ago",
      tour: "Thailand & Bali Vacation",
      rating: 5,
      comment:
        "Special thanks to Sudhanshu Ji for organizing our Thailand and Bali family vacation. Everything from 4-star hotel stays to private cab transfers was executed flawlessly. 24/7 support throughout our trip!",
      avatarBg: "bg-emerald-600",
      initials: "A",
    },
    {
      name: "Pooja & Rohan Mehra",
      info: "8 reviews · 4 photos",
      date: "3 months ago",
      tour: "Singapore & Cruise Tour",
      rating: 5,
      comment:
        "Extremely smooth visa assistance and flight booking for our Singapore & Cruise trip. Every excursion from Sentosa to Gardens by the Bay was booked seamlessly with zero hassle. SFM Travels is 100% recommended!",
      avatarBg: "bg-purple-600",
      initials: "P",
    },
    {
      name: "Vikramaditya Verma",
      info: "Local Guide · 22 reviews",
      date: "5 months ago",
      tour: "Vietnam Grand Tour",
      rating: 5,
      comment:
        "SFM Tour & Travels handled our Vietnam North-to-South tour effortlessly. Excellent guidance on visas, top-notch hotel selections in Hanoi, Da Nang and Saigon, and prompt responsiveness during our travel.",
      avatarBg: "bg-amber-600",
      initials: "V",
    },
  ];

  const googleReviewLink =
    "https://www.google.com/search?q=sfm+travellers#lrd=0x390d03dc5d40d6db:0x592245231a9d04af,1,,,,";

  return (
    <section className="py-24 px-4 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce-subtle" /> Verified Google Reviews
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Loved by 50,000+ Happy Travelers
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

          <div className="pt-2">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/90 border border-slate-200 p-6 rounded-3xl space-y-5 flex flex-col justify-between shadow-lg shadow-slate-200/50 relative group hover:border-amber-400 hover:bg-white transition-all duration-300"
            >
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 bg-slate-200/70 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    Google
                  </span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}>
                  {rev.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">{rev.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{rev.info}</p>
                  <p className="text-[10px] text-amber-600 font-bold truncate">{rev.tour} • {rev.date}</p>
                </div>
              </div>
            </div>
          ))}
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm hover:border-amber-400"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-amber-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-0 text-slate-600 text-xs leading-relaxed border-t border-slate-200/80 font-medium">
                  <p className="mt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const WhyChooseUsSection = memo(function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Why SFM Travels India
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Your Trusted Incredible India Destination Specialist
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Direct contracts, transparent pricing, and 100% guest satisfaction guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 p-7 bg-white border border-slate-200/90 rounded-3xl hover-card-3d shadow-lg shadow-slate-200/50">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 w-fit mx-auto border border-amber-500/20 float-3d shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Direct Rates Guarantee</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Direct contracting with 4★/5★ luxury resorts & verified houseboat owners.</p>
          </div>
          <div className="space-y-3 p-7 bg-white border border-slate-200/90 rounded-3xl hover-card-3d shadow-lg shadow-slate-200/50">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 w-fit mx-auto border border-amber-500/20 float-3d shadow-sm">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">24/7 On-Ground Support</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Dedicated India tour manager assisting you from arrival to final drop.</p>
          </div>
          <div className="space-y-3 p-7 bg-white border border-slate-200/90 rounded-3xl hover-card-3d shadow-lg shadow-slate-200/50">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 w-fit mx-auto border border-amber-500/20 float-3d shadow-sm">
              <FileCheck className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Verified Cab Drivers</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Professional, uniform-clad local drivers with well-maintained air-conditioned vehicles.</p>
          </div>
          <div className="space-y-3 p-7 bg-white border border-slate-200/90 rounded-3xl hover-card-3d shadow-lg shadow-slate-200/50">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 w-fit mx-auto border border-amber-500/20 float-3d shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">50,000+ Happy Guests</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">Over 10 years of experience creating unforgettable journeys across India.</p>
          </div>
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
              <span><strong>India:</strong> 142, Basement Avtar Enclave - Paschim Vihar New Delhi - 110063</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-amber-400">India:</span>
              <a href="tel:+919999779351" style={{ textDecoration: "none" }} className="no-underline text-slate-300 hover:text-amber-400 transition-colors">+91 99997 79351</a>
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
            href="https://wa.me/919999779351?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20my%20trip!"
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
        <div className="flex gap-4 text-[11px] text-slate-400">
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#enquiry" style={{ textDecoration: "none" }} className="no-underline text-slate-400 hover:text-amber-400 transition-colors">Cancellation Policy</a>
        </div>
      </div>
    </footer>
  );
});
