import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Check,
  Globe2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Maximize2,
  Menu,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Youtube,
} from "lucide-react";

import sfmLogo from "@/assets/sfm-logo.png";
import { CurrencySelector } from "@/components/CurrencySelector";
import directorImg from "@/assets/about/1.jpeg";
import mohiniImg from "@/assets/about/2.jpeg";
import gauravImg from "@/assets/about/WhatsApp Image 2026-09-20 at 12.39.21 AM.jpeg";
import rahulImg from "@/assets/about/4.jpeg";
import richaImg from "@/assets/about/5.jpeg";
import santoshImg from "@/assets/about/6.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | SFM Travels - Smile For Millions" },
      {
        name: "description",
        content:
          "Meet Sudhanshu Shridhar (Director) and the leadership team at SFM Travels. Dedicated to crafting memorable journeys with verified stays and 24/7 support.",
      },
    ],
  }),
  component: AboutPage,
});

const directorInfo = {
  name: "Sudhanshu Shridhar",
  designation: "Director",
  roleTag: "Director & Visionary Founder",
  image: directorImg,
  phones: ["+91 97110 38584", "+91 99997 79351"],
  email: "sudhanshu.shridhar@sfmtravels.com",
  address: "A-2/53 Prateek Apartments, 2nd Floor, DDA Flats, Paschim Vihar, Delhi - 110063",
  bio: "Leading SFM Travels (Smile For Millions) with a commitment to excellence, Sudhanshu Shridhar oversees strategic growth, customer experience standards, and bespoke travel solutions for thousands of holidaymakers across India and international destinations.",
  highlights: [
    "Over 12+ years of travel industry leadership",
    "Specialist in bespoke honeymoon & family itineraries",
    "Ensuring 100% guest safety, verified stays & transparent pricing",
    "24/7 dedicated guest support commitment",
  ],
};

