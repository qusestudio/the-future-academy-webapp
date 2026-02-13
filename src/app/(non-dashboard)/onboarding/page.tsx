"use client"

import React, {useState} from 'react';
import {Step, Stepper, StepperFooter, StepperHeader} from "@/components/elements/Stepper";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {motion} from "motion/react";
import {Field, FieldLabel} from "@/components/ui/field";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";


const OnboardingPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [highSchool, setHighSchool] = useState("");
    const [grade, setGrade] = useState<number>();
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    // create account
    const handleCreateProfile = () => {

    }


    return (
        <main className="flex flex-col h-screen gap-y-10 items-center justify-center  px-10 py-10">
            <motion.div
                key="step"
                initial={{opacity: 0, y: 25}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -6}}
                transition={{duration: 0.5, ease: "easeOut"}}
                className="flex-1 flex flex-col gap-y-10 justify-center"
            >
                <h1 className="text-5xl max-sm:text-4xl font-semibold  text-center text-black">
                    Welcome to <br className="max-sm:block hidden" /> The Future Academy!
                </h1>
                <section>
                    <Stepper
                        onComplete={() => console.log("create draft")}>
                        <Step>
                            <StepperHeader/>
                            <div className="w-100 space-y-6">
                                <div className="space-y-4">
                                    <Label className="text-lg w-full flex justify-center text-black">
                                        Setting up your profile
                                    </Label>
                                    <Field>
                                        <FieldLabel htmlFor="date">First Name</FieldLabel>
                                        <Input
                                            onChange={
                                                (e) => {
                                                    setFirstName(e.target.value)
                                                }
                                            }
                                            value={firstName}

                                            className="rounded"
                                            name="firstName"
                                            placeholder={"e.g. John"} type={"text"}/>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="date">Last Name</FieldLabel>
                                        <Input
                                            onChange={(e) => {
                                                setLastName(e.target.value)
                                            }}
                                            value={lastName}
                                            className="rounded"
                                            placeholder={"e.g. Doe"}
                                            type={"text"}
                                        />
                                    </Field>
                                </div>
                                <StepperFooter nextDisabled={!firstName.trim() || !lastName.trim()}/>
                            </div>
                        </Step>
                        <Step>
                            <StepperHeader/>
                            <div className="w-100 space-y-6">
                                <Field className="mx-auto w-full">
                                    <FieldLabel htmlFor="date">Date of Birth</FieldLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="justify-start "
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                defaultMonth={date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setDate(date)
                                                    setOpen(false)
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </Field>
                                <StepperFooter nextDisabled={!date}/>
                            </div>
                        </Step>
                        <Step>
                            <StepperHeader/>
                            <div className="w-100 space-y-6">
                                <div className="space-y-4">
                                    <Field>
                                        <FieldLabel htmlFor="date">School Name</FieldLabel>
                                        <Input
                                            onChange={
                                                (e) => {
                                                    setHighSchool(e.target.value)
                                                }
                                            }
                                            value={highSchool}

                                            className="rounded"
                                            name="firstName"
                                            placeholder={"e.g. Star High School"} type={"text"}/>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="date">Grade</FieldLabel>
                                        <Input
                                            onChange={
                                                (e) =>
                                                {
                                                    setGrade(Number(e.target.value))
                                                }
                                            }
                                            placeholder={"e.g. 10"} type={"number"}
                                            min={10}
                                            max={12}
                                        />
                                    </Field>
                                </div>
                                <StepperFooter nextDisabled={!highSchool.trim() || !grade || (grade! > 12 || grade! < 10)}/>
                            </div>
                        </Step>
                    </Stepper>
                </section>
            </motion.div>

        </main>
    );
};

export default OnboardingPage;