"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {Button} from "@/components/ui/button";

type StepperContextType = {
    step: number;
    totalSteps: number;
    next: () => void;
    back: () => void;
};

const StepperContext = createContext<StepperContextType | null>(null);

export function useStepper() {
    const ctx = useContext(StepperContext);
    if (!ctx) throw new Error("useStepper must be used inside Stepper");
    return ctx;
}

interface StepperProps {
    children: ReactNode;
    initialStep?: number;
    onComplete?: () => void;
}

export function Stepper({
                            children,
                            initialStep = 1,
                            onComplete
                        }: StepperProps) {
    const steps = React.Children.toArray(children);
    const totalSteps = steps.length;

    const [step, setStep] = useState(initialStep);

    const next = () => {
        if (step === totalSteps) {
            onComplete?.();
        } else {
            setStep((s) => s + 1);
        }
    };

    const back = () => {
        setStep((s) => Math.max(1, s - 1));
    };

    return (
        <StepperContext.Provider value={{ step, totalSteps, next, back }}>
            <div className="flex items-center justify-center  w-full flex-col">
                {steps[step - 1]}
            </div>
        </StepperContext.Provider>
    );
}

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="step"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-center"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export function StepperHeader() {
    const { step, totalSteps } = useStepper();

    return (
        <div className="mb-6 flex font-semibold items-center gap-3 text-sm text-neutral-500">
            <div className="h-0.5 flex-1 bg-yellow-300" />
      <span className="">
        Step {step} of {totalSteps}
      </span>
            <div className="h-0.5  flex-1 bg-yellow-300" />
        </div>
    );
}

interface StepperFooterProps {
    nextDisabled?: boolean;
    onCreateProfile?: () => void;
}

export function StepperFooter({ nextDisabled, onCreateProfile }: StepperFooterProps) {
    const { step, totalSteps, next, back } = useStepper();

    return (
        <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
                <Button
                    variant={"outline"}
                    onClick={back}
                    className="text-sm hover:cursor-pointer rounded text-neutral-500 hover:text-neutral-800"
                >
                    Back
                </Button>
            ) : (
                <div />
            )}

            <button
                onClick={step === totalSteps ? onCreateProfile : next}
                disabled={nextDisabled}
                className="rounded font-medium hover:cursor-pointer bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-40"
            >
                {step === totalSteps ? "Create Profile" : "Continue"}
            </button>
        </div>
    );
}