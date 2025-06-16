import { create } from "zustand";

export type InitialModalState = {
  isOpen: boolean;
  isHover: boolean;
};

export type InitialModalAction = {
  setIsOpen(): void;
  setIsHover(val: boolean): void;
};

export const useMenu = create<InitialModalState & InitialModalAction>()(
  (set) => ({
    isOpen: false,
    isHover: false,
    setIsOpen: () => set((prev) => ({ isOpen: !prev.isOpen })),
    setIsHover: (val: boolean) => set(() => ({ isHover: val })),
  })
);
