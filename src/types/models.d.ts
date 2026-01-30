interface BaseUser {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
}

interface Student {
    firstName: string,
    lastName: string,
    grade: number
}

interface Instructor {
    firstName: string,
    lastName: string,
}