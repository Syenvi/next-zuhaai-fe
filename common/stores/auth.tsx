import { create } from "zustand";

type User = {
  name: string;
  email: string;
  avatar: string;
  business?: {
    name: "";
    phone: "";
  };
};

type AuthStore = {
  user: User;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    name: "",
    email: "",
    avatar: "",
    business: {
      name: "",
      phone: "",
    },
  },
  setUser: (user) => set(() => ({ user })),
}));
