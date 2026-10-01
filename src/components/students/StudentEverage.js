'use client'
import { useStudentsQuery } from "@/hooks/useStudents"


export default function StudentEverage() {

    const { data: students = [] } = useStudentsQuery();

    console.log(students.length)


    const averageKoreanScore =
        students.length > 0 ? Math.round(students.reduce((acc, current) => {
            return acc + current.scores.korean;
        }, 0) / students.length)
            : 0;

    const averageEnglishScore =
        students.length > 0 ? Math.round(students.reduce((acc, current) => {
            return acc + current.scores.english;
        }, 0) / students.length)
            : 0;


    const averageMathScore =
        students.length > 0 ? Math.round(students.reduce((acc, current) => {
            return acc + current.scores.math;
        }, 0) / students.length)
            : 0;


       return (
        <div className="average-score-card">

            <p className="average-score-title">
                과목별 평균 성적
            </p>

            <div className="average-chart">

                <div className="chart-y-axis">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                </div>

                <div className="chart-content">

                    <div className="chart-grid">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="chart-bars">

                        <div className="chart-item">
                            <span className="chart-value">
                                {averageKoreanScore}
                            </span>

                            <div
                                className="chart-bar korean-bar"
                                style={{ height: `${averageKoreanScore}%` }}
                            ></div>

                            <span className="chart-label">
                                국어
                            </span>
                        </div>


                        <div className="chart-item">
                            <span className="chart-value">
                                {averageEnglishScore}
                            </span>

                            <div
                                className="chart-bar english-bar"
                                style={{ height: `${averageEnglishScore}%` }}
                            ></div>

                            <span className="chart-label">
                                영어
                            </span>
                        </div>


                        <div className="chart-item">
                            <span className="chart-value">
                                {averageMathScore}
                            </span>

                            <div
                                className="chart-bar math-bar"
                                style={{ height: `${averageMathScore}%` }}
                            ></div>

                            <span className="chart-label">
                                수학
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}