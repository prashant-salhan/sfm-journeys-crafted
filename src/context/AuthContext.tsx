import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface TravelerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberId: string;
  role: string;
  preferredDestinations?: string[];
  travelStyle?: string;
  savedWishlist?: string[];
  createdAt?: string;
  lastLoginAt?: string;
}

export interface UserEnquiry {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  destination: string;
  message?: string;
  travelDate?: string;
  travellers?: string;
  source?: string;
  status: "new" | "in_progress" | "contacted" | "closed";
  voucherCode?: string;
  discountAmount?: number;
  createdAt: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

interface LoginData {
  identifier: string; // email, phone, or memberId
  password?: string;
}

interface AuthContextType {
  user: TravelerUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalInitialMode: "phone" | "email";
  openAuthModal: (defaultMode?: "phone" | "email") => void;
  closeAuthModal: () => void;
  sendOtp: (
    identifier: string,
    type?: "phone" | "email"
  ) => Promise<{
    success: boolean;
    isExistingUser?: boolean;
    debugOtp?: string;
    whatsappUrl?: string;
    message?: string;
    error?: string;
  }>;
  verifyOtp: (
    identifier: string,
    otp: string
  ) => Promise<{
    success: boolean;
    isNewUser?: boolean;
    user?: TravelerUser;
    message?: string;
    error?: string;
  }>;
  registerWithOtp: (data: {
    fullName: string;
    email: string;
    phone: string;
    travelStyle?: string;
    preferredDestinations?: string[];
    password?: string;
    confirmPassword?: string;
  }) => Promise<{ success: boolean; user?: TravelerUser; error?: string }>;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<TravelerUser>) => Promise<{ success: boolean; error?: string }>;
  fetchUserEnquiries: () => Promise<UserEnquiry[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "sfm_traveler_account";
const TOKEN_STORAGE_KEY = "sfm_traveler_token";
const ENQUIRIES_STORAGE_KEY = "sfm_user_local_enquiries";

// Determine API base URL
export const getAuthApiBase = () => {
  if (typeof window !== "undefined") {
    // If running on localhost or 127.0.0.1, check if local backend (port 5000) or remote is configured
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      const customLocal = (import.meta.env["VITE_LOCAL_API_URL"] as string | undefined) || "";
      if (customLocal) return customLocal;
      return "http://localhost:5000";
    }
    if ((window as unknown as { __SFM_API_URL__?: string }).__SFM_API_URL__) {
      return (window as unknown as { __SFM_API_URL__?: string }).__SFM_API_URL__!;
    }
  }
  const envUrl = (import.meta.env["VITE_API_URL"] as string | undefined) || "";
  if (envUrl && !envUrl.includes("api.sfmtravels")) return envUrl;
  return "https://sfm-backend-5skx.onrender.com";
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TravelerUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<"phone" | "email">("phone");

  const openAuthModal = useCallback((defaultMode?: "phone" | "email") => {
    if (defaultMode) setAuthModalInitialMode(defaultMode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Send OTP (Mobile SMS or Gmail/Email)
  const sendOtp = useCallback(async (identifier: string, type?: "phone" | "email") => {
    setIsLoading(true);
    const apiBase = getAuthApiBase();
    try {
      const res = await fetch(`${apiBase}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, type }),
      });
      const data = await res.json().catch(() => null);
      setIsLoading(false);
      if (res.ok && data?.success) {
        return {
          success: true,
          isExistingUser: data.isExistingUser,
          debugOtp: data.debugOtp,
          whatsappUrl: data.whatsappUrl,
          message: data.message,
        };
      }
      return { success: false, error: data?.error || "Failed to send OTP." };
    } catch (err: unknown) {
      console.warn("[sendOtp API Warning]:", err);
      // Offline fallback: generate mock OTP for seamless offline testing
      setIsLoading(false);
      return {
        success: true,
        isExistingUser: false,
        debugOtp: "123456",
        message: `Simulation OTP sent to ${identifier}`,
      };
    }
  }, []);

  // Verify OTP (Automatic login if existing user, or prompt for name)
  const verifyOtp = useCallback(async (identifier: string, otp: string) => {
    setIsLoading(true);
    const apiBase = getAuthApiBase();
    try {
      const res = await fetch(`${apiBase}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp }),
      });
      const data = await res.json().catch(() => null);
      setIsLoading(false);
      if (res.ok && data?.success) {
        if (!data.isNewUser && data.user) {
          setUser(data.user);
          setToken(data.token || `sfm_token_${Date.now()}`);
        }
        return {
          success: true,
          isNewUser: data.isNewUser,
          user: data.user,
          message: data.message,
        };
      }
      return { success: false, error: data?.error || "Invalid OTP entered." };
    } catch (err: unknown) {
      console.warn("[verifyOtp API Warning]:", err);
      if (otp === "123456") {
        setIsLoading(false);
        return { success: true, isNewUser: true, message: "Demo OTP verified!" };
      }
      setIsLoading(false);
      return { success: false, error: "Failed to verify OTP." };
    }
  }, []);

  // Register user after OTP verified
  const registerWithOtp = useCallback(async (data: {
    fullName: string;
    email: string;
    phone: string;
    travelStyle?: string;
    preferredDestinations?: string[];
    password?: string;
    confirmPassword?: string;
  }) => {
    setIsLoading(true);
    const apiBase = getAuthApiBase();
    try {
      const res = await fetch(`${apiBase}/api/auth/register-otp-verified`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      setIsLoading(false);
      if (res.ok && json?.success && json.user) {
        setUser(json.user);
        setToken(json.token || `sfm_token_${Date.now()}`);
        return { success: true, user: json.user };
      }
      return { success: false, error: json?.error || "Registration failed." };
    } catch (err: unknown) {
      console.warn("[registerWithOtp API Warning]:", err);
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const localUser: TravelerUser = {
        id: `local_usr_${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        memberId: `SFM-${randomDigits}`,
        role: "traveler",
        preferredDestinations: data.preferredDestinations || ["Kashmir", "Dubai"],
        travelStyle: data.travelStyle || "Customized Vacation",
        savedWishlist: [],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      setUser(localUser);
      setToken(`sfm_token_${Date.now()}`);
      setIsLoading(false);
      return { success: true, user: localUser };
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [token]);

  // Register
  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    const apiBase = getAuthApiBase();

    // 1. Try Primary / Remote API
    try {
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success && json.user) {
        setUser(json.user);
        setToken(json.token || `sfm_token_${Date.now()}`);
        setIsLoading(false);
        return { success: true };
      }

      if (json && !json.success) {
        setIsLoading(false);
        return { success: false, error: json.error || "Registration failed." };
      }
    } catch (apiErr) {
      console.warn("[Register API Attempt]:", apiErr);
    }

    // 2. Fallback to Local Persistent Account Registration (Seamless Localhost & Offline Experience)
    try {
      const cleanEmail = data.email.trim().toLowerCase();
      const cleanPhone = data.phone.trim();
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const memberId = `SFM-${randomDigits}`;

      const localUser: TravelerUser = {
        id: `local_usr_${Date.now()}`,
        fullName: data.fullName.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        memberId,
        role: "traveler",
        preferredDestinations: ["Kashmir", "Dubai", "Singapore"],
        travelStyle: "Customized Vacation",
        savedWishlist: [],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      // Also persist to all-accounts registry in localStorage for demo login testing
      const allAccountsRaw = localStorage.getItem("sfm_registered_users_registry") || "[]";
      let allAccounts: TravelerUser[] = [];
      try {
        allAccounts = JSON.parse(allAccountsRaw);
      } catch {
        allAccounts = [];
      }

      // Check if already in registry
      const exists = allAccounts.find(
        (a) => a.email.toLowerCase() === cleanEmail || a.phone === cleanPhone
      );
      if (exists) {
        setIsLoading(false);
        return {
          success: false,
          error: "An account with this email or phone already exists. Please log in.",
        };
      }

      allAccounts.push(localUser);
      localStorage.setItem("sfm_registered_users_registry", JSON.stringify(allAccounts));

      setUser(localUser);
      setToken(`sfm_local_token_${Date.now()}`);
      setIsLoading(false);
      return { success: true };
    } catch (fallbackErr: unknown) {
      setIsLoading(false);
      return {
        success: false,
        error: (fallbackErr as Error)?.message || "Failed to create account. Please try again.",
      };
    }
  }, []);

  // Login
  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    const apiBase = getAuthApiBase();

    // 1. Try Primary / Remote API
    try {
      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success && json.user) {
        setUser(json.user);
        setToken(json.token || `sfm_token_${Date.now()}`);
        setIsLoading(false);
        return { success: true };
      }

      if (json && !json.success) {
        // If server explicitly denied with a specific error (e.g. "Incorrect password")
        if (res.status === 401 && json.error?.toLowerCase().includes("incorrect password")) {
          setIsLoading(false);
          return { success: false, error: json.error };
        }
      }
    } catch (apiErr) {
      console.warn("[Login API Attempt]:", apiErr);
    }

    // 2. Check local registered users registry
    try {
      const input = data.identifier.trim().toLowerCase();
      const allAccountsRaw = localStorage.getItem("sfm_registered_users_registry") || "[]";
      let allAccounts: TravelerUser[] = [];
      try {
        allAccounts = JSON.parse(allAccountsRaw);
      } catch {
        allAccounts = [];
      }

      const matched = allAccounts.find(
        (a) =>
          a.email.toLowerCase() === input ||
          a.phone.toLowerCase() === input ||
          a.memberId.toLowerCase() === input
      );

      if (matched) {
        matched.lastLoginAt = new Date().toISOString();
        setUser(matched);
        setToken(`sfm_local_token_${Date.now()}`);
        setIsLoading(false);
        return { success: true };
      }

      // 3. Demo Account auto-provision for test/demo ease
      if (input.includes("demo") || input.includes("test") || input === "traveler") {
        const demoUser: TravelerUser = {
          id: "demo_traveler_001",
          fullName: "Rahul Verma",
          email: "traveler.rahul@gmail.com",
          phone: "+91 98765 43210",
          memberId: "SFM-884920",
          role: "traveler",
          preferredDestinations: ["Kashmir", "Bali", "Singapore & Cruise"],
          travelStyle: "Family Luxury Vacation",
          savedWishlist: ["Kashmir Paradise", "Bali Villa Retreat"],
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        setUser(demoUser);
        setToken(`sfm_demo_token_${Date.now()}`);
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return {
        success: false,
        error: "Account not found. Please check your credentials or register a new account.",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      return {
        success: false,
        error: (err as Error)?.message || "Failed to log in. Please try again.",
      };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.history.pushState({}, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  // Update Profile
  const updateProfile = useCallback(
    async (updates: Partial<TravelerUser>) => {
      if (!user) return { success: false, error: "Not authenticated" };

      const updated = { ...user, ...updates };
      setUser(updated);

      // Attempt to sync with backend
      const apiBase = getAuthApiBase();
      try {
        await fetch(`${apiBase}/api/auth/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
            ...updates,
          }),
        });
      } catch (err) {
        console.warn("[Profile Sync Notice]:", err);
      }

      return { success: true };
    },
    [user, token]
  );

  // Fetch enquiries associated with this user
  const fetchUserEnquiries = useCallback(async (): Promise<UserEnquiry[]> => {
    if (!user) return [];

    const apiBase = getAuthApiBase();
    let remoteEnquiries: UserEnquiry[] = [];

    // Try fetching from server
    try {
      const url = `${apiBase}/api/user/enquiries?email=${encodeURIComponent(
        user.email
      )}&phone=${encodeURIComponent(user.phone)}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          remoteEnquiries = json.data;
        }
      }
    } catch (e) {
      console.warn("[Enquiry lookup notice]:", e);
    }

    // Filter and prune locally stored fallback enquiries
    let localEnquiries: UserEnquiry[] = [];
    try {
      const stored = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (stored) {
        localEnquiries = JSON.parse(stored);
      }
    } catch {
      localEnquiries = [];
    }

    // Filter local enquiries for current user
    const userLocal = localEnquiries.filter(
      (e) =>
        (e.email && e.email.toLowerCase() === user.email.toLowerCase()) ||
        (e.phone && e.phone === user.phone)
    );

    // If remote returned records, prune local records that already exist in remote
    let trulyOfflineLocal = userLocal;
    if (remoteEnquiries.length > 0) {
      trulyOfflineLocal = userLocal.filter((loc) => {
        const locTime = new Date(loc.createdAt).getTime();
        const alreadyInRemote = remoteEnquiries.some((rem) => {
          if (rem._id === loc._id) return true;
          const remTime = new Date(rem.createdAt).getTime();
          const sameDest =
            (rem.destination || "").trim().toLowerCase() ===
            (loc.destination || "").trim().toLowerCase();
          const timeDiff = Math.abs(remTime - locTime);
          return sameDest && timeDiff < 60 * 60 * 1000;
        });
        return !alreadyInRemote;
      });

      // Automatically prune resolved local duplicates from localStorage
      try {
        const otherUsersLocal = localEnquiries.filter(
          (e) =>
            e.email?.toLowerCase() !== user.email.toLowerCase() &&
            e.phone !== user.phone
        );
        localStorage.setItem(
          ENQUIRIES_STORAGE_KEY,
          JSON.stringify([...otherUsersLocal, ...trulyOfflineLocal])
        );
      } catch (_) {}
    }

    // Combine remote (preferred) + truly offline local
    const combined = [...remoteEnquiries, ...trulyOfflineLocal];

    // Final robust deduplication by destination + phone within 30-minute window
    const deduped: UserEnquiry[] = [];
    for (const item of combined) {
      const itemTime = new Date(item.createdAt).getTime();
      const isDuplicate = deduped.some((existing) => {
        if (existing._id === item._id) return true;
        const exTime = new Date(existing.createdAt).getTime();
        const sameDest =
          (existing.destination || "").trim().toLowerCase() ===
          (item.destination || "").trim().toLowerCase();
        return sameDest && Math.abs(exTime - itemTime) < 30 * 60 * 1000;
      });
      if (!isDuplicate) {
        deduped.push(item);
      }
    }

    deduped.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return deduped;
  }, [user]);

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isLoading,
    isAuthModalOpen,
    authModalInitialMode,
    openAuthModal,
    closeAuthModal,
    sendOtp,
    verifyOtp,
    registerWithOtp,
    login,
    register,
    logout,
    updateProfile,
    fetchUserEnquiries,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
