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
    password?: string,
    profileUrl: string,
    role: string
}

export interface Student {
    id?: string,
    lastName: string,
    firstName: string,
    address: string,
    email: string,
    profileUrl: string,
    gender: "male" | "female",
    dateOfBirth: string,
    classIds: Array<string>,
    parentIds: Array<string>,
    admissionDate: string,
    phone: string,
    parents?: Parent[],
    classes?: Classes[]
}

export interface Parent {
    id?: string,
    lastName: string,
    firstName: string,
    address: string,
    email: string,
    phone: string,
    profileUrl: string
}

export interface Teacher {
    id?: string,
    lastName: string,
    firstName: string,
    address: string,
    gender: "male" | "female",
    email: string,
    phone: string,
    profileUrl: string,
    admissionDate: string,
}

export interface Classes {
    id: string,
    name: string,
    studentIds?: string[],
    students?: Student[],
}

export interface SchoolSubject {
    id?: string,
    name: string,
    classId: string,
    daysOfWeek: string[],
    teacherId: string,
    teacher?: Teacher,
    class?: Classes
}

export interface PhotoUrl {
    url: string
}

export interface LabelObj {
    id: string,
    label: string
}
