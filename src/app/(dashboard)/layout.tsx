import React from 'react'
import Navbar from "@/components/elements/Navbar";

const DashboardLayout = ( {children} : {children: React.ReactNode} ) => {
    return (
        <div>
            <Navbar />
            {/*{children}*/}
        </div>
    )
}
export default DashboardLayout;
