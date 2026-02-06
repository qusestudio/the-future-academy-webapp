import * as z from "zod";

export const studentAccountSchema = z.object({
    firstName: z.string().min(2, "First name should be at least 2 characters."),
    lastName: z.string().min(2, "Last name should be at least 2 characters."),
    dateOfBirth: z.date(),
    grade: z.coerce.number().positive()
        .min(10, "You must be in Grade 10 - 12")
        .max(12, "You must be in Grade 10 - 12")
        .int(),
})

export type StudentAccountFormData = z.infer<typeof studentAccountSchema>;


export const instructorAccountSchema = z.object({
    firstName: z.string().min(2, "First name should be at least 2 characters"),
    lastName: z.string().min(2, "Last name should be at least 2 characters"),
    subjects: z.array(z.string().min(5, "Subject name should be at leat 5 characters"))
        .min(1, "Should teach at least one subject")
        .max(3, "You cannot teach more than three subjects")
})

export type InstructorAccountFormData = z.infer<typeof instructorAccountSchema>;

export const subjectSchema = z.object({
    title: z.string().min(1, "Name is required"),
    grade: z.coerce.number(),
    term: z.coerce.number(),
});

export type SubjectFormData = z.output<typeof subjectSchema>;

export const settingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;