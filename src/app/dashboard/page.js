'use client'

import StatCards from "@/components/students/StartCard"
import { useStudentsQuery } from "@/hooks/useStudents"
import StudentEverage from "@/components/students/StudentEverage"

export default function DashBoardPage() {


const { data: students = [] } = useStudentsQuery();

    return (
        <div>
        <div>
            <h2>대시보드페이지</h2>
           <StatCards students={students}/>
            <StudentEverage/>
        </div>
        </div>


    )
}