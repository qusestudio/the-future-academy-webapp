import { LucideIcon } from "lucide-react";
import { AuthUser } from "aws-amplify/auth";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
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

  interface AppSidebarProps {
    userType: "instructor" | "student";
  }

  interface SettingsFormProps {
    initialData: SettingsFormData;
    onSubmit: (data: SettingsFormData) => Promise<void>;
    userType: "instructor" | "student";
  }

  interface User {
    cognitoInfo: AuthUser;
    // userInfo: Student | Instructor;
    userRole: JsonObject | JsonPrimitive | JsonArray;
  }
}

export {};
