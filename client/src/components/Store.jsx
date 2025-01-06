import { create } from "zustand";
const useStore = create((set) => ({
  employees: [],
  setEmployees: (data) => set(() => ({ employees: data })),
  isLoggedIn: false,
//   setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
}));
export default useStore