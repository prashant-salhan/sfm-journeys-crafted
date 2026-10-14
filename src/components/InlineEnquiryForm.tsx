import { useState, useEffect, useRef, memo, type FormEvent } from "react";
import { CheckCircle2, Send, Sparkles, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";

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

export const InlineEnquiryForm = memo(function InlineEnquiryForm({
  initialPackageTitle,
  source = "india_portal_inline",
}: InlineEnquiryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(initialPackageTitle || "Incredible India Holiday Package");
  const [message, setMessage] = useState("");

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    travel: string;
  } | null>(null);

  const successContainerRef = useRef<HTMLDivElement>(null);

  // Synchronize when initialPackageTitle prop updates
  useEffect(() => {
    if (initialPackageTitle) {
      setDestination(initialPackageTitle);
    }
  }, [initialPackageTitle]);

  // Keep success message comfortably in view on mobile devices without jumping
  useEffect(() => {
    if (submitSuccess && successContainerRef.current) {
      successContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitSuccess]);

  // Unique IDs for DOM inputs to eliminate mobile browser focus jumping / collision
  const uid = source.replace(/[^a-zA-Z0-9]/g, "_");
  const nameInputId = `sfm_name_${uid}`;
  const phoneInputId = `sfm_phone_${uid}`;
  const emailInputId = `sfm_email_${uid}`;
  const destinationInputId = `sfm_destination_${uid}`;
  const messageInputId = `sfm_message_${uid}`;

  const handleFormSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const cleanTravel = destination.trim() || initialPackageTitle || "Incredible India Holiday Package";
    const cleanDesc = message.trim();

    if (!cleanName) {
      setSubmitError("Please enter your name.");
      return;
    }

    if (!cleanPhone) {
      setSubmitError("Please enter your phone or WhatsApp number.");
      return;
    }

    // Require at least 6 digits in phone number
    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (digitsOnly.length < 6) {
      setSubmitError("Please enter a valid phone number (at least 6 digits).");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const apiBase = getApiBase();
    const payload = {
      fullName: cleanName,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      destination: cleanTravel,
      message: cleanDesc,
      source: source || "india_portal_inline",
    };

    // 1. Post to backend Render API
    try {
      if (apiBase) {
        await fetch(`${apiBase}/api/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.warn("Backend Enquiry submission network warning:", err));
      }
    } catch (err) {
      console.error("Backend Enquiry submission error:", err);
    }

    // 2. Local storage safety backup so no lead is lost
    try {
      const stored = JSON.parse(localStorage.getItem("sfm_enquiries") || "[]");
      stored.push({ ...payload, submittedAt: new Date().toISOString() });
      localStorage.setItem("sfm_enquiries", JSON.stringify(stored));
    } catch (_) {}

    setSubmitting(false);
    setSubmittedData({ name: cleanName, phone: cleanPhone, travel: cleanTravel });
    setSubmitSuccess(true);
  };

  if (submitSuccess && submittedData) {
    const waMsg = `Hi SFM Travels! I submitted an enquiry for ${encodeURIComponent(
      submittedData.travel
    )} (Name: ${encodeURIComponent(submittedData.name)}, Phone: ${encodeURIComponent(
      submittedData.phone
    )}). Please share my day-wise itinerary and quote.`;
    const waUrl = `https://wa.me/919711038584?text=${waMsg}`;

    return (
      <div
        ref={successContainerRef}
        className="bg-emerald-50/95 border-2 border-emerald-300 p-7 sm:p-10 rounded-3xl text-center space-y-5 shadow-xl animate-fade-in text-slate-900"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h4 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Enquiry Submitted Successfully!
          </h4>
          <p className="text-slate-700 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-outfit">
            Thank you <strong className="text-emerald-800">{submittedData.name}</strong>! Your tour request for{" "}
            <strong>{submittedData.travel}</strong> has been received by our senior destination team.
          </p>
        </div>

        <div className="bg-white/80 border border-emerald-200/80 rounded-2xl p-4 max-w-md mx-auto text-xs text-slate-600 text-left space-y-1 font-outfit">
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Destination:</strong> {submittedData.travel}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 cursor-pointer font-outfit"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setSubmittedData(null);
              setFullName("");
              setPhone("");
              setMessage("");
            }}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer font-outfit"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action="javascript:void(0);"
      method="post"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFormSubmit(e);
      }}
      className="space-y-4"
    >
      {submitError && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fade-in font-outfit">
          <span>⚠️ {submitError}</span>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor={nameInputId}
          className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider font-outfit"
        >
          Your Full Name <span className="text-amber-600">*</span>
        </label>
        <input
          id={nameInputId}
          type="text"
          name="name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (submitError) setSubmitError("");
          }}
          autoComplete="name"
          placeholder="e.g. Rahul Sharma"
          required
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none font-outfit"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      {/* Phone and Email Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={phoneInputId}
            className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider font-outfit"
          >
            Phone / WhatsApp Number <span className="text-amber-600">*</span>
          </label>
          <input
            id={phoneInputId}
            type="tel"
            name="phone"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (submitError) setSubmitError("");
            }}
            autoComplete="tel"
            placeholder="e.g. +91 97110 38584"
            required
            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none font-outfit"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>

        <div>
          <label
            htmlFor={emailInputId}
            className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider font-outfit"
          >
            Email Address
          </label>
          <input
            id={emailInputId}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="e.g. rahul@example.com"
            className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none font-outfit"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>

      {/* Destination Field */}
      <div>
        <label
          htmlFor={destinationInputId}
          className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider font-outfit"
        >
          Destination / Tour Package <span className="text-amber-600">*</span>
        </label>
        <input
          id={destinationInputId}
          type="text"
          name="travel"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            if (submitError) setSubmitError("");
          }}
          placeholder="e.g. Kashmir, Kerala Houseboat, Royal Rajasthan, Dubai, Singapore..."
          required
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none font-outfit"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor={messageInputId}
          className="text-xs font-bold text-slate-800 block mb-1.5 uppercase tracking-wider font-outfit"
        >
          Trip Details & Special Preferences
        </label>
        <textarea
          id={messageInputId}
          name="description"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="e.g. Travel dates, number of guests, budget range, 4-star hotel preferences..."
          className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all outline-none font-outfit"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-sm sm:text-base cursor-pointer hover:scale-101 active:scale-98 font-outfit disabled:opacity-75"
        >
          {submitting ? (
            <span>Sending Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Get Free Customized Quote & Day-Wise Plan</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center pt-1">
        <span className="text-[11px] text-slate-500 inline-flex items-center gap-1 font-outfit">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Privacy Protected. No spam guarantee.</span>
        </span>
      </div>
    </form>
  );
});
