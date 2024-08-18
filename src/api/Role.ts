import Request from '@/utils/request'
import { Role } from '@/types/app/role'

// 新增角色
export const addRoleDataAPI = (data: Role) => Request<Role>("POST", "/role", data)

// 删除角色
export const delRoleDataAPI = (id: number) => Request<Role>("DELETE", `/role/${id}`)

// 修改角色
export const editRoleDataAPI = (data: Role) => Request<Role>("PATCH", "/role", data)

// 获取角色
export const getRoleDataAPI = (id?: number) => Request<Role>("GET", `/role/${id}`)

// 获取角色列表
export const getRoleListAPI = () => Request<Role[]>("GET", "/role");