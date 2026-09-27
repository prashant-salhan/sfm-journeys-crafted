import { memo } from "react";
import { Compass, Globe, Sun, Camera, Utensils, ShieldCheck, Clock, FileCheck, Users } from "lucide-react";
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
};

export const INDIA_REGIONS = [
  { name: "North India & Himalayas", location: "Kashmir, Himachal, Golden Triangle, Ladakh", desc: "Majestic snow peaks, Taj Mahal, hill stations, and ancient heritage." },
  { name: "South India & Tropics", location: "Kerala, Munnar, Coorg, Hampi, Rameshwaram", desc: "Emerald backwaters, lush tea estates, palm groves, and grand Dravidian temples." },
  { name: "West & Royal Rajasthan", location: "Jaipur, Udaipur, Jaisalmer Desert, Goa", desc: "Royal fortresses, Thar desert camel glamping, and sun-kissed beaches." },
  { name: "East & North-East", location: "Darjeeling, Sikkim, Meghalaya, Assam", desc: "Living root bridges, tea gardens, Kaziranga rhinos, and Himalayan monasteries." },
];

export const RegionsSection = memo(function RegionsSection() {
  return (
    <section id="regions" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
            <Globe className="w-4 h-4" /> Regions & Circuits
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore India by Regions & Experiences
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            From snow-capped Himalayan peaks in the North to emerald backwaters in the South, choose your destination circuit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIA_REGIONS.map((reg, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase">{reg.name}</span>
                <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-white">{reg.location}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{reg.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const TravelEssentialsSection = memo(function TravelEssentialsSection() {
  return (
    <section id="essentials" className="py-24 px-4 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Traveler's Handbook
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          India Travel Essentials & Tips
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
          <Sun className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Best Season to Visit</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            <strong>October to March:</strong> Ideal season for Golden Triangle, Rajasthan deserts, Kerala backwaters, and beaches.  
            <strong>April to July:</strong> Best time for Himalayan snow points in Kashmir, Ladakh, and Himachal.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
          <Camera className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Culture & Etiquette</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            India warmly welcomes guests with <em>"Atithi Devo Bhava"</em> (Guest is God). Modest attire is appreciated at spiritual shrines, temples, and heritage monuments.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
          <Utensils className="w-10 h-10 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Cuisine & Hospitality</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Experience authentic Mughlai kebabs in North India, Rajasthani Royal Thali, spicy Goa seafood, and traditional Kerala Sadhya served on banana leaves.
          </p>
        </div>
      </div>
    </section>
  );
});

export const WhyChooseUsSection = memo(function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 px-4 bg-slate-900/50 border-t border-slate-800">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Why SFM Travels India
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Trusted Incredible India Destination Specialist
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Direct Rates Guarantee</h3>
            <p className="text-slate-400 text-xs">Direct contracting with 4★/5★ luxury resorts & verified houseboat owners.</p>
          </div>
          <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <Clock className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-base">24/7 On-Ground Support</h3>
            <p className="text-slate-400 text-xs">Dedicated India tour manager assisting you from arrival to final drop.</p>
          </div>
          <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <FileCheck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-base">Verified Cab Drivers</h3>
            <p className="text-slate-400 text-xs">Professional, uniform-clad local drivers with well-maintained air-conditioned vehicles.</p>
          </div>
          <div className="space-y-3 p-6 bg-slate-950 border border-slate-800 rounded-2xl">
            <Users className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-base">50,000+ Happy Guests</h3>
            <p className="text-slate-400 text-xs">Over 10 years of experience creating unforgettable journeys across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

export const FooterSection = memo(function FooterSection() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={sfmLogo} alt="SFM Travels Logo" className="h-10 w-auto" />
            <span className="text-lg font-bold text-white">SFM INDIA</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            SFM Travels India is a licensed Destination Management Company specializing in Incredible India tour packages, Kerala houseboats, Kashmir snow holidays, and Rajasthan palace tours.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="#packages" className="hover:text-amber-400">India Packages</a></li>
            <li><a href="#regions" className="hover:text-amber-400">Regions & Circuits</a></li>
            <li><a href="#enquiry" className="hover:text-amber-400 font-bold text-amber-400">Get Free Quote</a></li>
            <li><a href="#essentials" className="hover:text-amber-400">Travel Essentials</a></li>
            <li><a href="#why-us" className="hover:text-amber-400">Why Choose Us</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider">India Operations</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Connaught Place, New Delhi, India - 110001
          </p>
          <p className="text-xs text-slate-400">Call: +91 98765 43210</p>
          <p className="text-xs text-slate-400">Email: info@sfmtravels.co.in</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-white text-sm font-bold uppercase tracking-wider">Custom Plan?</h4>
          <p className="text-xs text-slate-400">
            Speak to our senior India travel consultant on WhatsApp for instant customized itineraries.
          </p>
          <a
            href="#enquiry"
            className="inline-block bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            Get Free Quote
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} SFM Travels India. All rights reserved. Hosted on sfmtravels.co.in
      </div>
    </footer>
  );
});
