'use client'

import { useStudentsQuery } from "@/hooks/useStudents"
import { useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LabelList,
    Tooltip,
    Legend
} from "recharts";


export default function Analytics() {

    const { data: students = [] } = useStudentsQuery();

    const [choosedStudent, setChooseStudent] = useState("");
    const [choosedSubject, setChoosedSubject] = useState("");


    // 선택한 학생 찾기
    const selectedStudent = students.find(
        (student) => student.name === choosedStudent
    );


    // 선택한 학생의 선택한 과목 시험 데이터
    const selectedSubjectExams =
        selectedStudent?.exams?.[choosedSubject] ?? [];


    // 위쪽 차트에서 사용할 데이터
    const subjectChartData = selectedSubjectExams.map((exam) => ({
        exam: `${exam.exam}회차`,
        score: exam.score
    }));


    // 아래쪽 전체 과목 차트에서 사용할 데이터
    const allSubjectChartData = [1, 2, 3, 4].map((examNumber) => {

        const korean = selectedStudent?.exams?.korean?.find(
            (exam) => exam.exam === examNumber
        );

        const english = selectedStudent?.exams?.english?.find(
            (exam) => exam.exam === examNumber
        );

        const math = selectedStudent?.exams?.math?.find(
            (exam) => exam.exam === examNumber
        );

        return {
            exam: `${examNumber}회차`,
            korean: korean?.score ?? null,
            english: english?.score ?? null,
            math: math?.score ?? null
        };
    });


    // 과목 이름
    const subjectName = {
        korean: "국어",
        english: "영어",
        math: "수학"
    };


    return (
        <div className="analytics-page">

            {/* 제목 */}
            <div className="analytics-title">
                <span className="analytics-back">←</span>
                <h2>시험 성적 변화</h2>
            </div>


            {/* =========================
                학생 / 과목 선택
            ========================= */}

            <div className="analytics-select-area">

                <div className="analytics-select-group">

                    <label>학생 선택</label>

                    <select
                        value={choosedStudent}
                        onChange={(e) => {
                            setChooseStudent(e.target.value)
                        }}
                    >
                        <option value="">
                            학생을 선택하세요
                        </option>

                        {students.map((student) => (
                            <option
                                key={student.id}
                                value={student.name}
                            >
                                {student.name}
                            </option>
                        ))}
                    </select>

                </div>


                <div className="analytics-select-group">

                    <label>과목 선택</label>

                    <select
                        value={choosedSubject}
                        onChange={(e) => {
                            setChoosedSubject(e.target.value)
                        }}
                    >
                        <option value="">
                            과목을 선택하세요
                        </option>

                        <option value="korean">
                            국어
                        </option>

                        <option value="english">
                            영어
                        </option>

                        <option value="math">
                            수학
                        </option>

                    </select>

                </div>

            </div>


            {/* =========================
                첫 번째 카드
            ========================= */}

            <div className="analytics-card">

                <h3>
                    {selectedStudent && choosedSubject
                        ? `${selectedStudent.name} 학생 ${subjectName[choosedSubject]} 시험 성적 변화`
                        : "학생과 과목을 선택해주세요"
                    }
                </h3>


                {selectedStudent && choosedSubject ? (

                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <LineChart
                                data={subjectChartData}
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 0,
                                    bottom: 10
                                }}
                            >

                                <CartesianGrid
                                    stroke="#edf0f5"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="exam"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    domain={[0, 100]}
                                    ticks={[0, 20, 40, 60, 80, 100]}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#7c4dff"
                                    strokeWidth={3}
                                    dot={{
                                        r: 5,
                                        fill: "#ffffff",
                                        stroke: "#7c4dff",
                                        strokeWidth: 3
                                    }}
                                >

                                    <LabelList
                                        dataKey="score"
                                        position="top"
                                        fill="#7c4dff"
                                        fontSize={12}
                                        fontWeight={600}
                                    />

                                </Line>

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                ) : (

                    <div className="analytics-empty">
                        학생과 과목을 선택해주세요.
                    </div>

                )}

            </div>


            {/* =========================
                두 번째 카드
            ========================= */}

            <div className="analytics-card analytics-comparison-card">

                <div className="analytics-card-header">

                    <h3>
                        다른 과목 성적 변화 비교
                    </h3>


                    {/* 과목 버튼 */}
                    <div className="analytics-subject-buttons">

                       

                    </div>

                </div>


                {selectedStudent ? (

                    <div className="analytics-chart">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <LineChart
                                data={allSubjectChartData}
                                margin={{
                                    top: 40,
                                    right: 30,
                                    left: 0,
                                    bottom: 10
                                }}
                            >

                                <CartesianGrid
                                    stroke="#edf0f5"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="exam"
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    domain={[0, 100]}
                                    ticks={[0, 20, 40, 60, 80, 100]}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip />

                                <Legend
                                    verticalAlign="top"
                                    height={35}
                                />


                                {/* 국어 */}
                                <Line
                                    type="monotone"
                                    dataKey="korean"
                                    name="국어"
                                    stroke="#20c997"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        fill: "#ffffff",
                                        stroke: "#20c997",
                                        strokeWidth: 2
                                    }}
                                >

                                    <LabelList
                                        dataKey="korean"
                                        position="top"
                                        fill="#20c997"
                                        fontSize={11}
                                    />

                                </Line>


                                {/* 영어 */}
                                <Line
                                    type="monotone"
                                    dataKey="english"
                                    name="영어"
                                    stroke="#3d7eff"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        fill: "#ffffff",
                                        stroke: "#3d7eff",
                                        strokeWidth: 2
                                    }}
                                >

                                    <LabelList
                                        dataKey="english"
                                        position="top"
                                        fill="#3d7eff"
                                        fontSize={11}
                                    />

                                </Line>


                                {/* 수학 */}
                                <Line
                                    type="monotone"
                                    dataKey="math"
                                    name="수학"
                                    stroke="#7c4dff"
                                    strokeWidth={2.5}
                                    dot={{
                                        r: 4,
                                        fill: "#ffffff",
                                        stroke: "#7c4dff",
                                        strokeWidth: 2
                                    }}
                                >

                                    <LabelList
                                        dataKey="math"
                                        position="top"
                                        fill="#7c4dff"
                                        fontSize={11}
                                    />

                                </Line>

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                ) : (

                    <div className="analytics-empty">
                        학생을 선택해주세요.
                    </div>

                )}

            </div>

        </div>
    );
}