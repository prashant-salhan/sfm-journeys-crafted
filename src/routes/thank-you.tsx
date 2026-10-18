import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Star,
  Copy,
  Check,
  MapPin,
  Calendar,
  Headphones,
  Compass,
  Building2,
  ChevronRight,
  HeartHandshake,
  CheckCheck,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/Sections";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";

import sfmKashmir from "@/assets/sfm-kashmir.jpg";
import sfmDubai from "@/assets/sfm-dubai.jpg";
import baliHeroPic from "@/assets/bali/hero-1.jpg";
import vietnamHeroPic from "@/assets/vietnam/hero-1.webp";
import europeHeroPic from "@/assets/europe/hero-1.jpeg";
import singaporeHeroPic from "@/assets/singapore/hero-1.jpg";
import namasteGreeting from "@/assets/namaste-greeting.png";

function ClientLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (onClick) onClick();
        if (href.startsWith("/")) {
          e.preventDefault();
          window.history.pushState({}, "", href);
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}
    >
      {children}
    </a>
  );
}

interface EnquiryDetails {
  name: string;
  phone: string;
  destination: string;
  date?: string;
  ref: string;
  submittedAt?: string;
}

const FEATURED_EXPLORE_CARDS = [
  {
    id: "bali",
    title: "Bali Tropical Escape",
    tagline: "Villas, Waterfalls & Uluwatu Sunset",
    days: "6N / 7D",
    route: "/bali-itinerary",
    image: baliHeroPic,
    badge: "Trending",
  },
  {
    id: "vietnam",
    title: "Vietnam Grand Experience",
    tagline: "Ha Long Bay Cruise & Golden Bridge",
    days: "9N / 10D",
    route: "/vietnam-itinerary",
    image: vietnamHeroPic,
    badge: "Top Rated",
  },
  {
    id: "europe",
    title: "Paris & Swiss Alps Special",
    tagline: "Mount Titlis, Jungfrau & Eiffel Tower",
    days: "6N / 7D",
    route: "/europe-itinerary",
    image: europeHeroPic,
    badge: "Luxury",
  },
  {
    id: "singapore-cruise",
    title: "Singapore & Genting Cruise",
    tagline: "Marina Bay, Sentosa & High Seas Cruise",
    days: "6N / 7D",
    route: "/singapore-cruise-itinerary",
    image: singaporeHeroPic,
    badge: "Bestseller",
  },
  {
    id: "kashmir",
    title: "Kashmir Paradise Tour",
    tagline: "Gulmarg Gondola & Dal Lake Houseboats",
    days: "5N / 6D",
    route: "/#packages",
    image: sfmKashmir,
    badge: "Domestic Pick",
  },
  {
    id: "dubai",
    title: "Dubai & Abu Dhabi Royal",
    tagline: "Desert Safari, Burj Khalifa & Sheikh Zayed",
    days: "5N / 6D",
    route: "/#packages",
    image: sfmDubai,
    badge: "Most Popular",
  },
];

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You | SFM Travels - Booking Request Received" },
      {
        name: "description",
        content:
          "Thank you for contacting SFM Travels. Your enquiry has been received and our destination manager will connect with you shortly.",
      },
    ],
  }),
  component: ThankYouPage,
});

