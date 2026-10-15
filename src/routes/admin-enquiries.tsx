import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  FileSpreadsheet,
  RefreshCw,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Phone,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Sparkles,
  MapPin,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Lock,
  ShieldCheck,
  User,
  KeyRound,
  Eye,
  EyeOff,
  LogIn,
  LogOut,
  X,
} from "lucide-react";
import sfmLogo from "@/assets/sfm-logo.png";

export const Route = createFileRoute("/admin-enquiries")({
  head: () => ({
    meta: [
      { title: "SFM Travels Admin - Enquiries & Google Sheets" },
    ],
  }),
  component: AdminEnquiriesPage,
});

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:5000";
  }
  return "https://sfm-backend-5skx.onrender.com";
};

interface EnquiryItem {
  _id: string;
  fullName?: string;
  name?: string;
  phone: string;
  destination: string;
  message?: string;
  source?: string;
  status?: string;
  createdAt: string;
}

interface SheetStatus {
  success: boolean;
  configured: boolean;
  webhookUrl: string;
  totalEnquiries: number;
}

const APPS_SCRIPT_CODE = `/**
 * SFM TRAVELS - GOOGLE APPS SCRIPT SYNC CONNECTOR
 * Paste this in: Google Sheets > Extensions > Apps Script
 * Then Deploy as Web App with "Who has access: Anyone"
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      var headers = [
        "Date & Time (IST)", "Full Name", "Phone / WhatsApp",
        "Destination / Tour Package", "Trip Details & Message",
        "Source", "Status", "MongoDB Record ID"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);
    }

    var contents = e.postData ? e.postData.contents : "";
    var data = JSON.parse(contents || "{}");
    var rowsToAppend = [];

    var existingIds = {};
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var idValues = sheet.getRange(2, 8, lastRow - 1, 1).getValues();
      for (var i = 0; i < idValues.length; i++) {
        var idStr = String(idValues[i][0]).trim();
        if (idStr) existingIds[idStr] = true;
      }
    }

    if (data.type === "batch" && Array.isArray(data.enquiries)) {
      for (var j = 0; j < data.enquiries.length; j++) {
        var item = data.enquiries[j];
        var recordId = String(item.id || "").trim();
        if (recordId && existingIds[recordId]) continue;

        rowsToAppend.push([
          item.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          item.fullName || "", item.phone || "", item.destination || "",
          item.message || "", item.source || "website", item.status || "new", recordId
        ]);
        if (recordId) existingIds[recordId] = true;
      }
    } else {
      var singleId = String(data.id || "").trim();
      if (!singleId || !existingIds[singleId]) {
        rowsToAppend.push([
          data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          data.fullName || "", data.phone || "", data.destination || "",
          data.message || "", data.source || "website", data.status || "new", singleId
        ]);
      }
    }

    if (rowsToAppend.length > 0) {
      var startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, rowsToAppend.length, 8).setValues(rowsToAppend);
      sheet.autoResizeColumns(1, 8);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", appendedCount: rowsToAppend.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok", service: "SFM Travels Google Sheets Connector" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

function AdminLoginView({ onSuccess }: { onSuccess: (user: any) => void }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      // 1. Try local/production backend
      const res = await fetch(`${getApiBaseUrl()}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: identifier.trim(),
          password: password.trim(),
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        localStorage.setItem("sfm_admin_token", data.token || "sfm_token_local");
        localStorage.setItem("sfm_admin_user", JSON.stringify(data.admin || { name: "SFM Administrator", username: "admin" }));
        onSuccess(data.admin);
        return;
      }

      if (res && res.status === 401) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Invalid username or password. Please verify your admin credentials.");
      }

      // Offline / network fallback verification
      const lowerId = identifier.trim().toLowerCase();
      if (
        (lowerId === "admin" || lowerId === "sfmtravels" || lowerId === "admin@sfmtravels.com") &&
        (password.trim() === "@sfmtravels2026" || password.trim() === "admin123")
      ) {
        const authUser = {
          username: lowerId === "sfmtravels" ? "SFMTravels" : "admin",
          email: "admin@sfmtravels.com",
          name: "SFM Travels Administrator",
          role: "Super Admin",
        };
        localStorage.setItem("sfm_admin_token", "sfm_token_local_auth");
        localStorage.setItem("sfm_admin_user", JSON.stringify(authUser));
        onSuccess(authUser);
        return;
      }

      throw new Error("Invalid username or password. Please verify credentials.");
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-outfit antialiased flex flex-col justify-between relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Simple Navigation */}
      <header className="px-6 py-6 max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to SFM Travels</span>
        </a>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portal V2.0</span>
        </div>
      </header>

      {/* Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md bg-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative space-y-6">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-slate-950 border border-amber-500/30 shadow-inner shadow-amber-500/10">
              <img src={sfmLogo} alt="SFM Travels" className="h-10 w-auto object-contain" />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">
                <Lock className="w-3 h-3 text-amber-400" /> Authorized Staff Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                Admin <span className="text-amber-400">Portal</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Log in to view customer enquiries, leads, and manage real-time Google Sheets sync.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or admin@sfmtravels.com"
                  autoComplete="username"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login to Enquiries Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="py-4 text-center text-xs text-slate-500 z-10">
        © {new Date().getFullYear()} SFM Travels (Smile For Millions). Confidential Admin System.
      </footer>
    </div>
  );
}

function ChangePasswordModal({
  onClose,
  onPasswordChanged,
}: {
  onClose: () => void;
  onPasswordChanged: (updatedAdmin: any) => void;
}) {
  const [savedResult, setSavedResult] = useState<{ username: string; password: string } | null>(null);
  const [copiedCreds, setCopiedCreds] = useState(false);
  const [revealNewPass, setRevealNewPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!newPassword) {
      setError("Please enter your new password.");
      return;
    }

    if (newPassword.length < 4) {
      setError("New password must be at least 4 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          newUsername: newUsername.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update password.");
      }

      const activeUser = data.admin?.username || newUsername.trim() || "admin";
      setSuccessMsg("🎉 Password updated successfully! Your new password has been saved.");
      setSavedResult({
        username: activeUser,
        password: newPassword,
      });

      if (data.admin) {
        localStorage.setItem("sfm_admin_user", JSON.stringify(data.admin));
        onPasswordChanged(data.admin);
      }
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!savedResult) return;
    const text = `SFM Travels Admin Portal Credentials\nPortal URL: https://sfmtravels.co.in/admin\nUsername: ${savedResult.username}\nPassword: ${savedResult.password}`;
    navigator.clipboard.writeText(text);
    setCopiedCreds(true);
    setTimeout(() => setCopiedCreds(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                {savedResult ? "Credentials Saved" : "Change Admin Password"}
              </h3>
              <p className="text-xs text-slate-400">
                {savedResult ? "Your new credentials are now active" : "Set a custom password for your admin account"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If successfully changed, show the Credentials Summary Card */}
        {savedResult ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-semibold">
                Password updated successfully! Here are your active credentials:
              </span>
            </div>

            {/* Credentials Box */}
            <div className="bg-slate-950/80 border border-white/10 rounded-2xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-sans text-xs">Portal Login:</span>
                <span className="text-amber-300 font-bold">sfmtravels.co.in/admin</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-slate-400 font-sans text-xs">Username:</span>
                <span className="text-white font-bold">{savedResult.username}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400 font-sans text-xs">Password:</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">
                    {revealNewPass ? savedResult.password : "••••••••••••"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealNewPass(!revealNewPass)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={revealNewPass ? "Hide password" : "Show password"}
                  >
                    {revealNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Copy Button */}
            <button
              type="button"
              onClick={handleCopyCredentials}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-white/10 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {copiedCreds ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Credentials Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Username & Password</span>
                </>
              )}
            </button>

            {/* Where to view info note */}
            <div className="bg-slate-950/50 rounded-xl p-3 border border-white/5 space-y-1 text-[11px] text-slate-400 leading-relaxed font-sans">
              <span className="text-amber-400 font-bold block mb-1">📁 Where to find your credentials anytime:</span>
              <p>• <b className="text-slate-300">Local File:</b> In <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded">backend_sfm/.env</code> (ADMIN_USERNAME & ADMIN_PASSWORD)</p>
              <p>• <b className="text-slate-300">Live Website:</b> On <b className="text-slate-300">dashboard.render.com</b> &rarr; sfm-backend-5skx &rarr; Environment</p>
              <p>• <b className="text-slate-300">Admin Header:</b> Your username is always displayed on the top header badge</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-xl text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Alerts */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Current Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new custom password"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Confirm New Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Custom Username (Optional)
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Leave blank to keep current username"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
              >
                {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPass ? "Hide Passwords" : "Show Passwords"}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save New Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function AccountDetailsModal({
  adminUser,
  onClose,
  onChangePassword,
}: {
  adminUser: any;
  onClose: () => void;
  onChangePassword: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">Admin Account Profile</h3>
              <p className="text-xs text-slate-400">Current credentials and security configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-950/90 border border-white/10 rounded-2xl p-5 space-y-3.5">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-xs text-slate-400 font-medium">Active Username:</span>
            <span className="text-sm font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              {adminUser?.username || "admin"}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-xs text-slate-400 font-medium">Admin Role:</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              {adminUser?.role || "Super Administrator"}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-xs text-slate-400 font-medium">Admin Email:</span>
            <span className="text-xs font-mono text-slate-300">
              {adminUser?.email || "admin@sfmtravels.com"}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-slate-400 font-medium">Active Backend:</span>
            <span className="text-xs text-slate-300 font-mono">
              {getApiBaseUrl().includes("render.com") ? "Render Cloud (Live)" : "Localhost (Port 5000)"}
            </span>
          </div>
        </div>

        {/* Storage Location Guide */}
        <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 space-y-2 text-xs text-slate-400 leading-relaxed font-sans">
          <span className="text-amber-400 font-bold block flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" /> Where Password & Username are Stored:
          </span>
          <p>
            • <b className="text-slate-200">Local .env file:</b> Open <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">backend_sfm/.env</code> on your PC. Look for <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">ADMIN_USERNAME</code> and <code className="text-amber-300 bg-slate-900 px-1 py-0.5 rounded text-[11px]">ADMIN_PASSWORD</code>.
          </p>
          <p>
            • <b className="text-slate-200">Live Render Dashboard:</b> Go to <span className="text-slate-200 font-semibold">dashboard.render.com</span> &rarr; select <span className="text-slate-200 font-semibold">sfm-backend-5skx</span> &rarr; <span className="text-slate-200 font-semibold">Environment</span> &rarr; click the 👁️ eye icon to unmask your password.
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-1 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onChangePassword();
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Change Password</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminEnquiriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("sfm_admin_token");
  });
  const [adminUser, setAdminUser] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem("sfm_admin_user") || "{}");
    } catch {
      return { username: "admin", name: "SFM Travels Administrator" };
    }
  });

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [sheetStatus, setSheetStatus] = useState<SheetStatus | null>(null);
  const [webhookInput, setWebhookInput] = useState("");
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [copiedScript, setCopiedScript] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("sfm_admin_token");
      if (token) {
        fetch(`${getApiBaseUrl()}/api/admin/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null);
      }
    } finally {
      localStorage.removeItem("sfm_admin_token");
      localStorage.removeItem("sfm_admin_user");
      setIsAuthenticated(false);
      setAdminUser({});
    }
  };

  // Fetch enquiries and Google Sheets config status
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch enquiries from local backend or production
      const apiUrl = `${getApiBaseUrl()}/api/enquiries`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Could not connect to backend server");
      const json = await res.json();
      setEnquiries(json.data || []);

      // 2. Fetch sheet status
      const statusRes = await fetch(`${getApiBaseUrl()}/api/sheets/status`).catch(() => null);
      if (statusRes && statusRes.ok) {
        const sJson = await statusRes.json();
        setSheetStatus(sJson);
        if (sJson.webhookUrl && !webhookInput) {
          setWebhookInput(sJson.webhookUrl);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save Webhook URL to backend
  const handleSaveWebhook = async () => {
    if (!webhookInput.trim().startsWith("http")) {
      alert("Please enter a valid Webhook URL starting with https://script.google.com/macros/s/...");
      return;
    }
    setSavingWebhook(true);
    setSyncFeedback(null);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/sheets/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookUrl: webhookInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save Webhook URL");
      }
      setSyncFeedback({ type: "success", message: "Google Sheet Webhook URL saved successfully!" });
      fetchData();
    } catch (err: any) {
      setSyncFeedback({ type: "error", message: err.message });
    } finally {
      setSavingWebhook(false);
    }
  };

  // Sync all enquiries to Google Sheet
  const handleSyncAll = async () => {
    setSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/sheets/sync`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to sync to Google Sheet");
      }
      setSyncFeedback({
        type: "success",
        message: `🎉 Success! Synchronized ${data.syncedCount || enquiries.length} enquiries to your Google Sheet!`,
      });
    } catch (err: any) {
      setSyncFeedback({ type: "error", message: err.message });
    } finally {
      setSyncing(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleExportCsv = () => {
    if (enquiries.length === 0) {
      alert("No enquiries to export.");
      return;
    }

    const headers = [
      "Date & Time (IST)",
      "Full Name",
      "Phone / WhatsApp",
      "Destination",
      "Customer Message",
      "Source",
      "Status",
      "MongoDB ID",
    ];

    const rows = enquiries.map((item) => {
      const d = item.createdAt ? new Date(item.createdAt) : new Date();
      const istTime = d.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const escape = (str?: string) => `"${(str || "").replace(/"/g, '""')}"`;

      return [
        escape(istTime),
        escape(item.fullName || item.name || "Guest"),
        escape(item.phone || ""),
        escape(item.destination || "Incredible India"),
        escape(item.message || ""),
        escape(item.source || "website"),
        escape(item.status || "new"),
        escape(String(item._id || "")),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SFM_Travels_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered enquiries
  const filteredEnquiries = useMemo(() => {
    if (!searchQuery.trim()) return enquiries;
    const q = searchQuery.toLowerCase();
    return enquiries.filter((item) => {
      const name = (item.fullName || item.name || "").toLowerCase();
      const phone = (item.phone || "").toLowerCase();
      const dest = (item.destination || "").toLowerCase();
      const msg = (item.message || "").toLowerCase();
      return name.includes(q) || phone.includes(q) || dest.includes(q) || msg.includes(q);
    });
  }, [enquiries, searchQuery]);

  if (!isAuthenticated) {
    return (
      <AdminLoginView
        onSuccess={(user) => {
          setIsAuthenticated(true);
          setAdminUser(user);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-outfit antialiased">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider">Back to Site</span>
            </a>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2.5">
              <img src={sfmLogo} alt="SFM Travels" className="h-6 w-auto object-contain" />
              <span className="font-display font-bold text-base tracking-tight text-white">
                SFM <span className="text-amber-400">Admin Portal • Enquiries & Sheets</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>MongoDB Connected ({enquiries.length})</span>
            </span>
            <button
              onClick={handleExportCsv}
              className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download all enquiries as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchData}
              disabled={loading}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            {/* Admin User Badge, Change Password & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <button
                type="button"
                onClick={() => setShowAccountModal(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 text-xs font-bold transition-all cursor-pointer"
                title="View Admin account profile and credentials info"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{adminUser?.username || "admin"}</span>
              </button>
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Change admin password"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Change Password</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Real-Time Database & Spreadsheet Integration
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              MongoDB Form Entries & Google Sheets Showcase
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Showcase all {enquiries.length} live travel enquiries stored in MongoDB Atlas and connect your Google Sheet to receive automatic real-time rows.
            </p>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 relative z-10">
            <div className="text-3xl sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              {enquiries.length}
            </div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Form Submissions</span>
          </div>
        </div>

        {/* Google Sheets Connector Card */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                  Google Sheet Live Connector
                </h2>
                <p className="text-xs text-slate-400">
                  Sync all 31+ MongoDB entries into your Google Sheet and auto-append future entries in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {sheetStatus?.configured ? (
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheet Connected</span>
                </span>
              ) : (
                <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Action Needed: Connect Webhook URL</span>
                </span>
              )}
            </div>
          </div>

          {/* Webhook Input & Actions */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
              Google Apps Script Webhook URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                className="flex-1 bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all"
              />
              <button
                onClick={handleSaveWebhook}
                disabled={savingWebhook}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {savingWebhook ? "Connecting..." : "Save & Connect"}
              </button>
              <button
                onClick={handleSyncAll}
                disabled={syncing}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                <span>{syncing ? "Syncing..." : `Sync All (${enquiries.length}) to Sheet`}</span>
              </button>
            </div>

            {/* Sync Feedback Alert */}
            {syncFeedback && (
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fade-in ${
                  syncFeedback.type === "success"
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                }`}
              >
                {syncFeedback.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                )}
                <span>{syncFeedback.message}</span>
              </div>
            )}
          </div>

          {/* Expandable Setup Instructions */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How to get your Google Sheet Webhook URL (4 Easy Steps)</span>
              {showInstructions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showInstructions && (
              <div className="mt-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 animate-fade-in text-xs sm:text-sm text-slate-300">
                <ol className="list-decimal list-inside space-y-2.5 leading-relaxed">
                  <li>
                    <strong>Open Google Sheets:</strong> Go to{" "}
                    <a
                      href="https://sheets.new"
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 underline font-bold"
                    >
                      sheets.new
                    </a>{" "}
                    to create a fresh blank Google Sheet (e.g. named <em>SFM Travels Enquiries</em>).
                  </li>
                  <li>
                    <strong>Open Apps Script:</strong> In your Google Sheet menu, click <strong>Extensions</strong> →{" "}
                    <strong>Apps Script</strong>.
                  </li>
                  <li>
                    <strong>Paste the Script Code:</strong> Delete any code in the editor, and paste the code below:
                    <div className="mt-2 relative">
                      <button
                        onClick={handleCopyScript}
                        className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all shadow-md z-10"
                      >
                        {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedScript ? "Copied!" : "Copy Code"}</span>
                      </button>
                      <pre className="bg-slate-950 p-4 rounded-xl text-xs overflow-x-auto text-emerald-300 border border-white/10 font-mono max-h-48">
                        {APPS_SCRIPT_CODE}
                      </pre>
                    </div>
                  </li>
                  <li>
                    <strong>Deploy as Web App:</strong> Click the blue <strong>Deploy</strong> button (top right) →{" "}
                    <strong>New deployment</strong>.
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-slate-400">
                      <li>Click the gear icon next to "Select type" and choose <strong>Web app</strong>.</li>
                      <li>Set "Execute as": <strong>Me</strong>.</li>
                      <li>Set "Who has access": <strong>Anyone</strong> (crucial so your form can send rows).</li>
                      <li>Click <strong>Deploy</strong>, grant permissions, and copy the <strong>Web app URL</strong>.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Paste & Connect:</strong> Paste that Web app URL into the box above and click{" "}
                    <strong>Save & Connect</strong>, then click <strong>Sync All to Sheet</strong>!
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* MongoDB Form Entries Table */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Live MongoDB Enquiries Showcase
              </h2>
              <p className="text-xs text-slate-400">
                Displaying {filteredEnquiries.length} of {enquiries.length} customer tour requests.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, phone, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-sm text-slate-400 font-bold">Loading enquiries from MongoDB Atlas...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm">
              <p className="font-bold">Error loading enquiries: {error}</p>
              <button
                onClick={fetchData}
                className="mt-3 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-2">
              <p className="text-base font-bold">No enquiries found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Date / Time</th>
                    <th className="py-3.5 px-4">Full Name</th>
                    <th className="py-3.5 px-4">Phone / WhatsApp</th>
                    <th className="py-3.5 px-4">Destination</th>
                    <th className="py-3.5 px-4">Customer Message</th>
                    <th className="py-3.5 px-4">Source</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEnquiries.map((item) => {
                    const dateObj = new Date(item.createdAt);
                    const formattedDate = dateObj.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    });
                    const formattedTime = dateObj.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                    const cleanPhone = (item.phone || "").replace(/\D/g, "");
                    const waLink = cleanPhone ? `https://wa.me/91${cleanPhone.slice(-10)}` : null;

                    return (
                      <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-400">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                            <span>{formattedDate}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 block pl-5">{formattedTime}</span>
                        </td>

                        {/* Name */}
                        <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          {item.fullName || item.name || "Guest Traveler"}
                        </td>

                        {/* Phone */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-semibold text-amber-300 font-mono">{item.phone}</span>
                        </td>

                        {/* Destination */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <MapPin className="w-3 h-3" />
                            <span>{item.destination}</span>
                          </span>
                        </td>

                        {/* Message */}
                        <td className="py-3.5 px-4 max-w-xs text-slate-300 text-xs">
                          {item.message ? (
                            <p className="line-clamp-2 leading-relaxed" title={item.message}>
                              {item.message}
                            </p>
                          ) : (
                            <span className="text-slate-600 italic">No notes provided</span>
                          )}
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                            {item.source || "contact_form"}
                          </span>
                        </td>

                        {/* WhatsApp Action */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {waLink ? (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 font-bold text-xs transition-all cursor-pointer shadow-xs"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
          onPasswordChanged={(updatedAdmin) => {
            setAdminUser(updatedAdmin);
          }}
        />
      )}

      {/* Account Details Modal */}
      {showAccountModal && (
        <AccountDetailsModal
          adminUser={adminUser}
          onClose={() => setShowAccountModal(false)}
          onChangePassword={() => setShowChangePasswordModal(true)}
        />
      )}
    </div>
  );
}
