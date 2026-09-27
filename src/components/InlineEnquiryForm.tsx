import { useState, useEffect, useRef, memo, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

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
}

export const InlineEnquiryForm = memo(function InlineEnquiryForm({ initialPackageTitle }: InlineEnquiryFormProps) {
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const cleanName = nameRef.current?.value.trim() || "";
    const cleanPhone = phoneRef.current?.value.trim() || "";
    const cleanEmail = emailRef.current?.value.trim() || "";
    const cleanTravel = travelRef.current?.value.trim() || "Incredible India Holiday Package";
    const cleanDesc = descRef.current?.value.trim() || "";

    if (!cleanName || !cleanPhone) {
      setSubmitError("Please enter your name and phone number.");
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
      source: "india_portal_inline",
    };

    if (apiBase) {
      fetch(`${apiBase}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((err) => console.warn("Backend Enquiry API warning:", err));
    }

    setSubmitting(false);
    setSubmittedData({ name: cleanName, phone: cleanPhone, travel: cleanTravel });
    setSubmitSuccess(true);
  };

  if (submitSuccess && submittedData) {
    const waMsg = `Hi SFM Travels India! I submitted an enquiry for ${encodeURIComponent(submittedData.travel)} (Name: ${encodeURIComponent(submittedData.name)}, Phone: ${encodeURIComponent(submittedData.phone)}).`;
    const waUrl = `https://wa.me/919876543210?text=${waMsg}`;

    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h4 className="text-xl font-bold text-slate-900">Request Submitted Successfully!</h4>
        <p className="text-slate-700 text-sm max-w-md mx-auto">
          Thank you <strong>{submittedData.name}</strong>! Your enquiry has been received. Our travel specialist will contact you on phone/WhatsApp shortly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            💬 Chat on WhatsApp Now
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setSubmittedData(null);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
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
        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-rose-700 text-xs font-semibold">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          ref={nameRef}
          defaultValue=""
          autoComplete="off"
          placeholder="Enter your name"
          required
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            ref={phoneRef}
            defaultValue=""
            autoComplete="off"
            placeholder="Enter phone number"
            required
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-medium"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={emailRef}
            defaultValue=""
            autoComplete="off"
            placeholder="Enter your email"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-medium"
            style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="travel" className="text-xs font-bold text-slate-700 block mb-1">Where are you planning to travel? *</label>
        <input
          id="travel"
          type="text"
          name="travel"
          ref={travelRef}
          defaultValue={initialPackageTitle || ""}
          autoComplete="off"
          placeholder="Europe, Kashmir, Kerala, Dubai, Singapore....."
          required
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <div>
        <label htmlFor="description" className="text-xs font-bold text-slate-700 block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          ref={descRef}
          defaultValue=""
          rows={3}
          placeholder="Enter additional details..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 font-medium"
          style={{ color: "#0f172a", backgroundColor: "#f8fafc" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 text-base cursor-pointer"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
});
