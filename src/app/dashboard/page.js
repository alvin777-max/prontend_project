'use client'

import StatCards from "@/components/students/StartCard"
import { useStudentsQuery } from "@/hooks/useStudents"
import StudentAverage from "@/components/students/StudentEverage"

export default function DashBoardPage() {


const { data: students = [] } = useStudentsQuery();

    return (
        <div>
        <div>
            <h2>대시보드 통계</h2>
           <StatCards students={students}/>
            <StudentAverage students={students}/>
        </div>
        </div>
    )
}