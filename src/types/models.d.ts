interface StudentUser {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
}

interface InstructorUser {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
}

interface StudentAccount {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date;
    grade: number
}

interface InstructorAccount {
    id: string,
    firstName: string,
    lastName: string,
    subjects: string[]
}

interface Enrollment {
    id: string,
    subjectId: string,
    studentAccountId: string,
}