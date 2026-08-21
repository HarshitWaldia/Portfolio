import { create } from "zustand";

interface ContactDrawerStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useContactDrawer = create<ContactDrawerStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
