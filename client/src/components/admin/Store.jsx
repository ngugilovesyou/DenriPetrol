import { create } from "zustand";
const useStore = create((set) => ({
  employees: [],
  setEmployees: (data) => set(() => ({ employees: data })),
}));
export default useStore