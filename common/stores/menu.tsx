import { create } from "zustand";

export type InitialModalState = {
  isOpen: boolean;
};

export type InitialModalAction = {
  setIsOpen(): void;
};

export const useMenu = create<InitialModalState & InitialModalAction>()(
  (set) => ({
    isOpen: false,
    setIsOpen: () => set((prev) => ({ isOpen: !prev.isOpen })),
  })
);
