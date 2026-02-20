import React from 'react'
import {redirect} from "next/navigation";

const StudentSettings = () => {
    redirect("/students/settings/profile");
    return (
        <div className="max-w-300 w-full h-full py-5 gap-y-5 flex flex-col">
            <section>
                <p className="font-semibold">Settings</p>
                <p>

                </p>
            </section>

        </div>
    )
}
export default StudentSettings
