import { useState, useEffect, useRef, memo } from "react";
import {
  Sparkles,
  X,
  MessageCircle,
  Compass,
  ArrowRight,
  Gift,
  Copy,
  Check,
  Lock,
  Tag,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { useAuth, getAuthApiBase } from "@/context/AuthContext";

interface VoucherData {
  code: string;
  discountAmount: number;
  currency: string;
  isRedeemed: boolean;
  redeemedOnPackage?: string | null;
  redeemedAt?: string | null;
  expiresAt?: string;
}

export const FloatingEventsWidget = memo(function FloatingEventsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Voucher State
  const [voucher, setVoucher] = useState<VoucherData | null>(null);
  const [loadingVoucher, setLoadingVoucher] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Fetch active voucher when user logs in or opens the widget
  useEffect(() => {
    let isMounted = true;
    const fetchUserVoucher = async () => {
      if (!user) {
        setVoucher(null);
        return;
      }
      setLoadingVoucher(true);
      setClaimError("");
      try {
        const apiBase = getAuthApiBase();
        const res = await fetch(
          `${apiBase}/api/vouchers/my-voucher?userId=${encodeURIComponent(
            user.id || ""
          )}&email=${encodeURIComponent(user.email || "")}&phone=${encodeURIComponent(
            user.phone || ""
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && data.voucher) {
            setVoucher(data.voucher);
          }
        }
      } catch (err) {
        console.warn("[Voucher lookup notice]:", err);
      } finally {
        if (isMounted) setLoadingVoucher(false);
      }
    };

    if (isOpen || isAuthenticated) {
      fetchUserVoucher();
    }

    return () => {
      isMounted = false;
    };
  }, [user, isAuthenticated, isOpen]);

  // Claim ₹5,000 Diwali Voucher
  const handleClaimVoucher = async () => {
    if (!user) {
      openAuthModal("email");
      return;
    }
    setClaiming(true);
    setClaimError("");
    try {
      const apiBase = getAuthApiBase();
      const res = await fetch(`${apiBase}/api/vouchers/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          phone: user.phone,
          name: user.fullName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.voucher) {
        setVoucher(data.voucher);
      } else {
        setClaimError(data.error || "Failed to generate voucher. Please try again.");
      }
    } catch (err: any) {
      setClaimError(err.message || "Network error. Please try again.");
    } finally {
      setClaiming(false);
    }
  };

  // Copy voucher code
  const handleCopyCode = () => {
    if (!voucher?.code) return;
    navigator.clipboard.writeText(voucher.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Navigate to packages and auto-scroll
  const handleApplyToPackages = () => {
    if (voucher?.code) {
      navigator.clipboard.writeText(voucher.code);
    }
    setIsOpen(false);
    const enquiryEl = document.getElementById("enquiry") || document.getElementById("packages");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#enquiry";
    }
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="select-none">
      {/* Background Dim Backdrop on Mobile when Popover is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[9990] transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Modal / Popover Card */}
      {isOpen && (
        <div className="fixed bottom-[4.75rem] sm:bottom-20 left-3 right-3 sm:left-6 sm:right-auto sm:w-[410px] max-w-[430px] mx-auto sm:mx-0 z-[9995] max-h-[calc(100dvh-5.5rem)] sm:max-h-[88vh] overflow-y-auto overscroll-contain bg-slate-950/98 backdrop-blur-2xl rounded-3xl border border-amber-500/40 p-4 sm:p-5 shadow-2xl shadow-slate-950/90 animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col gap-3.5 text-white">
          {/* Card Top Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 shrink-0">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-inner">
              <span className="text-sm">🪔</span>
              <span>SFM Diwali Festive Special</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close notification"
              className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 p-1.5 sm:p-2 rounded-full transition-all cursor-pointer border border-slate-800 hover:border-slate-700 active:scale-95 shrink-0"
            >
              <X className="w-4 h-4 font-bold" />
            </button>
          </div>

          {/* ========================================================= */}
          {/* DIWALI VOUCHER SECTION (MEMBER EXCLUSIVE)                  */}
          {/* ========================================================= */}
          <div className="relative rounded-2xl p-4 bg-gradient-to-b from-amber-500/20 via-amber-950/30 to-slate-900/90 border border-amber-400/50 shadow-xl overflow-hidden shrink-0">
            {/* Background Glow Accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-orange-600/15 rounded-full blur-xl pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                Members Only Gift
              </span>
              <span className="text-[10px] text-amber-200/80 font-bold">1-Time Redeemable</span>
            </div>

            {/* Title & Value */}
            <div className="text-center py-1">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-300">
                Diwali Holiday Voucher
              </h3>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 my-0.5 drop-shadow">
                ₹5,000 OFF
              </div>
              <p className="text-[11px] sm:text-xs text-amber-100/90 leading-relaxed font-medium">
                Valid on any domestic, international, or luxury cruise package.
              </p>
            </div>

            {/* STATE 1: Visitor is NOT logged in */}
            {!isAuthenticated || !user ? (
              <div className="mt-3.5 pt-3 border-t border-amber-500/25 space-y-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2 text-left">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Locked for registered travelers. Sign in or register to generate your unique code!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openAuthModal("email");
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 cursor-pointer active:scale-98"
                >
                  <Gift className="w-4 h-4 shrink-0 text-slate-950" />
                  <span>Login / Register to Claim Voucher</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                </button>
              </div>
            ) : voucher?.isRedeemed ? (
              /* STATE 2: Logged in & Voucher ALREADY Redeemed */
              <div className="mt-3.5 pt-3 border-t border-amber-500/25 space-y-2 text-center">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left">
                  <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Diwali Voucher Successfully Redeemed!</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Applied on:{" "}
                    <strong className="text-amber-300">
                      {voucher.redeemedOnPackage || "Holiday Package"}
                    </strong>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Code: {voucher.code} (Single-use completed)
                  </p>
                </div>
              </div>
            ) : voucher?.code ? (
              /* STATE 3: Logged in & Voucher GENERATED (Active & Single-Use) */
              <div className="mt-3.5 pt-3 border-t border-amber-500/25 space-y-2.5">
                {/* Golden Ticket Code Display */}
                <div className="relative p-3 rounded-xl bg-slate-950/85 border border-dashed border-amber-400/80 flex items-center justify-between gap-2 shadow-inner">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-400 block">
                      Your Unique Voucher Code
                    </span>
                    <span className="font-mono font-black text-base sm:text-lg tracking-wider text-white select-all">
                      {voucher.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      copiedCode
                        ? "bg-emerald-500 text-slate-950 font-black"
                        : "bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-sm"
                    }`}
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instructions */}
                <div className="flex items-center justify-between text-[10px] text-amber-200/90 font-medium px-1">
                  <span>Single-use on any holiday package</span>
                  <span>Expires: Nov 30, 2026</span>
                </div>

                {/* CTA: Book Package & Apply Code */}
                <button
                  type="button"
                  onClick={handleApplyToPackages}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 cursor-pointer active:scale-98"
                >
                  <Tag className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                  <span>Explore Packages & Apply Code →</span>
                </button>
              </div>
            ) : (
              /* STATE 4: Logged in & Voucher NOT yet generated */
              <div className="mt-3.5 pt-3 border-t border-amber-500/25 space-y-2 text-center">
                <p className="text-[11px] text-amber-200/90 font-medium">
                  Welcome, <strong className="text-white">{user.fullName}</strong>! Claim your single-use
                  festival gift code now:
                </p>

                {claimError && (
                  <p className="text-[11px] text-rose-400 font-bold bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                    {claimError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleClaimVoucher}
                  disabled={claiming || loadingVoucher}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <Gift className="w-4 h-4 shrink-0 text-slate-950" />
                  <span>
                    {claiming ? "Generating Unique Code..." : "🎁 Generate My ₹5,000 Code"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                </button>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* UPCOMING SEASONAL DEPARTURES (PIPELINE)                    */}
          {/* ========================================================= */}
          <div className="space-y-2 shrink-0">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              <span>What&apos;s In The Pipeline</span>
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                <Compass className="w-3 h-3" /> Stay Tuned
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-base shrink-0">🏔️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Winter Snow & Adventure Treks</p>
                  <p className="text-[10px] text-slate-400 truncate">Kashmir, Manali & Swiss Alps</p>
                </div>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-md border border-amber-500/30 whitespace-nowrap shrink-0">
                  Winter 2026
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-base shrink-0">🌸</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Cherry Blossom & Spring Escapes</p>
                  <p className="text-[10px] text-slate-400 truncate">Japan, Vietnam & Europe</p>
                </div>
                <span className="text-[9px] bg-pink-500/20 text-pink-300 font-bold px-2 py-0.5 rounded-md border border-pink-500/30 whitespace-nowrap shrink-0">
                  Spring 2026
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-all">
                <span className="text-base shrink-0">🚢</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Luxury Cruise & Island Departures</p>
                  <p className="text-[10px] text-slate-400 truncate">Singapore, Bali & Thailand</p>
                </div>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-md border border-cyan-500/30 whitespace-nowrap shrink-0">
                  All Year
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA: WhatsApp Early Bird */}
          <div className="pt-0.5 shrink-0">
            <a
              href="https://wa.me/919711038584?text=Hi%20SFM%20Travels,%20I%20have%20claimed%20my%20Diwali%20Voucher%20and%20want%20to%20plan%20a%20holiday%20trip!"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-extrabold text-xs py-2 sm:py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Ask Holiday Desk on WhatsApp</span>
              <ArrowRight className="w-3 h-3 stroke-[2.5] shrink-0" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill on the Left Side at the Bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Diwali Voucher & Events"
        className={`fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[9990] h-12 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 rounded-full border shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 active:scale-95 leading-none ${
          isOpen
            ? "bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/30"
            : "bg-slate-950/95 hover:bg-slate-900 text-white border-amber-500/50 shadow-slate-950/70 hover:border-amber-400 hover:shadow-amber-500/25"
        }`}
      >
        {/* Pulsing Beacon / Notification Indicator */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 items-center justify-center">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOpen ? "bg-slate-950" : "bg-amber-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 ${
              isOpen ? "bg-slate-950" : "bg-amber-500"
            }`}
          />
        </span>

        {/* Icon */}
        <div
          className={`p-1 sm:p-1.5 rounded-full shrink-0 flex items-center justify-center ${
            isOpen ? "bg-slate-950/20 text-slate-950" : "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
          }`}
        >
          {isOpen ? (
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          ) : (
            <span className="text-sm">🪔</span>
          )}
        </div>

        {/* Text Label */}
        <span
          className={`text-xs sm:text-sm font-black tracking-tight whitespace-nowrap leading-none ${
            isOpen ? "text-slate-950" : "text-white"
          }`}
        >
          Diwali Voucher
        </span>

        {/* Badge */}
        <span
          className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-full tracking-wider shrink-0 leading-none ${
            isOpen
              ? "bg-slate-950 text-amber-400"
              : "bg-amber-500 text-slate-950 animate-pulse font-black"
          }`}
        >
          ₹5,000 OFF
        </span>
      </button>
    </div>
  );
});
