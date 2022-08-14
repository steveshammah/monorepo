import create, { StoreApi, UseBoundStore } from 'zustand';

interface LoginState {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}
export const useStore: UseBoundStore<StoreApi<LoginState>> = create((set) => ({
  isAuth: false,
  login: () => set(() => ({ isAuth: true })),
  logout: () => set({ isAuth: false }),
}));