const teamMembers = [
  {
    name: "Mohini Verma",
    designation: "Sales Manager",
    phone: "+91 89203 25657",
    email: "sales@sfmtravels.com",
    address: "Paschim Vihar, New Delhi - 110063",
    description: "Heading sales operations, guest consultations, and crafting tailor-made vacation packages.",
    image: mohiniImg,
    tone: "gold",
  },
  {
    name: "Richa Dyundi",
    designation: "Domestic Team Leader",
    phone: "+91 83830 22384",
    email: "domestic@sfmtravels.com",
    address: "Paschim Vihar, New Delhi - 110063",
    description: "Leading domestic trip planning across Kashmir, Himachal, Kerala, Goa, and Rajasthan.",
    image: richaImg,
    tone: "sky",
  },
  {
    name: "Santosh Chodhary",
    designation: "Accounts Head",
    phone: "+91 83682 83362",
    email: "accounts@sfmtravels.com",
    address: "Paschim Vihar, New Delhi - 110063",
    description: "Managing financial operations, transparent pricing integrity, and booking logistics.",
    image: santoshImg,
    tone: "cyan",
  },
  {
    name: "Gaurav Dudeja",
    designation: "Sr. Sales Executive",
    phone: "+91 83683 57823",
    email: "sales5@sfmtravels.com",
    address: "Paschim Vihar, New Delhi - 110063",
    description: "Specializing in luxury stays, corporate getaways, and personalised travel itineraries.",
    image: gauravImg,
    tone: "sky",
  },
  {
    name: "Rahul Sunar",
    designation: "Sr. Sales Executive",
    phone: "+91 89203 32983",
    email: "info@sfmtravels.com",
    address: "Paschim Vihar, New Delhi - 110063",
    description: "Assisting client enquiries, group tour coordination, and travel consultations.",
    image: rahulImg,
    tone: "gold",
  },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-3 ${className}`} aria-label="SFM Travels home">
      <img
        src={sfmLogo}
        alt="SFM Travels Logo"
        className="size-14 rounded-full object-contain shadow-lg shadow-sky/20 transition duration-300 hover:scale-105"
      />
      <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
        SFM <span className="text-sky">Travels</span>
      </span>
    </Link>
  );
}

export function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-sans text-foreground antialiased">
      {/* Background Aurora Lighting */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-ink" />
        <div className="aurora-one absolute -left-40 -top-40 size-[40rem] rounded-full bg-sky/20 blur-[140px]" />
        <div className="aurora-two absolute right-0 top-10 size-[36rem] rounded-full bg-gold/10 blur-[150px]" />
        <div className="aurora-one absolute left-1/3 top-[55%] size-[34rem] rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-ink/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
          <Logo />
          <div className="hidden items-center gap-8 lg:flex">
            <Link to="/" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Home</Link>
            <Link to="/flights" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Flights</Link>
            <Link to="/hotels" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Hotels</Link>
            <Link to="/" hash="destinations" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Destinations</Link>
            <Link to="/" hash="packages" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Packages</Link>
            <Link to="/" hash="services" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Services</Link>
            <Link to="/about" className="text-sm font-bold text-sky">About Us</Link>
            <Link to="/" hash="contact" className="text-sm font-medium text-foreground/65 transition hover:text-foreground">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector />
            <Link to="/" hash="contact" className="hidden rounded-lg bg-gradient-to-r from-sky to-cyan-300 px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-sky/20 transition hover:brightness-110 sm:block">Book Now</Link>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-lg border border-foreground/15 text-foreground/80 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-foreground/10 px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              <Link to="/" className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/70 hover:text-foreground">Home</Link>
              <Link to="/flights" className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/70 hover:text-foreground">Flights</Link>
              <Link to="/hotels" className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/70 hover:text-foreground">Hotels</Link>
              <Link to="/about" className="rounded-lg bg-foreground/10 px-3 py-2.5 text-left text-sm font-bold text-sky">About Us</Link>
              <Link to="/" hash="contact" className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/70 hover:text-foreground">Contact Us</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Intro */}
      <section className="relative mx-auto max-w-7xl px-5 pt-10 pb-12 lg:px-8 lg:pt-16 lg:pb-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-sky hover:underline">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        <div className="mt-6 mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Sparkles size={14} /> Smile For Millions (SFM Travels)
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Meet Our Leadership & <span className="bg-gradient-to-r from-sky via-cyan-300 to-gold bg-clip-text text-transparent">Designated Experts</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 sm:text-xl">
            Since 2013, SFM Travels has been guided by experienced travel professionals committed to personalized itineraries, transparent pricing, and 24/7 guest satisfaction.
          </p>
        </div>
      </section>

      {/* Prominent Director Section: Sudhanshu Shridhar */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-gold/15 via-ink/90 to-sky/10 p-6 shadow-2xl shadow-gold/10 sm:p-10 lg:p-12">
          {/* Decorative Corner Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-sky/20 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Director Business Card Image */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setActiveImage({ src: directorInfo.image, title: `${directorInfo.name} - ${directorInfo.designation}` })}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/30 bg-ink/60 p-2 shadow-2xl transition duration-500 hover:border-gold hover:shadow-gold/20"
              >
                <div className="relative aspect-[1.78/1] w-full overflow-hidden rounded-xl bg-ink/80">
                  <img
                    src={directorInfo.image}
                    alt={`${directorInfo.name} - ${directorInfo.designation}`}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 transition duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-xs font-bold text-gold backdrop-blur-md border border-gold/30">
                      <Maximize2 size={14} /> Click to View Card
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between px-2 py-1 text-xs text-foreground/60">
                  <span className="font-semibold text-gold">Official Business Card</span>
                  <span>Tap to expand</span>
                </div>
              </div>
            </div>

            {/* Director Bio & Details */}
            <div className="space-y-6 lg:col-span-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  <Star size={13} fill="currentColor" /> {directorInfo.roleTag}
                </span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground sm:text-5xl">
                  {directorInfo.name}
                </h2>
                <p className="mt-1 font-display text-lg font-bold text-sky sm:text-xl">
                  {directorInfo.designation} — SFM Travels
                </p>
              </div>

              <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">
                {directorInfo.bio}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
                {directorInfo.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-foreground/5 p-3 text-xs font-medium text-foreground/85">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={12} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct Contact Action Bar */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  {directorInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-2.5 text-xs font-bold text-gold transition hover:bg-gold hover:text-ink"
                    >
                      <Phone size={14} /> {phone}
                    </a>
                  ))}
                  <a
                    href={`mailto:${directorInfo.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-sky/30 bg-sky/10 px-4 py-2.5 text-xs font-bold text-sky transition hover:bg-sky hover:text-ink"
                  >
                    <Mail size={14} /> {directorInfo.email}
                  </a>
                </div>

                <p className="flex items-start gap-2 text-xs text-foreground/55">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                  <span>{directorInfo.address}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster Grid with Designations */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Team & Leadership</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Meet Our Designated Team Members
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-sm text-foreground/60 sm:text-base">
            Click on any team member's business card to inspect contact information and official details.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="glass group flex flex-col overflow-hidden rounded-3xl border border-foreground/10 transition duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl shadow-black/20"
            >
              {/* Business Card Container */}
              <div
                onClick={() => setActiveImage({ src: member.image, title: `${member.name} - ${member.designation}` })}
                className="relative aspect-[1.78/1] w-full cursor-pointer overflow-hidden bg-ink/80 border-b border-foreground/10"
              >
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.designation}`}
                  className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/20 opacity-0 transition duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-sky backdrop-blur-md border border-sky/30">
                    <Maximize2 size={13} /> Expand Card
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-sky/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sky">
                    {member.designation}
                  </span>
                  <span className="text-[11px] text-foreground/40">Verified SFM Team</span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/60">
                  {member.description}
                </p>

                {/* Contact Footer */}
                <div className="mt-5 space-y-2 border-t border-foreground/10 pt-4 text-xs">
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 font-semibold text-foreground/80 hover:text-sky transition"
                  >
                    <Phone size={13} className="text-sky" /> {member.phone}
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 font-medium text-foreground/60 hover:text-sky transition"
                  >
                    <Mail size={13} className="text-gold" /> {member.email}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Values & Philosophy Section */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="glass rounded-3xl border border-foreground/10 p-6 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Why Choose SFM Travels</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                Dedicated Service Across Every Journey
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60 sm:text-base">
                Under the guidance of Director Sudhanshu Shridhar and our specialized team, we ensure every aspect of your travel is executed with care.
              </p>

              <ul className="mt-6 space-y-3.5 text-sm text-foreground/75">
                {[
                  "Personalized Itineraries tailored around your travel dates & budget",
                  "Verified 4-Star & 5-Star Hotel Partners with handpicked accommodations",
                  "Dedicated 24/7 On-Trip Concierge for assistance anywhere in India & abroad",
                  "Transparent Best-Price Guarantee with no hidden costs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={12} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sky/20 bg-sky/5 p-8 text-center sm:p-10">
              <h3 className="font-display text-2xl font-bold text-foreground">Ready to Plan Your Escape?</h3>
              <p className="mt-3 text-sm text-foreground/60">
                Contact our sales and management team today for custom itineraries within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link to="/" hash="contact" className="rounded-xl bg-gradient-to-r from-sky to-cyan-300 px-7 py-3.5 text-sm font-bold text-ink shadow-lg shadow-sky/20 hover:brightness-110">
                  Book Your Trip
                </Link>
                <a href="https://wa.me/919999779351" target="_blank" rel="noreferrer" className="rounded-xl border border-whatsapp bg-whatsapp/10 px-7 py-3.5 text-sm font-bold text-whatsapp hover:bg-whatsapp/20">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-foreground/50 sm:flex-row lg:px-8">
          <p>© 2026 SFM Travels (Smile For Millions). All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/about" className="hover:text-foreground">About Us</Link>
            <Link to="/" hash="contact" className="hover:text-foreground">Contact Us</Link>
          </div>
        </div>
      </footer>

      {/* Modal Business Card Lightbox Viewer */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl border border-gold/40 bg-ink/95 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-3 px-2">
              <span className="font-display text-base font-bold text-gold">{activeImage.title}</span>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="grid size-9 place-items-center rounded-lg border border-foreground/15 text-foreground/80 hover:bg-foreground/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white p-2">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            <p className="mt-3 text-center text-xs text-foreground/50">
              Click anywhere outside to close window
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
