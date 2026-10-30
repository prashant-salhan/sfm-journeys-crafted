import { useState, useRef, memo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ShieldCheck,
  Star,
  Users,
  Compass,
  ChevronDown,
  HeartHandshake,
  Maximize2,
  X,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/Sections";
import { CircularSocialMenu } from "@/components/CircularSocialMenu";
import { InlineEnquiryForm } from "@/components/InlineEnquiryForm";

import sudhanshuCard from "@/assets/team/sudhanshu-sridhar-card.jpg";
import yashikaCard from "@/assets/team/yashika-kohli-card.jpg";
import anubhavCard from "@/assets/team/anubhav-sharma-card.jpg";
import mohiniCard from "@/assets/team/mohini-verma-card.jpg";
import richaCard from "@/assets/team/richa-dyundi-card.jpg";
import gauravCard from "@/assets/team/gaurav-dudeja-card.jpg";
import rahulCard from "@/assets/team/rahul-sunar-card.jpg";

const POPULAR_DESTINATIONS = [
  "Kashmir",
  "Kerala",
  "Goa",
  "Himachal & Manali",
  "Rajasthan",
  "Bali, Indonesia",
  "Singapore & Cruise",
  "Thailand & Phuket",
  "Vietnam & Ha Long Bay",
  "Europe & Swiss Alps",
  "Dubai & Abu Dhabi",
  "Japan & Tokyo",
];

interface TeamContact {
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  email: string;
  badge: string;
  location: string;
  desc: string;
  cardImage: string;
}

const TEAM_CONTACTS: TeamContact[] = [
  {
    name: "Sudhanshu Sridhar",
    role: "Director",
    phone: "+91 97110 38584",
    phoneRaw: "919711038584",
    email: "sudhanshu.sridhar@sfmtravels.com",
    badge: "Leadership & VIP Desk",
    location: "Paschim Vihar, Delhi",
    desc: "Oversees bespoke international escapes, luxury family holidays, and strategic guest satisfaction across global destinations.",
    cardImage: sudhanshuCard,
  },
  {
    name: "Yashika Kohli",
    role: "India Business Head",
    phone: "+91 99997 79351",
    phoneRaw: "919999779351",
    email: "yashika.shridhar@sfmtravels.com",
    badge: "India Business Head",
    location: "Paschim Vihar, Delhi",
    desc: "Directs pan-India travel operations, premium group tours, and custom itinerary consultations.",
    cardImage: yashikaCard,
  },
  {
    name: "Anubhav Sharma",
    role: "Dubai Business Head",
    phone: "+971 52 697 3378",
    phoneRaw: "971526973378",
    email: "Anubhav@sfmtravels.com",
    badge: "Dubai & Middle East Desk",
    location: "Dubai & India Desk",
    desc: "Specialist in UAE luxury tours, desert safaris, corporate events, and Middle East departures.",
    cardImage: anubhavCard,
  },
  {
    name: "Mohini Verma",
    role: "Sales Manager",
    phone: "+91 89203 25657",
    phoneRaw: "918920325657",
    email: "sales@sfmtravels.com",
    badge: "Custom Tour Specialist",
    location: "Paschim Vihar, Delhi",
    desc: "Expert in honeymoon departures, corporate retreats, and international luxury itineraries.",
    cardImage: mohiniCard,
  },
  {
    name: "Richa Dyundi",
    role: "Domestic Sr. Travel Advisor",
    phone: "+91 83830 22384",
    phoneRaw: "918383022384",
    email: "mailrichasfm@gmail.com",
    badge: "India Domestic Specialist",
    location: "Paschim Vihar, Delhi",
    desc: "Specialist in domestic holiday planning across Kashmir, Himachal, Kerala, Goa, and Rajasthan.",
    cardImage: richaCard,
  },
  {
    name: "Gaurav Dudeja",
    role: "Sr. Sales Executive",
    phone: "+91 83683 57823",
    phoneRaw: "918368357823",
    email: "sales5@sfmtravels.com",
    badge: "Holiday Consultant",
    location: "Paschim Vihar, Delhi",
    desc: "Specializing in family vacations, group packages, and personalized hotel & flight bookings.",
    cardImage: gauravCard,
  },
  {
    name: "Rahul Sunar",
    role: "International Sales Executive",
    phone: "+91 89203 32983",
    phoneRaw: "918920332983",
    email: "info@sfmtravels.com",
    badge: "International Specialist",
    location: "Paschim Vihar, Delhi",
    desc: "Assisting client enquiries, group tour coordination, and bespoke international travel planning.",
    cardImage: rahulCard,
  },
];

const FAQS = [
  {
    q: "How fast will an SFM travel specialist get back to me?",
    a: "Our destination managers typically connect within 15 to 30 minutes during business hours (10:00 AM – 7:30 PM). If you request assistance after hours, we respond first thing the next morning.",
  },
  {
    q: "Can I visit your office in Paschim Vihar for in-person holiday planning?",
    a: "Yes, absolutely! We love hosting our guests. Our office is located at Prateek Apartments, DDA Flats, Paschim Vihar, Delhi. Walk-ins are always welcome from Monday to Saturday, 10:00 AM to 7:30 PM.",
  },
  {
    q: "Can you customize itineraries to match my exact budget and travel dates?",
    a: "100% yes. Every trip we craft can be tailored — from hotel category (4★, 5★, or boutique private villas) to daily sightseeing, vehicle type (private sedan/SUV), flight timings, and dietary meal plans.",
  },
  {
    q: "How do bookings, advance deposits, and payment confirmations work?",
    a: "Once you approve your custom itinerary, we confirm reservations with an initial token deposit. You receive official GST invoices, verified hotel confirmation vouchers, and a 24/7 dedicated trip coordinator.",
  },
  {
    q: "Do you assist with flights, visas, and travel insurance?",
    a: "Yes! We provide complete end-to-end travel management, including flight tickets at group rates, hassle-free visa processing support, and comprehensive international travel insurance.",
  },
];

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us | SFM Travels - Smile For Millions" },
      {
        name: "description",
        content:
          "Connect with SFM Travels. Reach out to our holiday specialists in Paschim Vihar, Delhi for custom international tours, domestic packages, and 24/7 guest support.",
      },
    ],
  }),
  component: ContactUsPage,
});

