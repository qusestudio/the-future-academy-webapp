import {LucideIcon} from "lucide-react";
import {AuthUser} from "aws-amplify/auth";
import {MotionProps as OriginalMotionProps} from "framer-motion";
import {LessonFormData, SubjectFormData, TopicFormData} from "@/lib/schemas";

declare module "framer-motion" {
    interface MotionProps extends OriginalMotionProps {
        className?: string;
    }
}

declare global {
    interface MyLearningListItemProps {
        id: string,
        name: string,
        term: number,
        topicCount: number
    }

    interface TopicListSidebarItemProps {
        id: string,
        name: string,
    }

    interface SidebarLinkProps {
        href: string;
        icon: LucideIcon;
        label: string;
    }

    interface ImagePreviewsProps {
        images: string[];
    }

    interface HeaderProps {
        title: string;
        subtitle: string;
    }

    interface NavbarProps {
        isDashboard: boolean;
    }

    interface VideoPlayerProps {
        src: string;
        poster?: string;
    }

    interface AppSidebarProps {
        userType: "instructor" | "student";
    }

    interface SubjectFormProps {
        initialData?: SubjectFormData;
        onSubmit: (data: SubjectFormData) => Promise<void>;
    }

    interface TopicFormProps {
        initialData?: TopicFormData;
        onSubmit: (data: TopicFormData) => Promise<void>;
    }

    interface LessonFormProps {
        initialData?: LessonFormData;
        onSubmit: (data: LessonFormData) => Promise<void>;
    }

    interface CreateSubjectFormProps {
      title: string;
      grade: number;
      term: number;
    }

    interface User {
        userInfo: any;
        cognitoInfo: AuthUser;
        userRole: JsonObject | JsonPrimitive | JsonArray;
    }
}

export {};
