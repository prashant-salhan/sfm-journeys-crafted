import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Globe2,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
  Youtube,
} from "lucide-react";

import heroImage from "@/assets/sfm-hero.jpg";
import kashmirImage from "@/assets/sfm-kashmir.jpg";
import manaliImage from "@/assets/sfm-manali.jpg";
import goaImage from "@/assets/sfm-goa.jpg";
import dubaiImage from "@/assets/sfm-dubai.jpg";
import rajasthanImage from "@/assets/sfm-rajasthan.jpg";
import keralaImage from "@/assets/sfm-kerala.jpg";
import honeymoonImage from "@/assets/sfm-honeymoon.jpg";
import familyImage from "@/assets/sfm-family.jpg";
import desertImage from "@/assets/sfm-desert.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SFM Travels | Curated Journeys, Beautifully Planned" },
      {
        name: "description",
        content:
          "Discover curated holidays, honeymoon escapes and bespoke journeys across India and the world with SFM Travels.",
      },
      {
        property: "og:title",
        content: "SFM Travels | Curated Journeys, Beautifully Planned",
      },
      {
        property: "og:description",
        content:
          "Premium travel planning for holidays, honeymoons, family tours and unforgettable escapes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type ImageItem = { src: string; alt: string };

const destinations = [
  { name: "Kashmir", region: "Himalayas", price: "₹24,999", nights: "5 nights", image: kashmirImage },
  { name: "Manali", region: "Himalayas", price: "₹18,499", nights: "4 nights", image: manaliImage },
  { name: "Goa", region: "Coastal", price: "₹15,999", nights: "3 nights", image: goaImage },
  { name: "Dubai", region: "International", price: "₹54,999", nights: "5 nights", image: dubaiImage },
  { name: "Rajasthan", region: "Heritage", price: "₹29,999", nights: "6 nights", image: rajasthanImage },
  { name: "Kerala", region: "Backwaters", price: "₹22,499", nights: "5 nights", image: keralaImage },
];

const packages = [
  {
    title: "Kerala Honeymoon Bliss",
    category: "Honeymoon",
    duration: "5D / 4N",
    description: "Backwater houseboat, spa day and candlelit dinner for two.",
    price: "₹42,999",
    suffix: "/ couple",
    image: honeymoonImage,
    tone: "sky",
  },
  {
    title: "Kashmir Family Escape",
    category: "Family Tour",
    duration: "6D / 5N",
    description: "Srinagar, Gulmarg cable car, Dal Lake and Shikara rides.",
    price: "₹58,999",
    suffix: "/ family",
    image: familyImage,
    tone: "gold",
  },
  {
    title: "Dubai City Adventure",
    category: "International",
    duration: "5D / 4N",
    description: "Burj Khalifa, desert safari, Gold Souk and Marina cruise.",
    price: "₹74,999",
    suffix: "/ person",
    image: desertImage,
    tone: "sky",
  },
];

const services = [
  { icon: Compass, title: "Holiday Packages", text: "All-inclusive getaways with stays, transfers and sightseeing." },
  { icon: Heart, title: "Honeymoon", text: "Romantic escapes designed for two, down to the last detail." },
  { icon: Users, title: "Family Tours", text: "Comfortable, safe itineraries the whole family will love." },
  { icon: Globe2, title: "Group Tours", text: "Budget-friendly group departures across popular routes." },
  { icon: Plane, title: "Hotel & Flight Booking", text: "Best-rate bookings with instant confirmation support." },
  { icon: Sparkles, title: "Customized Trips", text: "Bespoke journeys tailored entirely to your wish list." },
];

const faqs = [
  ["How do I book a custom itinerary with SFM Travels?", "Share your preferences through the enquiry form or WhatsApp. Our planner will send a full itinerary within 24 hours for your review."],
  ["What is included in your holiday packages?", "Most packages include accommodation, transfers, breakfast and curated sightseeing. Flights and special meals can be added."],
  ["Can I modify my trip after confirming?", "Yes — you can adjust dates, rooms or activities up until your cancellation window. Our team will rework the plan for you."],
  ["Do you offer support during the trip?", "Absolutely. You’ll get a dedicated on-trip contact available 24×7 for any help, from cabs to restaurant bookings."],
];

const gallery: ImageItem[] = [
  { src: heroImage, alt: "Turquoise tropical coastline at golden hour" },
  { src: rajasthanImage, alt: "Rajasthan palace courtyard framed by carved arches" },
  { src: goaImage, alt: "Palm-lined Goa beach at sunset" },
  { src: manaliImage, alt: "Snowy Manali mountain valley" },
];

function Logo() {
  return (
    <a href="#home" className="flex shrink-0 items-center gap-2.5" aria-label="SFM Travels home">
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-sky to-gold font-display text-xs font-extrabold text-ink shadow-lg shadow-sky/20">SFM</span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">SFM <span className="text-sky">Travels</span></span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-sans text-foreground antialiased">
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-ink" />
        <div className="aurora-one absolute -left-40 -top-40 size-[40rem] rounded-full bg-sky/20 blur-[140px]" />
        <div className="aurora-two absolute right-0 top-10 size-[36rem] rounded-full bg-gold/10 blur-[150px]" />
        <div className="aurora-one absolute left-1/3 top-[55%] size-[34rem] rounded-full bg-indigo-500/10 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-ink/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Main navigation">
          <Logo />
          <div className="hidden items-center gap-8 lg:flex">
            {["Home", "Destinations", "Packages", "Services", "About", "Contact"].map((item) => (
              <button key={item} type="button" onClick={() => scrollTo(item === "Home" ? "home" : item.toLowerCase())} className="text-sm font-medium text-foreground/65 transition hover:text-foreground">
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => scrollTo("contact")} className="hidden rounded-lg bg-gradient-to-r from-sky to-cyan-300 px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-sky/20 transition hover:brightness-110 sm:block">Book Now</button>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-lg border border-foreground/15 text-foreground/80 lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-foreground/10 px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {["Home", "Destinations", "Packages", "Services", "About", "Contact"].map((item) => (
                <button key={item} type="button" onClick={() => scrollTo(item === "Home" ? "home" : item.toLowerCase())} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground">{item}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold"><span className="size-1.5 rounded-full bg-gold" /> Premium Travel Agency</span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">Your Journey Begins<br />With <span className="bg-gradient-to-r from-sky via-cyan-300 to-gold bg-clip-text text-transparent">SFM Travels</span></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg">Curated holidays, honeymoon escapes and bespoke journeys across India and the world — crafted around you, delivered flawlessly.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => scrollTo("contact")} className="rounded-xl bg-gradient-to-r from-sky to-cyan-300 px-7 py-3.5 text-sm font-bold text-ink shadow-xl shadow-sky/20 transition hover:brightness-110">Start Booking</button>
              <button type="button" onClick={() => scrollTo("packages")} className="rounded-xl border border-foreground/20 px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10">Explore Packages</button>
            </div>
            <div className="glass mt-9 rounded-2xl border border-foreground/10 p-3 shadow-2xl shadow-black/20">
              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
                {["Destination|Anywhere in India", "Travel Dates|12 Jun 2026", "Guests|2 Adults"].map((item) => {
                  const [label, value] = item.split("|");
                  return <button key={label} type="button" onClick={() => setSearchOpen(true)} className="rounded-xl bg-foreground/5 px-4 py-3 text-left transition hover:bg-foreground/10"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sky">{label}</p><p className="mt-0.5 text-sm font-medium text-foreground/85">{value}</p></button>;
                })}
                <button type="button" onClick={() => setSearchOpen(true)} className="grid place-items-center rounded-xl bg-gradient-to-r from-gold to-amber-300 px-6 py-3 text-sm font-bold text-ink transition hover:brightness-110"><Search size={17} /></button>
              </div>
            </div>
          </div>
          <div className="rise-in relative" style={{ animationDelay: "150ms" }}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl shadow-black/30">
              <img src={heroImage} alt="Aerial view of a tropical coastline and luxury resort" width={1080} height={1440} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            </div>
            <div className="glass absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-foreground/10 p-4 shadow-xl shadow-black/30 sm:-left-5"><div className="grid size-12 place-items-center rounded-xl bg-gold/15 text-gold"><Star size={19} fill="currentColor" /></div><div><p className="font-display text-sm font-bold text-foreground">4.9 / 5 Rating</p><p className="text-xs text-foreground/55">12,000+ happy travellers</p></div></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8"><div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 sm:grid-cols-4">{[["15K+", "Travellers Served", "sky"], ["120+", "Destinations", "gold"], ["12", "Years Experience", "cyan-300"], ["98%", "Satisfaction", "foreground"]].map(([number, label, color]) => <div key={label} className="p-6 text-center"><p className={`font-display text-3xl font-extrabold text-${color}`}>{number}</p><p className="mt-1 text-xs uppercase tracking-[0.15em] text-foreground/50">{label}</p></div>)}</div></section>

      <section id="destinations" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="Popular Destinations" title="Where will you go next?" action={<button type="button" onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 text-sm font-semibold text-sky hover:text-cyan-300">View all destinations <ArrowRight size={15} /></button>} /><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destinations.map((destination) => <article key={destination.name} className="group relative overflow-hidden rounded-2xl border border-foreground/10"><img src={destination.image} alt={`${destination.name} travel destination`} width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky">{destination.region}</p><h3 className="mt-1 font-display text-2xl font-bold text-foreground">{destination.name}</h3><p className="mt-1 text-sm text-foreground/60">From {destination.price} · {destination.nights}</p></div></article>)}</div></section>

      <section id="packages" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="glass rounded-3xl border border-foreground/10 p-6 sm:p-10"><SectionHeading eyebrow="Featured Packages" title="Handpicked journeys for you" /><div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">{packages.map((item) => <article key={item.title} className={`group flex flex-col overflow-hidden rounded-2xl border ${item.tone === "gold" ? "border-gold/30 bg-gold/5" : "border-foreground/10 bg-foreground/[0.03]"}`}><div className="overflow-hidden"><img src={item.image} alt={item.title} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /></div><div className="flex flex-1 flex-col p-6"><div className="flex items-center justify-between text-xs"><span className={`rounded-full px-3 py-1 font-semibold ${item.tone === "gold" ? "bg-gold/20 text-gold" : "bg-sky/15 text-sky"}`}>{item.category}</span><span className="text-foreground/50">{item.duration}</span></div><h3 className="mt-4 font-display text-xl font-bold text-foreground">{item.title}</h3><p className="mt-2 flex-1 text-sm text-foreground/55">{item.description}</p><div className="mt-5 flex items-center justify-between"><div><p className="text-xs text-foreground/50">From</p><p className="font-display text-2xl font-extrabold text-foreground">{item.price} <span className="text-xs font-medium text-foreground/40">{item.suffix}</span></p></div><button type="button" onClick={() => scrollTo("contact")} className={`rounded-lg px-5 py-2.5 text-sm font-bold text-ink transition hover:brightness-110 ${item.tone === "gold" ? "bg-gradient-to-r from-gold to-amber-300" : "bg-gradient-to-r from-sky to-cyan-300"}`}>Enquire</button></div></div></article>)}</div></div></section>

      <section id="services" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="text-center"><SectionHeading eyebrow="Our Services" title="Everything, thoughtfully arranged" /></div><div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <article key={title} className="glass rounded-2xl border border-foreground/10 p-6 transition hover:-translate-y-1 hover:border-sky/40"><div className="grid size-11 place-items-center rounded-xl bg-sky/15 text-sky"><Icon size={20} /></div><h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3><p className="mt-2 text-sm text-foreground/55">{text}</p></article>)}</div></section>

      <section id="about" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="glass grid gap-10 overflow-hidden rounded-3xl border border-foreground/10 p-6 sm:p-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Why Choose SFM Travels</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Travel with confidence</h2><p className="mt-4 text-foreground/60">For over a decade we’ve turned dreams into well-planned journeys. Our expert planners, trusted partners and round-the-clock support make every trip effortless.</p><ul className="mt-8 space-y-4">{["Expert local planners who know every route inside out", "Transparent pricing with zero hidden charges", "24×7 on-trip support wherever you are", "Flexible plans you can adjust before departure"].map((text, index) => <li key={text} className="flex items-start gap-3"><span className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full ${index % 3 === 0 ? "bg-gold/20 text-gold" : "bg-sky/20 text-sky"}`}><Check size={13} /></span><span className="text-sm text-foreground/75">{text}</span></li>)}</ul></div><div className="grid grid-cols-2 gap-4"><img src={familyImage} alt="Family enjoying a mountain journey" width={1024} height={768} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /><div className="flex flex-col justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6"><p className="font-display text-4xl font-extrabold text-sky">250+</p><p className="mt-1 text-sm text-foreground/55">Curated experiences</p></div><div className="flex flex-col justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6"><p className="font-display text-4xl font-extrabold text-gold">40+</p><p className="mt-1 text-sm text-foreground/55">Destination specialists</p></div><img src={kashmirImage} alt="Kashmir lake and mountain landscape" width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" /></div></div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">How It Works</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Four simple steps</h2></div><div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{[["01", "Tell Us Your Dream", "Share your destination, dates and budget with our team."], ["02", "We Craft Your Plan", "Receive a tailored itinerary within 24 hours."], ["03", "Confirm & Book", "Approve the plan and we lock in every detail."], ["04", "Travel Worry-Free", "Pack your bags — we handle the rest on the ground."]].map(([number, title, text], index) => <article key={number} className="glass rounded-2xl border border-foreground/10 p-6"><span className={`font-display text-5xl font-extrabold ${index === 3 ? "text-gold/40" : "text-sky/30"}`}>{number}</span><h3 className="mt-3 font-display text-lg font-bold text-foreground">{title}</h3><p className="mt-2 text-sm text-foreground/55">{text}</p></article>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Testimonials</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Loved by travellers</h2></div><div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">{[["Ananya Mehta", "Honeymoon · Kashmir", "Our Kashmir honeymoon was flawless. Every hotel, transfer and surprise was perfect. SFM really does care."], ["Rohit Sharma", "Family Tour · Manali", "Took our whole family to Manali. Smooth, safe and the kids absolutely loved it. Booked again already."], ["Sneha Kapoor", "International · Dubai", "The Dubai trip was seamlessly organised. Great hotels and honest pricing. Highly recommend SFM Travels."]].map(([name, trip, quote]) => <article key={name} className="glass rounded-2xl border border-foreground/10 p-7"><p className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}</p><p className="mt-4 text-sm leading-relaxed text-foreground/75">“{quote}”</p><div className="mt-6 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-sky/40 to-gold/40 text-sm font-bold text-foreground">{name.charAt(0)}</div><div><p className="text-sm font-semibold text-foreground">{name}</p><p className="text-xs text-foreground/50">{trip}</p></div></div></article>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Travel Gallery</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Moments we’ve made</h2></div><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">{gallery.map((image) => <img key={image.alt} src={image.src} alt={image.alt} width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-2xl object-cover transition duration-500 hover:scale-[1.02]" />)}</div></section>

      <section className="mx-auto max-w-3xl px-5 pb-20 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">FAQ</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Questions, answered</h2></div><div className="mt-10 space-y-3">{faqs.map(([question, answer]) => <FaqItem key={question} question={question} answer={answer} />)}</div></section>

      <section id="contact" className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 lg:px-8"><div className="glass grid gap-10 overflow-hidden rounded-3xl border border-foreground/10 p-6 sm:p-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Get In Touch</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Start your journey today</h2><p className="mt-4 max-w-sm text-foreground/60">Tell us where you’d love to go and we’ll craft the perfect trip. We respond within a few hours.</p><ul className="mt-8 space-y-4 text-sm text-foreground/70"><li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-sky/15 text-sky"><Plane size={17} /></span> +91 98765 43210</li><li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-gold/15 text-gold"><Mail size={17} /></span> hello@sfmtravels.com</li><li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-sky/15 text-sky"><MapPin size={17} /></span> 12 Marina Road, Bengaluru, IN</li></ul></div><form className="space-y-4" onSubmit={handleSubmit}>{submitted ? <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-sky/30 bg-sky/10 p-8 text-center"><div className="grid size-14 place-items-center rounded-full bg-sky/20 text-sky"><Check size={26} /></div><h3 className="mt-5 font-display text-2xl font-bold text-foreground">Enquiry received</h3><p className="mt-2 max-w-sm text-sm text-foreground/60">Thanks for reaching out. A travel planner will contact you shortly.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-sky hover:text-cyan-300">Send another enquiry</button></div> : <><div className="grid gap-4 sm:grid-cols-2"><Field label="Full Name" placeholder="Your name" required /><Field label="Phone" placeholder="+91 98765 43210" required /></div><Field label="Destination" placeholder="e.g. Kashmir, Dubai" required /><label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/50">Message</span><textarea rows={3} required placeholder="Tell us about your ideal trip…" className="mt-1.5 w-full resize-none rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition focus:border-sky/60 focus:ring-2 focus:ring-sky/20" /></label><button type="submit" className="w-full rounded-xl bg-gradient-to-r from-sky to-cyan-300 px-6 py-3.5 text-sm font-bold text-ink shadow-lg shadow-sky/20 transition hover:brightness-110">Send Enquiry</button></>}</form></div></section>

      <footer className="border-t border-foreground/10"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"><div><Logo /><p className="mt-4 max-w-xs text-sm text-foreground/50">Crafting memorable journeys across India and the world since 2013.</p><div className="mt-5 flex gap-3"><a href="https://www.instagram.com" aria-label="Instagram" className="grid size-9 place-items-center rounded-lg border border-foreground/10 text-foreground/60 transition hover:border-sky/40 hover:text-sky"><Instagram size={16} /></a><a href="https://www.youtube.com" aria-label="YouTube" className="grid size-9 place-items-center rounded-lg border border-foreground/10 text-foreground/60 transition hover:border-sky/40 hover:text-sky"><Youtube size={16} /></a></div></div><FooterLinks title="Explore" links={["Destinations", "Packages", "Services", "About Us"]} scrollTo={scrollTo} /><FooterLinks title="Support" links={["Contact", "FAQs", "Terms & Privacy", "Cancellation Policy"]} scrollTo={scrollTo} /><div><p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground/80">Newsletter</p><p className="mt-4 text-sm text-foreground/50">Travel deals & inspiration, monthly.</p><div className="mt-3 flex gap-2"><input aria-label="Email address" type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-2.5 text-sm text-foreground placeholder-foreground/30 outline-none focus:border-sky/60" /><button type="button" aria-label="Join newsletter" className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-gold to-amber-300 text-ink"><ArrowRight size={17} /></button></div></div></div><div className="border-t border-foreground/10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-foreground/45 sm:flex-row lg:px-8"><p>© 2026 SFM Travels. All rights reserved.</p><p>Crafted with care for every journey.</p></div></div></footer>

      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-bold text-whatsapp-foreground shadow-2xl shadow-black/40 transition hover:brightness-110"><span className="grid size-6 place-items-center rounded-full bg-whatsapp-foreground/20 text-xs">✆</span><span className="hidden sm:inline">Chat on WhatsApp</span></a>

      {searchOpen && <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Plan your escape"><div className="glass w-full max-w-lg rounded-3xl border border-foreground/15 p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Start planning</p><h2 className="mt-2 font-display text-2xl font-bold text-foreground">Where will you go next?</h2></div><button type="button" onClick={() => setSearchOpen(false)} className="grid size-9 place-items-center rounded-lg border border-foreground/10 text-foreground/70" aria-label="Close search"><X size={18} /></button></div><form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); scrollTo("contact"); }}><Field label="Destination" placeholder="Kashmir, Goa, Dubai…" required /><div className="grid gap-4 sm:grid-cols-2"><Field label="Travel date" placeholder="12 Jun 2026" required /><Field label="Travellers" placeholder="2 adults" required /></div><button type="submit" className="w-full rounded-xl bg-gradient-to-r from-gold to-amber-300 px-6 py-3.5 text-sm font-bold text-ink">Find my trip</button></form></div></div>}
    </main>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return <div className="glass rounded-2xl border border-foreground/10 p-5"><button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 text-left font-display text-base font-semibold text-foreground"><span>{question}</span>{open ? <ChevronUp className="shrink-0 text-sky" size={18} /> : <ChevronDown className="shrink-0 text-sky" size={18} />}</button>{open && <p className="mt-3 pr-7 text-sm text-foreground/60">{answer}</p>}</div>;
}

function Field({ label, placeholder, required = false }: { label: string; placeholder: string; required?: boolean }) {
  return <label className="block"><span className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/50">{label}</span><input type="text" placeholder={placeholder} required={required} className="mt-1.5 w-full rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition focus:border-sky/60 focus:ring-2 focus:ring-sky/20" /></label>;
}

function FooterLinks({ title, links, scrollTo }: { title: string; links: string[]; scrollTo: (id: string) => void }) {
  return <div><p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground/80">{title}</p><ul className="mt-4 space-y-2.5 text-sm text-foreground/55">{links.map((link) => <li key={link}><button type="button" onClick={() => scrollTo(link === "FAQs" ? "contact" : link === "About Us" ? "about" : link.toLowerCase())} className="transition hover:text-foreground">{link}</button></li>)}</ul></div>;
}
