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
    studentId: string
    firstName: string,
    lastName: string,
    schoolName: string,
    dateOfBirth: string;
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

interface YocoCheckoutRequest {
    amount: number;
    currency: string;
    cancelUrl?: string;
    successUrl?: string;
    failureUrl?: string;
    metadata?: Record<string, string>;
    totalDiscount?: number;
    totalTaxAmount?: number;
    subtotalAmount?: number;
    lineItems?: LineItem[];
    externalId?: string;
}

interface LineItem {
    displayName: string;
    quantity: number;
    pricingDetails: PricingDetails;
    description?: string;
}

interface YocoCheckoutResponse {
    id: string;
    redirectUrl: string;
    status: string;
    amount: number;
    currency: string;
    paymentId?: string;
    successUrl?: string;
    cancelUrl?: string;
    failureUrl?: string;
    metadata?: Record<string, string>;
    merchantId: string;
    totalDiscount?: number;
    totalTaxAmount?: number;
    subtotalAmount?: number;
    lineItems?: LineItem[];
    externalId?: string;
    processingMode: string;
    clientReferenceId?: string;
}


interface PricingDetails {
    price: number;
    taxAmount?: number;
    discountAmount?: number;
}

export const {
    StudentUser,
    StudentAccount,
    InstructorUser,
    InstructorAccount,
    Enrollment,
    Topic,
    YocoCheckoutRequest,
    PricingDetails,
    YocoCheckoutResponse
}