import {CircleArrowRight} from "lucide-react";
import GlowingButton from "@/components/elements/GlowingButton";
import {Header} from "@/components/elements/Header";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full fixed flex-col flex items-center">
                <Header />
            </div>
            <main className="max-w-400 px-10 max-sm:px-5 w-full">
                <section className="w-full min-h-screen justify-between gap-y-10 pt-50 pb-20 items-center flex flex-col">
                    <div className="gap-y-10 py-10 justify-center items-center flex flex-col">
                        <div className="dark:bg-[#111] bg-[#afafaf]/30 flex items-center gap-x-2 rounded-full text-sm pl-2 px-1.5 py-0.5">
                            <p className="text-[13px] font-[450] dark:text-white">
                                New version is out! Read More
                            </p>
                            <CircleArrowRight className="stroke-[2px] bg-[#942D00] text-[#dfdfdf] rounded-full"/>
                        </div>
                        <h1 className="sm:text-7xl text-5xl text-center font-normal">
                            Education Reimagined
                        </h1>
                        <p className="text-[14px] max-w-3xl text-center leading-tight">
                            Transforming education through quality and accessible learning, by giving our students a
                            structured academic advantage beyond the classroom.
                        </p>
                        <Link href={"/signup"}
                            className="flex dark:bg-[#FFF] bg-black dark:text-black text-white rounded-xs px-10 font-semibold py-2 text-xs gap-x-5 uppercase">
                            Join the academy
                        </Link>
                        <div className="text-xs w-full max-w-xl text-center gap-x-1 items-center flex h-5 leading-tight">
                            <span className="w-full">CAPS-Aligned Curriculum</span>
                            <Separator className="dark:bg-white bg-black" orientation={"vertical"} />
                            <span className="w-full">Grade 10 - 12</span>
                            <Separator className="dark:bg-white bg-black" orientation={"vertical"} />
                            <span className="w-full">University Readiness</span>
                        </div>
                    </div>
                    {/*    */}
                    <div className="w-full self-end">
                        <p className="max-w-5xl lg:max-w-2xl xl:max-w-5xl font-space text-3xl sm:text-3xl  lg:text-4xl xl:text-5xl">
                            Transforming education through structured, high-performance learning, giving students an academic advantage beyond the classroom.
                        </p>
                    </div>
                </section>
            </main>
            <section
                className="w-full bg-linear-150 max-sm:h-screen from-[#9E9E9E] via-[#9E9E9E] to-[#4F6357] justify-between items-center gap-y-5 py-15  flex flex-col">
                <div className="px-10 max-sm:px-5 max-w-400 w-full">
                    <p className="gap-y-10 font-space text-7xl text-black py-10  w-full  flex flex-col">
                        We invest in the potential of our students.
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
                <div className="px-10 max-sm:px-5 gap-x-3 xl:gap-x-10 pb-10 gap-y-5 font-space grid max-md:grid-cols-1 grid-cols-3 max-w-400 w-full">
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