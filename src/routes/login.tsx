import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  KeyRound,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/Sections";
import { useAuth } from "@/context/AuthContext";
import sfmLogo from "@/assets/sfm-logo.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export function LoginPage() {
  const { login, isAuthenticated, user, logout, openAuthModal } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!identifier.trim()) {
      setErrorMessage("Please enter your registered Email, Phone, or Member ID.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    setIsSubmitting(true);
    const res = await login({ identifier: identifier.trim(), password });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage("Login successful! Redirecting to your User Panel...");
      setTimeout(() => {
        navigateTo("/user-panel");
      }, 700);
    } else {
      setErrorMessage(res.error || "Invalid credentials. Please verify and try again.");
    }
  };

  const fillDemoAccount = () => {
    setIdentifier("traveler.rahul@gmail.com");
    setPassword("sfm12345");
    setErrorMessage("");
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar onPlanTripClick={() => navigateTo("/#enquiry")} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 font-display">
                Already Logged In
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                You are currently signed in as <strong className="text-slate-900">{user.fullName}</strong> ({user.memberId}).
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => navigateTo("/user-panel")}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enter User Panel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={logout}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
              >
                Switch Account / Sign Out
              </button>
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

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button
              onClick={() => navigateTo("/")}
              className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-amber-700 font-bold">User Login</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Left Column: Visual & Welcome Perks (5 Cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-8 sm:p-10 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <img src={sfmLogo} alt="SFM Travels" className="h-9 w-auto object-contain brightness-110" />
                  <span className="text-xs uppercase tracking-widest font-black text-amber-400 font-outfit border-l border-amber-400/30 pl-3">
                    Traveler Sign In
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-black px-3 py-1 rounded-full border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Itinerary Access
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white">
                    Welcome Back, Traveler!
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-outfit">
                    Sign in to track your pending enquiries, view approved travel itineraries, and contact your dedicated holiday specialist.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-slate-300 space-y-2 font-outfit">
                  <p className="font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verified Traveler Benefits
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                    <li>View live quotation status in real time</li>
                    <li>Download customized travel vouchers</li>
                    <li>Direct priority WhatsApp connect</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-[11px] text-slate-400 font-outfit">
                Need assistance? Call our India desk directly at{" "}
                <span className="text-amber-400 font-bold font-mono">+91 97110 38584</span>
              </div>
            </div>

            {/* Right Column: Login Form (7 Cols) */}
            <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full space-y-6">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block font-outfit">
                    Traveler Account Access
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-display">
                    Log In to Your Panel
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-outfit">
                    New to SFM Travels?{" "}
                    <button
                      type="button"
                      onClick={() => navigateTo("/register")}
                      className="text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer bg-transparent border-none p-0 inline"
                    >
                      Register here first
                    </button>
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3.5 rounded-2xl flex items-center gap-2.5 font-outfit">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <p className="font-medium">{errorMessage}</p>
                  </div>
                )}

                {/* Success Banner */}
                {successMessage && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-3.5 rounded-2xl flex items-center gap-2.5 font-outfit">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <p className="font-semibold">{successMessage}</p>
                  </div>
                )}

                {/* Instant Mobile / Gmail OTP Option */}
                <button
                  type="button"
                  onClick={() => openAuthModal()}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-none font-outfit"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Login / Register with Mobile or Gmail OTP</span>
                </button>

                <div className="relative text-center my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-outfit">
                    Or Sign In with Password
                  </span>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 font-outfit">
                  {/* Email / Phone / Member ID */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address, Phone, or Member ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="e.g. rahul@gmail.com or 9876543210"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            "To reset your password, please contact our support desk via WhatsApp or phone (+91 97110 38584) with your registered email."
                          )
                        }
                        className="text-[11px] text-amber-600 hover:text-amber-800 font-semibold cursor-pointer bg-transparent border-none p-0"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-slate-600 cursor-pointer select-none">
                      Remember my login session on this browser
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign In to User Panel</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Quick Demo Credentials Button for Preview / Testing */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={fillDemoAccount}
                      className="w-full bg-amber-50/70 hover:bg-amber-100 border border-amber-200/80 text-amber-900 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>One-Click Test: Fill Demo Traveler Account</span>
                    </button>
                  </div>
                </form>

                {/* Footer register prompt */}
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-600 font-outfit">
                    Don't have an account yet?{" "}
                    <button
                      type="button"
                      onClick={() => navigateTo("/register")}
                      className="text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer bg-transparent border-none p-0 inline"
                    >
                      Register Now (Free)
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
