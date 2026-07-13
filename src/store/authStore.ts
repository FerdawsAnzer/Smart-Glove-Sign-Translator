import { create } from "zustand";
import { signIn, signUp, signOut, getUser } from "../lib/supabase/auth";
import { supabase } from "../lib/supabase/client";
import type { AuthState } from "../Types";

// DEMO MODE 
// Set VITE_DEMO_MODE=true in your .env to explore the app without a live
// Supabase connection. Useful for anyone cloning the repo who doesn't have
// (or doesn't want to set up) Supabase credentials.


const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const DEMO_USER = {
  id: "demo-user",
  email: "demo@signbridge.app",
  fullName: "Demo User",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_MODE ? DEMO_USER : null,
  loading: !DEMO_MODE,

  fetchUser: async () => {
    if (DEMO_MODE) {
      set({ user: DEMO_USER, loading: false });
      return;
    }

    set({ loading: true });

    const { data } = await getUser();

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .maybeSingle();

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          fullName: profile?.full_name || "",
        },
        loading: false,
      });
    } else {
      set({ user: null, loading: false });
    }

    // keep user in sync across navigation and tab changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        set({ user: null, loading: false });
        return;
      }

      if (session.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .maybeSingle();

        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            fullName: profile?.full_name || "",
          },
          loading: false,
        });
      }
    });
  },

  signIn: async (email, password) => {
    if (DEMO_MODE) {
      set({ user: DEMO_USER, loading: false });
      return;
    }

    const { data, error } = await signIn(email, password);
    if (error) throw error;

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .maybeSingle();

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          fullName: profile?.full_name || "",
        },
      });
    }
  },

  signUp: async (email, password) => {
    if (DEMO_MODE) {
      set({ user: DEMO_USER, loading: false });
      return;
    }

    const { data, error } = await signUp(email, password);
    if (error) throw error;

    if (data.user) {
      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          fullName: "",
        },
      });
    }
  },

  signOut: async () => {
    if (DEMO_MODE) {
      // In demo mode, "sign out" just resets back to the demo user
      // so the app stays explorable without a real login flow.
      set({ user: DEMO_USER });
      return;
    }

    await signOut();
    set({ user: null });
  },

  updateFullName: (name: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, fullName: name } : null,
    }));
  },
}));