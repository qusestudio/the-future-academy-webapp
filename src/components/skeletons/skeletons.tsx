import React from 'react';
import {Separator} from "@/components/ui/separator";

const SettingsSkeleton = () => {
    return (
        <main className="w-full py-5 flex-col flex gap-y-4">
            <p className="h-6 rounded-md animate-pulse w-40 bg-primary-600"/>
            <div className="flex w-full justify-between">
                <div className="flex gap-x-3 items-center">
                    <p className="text-sm h-10 rounded-md animate-pulse w-50 bg-primary-600 flex gap-y-1 flex-col font-medium">
                    </p>
                </div>
            </div>
            <Separator/>
            <section
                className="rounded-md grid grid-cols-2 mt-5 gap-x-5 p-4 gap-y-5 flex-col justify-between border">
                <div className="flex items-stretch w-full flex-col gap-y-2">
                    <p className="h-8 max-w-40 rounded-md animate-pulse bg-primary-600"/>
                    <p className="h-15 rounded-md animate-pulse w-full bg-primary-600"/>
                    <p className="h-15 rounded-md animate-pulse w-full bg-primary-600"/>
                </div>
                <div className="flex w-full flex-col gap-y-2">
                    <p className="h-20 rounded-md animate-pulse w-full bg-primary-600"/>
                    <p className="h-20 rounded-md animate-pulse w-full bg-primary-600"/>
                </div>
            </section>

            <section className="rounded-md mt-5 p-4 gap-y-5 flex flex-col justify-between border">
                <p className="h-8 max-w-40 rounded-md animate-pulse bg-primary-600"/>
                <p className="h-8 max-w-40 rounded-md animate-pulse bg-primary-600"/>
            </section>
        </main>
    );
};

export default SettingsSkeleton;