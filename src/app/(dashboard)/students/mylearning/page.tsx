"use client"

import React from 'react'
import MyLearningListItem from "@/components/elements/MyLearningListItem";

const StudentMyLearning = () => {

    const enrolledSubjects: MyLearningListItemProps[] = [
        {
            id: "mth1001",
            name: "Mathematics",
            term: 1,
            topicCount: 10
        },
        {
            id: "phy1001",
            name: "Physics",
            term: 1,
            topicCount: 5
        },
        {
            id: "lfs1001",
            name: "Life Sciences",
            term: 1,
            topicCount: 12
        },
        {
            id: "acc1001",
            name: "Accounting",
            term: 1,
            topicCount: 7
        },
    ]

    return (
        <div className="relative w-full h-full gap-y-5 flex flex-col">
            <section className="w-full gap-y-2 flex flex-col">
                {enrolledSubjects.map(
                    (item, index) => (
                        <MyLearningListItem itemProps={item}  key={index}  />
                    )
                )}
            </section>
        {/*  ===================================================  */}
            <p className="text-sm">Resources</p>
        </div>
    )
}
export default StudentMyLearning
