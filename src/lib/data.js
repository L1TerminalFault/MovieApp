import { create } from "zustand";

export const useDataStore = create((set) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
}));
