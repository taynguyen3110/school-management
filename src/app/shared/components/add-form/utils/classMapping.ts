import { Student } from "../../../types";

export function toStudent(data: any): Student {
    return {
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        address: data.address ?? '',
        phone: data.phone ?? '',
        email: data.email ?? '',
        profileUrl: data.profileUrl ?? '',
        gender: data.gender ?? "male",
        dateOfBirth: data.dateOfBirth ?? '',
        classIds: data.classIds ?? [],
        parentIds: data.parentIds ?? [],
        admissionDate: data.dateOfBirth ?? '',
    };
}