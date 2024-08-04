import { useUserStore } from "@/stores";

export const getToken = () => {
  return useUserStore.getState().token;
};

export const quitLogin = () => {
  return useUserStore.getState().quitLogin;
};