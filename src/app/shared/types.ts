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

export interface Student {
    id: string,
    lastName: string,
    firstName: string,
    address: string,
    email: string,
    profileUrl: string,
    gender: "male" | "female",
    dateOfBirth: string,
    classIds: string[],
    parentIds: string[],
    admissionDate: string,
    phone: string,
    parents: Parent[],
    classes: Class[]
}

export interface Parent {
    id: string,
    lastName: string,
    firstName: string,
    address: string,
    email: string,
    phone: string,
    profileUrl: string
}

export interface Class {
    id: string,
    name: string,
    studentIds?: string[]
}