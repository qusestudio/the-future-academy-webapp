import React from 'react';
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

const BillingSettings = () => {
    return (
        <main className="w-full py-5 flex-col flex gap-y-5">
            <div className="flex w-full justify-between">
                <p className="text-sm flex flex-col font-medium">
                    Subscription Plan: Standard
                    <span className="text-muted-foreground text-xs">Monthly Plan</span>
                </p>
                <Button
                    variant={"outline"}
                    className="shadow-none text-xs hover:cursor-pointer"
                >
                    Cancel Subscription
                </Button>
            </div>
            <Separator />
            <section className="flex justify-between">
                <p className="text-xs">Your next payment of <span className="font-medium">R 300.00</span>, to be charged on the <span className="font-medium">31 of March, 2026</span></p>
                <p className="text-xs">You&apos;ll make a payment here each month.</p>
            </section>
            <section className="rounded-md mt-5 grid grid-cols-[40%_60%] p-4 justify-between border">
                <div>
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-xs">Choose your preferred payment method</p>
                </div>
                <div className="flex flex-col gap-y-3">
                    <div className="border flex gap-x-3 items-start p-3 rounded-md">
                        <div className="h-6 w-10 bg-[#222] rounded" />
                        <div className="text-xs flex flex-col gap-y-3">
                            <section>
                                <p className="font-medium">Visa ending 4331</p>
                                <p className="text-muted-foreground">Expiry 09/2024</p>
                            </section>
                            <section className="flex gap-x-3">
                                <button disabled className="text-muted-foreground">Primary Card</button>
                                <button className="font-medium hover:cursor-pointer">Edit</button>
                            </section>
                        </div>
                    </div>
                    <div className="border flex gap-x-3 items-start p-3 rounded-md">
                        <div className="h-6 w-10 bg-[#222] rounded" />
                        <div className="text-xs flex flex-col gap-y-3">
                            <section>
                                <p className="font-medium">Visa ending 5442</p>
                                <p className="text-muted-foreground">Expiry 08/2023</p>
                            </section>
                            <section className="flex gap-x-3">
                                <button className="underline">Set as primary</button>
                                <button className="font-medium hover:cursor-pointer">Edit</button>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BillingSettings;