export function ThankYouPage() {
  const [enquiry, setEnquiry] = useState<EnquiryDetails>(() => {
    if (typeof window === "undefined") {
      return {
        name: "Valued Traveler",
        phone: "+91 97110 38584",
        destination: "Holiday Vacation Package",
        ref: "SFM-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        submittedAt: new Date().toISOString(),
      };
    }

    const params = new URLSearchParams(window.location.search);
    const qName = params.get("name");
    const qPhone = params.get("phone");
    const qDest = params.get("dest") || params.get("destination");
    const qRef = params.get("ref");

    let stored: any = null;
    try {
      const raw = sessionStorage.getItem("sfm_latest_enquiry");
      if (raw) stored = JSON.parse(raw);
    } catch (_) {}

    return {
      name: qName || stored?.name || "Valued Traveler",
      phone: qPhone || stored?.phone || "+91 97110 38584",
      destination: qDest || stored?.destination || "Customized Holiday Package",
      date: stored?.date || "Upcoming / Flexible",
      ref: qRef || stored?.ref || "SFM-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      submittedAt: stored?.submittedAt || new Date().toISOString(),
    };
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleCopyRef = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(enquiry.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const whatsappMessage = `Hi SFM Travels! I submitted an enquiry on your website.\n\n*Reference ID:* ${enquiry.ref}\n*Name:* ${enquiry.name}\n*Destination:* ${enquiry.destination}\n*Phone:* ${enquiry.phone}\n\nPlease share my customized day-wise itinerary and quote on WhatsApp.`;
  const whatsappUrl = `https://wa.me/919711038584?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white w-full max-w-full overflow-x-hidden relative">
      {/* Background Soft Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-emerald-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 -left-40 w-[30rem] h-[30rem] bg-sky-500/5 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar
          onPlanTripClick={() => {
            window.history.pushState({}, "", "/contact-us");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-8 font-outfit">
          <ClientLink href="/" className="hover:text-amber-600 transition-colors flex items-center gap-1 text-slate-500 no-underline">
            <span>Home</span>
          </ClientLink>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-amber-700 font-bold">Booking Confirmation</span>
        </nav>

        {/* Hero Confirmation with Hostess on the Right Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-16">
          {/* Left Column: Heading, Subtitle & Status Pills (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm animate-fade-in font-outfit">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Enquiry Received Successfully!</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight font-display leading-[1.15]">
              Thank You, <span className="text-amber-600">{enquiry.name}</span>!
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-outfit">
              Your holiday request for <strong className="text-slate-900 font-bold">{enquiry.destination}</strong> has reached our senior destination desk. We are already preparing your customized day-wise itinerary.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs sm:text-sm text-slate-600 font-outfit">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span className="text-slate-700 font-bold">Status: Dedicated Specialist Assigned</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-slate-700 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold">Expected Callback: 15 – 30 Minutes</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hostess (No Background, Enlarged, Right Aligned) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="relative text-center flex flex-col items-center">
              <img
                src={namasteGreeting}
                alt="SFM Travels Holiday Specialist Namaste Greeting"
                className="w-auto h-72 sm:h-80 md:h-[350px] lg:h-[390px] object-contain drop-shadow-md select-none transition-transform duration-300 hover:scale-[1.02]"
                loading="eager"
              />
              <div className="inline-flex items-center gap-1.5 bg-white/95 border border-amber-200/90 shadow-md shadow-amber-500/10 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold text-slate-800 -mt-4 relative z-10 font-outfit whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Namaste from SFM Travels!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Summary Card & Fast-Track Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Booking / Enquiry Summary (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
            {/* Top gradient stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-600" />

            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block font-outfit">
                  Trip Reference Details
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight font-display">
                  Enquiry Summary
                </h2>
              </div>

              {/* Reference ID Pill with Copy */}
              <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200 px-3.5 py-1.5 rounded-xl shadow-2xs">
                <span className="text-xs text-amber-800 font-mono font-semibold">Ref:</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-900 font-mono tracking-wider">{enquiry.ref}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  title="Copy Reference ID"
                  className="text-amber-700 hover:text-amber-900 transition-colors p-1 cursor-pointer rounded hover:bg-amber-100/70"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Metadata Rows */}
            <div className="divide-y divide-slate-100 text-xs sm:text-sm my-5 space-y-3 font-outfit">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 flex items-center gap-2 font-medium">
                  <Star className="w-4 h-4 text-amber-500" /> Guest Name
                </span>
                <span className="font-bold text-slate-900 text-right">{enquiry.name}</span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600" /> Destination
                </span>
                <span className="font-bold text-amber-700 text-right max-w-[60%] truncate" title={enquiry.destination}>
                  {enquiry.destination}
                </span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-sky-600" /> Contact Number
                </span>
                <span className="font-bold text-slate-900 font-mono text-right">{enquiry.phone}</span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4 text-purple-600" /> Travel Timeline
                </span>
                <span className="font-medium text-slate-700 text-right">{enquiry.date || "Upcoming / Flexible"}</span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-500 flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-amber-500" /> Consultation SLA
                </span>
                <span className="font-bold text-emerald-600 text-right flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4" /> Within 15–30 Mins
                </span>
              </div>
            </div>

            {/* Reassurance note */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-slate-600 font-outfit">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Your contact details are strictly confidential. You will only receive personalized trip plans and verified direct pricing without spam or unwanted calls.
              </p>
            </div>
          </div>

          {/* Right Column: Instant Connect & Fast-Track (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Priority Card */}
            <div className="bg-emerald-50/90 border border-emerald-300 rounded-3xl p-6 sm:p-7 shadow-lg shadow-emerald-500/10 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 font-outfit">
                    Fastest Response
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    Need Itinerary Immediately?
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-outfit">
                Chat with our senior holiday consultant right now on WhatsApp. Skip waiting and receive customized hotel options, photos & quotes directly.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer no-underline group font-outfit"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast-Track on WhatsApp Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Direct Calling Hotline Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-md shadow-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 font-outfit">
                    Direct Phone Support
                  </span>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Speak Directly With An Expert
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-outfit">
                <a
                  href="tel:+919711038584"
                  className="bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-slate-800 transition-all no-underline"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block font-normal">India Head Desk</span>
                    <span className="font-mono text-slate-900 font-bold text-[11px]">+91 97110 38584</span>
                  </div>
                </a>

                <a
                  href="tel:+971563607490"
                  className="bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-slate-800 transition-all no-underline"
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-500 block font-normal">Dubai Branch Desk</span>
                    <span className="font-mono text-slate-900 font-bold text-[11px]">+971 56 360 7490</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step "What Happens Next" Visual Process */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 font-outfit">
              Transparent Travel Planning
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight font-display">
              What Happens Next?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-outfit">
              Here is how our senior holiday specialists craft your dream getaway in 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:border-amber-400 hover:shadow-xl shadow-md shadow-slate-200/50 transition-all">
              <span className="text-4xl font-black text-slate-100 group-hover:text-amber-100 transition-colors absolute top-4 right-5 font-mono">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Requirements Review
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-outfit">
                Our destination coordinator reviews your chosen dates, guest count, and preferences against real-time seasonal discounts.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:border-sky-400 hover:shadow-xl shadow-md shadow-slate-200/50 transition-all">
              <span className="text-4xl font-black text-slate-100 group-hover:text-sky-100 transition-colors absolute top-4 right-5 font-mono">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Custom Itinerary Curation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-outfit">
                We craft an itemized, day-wise plan with verified 4★/5★ accommodations, private cabs, daily breakfast, and sightseeing inclusions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:border-emerald-400 hover:shadow-xl shadow-md shadow-slate-200/50 transition-all">
              <span className="text-4xl font-black text-slate-100 group-hover:text-emerald-100 transition-colors absolute top-4 right-5 font-mono">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Personalized Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-outfit">
                Your advisor connects via WhatsApp & call to share the PDF quote, adjust any days according to your wishlist, and lock in the best rate.
              </p>
            </div>
          </div>
        </section>

        {/* SFM Guarantee & Trust Badges */}
        <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 mb-16 sm:mb-20 shadow-sm font-outfit">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% Verified Stays</h4>
              <p className="text-xs text-slate-500">Strictly inspected 4★ & 5★ partner hotels</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">24/7 On-Trip Concierge</h4>
              <p className="text-xs text-slate-500">Always one message away during your travel</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Zero Hidden Charges</h4>
              <p className="text-xs text-slate-500">Transparent line-item quotes with GST breakdown</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">4.9★ Rated Agency</h4>
              <p className="text-xs text-slate-500">Trusted by over 3,500+ happy holidaymakers</p>
            </div>
          </div>
        </section>

        {/* Explore More Destinations Carousel / Cards */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 font-outfit">
                Explore More While You Wait
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-display">
                Trending International & Domestic Holidays
              </h2>
            </div>
            <ClientLink
              href="/"
              className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition-colors no-underline font-outfit"
            >
              <span>Explore All Packages</span>
              <ArrowRight className="w-4 h-4" />
            </ClientLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_EXPLORE_CARDS.map((card) => (
              <ClientLink
                key={card.id}
                href={card.route}
                className="group relative bg-white border border-slate-200 hover:border-amber-400 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/50 hover:shadow-xl no-underline block"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md font-outfit">
                    {card.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200/80 font-outfit shadow-2xs">
                    {card.days}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-display">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 font-outfit">
                    {card.tagline}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-700 font-outfit">
                    <span>View Day-Wise Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ClientLink>
            ))}
          </div>

          {/* Quick Return to Home Button */}
          <div className="pt-10 text-center">
            <ClientLink
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-slate-900/15 no-underline font-outfit"
            >
              <span>Return to SFM Travels Home</span>
              <ArrowRight className="w-4 h-4" />
            </ClientLink>
          </div>
        </section>
      </main>

      {/* Floating Circular Social Menu */}
      <CircularSocialMenu />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
