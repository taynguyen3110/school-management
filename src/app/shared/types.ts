export interface AuthState {
    access: {
        token: string,
        expires: string
    },
    refresh: {
        token: string,
        expires: string
    }
}

export interface UserProfile {
    email: string,
    firstName: string,
    id?: string,
    isBlocked: boolean,
    lastName: string,
    profileUrl: string,
    role: string
}