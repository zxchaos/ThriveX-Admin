import { create } from 'zustand'

interface UserStore {
  token: string;
  user: User;
  setData: (data: User) => void;
  quitLogin: () => void
}

export default create<UserStore>((set) => ({
  token: "",
  user: {} as User,
  setData: (data: User) => set(() => ({ user: data })),
  // 退出登录
  quitLogin: () => set(() => {
    localStorage.clear()
    sessionStorage.clear()
    location.href = "/login"

    return {
      user: {} as User,
      token: ""
    }
  })
}))