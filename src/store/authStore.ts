import { create } from "zustand";
import { signIn, signUp, signOut, getUser } from "../lib/supabase/auth";
import { supabase } from "../lib/supabase/client"; // ✅ add this
import type { AuthState } from "../Types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    const { data } = await getUser();

    if (data.user) {
      //  fetch profile to get full_name
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
  },

  signIn: async (email, password) => {
    const { data, error } = await signIn(email, password);
    if (error) throw error;

    if (data.user) {
      // fetch profile after signin
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
    const { data, error } = await signUp(email, password);
    if (error) throw error;

    if (data.user) {
      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          fullName: "", // empty for now, set by updateFullName after upsert
        },
      });
    }
  },

  signOut: async () => {
    await signOut();
    set({ user: null });
  },

  // ✅ called right after profile upsert in signUp.tsx
  updateFullName: (name: string) => {
    set((state) => ({
      user: state.user ? { ...state.user, fullName: name } : null,
    }));
  },
}));