export function ContactUsPage() {
  const MAPS_DIRECTIONS_URL =
    "https://www.google.com/maps/dir/31.4179584,75.6547584/SFM+Tour+%26+Travels,+Prateek+Apartments,+DDA+Flats,+A2%2F53,+A+2+Block,+Paschim+Vihar,+Delhi,+110063/@28.7497257,77.0464472,11.85z/data=!4m9!4m8!1m0!1m5!1m1!1s0x390d03dc5d40d6db:0x592245231a9d04af!2m2!1d77.1027973!2d28.6709532!3e0?entry=ttu&g_ep=EgoyMDI2MTAxMS4wIKXMDSoASAFQAw%3D%3D";

  const MAP_EMBED_URL =
    "https://maps.google.com/maps?q=SFM%20Tour%20%26%20Travels%2C%20Prateek%20Apartments%2C%20DDA%20Flats%2C%20A2%2F53%2C%20A%202%20Block%2C%20Paschim%20Vihar%2C%20Delhi%2C%20110063&t=&z=15&ie=UTF8&iwloc=&output=embed";

  const [selectedDestination, setSelectedDestination] = useState("Custom Holiday Package");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCard, setSelectedCard] = useState<TeamContact | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleScrollToForm = (destTitle?: string) => {
    if (destTitle) {
      setSelectedDestination(destTitle);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 w-full max-w-full overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[36rem] h-[36rem] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] bg-amber-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -left-40 w-[30rem] h-[30rem] bg-slate-800/20 rounded-full blur-[130px]" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-50">
        <Navbar onPlanTripClick={handleScrollToForm} />
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 mb-6">
          <a
            href="/"
            onClick={(e) => {
              if (window.location.pathname !== "/") {
                e.preventDefault();
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }
            }}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer no-underline text-slate-400"
          >
            <span>Home</span>
          </a>
          <span className="text-slate-600">/</span>
          <span className="text-amber-400 font-bold">Contact Us</span>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>SFM Travels Concierge • 24/7 Dedicated Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Let&apos;s Plan Your Next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              Dream Journey
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you are dreaming of a luxury international getaway, a family mountain retreat, or corporate group tours, our holiday specialists in Paschim Vihar, Delhi are here to craft your perfect itinerary.
          </p>

          {/* Quick Contact Buttons Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="tel:+919711038584"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 no-underline"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>Call (+91) 97110 38584</span>
            </a>

            <a
              href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20a%20holiday%20trip!%20Please%20connect%20with%20me."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 no-underline"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => handleScrollToForm()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-500/50 font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Get Free Quote</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Contact Channels Grid */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16 sm:pb-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Studio & Office */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-xl group hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Headquarters</span>
                <h3 className="text-lg font-black text-white mt-0.5">Delhi Experience Studio</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                SFM Tour And Travels, Prateek Apartments, DDA Flats, A2/53, A 2 Block, Paschim Vihar, Delhi – 110063
              </p>
              <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mon – Sat: 10:00 AM – 7:30 PM</span>
                </div>
                <p className="text-slate-400 pl-5">Sunday by Prior Appointment</p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all no-underline"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone Hotlines */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-xl group hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Call Directly</span>
                <h3 className="text-lg font-black text-white mt-0.5">Dedicated Phone Support</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Speak directly with an experienced vacation planner for immediate itinerary insights.
              </p>
              <div className="space-y-2 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">India Hotline:</span>
                  <a href="tel:+919711038584" className="text-sm font-black text-amber-300 hover:text-amber-200 no-underline">
                    +91 97110 38584
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Booking Desk:</span>
                  <a href="tel:+918920325657" className="text-sm font-black text-slate-200 hover:text-white no-underline">
                    +91 89203 25657
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dubai Representative:</span>
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs">
                    <a href="tel:+971526973378" className="font-bold text-slate-300 hover:text-white no-underline">
                      +971 52 697 3378
                    </a>
                    <span className="text-slate-600">/</span>
                    <a href="tel:+971563607490" className="font-bold text-slate-300 hover:text-white no-underline">
                      +971 56 360 7490
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="tel:+919711038584"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all no-underline"
              >
                <span>Call Hotline Now</span>
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: WhatsApp Concierge */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-xl group hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 fill-emerald-400/20" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Instant Chat</span>
                <h3 className="text-lg font-black text-white mt-0.5">WhatsApp Fast Desk</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Receive day-by-day PDF itineraries, verified hotel walkthrough videos, and custom pricing quotes on WhatsApp.
              </p>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Typical response time:</span>
                  <span className="text-emerald-400 font-black">Under 15 Mins</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Holiday specialists online</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20am%20interested%20in%20planning%20a%20trip!%20Please%20share%20details."
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all no-underline shadow-lg shadow-emerald-600/20"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Email Inquiries */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-xl group hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Official Mail</span>
                <h3 className="text-lg font-black text-white mt-0.5">Email Support Desk</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For detailed custom requirements, corporate tour quotations, and voucher confirmations.
              </p>
              <div className="space-y-2 pt-1 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">General Inquiries:</span>
                  <a href="mailto:info@sfmtravels.co.in" className="font-bold text-amber-300 hover:text-amber-200 no-underline break-all">
                    info@sfmtravels.co.in
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sales & Itineraries:</span>
                  <a href="mailto:sales@sfmtravels.com" className="font-bold text-slate-300 hover:text-white no-underline break-all">
                    sales@sfmtravels.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="mailto:info@sfmtravels.co.in"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all no-underline"
              >
                <span>Compose Email</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section - Exactly the same form as on the main web page */}
      <section ref={formRef} id="contact-form" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Form Column (7 Cols) - Uses the exact InlineEnquiryForm from the main page */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-900 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 flex items-center gap-1.5 font-outfit">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Free Instant Quote</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                Plan Your Customized Holiday Trip
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-outfit">
                Fill in your trip details below and our senior destination manager will prepare a customized day-wise itinerary & best pricing quote within 30 minutes.
              </p>
            </div>

            {/* Quick Pick Destination Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-outfit">
                Quick Select Destination:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setSelectedDestination(dest)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-outfit ${
                      selectedDestination === dest
                        ? "bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-extrabold"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Render the Exact Same Form from the Main Web Page */}
            <InlineEnquiryForm
              initialPackageTitle={selectedDestination}
              source="contact_us_page"
            />
          </div>

          {/* Right Why Choose Us & Trust Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">Why SFM Travels</span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Travel With Unmatched Peace of Mind
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  With over a decade of curating journeys, SFM Travels (Smile For Millions) is trusted by thousands of families and honeymooners across India and abroad.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">100% Handcrafted Itineraries</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Customized day-wise pacing, curated sightseeing spots, and private chauffeur vehicles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Verified 4★ & 5★ Accommodations</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Handpicked properties personally inspected for hygiene, scenic vistas, and warm hospitality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">24/7 Dedicated Trip Coordinator</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Round-the-clock ground escort and emergency assistance from arrival to departure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero Hidden Charges</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Transparent quotation with all taxes, toll, parking, driver allowances, and breakfasts included.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Trust Metrics */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-black text-amber-400">5,000+</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Happy Guests</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-black text-amber-400">4.9 ★</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Google Rating</div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Prefer to chat on WhatsApp?</h4>
                <p className="text-xs text-slate-400">Connect directly with a holiday specialist right now.</p>
              </div>
              <a
                href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20want%20to%20plan%20a%20holiday!"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition-all no-underline shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>Chat Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map & Studio Directions Section */}
      <section id="visit-office" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28 z-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us in Person</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Our Delhi Consultation Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Located conveniently in Paschim Vihar, New Delhi. Drop in for a freshly brewed cup of coffee while we chart out your next vacation itinerary.
              </p>
            </div>

            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 no-underline self-start md:self-auto"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Map Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[380px] sm:h-[450px]">
            <iframe
              title="SFM Tour And Travels Office Location"
              src={MAP_EMBED_URL}
              className="w-full h-full border-0 filter brightness-95 contrast-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Transit & Visit Details Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Nearest Metro:</span>
              <p className="text-xs sm:text-sm font-bold text-white">Paschim Vihar West (Green Line)</p>
              <p className="text-[11px] text-slate-400">Approx. 5–7 mins by e-rickshaw or auto</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Parking:</span>
              <p className="text-xs sm:text-sm font-bold text-white">Dedicated Guest Parking</p>
              <p className="text-[11px] text-slate-400">Ample parking space inside Prateek Apartments</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Consultation:</span>
              <p className="text-xs sm:text-sm font-bold text-white">Artisanal Tea & Coffee</p>
              <p className="text-[11px] text-slate-400">Relaxed 1-on-1 itinerary walk-through</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Destination Specialists Directory */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20 sm:pb-28 z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>SFM Team Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Meet Your Holiday Specialists
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every itinerary is personally reviewed and supervised by seasoned travel leaders with deep destination expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM_CONTACTS.map((person, idx) => (
            <div
              key={idx}
              className="group bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              {/* Top: Digital Visiting Card Image */}
              <div
                onClick={() => setSelectedCard(person)}
                className="relative w-full aspect-[4/3] bg-white rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-slate-700/60 shadow-md group-hover:border-amber-500/40 transition-all cursor-pointer"
                title={`Click to view ${person.name}'s official visiting card`}
              >
                <img
                  src={person.cardImage}
                  alt={`${person.name} - ${person.role}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-[11px] font-bold shadow-lg border border-amber-500/40">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </span>
                </div>
              </div>

              {/* Bottom: Basic Info & Actions */}
              <div className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 truncate">
                      {person.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">
                      {person.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white">{person.name}</h3>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">{person.role}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {person.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <a
                        href={`tel:${person.phoneRaw}`}
                        className="text-slate-200 hover:text-amber-300 font-bold no-underline truncate"
                      >
                        {person.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <a
                        href={`mailto:${person.email}`}
                        className="text-slate-400 hover:text-white no-underline text-[11px] truncate"
                      >
                        {person.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`tel:${person.phoneRaw}`}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center no-underline transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${person.phoneRaw}?text=Hi%20${encodeURIComponent(
                      person.name
                    )},%20I%20am%20interested%20in%20planning%20a%20holiday%20trip!`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center no-underline transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-24 sm:pb-32 z-10">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Got a query before reaching out? Check out quick answers below.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Official SFM Footer */}
      <div className="relative z-10 border-t border-slate-900">
        <FooterSection />
      </div>

      {/* Lightbox Visiting Card Modal */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCard(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden space-y-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">{selectedCard.name}</h3>
                <p className="text-xs font-bold text-amber-400">{selectedCard.role} • SFM Tour & Travels</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-700"
                aria-label="Close card preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Visiting Card Display */}
            <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-inner flex items-center justify-center overflow-hidden border border-slate-300">
              <img
                src={selectedCard.cardImage}
                alt={`${selectedCard.name} Official Visiting Card`}
                className="w-full max-h-[60vh] object-contain rounded-xl"
              />
            </div>

            {/* Quick Actions in Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400 space-y-0.5">
                <p className="text-slate-200 font-bold">{selectedCard.phone}</p>
                <p className="text-[11px]">{selectedCard.email}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedCard.phoneRaw}`}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 no-underline shadow-lg shadow-amber-500/20"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Directly</span>
                </a>
                <a
                  href={`https://wa.me/${selectedCard.phoneRaw}?text=Hi%20${encodeURIComponent(
                    selectedCard.name
                  )},%20I%20am%20interested%20in%20planning%20a%20holiday%20trip!`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 no-underline shadow-lg shadow-emerald-600/25"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Widgets */}
      <CircularSocialMenu />
          </div>
  );
}
