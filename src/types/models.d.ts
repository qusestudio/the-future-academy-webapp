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

interface StudentProfile {
    id: string,
    firstName: string,
    lastName: string,
    preferredName: string,
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
    studentId: string,
    subjectId: string,
}

interface StudentEnrollment {
    studentId: string,
    studentName: string,
    subjectId: string,
    subjectTitle: string,
    grade: number,
    term: number
}

interface NotEnrolled {
    subjectId: string,
    subjectTitle: string,
    grade: number,
    term: number
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
    topicId: string,
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