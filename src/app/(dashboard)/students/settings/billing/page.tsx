"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {CheckCircle2, LucideNewspaper, TriangleAlert} from "lucide-react";
import Image from "next/image";
import {useCreateCheckoutMutation, useGetStudentCheckoutQuery} from "@/state/api";
import {redirect} from "next/navigation";
import ProfilePageSkeleton from "@/components/skeletons/skeletons";

const BillingSettings = () => {
    const [createCheckout] = useCreateCheckoutMutation();
    const {data: checkout, isLoading} = useGetStudentCheckoutQuery();
    // fetch


    const handlePay = async () => {
        const result = await createCheckout(
            {
                amount: 300,
                currency: "ZAR",
                successUrl: process.env.NEXT_PUBLIC_BILLING_REDIRECT_URL!,
            }
        );
        console.log(result.data);
        redirect(`${result.data!.redirectUrl}`);
    }

    const isNoCheckout = !checkout || checkout?.status !== "Completed";


    if (isLoading) {
        return (
            <ProfilePageSkeleton />
        )
    }

    return (
        <main className="w-full py-5 flex-col flex gap-y-5">
            <p className="font-medium">
                Billing & Payments
            </p>
            <div
                className={` ${isNoCheckout ? "dark:bg-yellow-500/10 bg-yellow-500/40" : "dark:bg-green-500/10 bg-green-500/40"} flex w-full  p-5 rounded-xl border items-center justify-between`}>
                <p className="text-lg flex items-center gap-x-3 font-medium">
                    <Image
                        width={50}
                        height={50}
                        src={"/icon.webp"}
                        alt={""}
                        className="rounded-full w-10"
                    />
                    Pay with YOCO
                </p>
                <p className="flex flex-wrap max-w-50 text-center justify-center text-sm">
                    {
                        isNoCheckout ?
                            "Your payment is due"
                            :
                            "Thank you!"
                    }
                </p>
                <Button
                    variant={"outline"}
                    disabled={!isNoCheckout}
                    className="shadow-none text-xs hover:cursor-pointer"
                    onClick={handlePay}
                >
                    {
                        isNoCheckout ? "Pay with Card" : "Paid"
                    }
                </Button>
            </div>
            <p className="text-xs flex  items-center gap-x-3">
                {isNoCheckout && <> <TriangleAlert className="text-yellow-500/50"/>
                    Your payment is due to keep things running smoothly. A quick update now helps us stay on track
                    together.
                    Please complete your payment at your earliest convenience. </>}
                {!isNoCheckout && <> <CheckCircle2 className="text-green-500/50"/>
                    The current month is paid </>}
            </p>
            <Separator/>
            {/*<section className="flex justify-between">*/}
            {/*    <p className="text-xs">Your next payment of <span className="font-medium">R 300.00</span>, to be charged on the <span className="font-medium">31 of March, 2026</span></p>*/}
            {/*</section>*/}
            {/*<section className="rounded-md mt-5 grid grid-cols-[40%_60%] p-4 justify-between border">*/}
            {/*    <div>*/}
            {/*        <p className="text-sm font-medium">Payment Method</p>*/}
            {/*        <p className="text-xs">Choose your preferred payment method</p>*/}
            {/*    </div>*/}
            {/*    <div className="flex flex-col gap-y-3">*/}
            {/*        <div className="border flex gap-x-3 items-start p-3 rounded-md">*/}
            {/*            <div className="h-6 w-10 bg-[#222] rounded" />*/}
            {/*            <div className="text-xs flex flex-col gap-y-3">*/}
            {/*                <section>*/}
            {/*                    <p className="font-medium">Visa ending 4331</p>*/}
            {/*                    <p className="text-muted-foreground">Expiry 09/2024</p>*/}
            {/*                </section>*/}
            {/*                <section className="flex gap-x-3">*/}
            {/*                    <button disabled className="text-muted-foreground">Primary Card</button>*/}
            {/*                    <button className="font-medium hover:cursor-pointer">Edit</button>*/}
            {/*                </section>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="border flex gap-x-3 items-start p-3 rounded-md">*/}
            {/*            <div className="h-6 w-10 bg-[#222] rounded" />*/}
            {/*            <div className="text-xs flex flex-col gap-y-3">*/}
            {/*                <section>*/}
            {/*                    <p className="font-medium">Visa ending 5442</p>*/}
            {/*                    <p className="text-muted-foreground">Expiry 08/2023</p>*/}
            {/*                </section>*/}
            {/*                <section className="flex gap-x-3">*/}
            {/*                    <button className="underline">Set as primary</button>*/}
            {/*                    <button className="font-medium hover:cursor-pointer">Edit</button>*/}
            {/*                </section>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <Button*/}
            {/*            variant={"ghost"}*/}
            {/*            className="text-xs hover:underline text-muted-foreground hover:cursor-pointer self-start"*/}
            {/*        >*/}
            {/*            <Plus /> Add new payment method*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section className="flex flex-col gap-y-4">
                <div className="flex gap-x-3 justify-between text-sm items-start p-3 rounded-md">
                    <span className="font-medium">Latest Transactions</span>
                    <button
                        className="gap-x-3 border p-1.5 font-medium flex items-center hover:cursor-pointer rounded-sm text-[10px]">
                        <LucideNewspaper size={15}/> Export CSV
                    </button>
                </div>
                {/*   Table of Transactions */}
            </section>
        </main>
    );
};

export default BillingSettings;