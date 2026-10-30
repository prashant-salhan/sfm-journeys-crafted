import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Gift,
  Tag,
  Copy,
  Check,
  LogOut,
  MessageCircle,
  FileText,
  Compass,
  ArrowRight,
  ExternalLink,
  Edit3,
  HeartHandshake,
  Send,
  Building2,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/Sections";
import { useAuth, getAuthApiBase, type UserEnquiry } from "@/context/AuthContext";
import sfmLogo from "@/assets/sfm-logo.png";

export const Route = createFileRoute("/user-panel")({
  component: UserPanelPage,
});

export function UserPanelPage() {
  const { user, isAuthenticated, logout, updateProfile, fetchUserEnquiries, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"enquiries" | "packages" | "profile" | "support">("enquiries");
  const [enquiries, setEnquiries] = useState<UserEnquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  // Diwali Voucher State
  const [voucher, setVoucher] = useState<{
    code: string;
    discountAmount: number;
    currency: string;
    isRedeemed: boolean;
    redeemedOnPackage?: string | null;
    redeemedAt?: string | null;
    expiresAt?: string;
  } | null>(null);
  const [loadingVoucher, setLoadingVoucher] = useState(false);
  const [claimingVoucher, setClaimingVoucher] = useState(false);
  const [voucherClaimMsg, setVoucherClaimMsg] = useState("");
  const [voucherClaimError, setVoucherClaimError] = useState("");
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  // Fetch active Diwali voucher for this user
  useEffect(() => {
    if (!user) return;
    setLoadingVoucher(true);
    const apiBase = getAuthApiBase();
    fetch(`${apiBase}/api/vouchers/my-voucher?userId=${encodeURIComponent(user.id || '')}&email=${encodeURIComponent(user.email || '')}&phone=${encodeURIComponent(user.phone || '')}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.voucher) {
          setVoucher(data.voucher);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingVoucher(false));
  }, [user]);

  // Claim voucher
  const handleClaimVoucher = async () => {
    if (!user) return;
    setClaimingVoucher(true);
    setVoucherClaimError("");
    setVoucherClaimMsg("");
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
      if (res.ok && data?.success && data?.voucher) {
        setVoucher(data.voucher);
        setVoucherClaimMsg(data.message || "Your ₹5,000 Diwali voucher is ready!");
      } else {
        setVoucherClaimError(data?.error || "Failed to claim voucher.");
      }
    } catch (err: any) {
      setVoucherClaimError(err.message || "Network error. Please try again.");
    } finally {
      setClaimingVoucher(false);
    }
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2500);
  };


  // Profile Edit State
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || "Customized Vacation");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhone(user.phone || "");
      setTravelStyle(user.travelStyle || "Customized Vacation");
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoadingEnquiries(true);
      fetchUserEnquiries()
        .then((data) => {
          setEnquiries(data);
          setLoadingEnquiries(false);
        })
        .catch(() => setLoadingEnquiries(false));
    }
  }, [isAuthenticated, fetchUserEnquiries]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(text);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");
    setIsUpdatingProfile(true);

    const res = await updateProfile({
      fullName: fullName.trim(),
      phone: phone.trim(),
      travelStyle,
    });

    setIsUpdatingProfile(false);
    if (res.success) {
      setProfileSuccess("Profile updated successfully!");
      setTimeout(() => setProfileSuccess(""), 3000);
    } else {
      setProfileError(res.error || "Failed to update profile.");
    }
  };

  // If not logged in, show login prompt
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar onPlanTripClick={() => navigateTo("/#enquiry")} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-display">
              Authentication Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-outfit">
              Please sign in with your email or phone to access your personalized travel panel and trip bookings.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 border-none font-outfit"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Sign In / Register with OTP</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo("/login")}
                  className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold py-2 px-4 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("/register")}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onPlanTripClick={() => navigateTo("/#enquiry")} />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top User Header Card */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-800 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-amber-500/30 uppercase select-none">
                  {user.fullName.charAt(0) || "U"}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-black tracking-tight font-display text-white">
                      {user.fullName}
                    </h1>
                    <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> Verified Traveler
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-outfit">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {user.email}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {user.phone}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[11px] text-amber-300 font-mono font-semibold">
                      Member ID: {user.memberId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(user.memberId)}
                      title="Copy Member ID"
                      className="text-amber-400 hover:text-amber-200 transition-colors p-1 cursor-pointer bg-white/10 rounded"
                    >
                      {copiedRef === user.memberId ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => navigateTo("/#enquiry")}
                  className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Plan New Trip</span>
                </button>
                <a
                  href={`https://wa.me/919711038584?text=${encodeURIComponent(
                    `Hello SFM Travels Desk, I am ${user.fullName} (Member ID: ${user.memberId}). I would like to consult with my holiday specialist.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 no-underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
                <button
                  type="button"
                  onClick={logout}
                  title="Sign Out"
                  className="bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 border border-white/10 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-outfit">
                Trip Enquiries
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900 font-display">
                  {enquiries.length}
                </span>
                <span className="text-xs text-amber-700 font-medium">Logged & Tracked</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-outfit">
                Member Tier
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-black text-amber-600 font-display">
                  SFM Explorer
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-outfit">
                Dedicated Specialist
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-bold text-emerald-600 font-display flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Active on Call
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider font-outfit">
                Consultation SLA
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-bold text-slate-800 font-display flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" /> 15–30 Mins Callback
                </span>
              </div>
            </div>
          </div>

          
          {/* ========================================================= */}
          {/* EXCLUSIVE DIWALI MEMBER VOUCHER SECTION (₹5,000 OFF)       */}
          {/* ========================================================= */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-900/20 border-2 border-amber-400/60 shadow-xl overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-900 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-inner">
                  <span className="text-sm">🪔</span>
                  <span>Diwali 2026 Exclusive Member Benefit</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  ₹5,000 Diwali Holiday Voucher
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-outfit">
                  As an SFM registered member, enjoy a flat <strong className="text-amber-800">₹5,000 discount</strong> on any domestic, international, or luxury cruise tour package. Valid for a single redemption per member.
                </p>
                {voucher?.expiresAt && (
                  <p className="text-[11px] text-amber-900/80 font-medium">
                    Valid till: <strong>November 30, 2026</strong> • Applicable on quotes submitted online.
                  </p>
                )}
              </div>

              {/* Action / Voucher Ticket Section */}
              <div className="w-full md:w-auto shrink-0">
                {voucher?.isRedeemed ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-1">
                    <div className="flex items-center gap-2 font-black text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>₹5,000 Voucher Redeemed!</span>
                    </div>
                    <p className="text-xs text-emerald-800 font-medium">
                      Applied on: <strong>{voucher.redeemedOnPackage || "Holiday Package"}</strong>
                    </p>
                    <p className="text-[10px] font-mono text-emerald-700">
                      Code: {voucher.code} (Single-use completed)
                    </p>
                  </div>
                ) : voucher?.code ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-amber-400 text-white shadow-lg space-y-3 min-w-[280px]">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                          Your Unique Voucher Code
                        </span>
                        <span className="font-mono font-black text-lg sm:text-xl tracking-wider text-white select-all">
                          {voucher.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyVoucher(voucher.code)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                          copiedVoucher
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm"
                        }`}
                      >
                        {copiedVoucher ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleCopyVoucher(voucher.code);
                        navigateTo("/#enquiry");
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 cursor-pointer active:scale-98"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Book Package & Apply Code (-₹5,000) →</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {voucherClaimError && (
                      <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-xl border border-rose-200">
                        {voucherClaimError}
                      </p>
                    )}
                    {voucherClaimMsg && (
                      <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                        {voucherClaimMsg}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleClaimVoucher}
                      disabled={claimingVoucher || loadingVoucher}
                      className="w-full md:w-auto bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/30 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      <Gift className="w-4 h-4 text-slate-950" />
                      <span>
                        {claimingVoucher ? "Generating Your Unique Code..." : "🎁 Claim My ₹5,000 Diwali Voucher"}
                      </span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto font-outfit">
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "enquiries"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>My Trip Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("packages")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "packages"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Itineraries</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>My Profile & Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab("support")}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "support"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Dedicated Helpdesk</span>
            </button>
          </div>

          {/* TAB 1: My Enquiries */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    Your Active Holiday Enquiries
                  </h3>
                  <p className="text-xs text-slate-500 font-outfit">
                    Track the live review status and quotes prepared by our destination desk for your trips.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo("/#enquiry")}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Submit Another Enquiry</span>
                </button>
              </div>

              {loadingEnquiries ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
                  <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-semibold text-slate-600 font-outfit">Loading your holiday requests...</p>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-14 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 font-display">No Enquiries Found Yet</h4>
                    <p className="text-xs text-slate-500 font-outfit leading-relaxed">
                      You haven't requested any custom tour packages yet. Choose your dream destination and get a day-wise itinerary with direct hotel pricing!
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo("/#enquiry")}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
                  >
                    <span>Plan Your First Trip Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enquiries.map((enq) => {
                    const rawClean = String(enq._id || "").replace(/^SFM-/i, "");
                    const refId = rawClean ? `SFM-${rawClean.slice(-6).toUpperCase()}` : "SFM-REF";
                    return (
                      <div
                        key={enq._id}
                        className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                              {refId}
                            </span>
                            <h4 className="text-base font-black text-slate-900 mt-1 font-display">
                              {enq.destination}
                            </h4>
                          </div>
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Specialist Assigned
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-outfit">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Travel Date</span>
                            <span className="font-semibold text-slate-800">{enq.travelDate || "Flexible"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Travellers</span>
                            <span className="font-semibold text-slate-800">{enq.travellers || "Custom Group"}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">Contact Phone</span>
                            <span className="font-semibold font-mono text-slate-800">{enq.phone}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">SLA Callback</span>
                            <span className="font-semibold text-emerald-600">15–30 Mins</span>
                          </div>
                        </div>

                        {enq.voucherCode && (
                          <div className="bg-amber-50 border border-amber-200/90 px-3 py-1.5 rounded-xl flex items-center justify-between text-xs text-amber-900 font-bold">
                            <span className="flex items-center gap-1.5">
                              <span>🪔</span>
                              <span>Diwali Member Discount:</span>
                            </span>
                            <span className="text-emerald-700 font-black">
                              -₹{enq.discountAmount || 5000} ({enq.voucherCode})
                            </span>
                          </div>
                        )}

                        {enq.message && (
                          <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-xs text-slate-600 font-outfit italic">
                            "{enq.message}"
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 font-outfit">
                            Submitted on {new Date(enq.createdAt).toLocaleDateString()}
                          </span>
                          <a
                            href={`https://wa.me/919711038584?text=${encodeURIComponent(
                              `Hello SFM Travels, I am ${user.fullName}. Checking on my enquiry ${refId} for ${enq.destination}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors no-underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Ask on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Explore Packages */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Handcrafted International & Domestic Itineraries
                </h3>
                <p className="text-xs text-slate-500 font-outfit">
                  Explore complete day-by-day itineraries with verified 4-star/5-star hotels, transfers, and private sightseeing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: "Singapore & Cruise Odyssey",
                    tag: "6N / 7D",
                    price: "₹78,999",
                    desc: "Gardens by the Bay, Sentosa Island, Universal Studios & 2 Nights Luxury Cruise.",
                    link: "/singapore-cruise-itinerary",
                    badge: "Most Popular",
                  },
                  {
                    title: "Bali Tropical Luxury Retreat",
                    tag: "6N / 7D",
                    price: "₹45,999",
                    desc: "Private Pool Villa in Ubud, Nusa Penida Island, Kintamani Volcano & Sunset Cruise.",
                    link: "/bali-itinerary",
                    badge: "Bestseller",
                  },
                  {
                    title: "Vietnam Ha Long Bay & Da Nang",
                    tag: "5N / 6D",
                    price: "₹49,999",
                    desc: "Luxury Overnight Cruise in Ha Long Bay, Golden Bridge Ba Na Hills & Hanoi Old Quarter.",
                    link: "/vietnam-itinerary",
                    badge: "Trending",
                  },
                  {
                    title: "Grand Europe & Swiss Alps",
                    tag: "7N / 8D",
                    price: "₹1,24,999",
                    desc: "Paris Eiffel Tower, Swiss Alps Mt. Titlis, Zurich Lake & Rhine Falls Tour.",
                    link: "/europe-itinerary",
                    badge: "Luxury",
                  },
                  {
                    title: "Kashmir Heavenly Paradise",
                    tag: "5N / 6D",
                    price: "₹24,999",
                    desc: "Dal Lake Houseboat, Gulmarg Gondola Cable Car Ride, Pahalgam Valley & Sonamarg.",
                    link: "/#packages",
                    badge: "Domestic Favorite",
                  },
                  {
                    title: "Thailand Phuket & Krabi Island Hopping",
                    tag: "5N / 6D",
                    price: "₹38,999",
                    desc: "Phi Phi Island Speedboat, James Bond Island, 4-Island Tour & Bangla Road nightlife.",
                    link: "/thailand-itinerary",
                    badge: "Adventure",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-500 font-mono">{item.tag}</span>
                      </div>
                      <h4 className="text-base font-black text-slate-900 font-display">{item.title}</h4>
                      <p className="text-xs text-slate-600 font-outfit leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-outfit">Starting From</span>
                        <span className="text-sm font-black text-slate-950 font-display">{item.price}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (item.link.startsWith("/#")) {
                            navigateTo("/");
                            setTimeout(() => {
                              const el = document.getElementById("packages");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 300);
                          } else {
                            navigateTo(item.link);
                          }
                        }}
                        className="bg-slate-900 hover:bg-amber-600 hover:text-slate-950 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1 font-outfit"
                      >
                        <span>View Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Profile & Preferences */}
          {activeTab === "profile" && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block font-outfit">
                  Member Profile
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  Personal Details & Travel Preferences
                </h3>
                <p className="text-xs text-slate-500 font-outfit mt-1">
                  Keep your contact details updated so our destination planners can reach you with verified quotes.
                </p>
              </div>

              {profileSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-3.5 rounded-xl flex items-center gap-2 font-outfit">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="font-semibold">{profileSuccess}</p>
                </div>
              )}

              {profileError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3.5 rounded-xl flex items-center gap-2 font-outfit">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <p className="font-medium">{profileError}</p>
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4 font-outfit">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Read-only)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Travel Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                  >
                    <option value="Customized Vacation">Customized Vacation (Couples / Families)</option>
                    <option value="Honeymoon & Romantic">Honeymoon & Romantic Getaway</option>
                    <option value="Luxury Villa & Private Transfers">Luxury Villa & Private Transfers</option>
                    <option value="Adventure & Sightseeing">Adventure & Sightseeing</option>
                    <option value="Corporate & Group Tours">Corporate & Group Tours</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 px-6 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-60"
                  >
                    {isUpdatingProfile ? "Saving Changes..." : "Save Profile Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: Dedicated Helpdesk & Concierge */}
          {activeTab === "support" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp Priority Desk */}
              <div className="bg-emerald-50/90 border border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 font-outfit">
                    Instant Chat
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-display">
                    Senior WhatsApp Concierge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-outfit leading-relaxed">
                    Skip email queues! Chat directly with our senior destination specialists. Receive customized hotel photos, itinerary PDFs, and live pricing.
                  </p>
                </div>

                <a
                  href={`https://wa.me/919711038584?text=${encodeURIComponent(
                    `Hello SFM Travels, I am logged in as ${user.fullName} (Member ID: ${user.memberId}). Please connect me with my holiday specialist.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 no-underline font-outfit"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Consultation</span>
                </a>
              </div>

              {/* Direct Calling Hotlines */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 font-outfit">
                    Direct Phone Desks
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-display">
                    Speak Directly With An Expert
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-outfit leading-relaxed">
                    Our holiday advisors are available 7 days a week from 9:30 AM to 8:30 PM IST.
                  </p>
                </div>

                <div className="space-y-2 pt-1 font-outfit">
                  <a
                    href="tel:+919711038584"
                    className="bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800 transition-all no-underline"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">India Head Desk</span>
                        <span className="font-mono text-slate-900 font-bold">+91 97110 38584</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-amber-700 font-bold">Call Now</span>
                  </a>

                  <a
                    href="tel:+971563607490"
                    className="bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800 transition-all no-underline"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-sky-600" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">Dubai Branch Desk</span>
                        <span className="font-mono text-slate-900 font-bold">+971 56 360 7490</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-sky-700 font-bold">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
