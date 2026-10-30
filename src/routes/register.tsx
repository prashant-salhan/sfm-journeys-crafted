import { useState, useEffect, useRef, type FormEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  User,
  Mail,
  MessageSquare,
  Smartphone,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Clock,
  Compass,
  Star,
  ChevronLeft,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/Sections";
import { useAuth } from "@/context/AuthContext";
import { CountryCodeSelector, DEFAULT_COUNTRY, type CountryOption } from "@/components/CountryCodeSelector";
import sfmLogo from "@/assets/sfm-logo.png";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

export function RegisterPage() {
  const { sendOtp, verifyOtp, registerWithOtp, isAuthenticated, user } = useAuth();

  // Country code state
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(DEFAULT_COUNTRY);

  // Step state: 'input' -> 'otp' -> 'verified_form' (form opens ONLY after OTP verification)
  const [step, setStep] = useState<"input" | "otp" | "verified_form">("input");
  const [authMode, setAuthMode] = useState<"phone" | "email">("phone");
  const [activeIdentifier, setActiveIdentifier] = useState("");

  // OTP inputs
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [debugOtp, setDebugOtp] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Registration form fields (shown only once OTP is verified)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // OTP Resend Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
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

  // Step 1: Send OTP
  const handleSendOtp = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    let targetVal = "";
    if (authMode === "phone") {
      const cleanDigits = phone.trim().replace(/\D/g, "");
      if (cleanDigits.length < 7) {
        setErrorMessage("Please enter a valid mobile number (at least 7 digits).");
        return;
      }
      targetVal = `${selectedCountry.dialCode}${cleanDigits}`;
    } else {
      targetVal = email.trim().toLowerCase();
      if (!targetVal.includes("@") || !targetVal.includes(".")) {
        setErrorMessage("Please enter a valid Google Mail or Email address.");
        return;
      }
    }

    setIsSubmitting(true);
    const result = await sendOtp(targetVal, authMode);
    setIsSubmitting(false);

    if (result.success) {
      setActiveIdentifier(targetVal);
      setStep("otp");
      setOtpValues(["", "", "", "", "", ""]);
      setResendTimer(30);
      setCanResend(false);
      if (result.debugOtp) {
        setDebugOtp(result.debugOtp);
      }
      setSuccessMessage(result.message || `Verification code sent to ${targetVal}`);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 150);
    } else {
      setErrorMessage(result.error || "Failed to send OTP. Please try again.");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!canResend || isSubmitting) return;
    setErrorMessage("");
    setIsSubmitting(true);
    const result = await sendOtp(activeIdentifier, authMode);
    setIsSubmitting(false);

    if (result.success) {
      setResendTimer(30);
      setCanResend(false);
      if (result.debugOtp) {
        setDebugOtp(result.debugOtp);
      }
      setSuccessMessage(`A new OTP has been sent to ${activeIdentifier}`);
    } else {
      setErrorMessage(result.error || "Failed to resend OTP.");
    }
  };

  // OTP 6-box input handlers
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

  // Step 2: Verify OTP
  const triggerVerify = async (code: string) => {
    if (code.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP code.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    const result = await verifyOtp(activeIdentifier, code);
    setIsSubmitting(false);

    if (result.success) {
      if (result.isNewUser === false) {
        setSuccessMessage(`Welcome back${result.user?.fullName ? `, ${result.user.fullName}` : ""}! You already have an account. Redirecting to your User Panel...`);
        setTimeout(() => {
          navigateTo("/user-panel");
        }, 1200);
        return;
      }

      // New traveler: OPEN THE FORM NOW!
      setSuccessMessage("✓ OTP verified successfully! Complete the form below to set your password and register.");
      if (authMode === "phone") {
        setPhone(activeIdentifier);
      } else {
        setEmail(activeIdentifier);
      }
      setStep("verified_form");
    } else {
      setErrorMessage(result.error || "Invalid OTP code. Please check and try again.");
    }
  };

  // Step 3: Handle Final Registration with Password & Confirmation
  const handleFinalRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const finalEmail = authMode === "email" ? activeIdentifier : email.trim().toLowerCase();
    const finalPhone =
      authMode === "phone"
        ? activeIdentifier
        : (phone.trim().startsWith("+") ? phone.trim() : `${selectedCountry.dialCode}${phone.trim().replace(/\D/g, "")}`);

    if (!finalEmail || !finalEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const phoneDigits = finalPhone.replace(/\D/g, "");
    if (!finalPhone || phoneDigits.length < 7) {
      setErrorMessage("Please enter a valid mobile number (at least 7 digits).");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter your password.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Please accept the Terms of Service to register.");
      return;
    }

    setIsSubmitting(true);
    const result = await registerWithOtp({
      fullName: fullName.trim(),
      email: finalEmail,
      phone: finalPhone,
      password,
      confirmPassword,
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage("Account created successfully! Redirecting to your User Panel...");
      setTimeout(() => {
        navigateTo("/user-panel");
      }, 1000);
    } else {
      setErrorMessage(result.error || "Failed to register. Please try again.");
    }
  };

  // If already logged in, show quick welcome banner
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar onPlanTripClick={() => navigateTo("/#enquiry")} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-display">
              You are already logged in!
            </h2>
            <p className="text-sm text-slate-600 font-outfit">
              Logged in as <strong className="text-slate-900">{user.fullName}</strong> ({user.email}).
            </p>
            <div className="pt-2 flex flex-col gap-2.5 font-outfit">
              <button
                onClick={() => navigateTo("/user-panel")}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Go to User Panel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo("/")}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer text-xs"
              >
                Back to Home
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
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 font-outfit">
            <button
              onClick={() => navigateTo("/")}
              className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-amber-700 font-bold">User Registration</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-slate-200/90 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Left Column: Brand & Benefits Banner (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <img src={sfmLogo} alt="SFM Travels" className="h-10 w-auto object-contain brightness-110 drop-shadow-md" />
                  <span className="text-xs uppercase tracking-widest font-black text-amber-400 font-outfit border-l border-amber-400/30 pl-3">
                    Traveler Club
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[11px] font-black px-3 py-1 rounded-full border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" /> Join 15,000+ Happy Travelers
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display text-white leading-tight">
                    Your Personalized <span className="text-amber-400">Travel Panel</span> Awaits.
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-outfit">
                    Register once to track your holiday enquiries, download custom day-wise itineraries, view booking vouchers, and unlock secret member pricing.
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-3.5 pt-2 font-outfit text-xs sm:text-sm">
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xs">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-bold">Customized Day-Wise Itineraries</strong>
                      <span className="text-slate-400 text-[11px] leading-tight block">
                        Direct access to tailored plans for Bali, Singapore, Vietnam, Europe & Kashmir.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xs">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-bold">15–30 Minute Specialist Callback</strong>
                      <span className="text-slate-400 text-[11px] leading-tight block">
                        Get assigned to a dedicated senior travel planner immediately.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xs">
                    <div className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-white block font-bold">Transparent Best Price Guarantee</strong>
                      <span className="text-slate-400 text-[11px] leading-tight block">
                        Direct hotel & flight inventory rates without hidden booking fees.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Badge */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-outfit">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">4.9 / 5</span>
                </div>
                <span className="text-slate-400 text-[11px]">Official SFM Travels Portal</span>
              </div>
            </div>

            {/* Right Column: Progressive OTP-Verified Registration Form (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full space-y-6">

                {/* Progress Step Header */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 block font-outfit">
                      {step === "verified_form" ? "Step 2 of 2: Set Password & Profile" : "Step 1 of 2: Verification"}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] font-bold text-slate-500 font-outfit">
                      {step === "verified_form" ? "OTP Verified ✓" : "OTP Required"}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-display">
                    {step === "verified_form" ? "Create Your Account" : "Verify Your Mobile or Email"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-outfit">
                    {step === "verified_form" ? (
                      <>Already registered?{" "}
                        <button
                          type="button"
                          onClick={() => navigateTo("/login")}
                          className="text-amber-600 hover:text-amber-700 font-bold underline cursor-pointer bg-transparent border-none p-0 inline"
                        >
                          Log in here
                        </button>
                      </>
                    ) : (
                      "Please verify with OTP first to unlock the registration and password form."
                    )}
                  </p>
                </div>

                {/* Step Progress Pill Indicator */}
                <div className="grid grid-cols-2 gap-2 font-outfit text-xs">
                  <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    step === "verified_form"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold"
                      : "bg-amber-50 border-amber-300 text-amber-950 font-black shadow-2xs"
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step === "verified_form" ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                    }`}>
                      {step === "verified_form" ? "✓" : "1"}
                    </span>
                    <span>1. Verify OTP</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    step === "verified_form"
                      ? "bg-amber-50 border-amber-300 text-amber-950 font-black shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-400 font-medium"
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step === "verified_form" ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}>
                      2
                    </span>
                    <span>2. Profile & Password</span>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3.5 rounded-2xl flex items-center gap-2.5 font-outfit animate-shake">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <p className="font-medium">{errorMessage}</p>
                  </div>
                )}

                {/* Success Banner */}
                {successMessage && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-3.5 rounded-2xl flex items-center gap-2.5 font-outfit animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <p className="font-semibold">{successMessage}</p>
                  </div>
                )}

                {/* ========================================================= */}
                {/* STEP 1: ENTER PHONE OR EMAIL TO GET OTP                  */}
                {/* ========================================================= */}
                {step === "input" && (
                  <form onSubmit={handleSendOtp} className="space-y-4 font-outfit">
                    {/* Method Selector: Mobile Phone vs Google Mail */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("phone");
                          setErrorMessage("");
                        }}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none ${
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
                          setErrorMessage("");
                        }}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none ${
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center border border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 rounded-xl transition-all bg-white shadow-2xs relative">
                          <CountryCodeSelector
                            selectedCountry={selectedCountry}
                            onSelectCountry={(c) => {
                              setSelectedCountry(c);
                              setErrorMessage("");
                            }}
                          />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                            placeholder={selectedCountry.formatHint ? `Enter mobile number (${selectedCountry.formatHint})` : "Enter mobile number"}
                            className="w-full px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-r-xl"
                            maxLength={15}
                            autoFocus
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          We will send a 6-digit OTP code to {selectedCountry.dialCode} via SMS.
                        </p>
                      </div>
                    ) : (
                      /* Google Mail / Email Input */
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Google Mail or Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center border border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 rounded-xl overflow-hidden transition-all bg-white shadow-2xs">
                          <div className="px-3.5 py-3 bg-slate-50 border-r border-slate-200 text-slate-500">
                            <Mail className="w-4 h-4 text-amber-600" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. yourname@gmail.com"
                            className="w-full px-3.5 py-3 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                            autoFocus
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          We will send a 6-digit verification code to your Google Mail inbox.
                        </p>
                      </div>
                    )}

                    {/* Primary SEND VERIFICATION OTP Button (Golden Background, Black Text) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span className="text-slate-950 font-black">Sending Verification Code...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-950 font-black">SEND VERIFICATION OTP</span>
                          <ArrowRight className="w-4 h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* ========================================================= */}
                {/* STEP 2: ENTER 6-DIGIT OTP                                 */}
                {/* ========================================================= */}
                {step === "otp" && (
                  <div className="space-y-4 font-outfit animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setStep("input")}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Verify {authMode === "phone" ? "Mobile Number" : "Email"}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep("input")}
                        className="text-xs text-amber-700 hover:text-amber-800 font-bold underline bg-transparent border-none cursor-pointer"
                      >
                        Change {authMode === "phone" ? "Number" : "Email"}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600">
                      Enter the 6-digit verification code sent to{" "}
                      <strong className="text-slate-950 font-bold">{activeIdentifier}</strong>.
                    </p>

                    {/* On-screen OTP Verification Card */}
                    {debugOtp && (
                      <div
                        onClick={() => {
                          const digits = debugOtp.split("");
                          setOtpValues(digits);
                          triggerVerify(debugOtp);
                        }}
                        className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-orange-500/20 border-2 border-amber-400 text-slate-900 flex items-center justify-between cursor-pointer hover:bg-amber-100/90 transition-all shadow-xs group"
                        title="Click to automatically fill and verify"
                      >
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                            Your Verification Code
                          </span>
                          <span className="font-mono font-black text-2xl sm:text-3xl tracking-widest text-slate-950 select-all">
                            {debugOtp}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-amber-950 bg-amber-300 px-3 py-1.5 rounded-xl hover:bg-amber-400 transition-colors shadow-2xs flex items-center gap-1">
                          <span>Auto-fill Code</span>
                          <span>→</span>
                        </span>
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
                          className="w-10 sm:w-12 h-12 text-center text-lg sm:text-xl font-black text-slate-900 bg-white border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl focus:outline-none transition-all shadow-2xs"
                        />
                      ))}
                    </div>

                    {/* Resend Timer */}
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
                        disabled={!canResend || isSubmitting}
                        onClick={handleResend}
                        className="text-amber-700 hover:text-amber-800 disabled:text-slate-400 underline font-bold bg-transparent border-none cursor-pointer disabled:cursor-not-allowed"
                      >
                        Resend OTP
                      </button>
                    </div>

                    {/* Verify Button (Golden Background, Black Text) */}
                    <button
                      type="button"
                      onClick={() => triggerVerify(otpValues.join(""))}
                      disabled={isSubmitting || otpValues.some((d) => !d)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span className="text-slate-950 font-black">Verifying Code...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-950 font-black">VERIFY OTP & OPEN REGISTRATION FORM</span>
                          <ArrowRight className="w-4 h-4 text-slate-950" />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* ========================================================= */}
                {/* STEP 3: "THIS FORM" OPENS ONLY WHEN OTP IS VERIFIED       */}
                {/* ========================================================= */}
                {step === "verified_form" && (
                  <div className="space-y-5 font-outfit animate-fade-in">
                    {/* Verification Confirmation Pill */}
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-black text-emerald-950">
                            {authMode === "phone" ? "Mobile Number Verified" : "Google Mail Verified"}
                          </p>
                          <p className="text-[11px] font-bold text-emerald-700">
                            {authMode === "phone" ? `+91 ${activeIdentifier}` : activeIdentifier}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep("input")}
                        className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold underline bg-transparent border-none cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <form onSubmit={handleFinalRegisterSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          {authMode === "email" ? (
                            <div className="w-full pl-10 pr-10 py-3 bg-slate-100 border border-emerald-300 rounded-xl text-xs sm:text-sm text-slate-900 font-bold flex items-center justify-between select-none">
                              <span>{activeIdentifier}</span>
                              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                Verified
                              </span>
                            </div>
                          ) : (
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. rahul.sharma@example.com"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                            />
                          )}
                        </div>
                      </div>

                      {/* Mobile / WhatsApp Number */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          {authMode === "phone" ? (
                            <div className="w-full pl-10 pr-10 py-3 bg-slate-100 border border-emerald-300 rounded-xl text-xs sm:text-sm text-slate-900 font-bold flex items-center justify-between select-none">
                              <span>{activeIdentifier.startsWith("+") ? activeIdentifier : `+91 ${activeIdentifier}`}</span>
                              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                Verified
                              </span>
                            </div>
                          ) : (
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +91 98765 43210"
                              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                            />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Used by your destination planner for fast itinerary quotes via WhatsApp or phone.
                        </p>
                      </div>

                      {/* Password & Confirm Password (2-col grid) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Password */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Password <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Lock className="w-4 h-4" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              required
                              minLength={6}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Min 6 chars"
                              className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
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

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Confirm Password <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Lock className="w-4 h-4" />
                            </div>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              minLength={6}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Re-enter password"
                              className="w-full pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Terms & Conditions Checkbox */}
                      <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded-md text-amber-600 focus:ring-amber-500 border-slate-300 accent-amber-600 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600">
                          I agree to SFM Travels{" "}
                          <span className="font-bold text-slate-900">Terms of Service</span> and acknowledge the{" "}
                          <span className="font-bold text-slate-900">Privacy Policy</span>. No spam guaranteed.
                        </span>
                      </label>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] border-none"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Creating Traveler Account...</span>
                          </span>
                        ) : (
                          <>
                            <span>REGISTER & GO TO USER PANEL</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* Dedicated Login Action for Existing Users */}
                <div className="pt-2 text-center space-y-3 font-outfit">
                  <div className="relative my-2 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Already have an account?
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigateTo("/login")}
                    className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-slate-900/15 hover:scale-[1.01] active:scale-[0.99] border-none uppercase tracking-wider"
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Log In to Your Traveler Account</span>
                  </button>
                </div>

                {/* Direct Help / Quick Enquiry */}
                <div className="pt-2 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 font-outfit">
                    Need instant custom booking without registering?{" "}
                    <button
                      type="button"
                      onClick={() => navigateTo("/#enquiry")}
                      className="text-amber-700 font-bold hover:underline cursor-pointer bg-transparent border-none p-0 inline"
                    >
                      Fill quick enquiry form
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
