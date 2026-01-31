interface BaseUser {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
}

interface StudentAccount {
    firstName: string,
    lastName: string,
    dateOfBirth: Date;
    grade: number
}

interface InstructorAccount {
    firstName: string,
    lastName: string,
    subjects: string[]
}