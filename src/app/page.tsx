import Link from "next/link";
import {CircleArrowRight} from "lucide-react";
import GlowingButton from "@/components/elements/GlowingButton";
import {Header} from "@/components/elements/Header";

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full fixed flex-col flex items-center">
                <Header />
            </div>
            <main className="max-w-400 px-10 max-sm:px-5 w-full">
                <section className="w-full min-h-screen justify-between gap-y-10 pt-50 pb-20 items-center flex flex-col">
                    <div className="gap-y-10 py-10 justify-center items-center flex flex-col">
                        <div className="bg-[#111] flex items-center gap-x-2 rounded-full text-sm pl-2 px-1.5 py-0.5">
                            <p className="text-[13px] text-white">
                                New version is out! Read More
                            </p>
                            <CircleArrowRight className="stroke-1 bg-[#942D00] rounded-full"/>
                        </div>
                        <h1 className="sm:text-7xl text-5xl text-center font-normal">
                            Education Reimagined
                        </h1>
                        <p className="text-[14px] max-w-3xl text-center leading-tight">
                            Transforming education through quality and accessible learning, by giving our students a
                            structured academic advantage beyond the classroom.
                        </p>
                        <button
                            className="flex dark:bg-[#FFF] bg-black dark:text-black text-white rounded-xs px-10 font-semibold py-2 text-xs gap-x-5 uppercase">
                            sign up
                        </button>
                        <p className="text-sm text-center leading-tight">
                            CAPS-Aligned Curriculum
                        </p>
                    </div>
                    {/*    */}
                    <div className="w-full self-end">
                        <p className="max-w-5xl lg:max-w-2xl xl:max-w-5xl font-space text-3xl sm:text-3xl  lg:text-4xl xl:text-5xl">
                            We are a high-performance-first institution, passionate about shaping future leaders into
                            self-reliant powerhouses.
                        </p>
                    </div>
                </section>
            </main>
            <section
                className="w-full bg-linear-150 from-[#9E9E9E] via-[#9E9E9E] to-[#942D00] justify-between items-center gap-y-5 py-15  flex flex-col">
                <div className="px-10 max-sm:px-5 max-w-400 w-full">
                    <p className="gap-y-10 font-space text-6xl text-black py-10  w-full  flex flex-col">
                        We invest into the excellence of our students.
                    </p>

                    <button className="text-black font-medium  rounded-full">
                        <GlowingButton text={"Get Started"}/>
                    </button>
                </div>
            </section>
            <section
                className="w-full h-[60vh] dark:bg-black justify-between items-center gap-y-20 pt-10 pb-10 flex flex-col">
                <div className="px-10 max-sm:px-5 max-w-400 w-full">
                    <p className="gap-y-10 text-6xl  py-10  w-full  flex flex-col">
                        Features
                    </p>
                </div>
                <div className="px-10 max-sm:px-5 gap-x-10 pb-10 gap-y-5 font-space grid max-md:grid-cols-1 grid-cols-3 max-w-400 w-full">
                    <div className="border-4 dark:border-white flex items-end  pt-20 rounded-xl p-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                        24/7 Access to On-Demand Video Lessons
                    </div>
                    <div className="border-4 dark:border-white flex items-end pt-20  rounded-xl p-5 text-2xl sm:text-3xl  lg:text-4xl xl:text-5xl">
                        Curriculum-Aligned, Grade-Specific Content
                    </div>
                    <div className="border-4 dark:border-white flex items-end pt-20 rounded-xl p-5 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                        Instructor-Created Subjects & Lessons
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Home;