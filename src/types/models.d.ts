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

interface Subject {
    id?: string,
    instructorId: string,
    title: string,
    grade: number,
    term: number,
}

interface Topic {
    id?: string,
    subjectId: string,
    title: string,
}

interface Lesson {
    id: string,
    topic_id: string,
    videoId: string,
    title: string,
    description: string
}

export const {
    StudentUser,
    StudentAccount,
    InstructorUser,
    InstructorAccount,
    Enrollment,
    Topic
}