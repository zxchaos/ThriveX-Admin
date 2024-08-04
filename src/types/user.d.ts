export interface Login {
    username: string,
    password: string
}

export interface UserInfo {
    id?: number,
    name: string,
    email: string,
    avatar: string,
    info: string,
    role?: string
}

export type User = Login & UserInfo

export interface account {
    token: string,
    user: User
}

export interface editUser {
    username: string,
    oldPassword: string,
    newPassword: string
}