import { useState, useEffect, useRef, memo, type FormEvent } from "react";
import { CheckCircle2, Send, ShieldCheck, Sparkles, PhoneCall } from "lucide-react";

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

interface InlineEnquiryFormProps {
  initialPackageTitle?: string;
  source?: string;
}

export const InlineEnquiryForm = memo(function InlineEnquiryForm({ initialPackageTitle, source }: InlineEnquiryFormProps) {
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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanName = nameRef.current?.value.trim() || "";
    const cleanPhone = phoneRef.current?.value.trim() || "";
    const cleanEmail = emailRef.current?.value.trim() || "";
    const cleanTravel = travelRef.current?.value.trim() || "Incredible India Holiday Package";
    const cleanDesc = descRef.current?.value.trim() || "";

    if (!cleanName || !cleanPhone) {
      setSubmitError("Please enter your name and phone number so our travel specialist can contact you.");
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
      source: source || "india_portal_popup",
    };

    try {
      if (apiBase) {
        fetch(`${apiBase}/api/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.warn("Backend Enquiry submission network warning:", err));
      }
    } catch (err) {
      console.error("Backend Enquiry submission error:", err);
    }
    setSubmitting(false);
    setSubmittedData({ name: cleanName, phone: cleanPhone, travel: cleanTravel });
    setSubmitSuccess(true);

  };

  if (submitSuccess && submittedData) {
    const waMsg = `Hi SFM Travels! I submitted an enquiry for ${encodeURIComponent(submittedData.travel)} (Name: ${encodeURIComponent(submittedData.name)}, Phone: ${encodeURIComponent(submittedData.phone)}). Please share my day-wise itinerary.`;
    const waUrl = `https://wa.me/971526973378?text=${waMsg}`;

    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h4 className="text-2xl font-black text-slate-900">Enquiry Submitted Successfully!</h4>
          <p className="text-slate-700 text-sm max-w-md mx-auto leading-relaxed">
            Thank you <strong className="text-emerald-700">{submittedData.name}</strong>! Your tour request for <strong>{submittedData.travel}</strong> has been assigned to our senior India destination manager.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            💬 Chat on WhatsApp Now
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setSubmittedData(null);
            }}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs transition-colors cursor-pointer"
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
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-700 text-xs font-bold flex items-center gap-2">
          <span>⚠️ {submitError}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider">
          Your Full Name <span className="text-amber-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          defaultValue=""
          autoComplete="off"
          placeholder="e.g. Rahul Sharma"
          required
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider">
            Phone / WhatsApp Number <span className="text-amber-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            ref={phoneRef}
            defaultValue=""
            autoComplete="off"
            placeholder="e.g. +91 98765 43210"
            required
            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            defaultValue=""
            autoComplete="off"
            placeholder="e.g. rahul@example.com"
            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="travel" className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider">
          Destination / Tour Package <span className="text-amber-600">*</span>
        </label>
        <input
          id="travel"
          type="text"
          name="travel"
          ref={travelRef}
          defaultValue={initialPackageTitle || ""}
          autoComplete="off"
          placeholder="e.g. Kashmir, Kerala Houseboat, Royal Rajasthan, Dubai..."
          required
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div>
        <label htmlFor="description" className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider">
          Trip Details & Special Preferences
        </label>
        <textarea
          id="description"
          name="description"
          ref={descRef}
          defaultValue=""
          rows={3}
          placeholder="e.g. Travel dates, number of guests, budget range, 4-star hotel preferences..."
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm sm:text-base cursor-pointer hover:scale-101"
        >
          {submitting ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" /> Get Free Customized Quote & Day-Wise Plan
            </>
          )}
        </button>
      </div>
    </form>
  );
});
