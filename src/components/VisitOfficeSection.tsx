import { memo } from "react";
import { MapPin, Phone, Mail, ArrowUpRight, ExternalLink, Clock } from "lucide-react";

export const VisitOfficeSection = memo(function VisitOfficeSection() {
  const MAPS_DIRECTIONS_URL =
    "https://www.google.com/maps/dir/31.4179584,75.6547584/SFM+Tour+%26+Travels,+Prateek+Apartments,+DDA+Flats,+A2%2F53,+A+2+Block,+Paschim+Vihar,+Delhi,+110063/@28.7497257,77.0464472,11.85z/data=!4m9!4m8!1m0!1m5!1m1!1s0x390d03dc5d40d6db:0x592245231a9d04af!2m2!1d77.1027973!2d28.6709532!3e0?entry=ttu&g_ep=EgoyMDI2MTAxMS4wIKXMDSoASAFQAw%3D%3D";

  const MAP_EMBED_URL =
    "https://maps.google.com/maps?q=SFM%20Tour%20%26%20Travels%2C%20Prateek%20Apartments%2C%20DDA%20Flats%2C%20A2%2F53%2C%20A%202%20Block%2C%20Paschim%20Vihar%2C%20Delhi%2C%20110063&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      id="visit-office"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F3] to-[#FFFFFF] relative overflow-hidden border-t border-rose-100/60"
    >
      {/* Ambient background glows matching Birla Open Minds palette */}
      <div className="absolute -top-32 left-10 w-96 h-96 bg-[#F05C2B]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-96 h-96 bg-[#F8A51C]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-7">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#F05C2B]/20 text-[#AD2627] text-xs font-black tracking-widest uppercase shadow-[0_2px_10px_rgba(240,92,43,0.08)] font-outfit">
              <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-[#AD2627] via-[#F05C2B] to-[#F8A51C] shadow-sm animate-pulse" />
              <span>VISIT OUR OFFICE</span>
            </div>

            {/* Signature Editorial Headline */}
            <h2
              className="font-display text-4xl sm:text-5xl lg:text-[52px] font-black leading-[1.12] text-[#1D1311] tracking-tight"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontVariationSettings: '"SOFT" 100, "WONK" 1',
              }}
            >
              Come, plan your{" "}
              <span
                className="font-script italic text-transparent bg-clip-text bg-gradient-to-r from-[#AD2627] via-[#F05C2B] to-[#F8A51C] font-bold block sm:inline pr-1"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                dream journey
              </span>{" "}
              with us
            </h2>

            {/* Contact Items List */}
            <div className="space-y-6 pt-2">
              {/* Item 1: Address */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#AD2627] via-[#F05C2B] to-[#F8A51C] flex items-center justify-center text-white shadow-[0_8px_25px_-5px_rgba(240,92,43,0.45)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <b
                    className="block text-lg sm:text-xl font-bold text-[#1D1311] font-display"
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontVariationSettings: '"SOFT" 100, "WONK" 1',
                    }}
                  >
                    Address
                  </b>
                  <p
                    className="text-slate-600 font-outfit text-sm sm:text-base leading-relaxed mt-1"
                    style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
                  >
                    SFM Tour And Travels, Prateek Apartments, DDA Flats, A2/53, A 2 Block, Paschim Vihar, Delhi – 110063
                  </p>
                </div>
              </div>

              {/* Item 2: Call Us */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#AD2627] via-[#F05C2B] to-[#F8A51C] flex items-center justify-center text-white shadow-[0_8px_25px_-5px_rgba(240,92,43,0.45)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <b
                    className="block text-lg sm:text-xl font-bold text-[#1D1311] font-display"
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontVariationSettings: '"SOFT" 100, "WONK" 1',
                    }}
                  >
                    Call Us
                  </b>
                  <p
                    className="text-slate-600 font-outfit text-sm sm:text-base leading-relaxed mt-1 font-medium"
                    style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
                  >
                    <a
                      href="tel:+919711038584"
                      className="hover:text-[#F05C2B] transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      +91 97110 38584
                    </a>
                    <span className="mx-2 text-slate-300">•</span>
                    <a
                      href="tel:+971526973378"
                      className="hover:text-[#F05C2B] transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      +971 52 697 3378
                    </a>
                  </p>
                </div>
              </div>

              {/* Item 3: Email */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#AD2627] via-[#F05C2B] to-[#F8A51C] flex items-center justify-center text-white shadow-[0_8px_25px_-5px_rgba(240,92,43,0.45)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <b
                    className="block text-lg sm:text-xl font-bold text-[#1D1311] font-display"
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontVariationSettings: '"SOFT" 100, "WONK" 1',
                    }}
                  >
                    Email
                  </b>
                  <p
                    className="text-slate-600 font-outfit text-sm sm:text-base leading-relaxed mt-1 font-medium"
                    style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
                  >
                    <a
                      href="mailto:info@sfmtravels.co.in"
                      className="hover:text-[#F05C2B] transition-colors"
                      style={{ textDecoration: "none" }}
                    >
                      info@sfmtravels.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions CTA Button */}
            <div className="pt-2">
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#AD2627] via-[#F05C2B] to-[#FF7A3D] hover:from-[#7A1518] hover:to-[#F05C2B] text-white font-extrabold text-base px-8 py-4 rounded-full shadow-[0_12px_30px_-5px_rgba(240,92,43,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <span>Get Directions</span>
                <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] sm:rounded-[36px] overflow-hidden bg-white p-2.5 sm:p-3 shadow-[0_30px_60px_-25px_rgba(122,21,24,0.35),0_12px_24px_-16px_rgba(29,19,17,0.18)] border border-rose-200/50 aspect-[1/0.92] sm:aspect-[1/0.85] w-full min-h-[420px] transition-all duration-300 hover:shadow-[0_35px_70px_-20px_rgba(240,92,43,0.35)]">
              {/* Inner Map Viewport */}
              <div className="w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden relative bg-slate-100">
                <iframe
                  title="SFM Tour And Travels Office Location"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px]"
                />

                {/* Corner Status Pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-outfit">
                    <Clock className="w-3.5 h-3.5 text-[#F05C2B]" />
                    <span className="text-slate-500 font-normal">Head Office •</span>
                    <span>10 AM – 7 PM</span>
                  </div>
                </div>

                {/* View Full Map Link */}
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                  className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-800 hover:text-[#F05C2B] text-xs font-bold px-3.5 py-2 rounded-xl shadow-md border border-slate-200 flex items-center gap-1.5 transition-all group"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
