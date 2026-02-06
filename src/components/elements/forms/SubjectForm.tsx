import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {SubjectFormData, subjectSchema} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {CustomFormField} from "@/components/elements/forms/FormField";


function SubjectForm ({ initialData, onSubmit}: SubjectFormProps) {
    const [editMode, setEditMode] = useState(false);
    const form  = useForm<SubjectFormData>(
        {
            resolver: zodResolver(subjectSchema),
            defaultValues: initialData
        }
    );

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            form.reset(initialData)
        }
    }

    const handleSubmit = async (data: SubjectFormData) => {
        await onSubmit(data);
        setEditMode(false);
    }

    return (
        <div className="pt-8 pb-5 max-w-3xl">
            <div className="mb-5">
                <p className="text-sm text-gray-500 mt-1">
                    Manage subject details
                </p>
            </div>
            <div className="bg-white rounded-xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <CustomFormField name="name" label="Name" disabled={!editMode} />
                        <CustomFormField name="grade" label="Grade" type={"number"} disabled={!editMode} />
                        <CustomFormField name="term" label="Term" disabled={!editMode} />
                        <div className="pt-4 flex justify-between">
                            <Button
                                type="button"
                                onClick={toggleEditMode}
                                className="bg-secondary-500 text-white hover:bg-secondary-600"
                            >
                                {editMode ? "Cancel" : "Edit"}
                            </Button>
                            {
                                editMode && (
                                    <Button
                                        className="bg-primary-700 text-white hover:bg-primary-800"
                                    >
                                        Save Changes
                                    </Button>
                                )
                            }
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

function CreateSubjectForm ({ onSubmit }: SubjectFormProps) {

    const initialData = {
        title: "",
        grade: 10,
        term: 1
    }

    const form  = useForm<SubjectFormData>(
        {
            resolver: zodResolver(subjectSchema),
            defaultValues: initialData
        }
    );

    const handleSubmit = async (data: SubjectFormData) => {
        await onSubmit(data);
    }

    return (
        <div className="pt-8 pb-5 flex flex-col items-center w-full max-w-3xl">
            <div className="mb-5">
                <p className=" text-black mt-1">
                    Create a new subject
                </p>
            </div>
            <div className="bg-white w-full rounded-xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <CustomFormField name="title" label="Title" />
                        <CustomFormField name="grade" label="Grade" type={"number"} />
                        <CustomFormField name="term" label="Term" type={"number"} />
                        <div className="pt-4 flex justify-between">
                            <Button
                                className="bg-primary-700 text-white hover:bg-primary-800"
                            >
                                Create Subject
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export {
    SubjectForm,
    CreateSubjectForm,
}
