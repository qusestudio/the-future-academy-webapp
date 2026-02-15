import React from 'react';
import Link from "next/link";

const GlowingButton = ({text}: {text:string}) => {
    return (
        <div className="p-0.5 h-fit rounded-full bg-conic/[from_var(--border-angle)] animate-rotate-border from-[#942D00]/46 via-[#A7A7A7] to-[#942D00]/46">
            <div  className="text-white text-center bg-white rounded-full    py-2 px-8">
                <Link href={"#"} className="z-30 text-black font-semibold">{text}</Link>
            </div>
        </div>
    );
};

export default GlowingButton;