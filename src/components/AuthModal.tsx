import { useState, useEffect, useRef, type FormEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { CountryCodeSelector, DEFAULT_COUNTRY, type CountryOption } from "@/components/CountryCodeSelector";
import {
  X,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  Plane,
  Gift,
  Lock,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalInitialMode,
    sendOtp,
    verifyOtp,
    registerWithOtp,
    user,
  } = useAuth();

  // Country code state
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(DEFAULT_COUNTRY);

  // Mode: "phone" or "email"
  const [authMode, setAuthMode] = useState<"phone" | "email">("phone");

  // Flow Step: "input" | "otp" | "register" | "success"
  const [step, setStep] = useState<"input" | "otp" | "register" | "success">("input");

  // Inputs
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [fullName, setFullName] = useState("");
  const [secondaryContact, setSecondaryContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [travelStyle, setTravelStyle] = useState("Customized Vacation");

  // Status & feedback
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // OTP box refs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state on modal open
  useEffect(() => {
    if (isAuthModalOpen) {
      setAuthMode(authModalInitialMode || "phone");
      setStep("input");
      setErrorMsg("");
      setSuccessMsg("");
      setOtpValues(["", "", "", "", "", ""]);
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setDebugOtp(null);
    }
  }, [isAuthModalOpen, authModalInitialMode]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isAuthModalOpen) return null;

  // Active identifier
  const activeIdentifier =
    authMode === "phone"
      ? (phone.startsWith("+") ? phone.trim() : `${selectedCountry.dialCode}${phone.trim().replace(/\D/g, "")}`)
      : email.trim().toLowerCase();

  // Handle Send OTP
  const handleSendOtp = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (authMode === "phone") {
      const cleanDigits = phone.replace(/\D/g, "");
      if (cleanDigits.length < 7) {
        setErrorMsg("Please enter a valid mobile number (at least 7 digits).");
        return;
      }
    } else {
      if (!email.includes("@") || !email.includes(".")) {
        setErrorMsg("Please enter a valid Google Mail or Email address.");
        return;
      }
    }

    setLoading(true);
    const result = await sendOtp(activeIdentifier, authMode);
    setLoading(false);

    if (result.success) {
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
      setOtpValues(["", "", "", "", "", ""]);
      if (result.debugOtp) {
        setDebugOtp(result.debugOtp);
      }
      setSuccessMsg(result.message || `OTP sent to ${activeIdentifier}`);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } else {
      setErrorMsg(result.error || "Failed to send OTP. Please try again.");
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    if (!canResend || loading) return;
    setErrorMsg("");
    setLoading(true);
    const result = await sendOtp(activeIdentifier, authMode);
    setLoading(false);
    if (result.success) {
      setResendTimer(30);
      setCanResend(false);
      if (result.debugOtp) {
        setDebugOtp(result.debugOtp);
      }
      setSuccessMsg(`A new OTP has been sent to ${activeIdentifier}`);
    } else {
      setErrorMsg(result.error || "Failed to resend OTP.");
    }
  };

  // Handle Individual OTP Input
  const handleOtpChange = (index: number, val: string) => {
    const char = val.slice(-1);
    const newValues = [...otpValues];
    newValues[index] = char;
    setOtpValues(newValues);

    if (char && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (newValues.every((digit) => digit !== "")) {
      const fullOtp = newValues.join("");
      triggerVerify(fullOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!paste) return;
    const newVals = [...otpValues];
    for (let i = 0; i < paste.length; i++) {
      newVals[i] = paste[i];
    }
    setOtpValues(newVals);
    if (paste.length === 6) {
      triggerVerify(paste);
    } else {
      otpRefs.current[paste.length]?.focus();
    }
  };

  // Trigger OTP Verification
  const triggerVerify = async (code: string) => {
    setErrorMsg("");
    setLoading(true);
    const result = await verifyOtp(activeIdentifier, code);
    setLoading(false);

    if (result.success) {
      if (result.isNewUser) {
        setStep("register");
        setPassword("");
        setConfirmPassword("");
        if (authMode === "phone") {
          setSecondaryContact("");
        } else {
          setSecondaryContact("");
        }
      } else {
        setStep("success");
        setTimeout(() => {
          closeAuthModal();
        }, 1400);
      }
    } else {
      setErrorMsg(result.error || "Invalid OTP code. Please check and try again.");
    }
  };

  // Handle Final Registration Submit (For New Users with Password & Confirm Password)
  const handleCompleteRegistration = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    let userEmail = authMode === "email" ? activeIdentifier : secondaryContact.trim();
    let userPhone = authMode === "phone" ? activeIdentifier : secondaryContact.trim();

    if (!userEmail || !userEmail.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!userPhone || userPhone.replace(/\D/g, "").length < 7) {
      setErrorMsg("Please provide a valid phone number (at least 7 digits).");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter your password.");
      return;
    }

    setLoading(true);
    const res = await registerWithOtp({
      fullName: fullName.trim(),
      email: userEmail.toLowerCase(),
      phone: userPhone,
      password,
      confirmPassword,
      travelStyle,
      preferredDestinations: ["Kashmir", "Dubai", "Goa"],
    });
    setLoading(false);

    if (res.success) {
      setStep("success");
      setTimeout(() => {
        closeAuthModal();
      }, 1500);
    } else {
      setErrorMsg(res.error || "Failed to complete registration.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fade-in font-outfit"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs border-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ------------------------------------------------------------- */}
        {/* LEFT COLUMN: Travel Club Festive Banner */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand & Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SFM Travel Club</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
              India, Let's Go <br />
              <span className="text-amber-400">
                Explore The World!
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Unlock secret member rates on Flights, Luxury Hotels & Tailored Holiday Packages.
            </p>
          </div>

          {/* Middle Offer Card */}
          <div className="relative z-10 my-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                Up to ₹1,001 OFF*
              </span>
              <span className="text-amber-300 text-xs font-bold">Holiday Special</span>
            </div>
            <p className="text-sm font-bold text-white mb-1">
              On Kashmir, Kerala, Rajasthan & Dubai Packages!
            </p>
            <p className="text-[11px] text-slate-300 leading-normal">
              Register with Mobile Phone or Google Mail OTP. Instant secure member ID confirmation.
            </p>
          </div>

          {/* Bottom Trust Highlights */}
          <div className="relative z-10 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">100% Verified Trips & Govt. Approved Partners</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">Zero Convenience Fee on First Booking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Plane className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">24/7 Dedicated SFM Holiday Concierge</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Interactive Form */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Modal Right Header */}
            <div className="mb-4">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Login or Create Account</h3>
              <p className="text-xs text-slate-500 mt-0.5">Register with your mobile phone or Google Mail via OTP</p>
            </div>

            {/* Error & Feedback Messages */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-shake">
                <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && !errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 1: ENTER MOBILE NUMBER OR EMAIL */}
            {/* ------------------------------------------------------------- */}
            {step === "input" && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Method Selector: Mobile Phone vs Google Mail / Email */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl mb-4 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("phone");
                      setErrorMsg("");
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                      authMode === "phone"
                        ? "bg-white text-slate-950 shadow-sm shadow-slate-300"
                        : "bg-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>Mobile (SMS OTP)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("email");
                      setErrorMsg("");
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                      authMode === "email"
                        ? "bg-white text-slate-950 shadow-sm shadow-slate-300"
                        : "bg-transparent text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Mail (Email OTP)</span>
                  </button>
                </div>

                {authMode === "phone" ? (
                  /* Mobile Phone Input with Country Code Selector */
                  <div>
                    <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                      Enter Mobile Number
                    </label>
                    <div className="flex items-center border-2 border-slate-200 focus-within:border-amber-500 rounded-xl transition-all bg-white shadow-2xs relative">
                      <CountryCodeSelector
                        selectedCountry={selectedCountry}
                        onSelectCountry={(c) => {
                          setSelectedCountry(c);
                          setErrorMsg("");
                        }}
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                        placeholder={selectedCountry.formatHint ? `Enter mobile number (${selectedCountry.formatHint})` : "Enter mobile number"}
                        className="w-full px-3.5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-r-xl"
                        maxLength={15}
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  /* Email / Gmail Input */
                  <div>
                    <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                      Enter Google Mail / Email Address
                    </label>
                    <div className="flex items-center border-2 border-slate-200 focus-within:border-blue-600 rounded-xl overflow-hidden transition-all bg-white shadow-2xs">
                      <div className="px-3.5 py-3 bg-slate-50 border-r border-slate-200 text-slate-500">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. yourname@gmail.com"
                        className="w-full px-3.5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {/* Big Primary CONTINUE Button (Golden Background, Black Text) */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span className="text-slate-950 font-black">Sending OTP...</span>
                    </>
                  ) : (
                    <span className="text-slate-950 font-black">GET OTP & CONTINUE</span>
                  )}
                </button>

                {/* Divider: Or Login/Signup With */}
                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <span className="relative bg-white px-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Or Login / Register With
                  </span>
                </div>

                {/* Social Login / Switch Actions (Google & Email) */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("email");
                      setErrorMsg("");
                    }}
                    title="Sign in with Google Mail"
                    className="w-12 h-12 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95 bg-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === "phone" ? "email" : "phone");
                      setErrorMsg("");
                    }}
                    title={authMode === "phone" ? "Sign in with Email" : "Sign in with Phone"}
                    className="w-12 h-12 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95 bg-white text-slate-700"
                  >
                    {authMode === "phone" ? <Mail className="w-5 h-5 text-slate-700" /> : <Phone className="w-5 h-5 text-blue-600" />}
                  </button>
                </div>

                {/* Direct Login Button for already registered users */}
                <div className="pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-600 font-medium">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        closeAuthModal();
                        window.history.pushState({}, "", "/login");
                        window.dispatchEvent(new PopStateEvent("popstate"));
                      }}
                      className="text-blue-600 hover:text-blue-800 font-black underline cursor-pointer bg-transparent border-none p-0 inline"
                    >
                      Log in to your account
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 2: ENTER OTP */}
            {/* ------------------------------------------------------------- */}
            {step === "otp" && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h3 className="text-lg font-black text-slate-900">
                    Verify {authMode === "phone" ? "Mobile Number" : "Email"}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-normal">
                  Enter the 6-digit OTP code sent to{" "}
                  <strong className="text-slate-950 font-bold">{activeIdentifier}</strong>.
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold underline bg-transparent border-none cursor-pointer"
                  >
                    Edit
                  </button>
                </p>

                {/* Helpful Dev / Demo OTP Banner for Localhost Testing */}
                {debugOtp && (
                  <div
                    onClick={() => {
                      const digits = debugOtp.split("");
                      setOtpValues(digits);
                      triggerVerify(debugOtp);
                    }}
                    className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-amber-100 transition-all shadow-2xs"
                    title="Click to automatically fill and verify"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>
                        Testing OTP: <strong className="font-mono text-sm tracking-wider">{debugOtp}</strong>
                      </span>
                    </span>
                    <span className="text-[11px] underline text-amber-700">Click to Auto-fill</span>
                  </div>
                )}

                {/* 6-Digit OTP Boxes */}
                <div className="flex items-center justify-between gap-2 sm:gap-2.5 my-3" onPaste={handleOtpPaste}>
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-10 sm:w-12 h-12 text-center text-lg sm:text-xl font-black text-slate-900 bg-white border-2 border-slate-200 focus:border-amber-500 rounded-xl focus:outline-none transition-all shadow-2xs"
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>
                    {resendTimer > 0 ? (
                      `Resend OTP in 00:${resendTimer < 10 ? `0${resendTimer}` : resendTimer}`
                    ) : (
                      <span className="text-emerald-700">Didn't receive code?</span>
                    )}
                  </span>
                  <button
                    type="button"
                    disabled={!canResend || loading}
                    onClick={handleResend}
                    className="text-blue-600 hover:text-blue-800 disabled:text-slate-400 underline font-bold bg-transparent border-none cursor-pointer disabled:cursor-not-allowed"
                  >
                    Resend OTP
                  </button>
                </div>

                {/* Verify Button (Golden Background, Black Text) */}
                <button
                  type="button"
                  onClick={() => triggerVerify(otpValues.join(""))}
                  disabled={loading || otpValues.some((d) => !d)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span className="text-slate-950 font-black">Verifying...</span>
                    </>
                  ) : (
                    <span className="text-slate-950 font-black">VERIFY & PROCEED</span>
                  )}
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 3: NEW USER REGISTRATION & PASSWORD SETUP */}
            {/* ------------------------------------------------------------- */}
            {step === "register" && (
              <form onSubmit={handleCompleteRegistration} className="space-y-3 animate-fade-in">
                <div className="mb-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold mb-1 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{authMode === "phone" ? "Mobile Verified" : "Gmail Verified"}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Set Password & Register</h3>
                  <p className="text-xs text-slate-600">
                    Create a password to complete your account registration and store your traveler profile.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Prashant Sharma"
                    className="w-full px-3.5 py-2 text-sm font-bold text-slate-900 border-2 border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none transition-all"
                    autoFocus
                  />
                </div>

                {/* Secondary Contact: Email if phone verified, Phone if email verified */}
                <div>
                  <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                    {authMode === "phone" ? "Email Address (For Booking Vouchers & Tickets) *" : "Mobile Number (For WhatsApp Updates & SMS) *"}
                  </label>
                  <input
                    type={authMode === "phone" ? "email" : "tel"}
                    required
                    value={secondaryContact}
                    onChange={(e) => setSecondaryContact(e.target.value)}
                    placeholder={authMode === "phone" ? "e.g. name@gmail.com" : "e.g. 9876543210"}
                    className="w-full px-3.5 py-2 text-sm font-bold text-slate-900 border-2 border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none transition-all"
                  />
                </div>

                {/* Set Password */}
                <div>
                  <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                    Set Password * <span className="text-[10px] text-slate-400 font-normal lowercase">(minimum 6 characters)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full pl-3.5 pr-10 py-2 text-sm font-bold text-slate-900 border-2 border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Re-enter Password (Confirm Password) */}
                <div>
                  <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                    Re-enter Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password to confirm"
                      className={`w-full pl-3.5 pr-10 py-2 text-sm font-bold text-slate-900 border-2 rounded-xl focus:outline-none transition-all ${
                        confirmPassword
                          ? password === confirmPassword
                            ? "border-emerald-500 bg-emerald-50/20"
                            : "border-rose-400 bg-rose-50/20"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-[11px] text-rose-600 font-bold mt-1">Passwords do not match.</p>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">✓ Passwords match</p>
                  )}
                </div>

                {/* Preferred Holiday Style */}
                <div>
                  <label className="block text-xs font-black text-slate-700 tracking-wide uppercase mb-1">
                    Preferred Holiday Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs font-bold text-slate-900 border-2 border-slate-200 focus:border-blue-600 rounded-xl focus:outline-none transition-all bg-white"
                  >
                    <option value="Customized Vacation">Customized Vacation (Couples & Families)</option>
                    <option value="Luxury & Villa Stays">Luxury & 5-Star Villa Stays</option>
                    <option value="Honeymoon & Romantic">Honeymoon & Romantic Escapes</option>
                    <option value="Adventure & Road Trips">Adventure & Hill Stations</option>
                    <option value="Corporate & Group Events">Corporate & Group Events</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading || (confirmPassword !== "" && password !== confirmPassword)}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 text-slate-950 font-black text-sm tracking-wide uppercase transition-all shadow-md shadow-amber-500/25 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] border-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Profile & Password...</span>
                    </>
                  ) : (
                    <span>SET PASSWORD & REGISTER</span>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      closeAuthModal();
                      window.history.pushState({}, "", "/login");
                      window.dispatchEvent(new PopStateEvent("popstate"));
                    }}
                    className="text-blue-600 hover:text-blue-800 font-bold underline bg-transparent border-none cursor-pointer"
                  >
                    Go to Password Login &rarr;
                  </button>
                </p>
              </form>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 4: SUCCESS / LOGGED IN CELEBRATION */}
            {/* ------------------------------------------------------------- */}
            {step === "success" && (
              <div className="py-8 text-center space-y-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Welcome to SFM Travels!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {user?.fullName ? `Hello, ${user.fullName}. Your account has been saved in the collection.` : "Your account is ready."}
                  </p>
                  {user?.memberId && (
                    <div className="inline-block mt-3 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
                      Member ID: {user.memberId}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Legal / Terms footer */}
          <p className="text-[10px] text-slate-400 text-center mt-5 pt-3 border-t border-slate-100 leading-normal">
            By proceeding, you agree to SFM Travels'{" "}
            <a href="/privacy-policy" className="text-blue-600 underline font-medium" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
            ,{" "}
            <a href="/terms-and-conditions" className="text-blue-600 underline font-medium" target="_blank" rel="noreferrer">
              User Agreement
            </a>{" "}
            and T&Cs.
          </p>
        </div>
      </div>
    </div>
  );
}
