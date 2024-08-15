import Request from '@/utils/request'
import { account, EditUser, Login, User, UserInfo } from '@/types/app/user'

// 登录
export const loginDataAPI = (data: Login) => Request<account>("POST", "/user/login", data)

// 获取用户信息
export const getUserDataAPI = (id?: number) => Request<User>("GET", `/user/${id}`)

// 修改用户信息
export const editUserDataAPI = (data: UserInfo) => Request<UserInfo>("PATCH", "/user", data)

// 修改管理员密码
export const editAdminPassAPI = (data: EditUser) => Request<UserInfo>("PATCH", "/user/admin", data)