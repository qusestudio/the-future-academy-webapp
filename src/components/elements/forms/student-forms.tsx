import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Save} from "lucide-react";

interface EditProfileFormProps {
    onSubmit?: (data: FormData) => void;
    initialData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber?: string;
    };
}

export const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
    const form = useForm({
        defaultValues: {
            firstName: initialData.firstName || "",
            lastName: initialData.lastName || "",
            email: initialData.email || "",
            phoneNumber: initialData.phoneNumber || "",
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <Form {...form}>
            <form className="space-y-4 flex flex-col items-end" onSubmit={form.handleSubmit(onSubmit)}>
                <section className="rounded-md w-full mt-5 p-4 gap-y-5 flex flex-col justify-between border">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Personal Information</p>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <div className="grid font-medium grid-cols-[30%_70%] pr-2 gap-x-3 items-start rounded-md">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input className="font-medium text-xs" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input className="font-medium text-xs" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid font-medium grid-cols-[30%_70%] gap-x-3 items-start rounded-md">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input className="font-medium text-sm" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="text-xs flex flex-col gap-y-3 text-muted-foreground rounded">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="font-medium text-xs"
                                                placeholder="XXX-XXX-XXXX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </section>
                <Button variant={"outline"} className="text-xs hover:cursor-pointer">
                    <Save className="size-3" />  Save changes
                </Button>
            </form>
        </Form>
    );
};

