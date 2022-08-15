import create, { StoreApi, UseBoundStore } from 'zustand';

interface LoginState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}
export const useStore = create<LoginState>((set) => ({
  isAuth: false,
  login: () => set(() => ({ isAuth: true })),
  logout: () => set({ isAuth: false }),
}));
