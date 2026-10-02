export default function StudentAverage({ students }) {

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

    const averageProgress =
        students.length > 0 ? Math.round((
            students.reduce((acc, cur) => {
                return acc + Object.values(cur.progress).reduce((ac, cr) => {
                    return ac + cr
                })
            }, 0)
        ) / (3 * students.length)) : 0

    let over90 = 0;
    let over70Under89 = 0;
    let over50Under69 = 0;
    let over0Under49 = 0;

    for (let i = 0; i < students.length; i++) {
        const over =
            Object.values(students[i].progress).reduce((acc, cur) => {
                return acc + cur
            }, 0) / 3
        if (over >= 90 && over <= 100) {
            over90++;
        } else if (over >= 70) {
            over70Under89++;
        } else if (over >= 50) {
            over50Under69++;
        } else if (over >= 0) {
            over0Under49++;
        }
    }

    const examEverageScores = [1, 2, 3, 4].map((examNum) => {
        let sum = 0;
        let count = 0;
        students.forEach(student => {
            ['korean', 'english', 'math'].forEach((subject) => {
                const item = student?.exams?.[subject]?.find((ex) => ex.exam == examNum);
                if (item) {
                    sum += item.score;
                    count += 1;
                }
            });
        });
        return {
            exam: examNum,
            score: count > 0 ? Math.round(sum / count) : 75
        };
    });

    const chartPoints = examEverageScores.map((item, index) => {
        const x = 20 + index * 185;
        const y = 170 - (item.score / 100) * 150;

        return {
            x,
            y,
            score: item.score,
            exam: item.exam
        };
    });

    const totalDistribution =
        over90 +
        over70Under89 +
        over50Under69 +
        over0Under49;

    const percent90 =
        totalDistribution > 0
            ? (over90 / totalDistribution) * 100
            : 0;

    const percent70 =
        totalDistribution > 0
            ? (over70Under89 / totalDistribution) * 100
            : 0;

    const percent50 =
        totalDistribution > 0
            ? (over50Under69 / totalDistribution) * 100
            : 0;

    return (
        <>

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

            <div className="dashboard-bottom">

                {/* 학습 진행률 분포 */}
                <div className="progress-card">

                    <h3 className="dashboard-card-title">
                        학습 진행률 분포
                    </h3>

                    <div className="progress-content">

                        <div className="donut-chart" style={{
                            background: `
                            conic-gradient(
                                #2563eb 0% ${percent90}%,
                                #06b6d4 ${percent90}% ${percent90 + percent70}%,
                                #a855f7 ${percent90 + percent70}% ${percent90 + percent70 + percent50}%,
                                #f59e0b ${percent90 + percent70 + percent50}% 100%
                            )
                         `
                        }}
                        >
                            <div className="donut-center">
                                <span>평균</span>
                                <strong>{averageProgress}%</strong>
                            </div>
                        </div>

                        <div className="progress-legend">

                            <div className="legend-item">
                                <span className="legend-dot blue"></span>
                                <span>90~100%</span>
                                <strong>{over90}명</strong>
                            </div>

                            <div className="legend-item">
                                <span className="legend-dot cyan"></span>
                                <span>70~89%</span>
                                <strong>{over70Under89}명</strong>
                            </div>

                            <div className="legend-item">
                                <span className="legend-dot purple"></span>
                                <span>50~69%</span>
                                <strong>{over50Under69}명</strong>
                            </div>

                            <div className="legend-item">
                                <span className="legend-dot orange"></span>
                                <span>0~49%</span>
                                <strong>{over0Under49}명</strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* 최근 성적 변화 */}
                <div className="exam-card">

                    <h3 className="dashboard-card-title">
                        최근 성적 변화 (전체 평균)
                    </h3>

                    <div className="line-chart">

                        <div className="y-axis">
                            <span>100</span>
                            <span>80</span>
                            <span>60</span>
                            <span>40</span>
                            <span>20</span>
                            <span>0</span>
                        </div>

                        <div className="line-chart-content">

                            <svg
                                className="score-line-chart"
                                viewBox="0 0 600 200"
                                preserveAspectRatio="xMidYMid meet"
                            >

                                {/* 가로 기준선 */}
                                <line
                                    x1="0"
                                    y1="20"
                                    x2="600"
                                    y2="20"
                                    className="chart-grid-line"
                                />

                                <line
                                    x1="0"
                                    y1="50"
                                    x2="600"
                                    y2="50"
                                    className="chart-grid-line"
                                />

                                <line
                                    x1="0"
                                    y1="80"
                                    x2="600"
                                    y2="80"
                                    className="chart-grid-line"
                                />

                                <line
                                    x1="0"
                                    y1="110"
                                    x2="600"
                                    y2="110"
                                    className="chart-grid-line"
                                />

                                <line
                                    x1="0"
                                    y1="140"
                                    x2="600"
                                    y2="140"
                                    className="chart-grid-line"
                                />

                                <line
                                    x1="0"
                                    y1="170"
                                    x2="600"
                                    y2="170"
                                    className="chart-grid-line"
                                />


                                {/* 점들을 연결하는 선 */}
                                <polyline
                                    points={chartPoints
                                        .map((point) => `${point.x},${point.y}`)
                                        .join(" ")
                                    }
                                    className="score-line"
                                />


                                {/* 점 + 점수 + 회차 */}
                                {chartPoints.map((point) => (
                                    <g key={point.exam}>

                                        {/* 점 위의 점수 */}
                                        <text
                                            x={point.x}
                                            y={point.y - 10}
                                            className="score-text"
                                            textAnchor="middle"
                                        >
                                            {point.score}
                                        </text>

                                        {/* 점 */}
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            className="score-point"
                                        />

                                        {/* 회차 */}
                                        <text
                                            x={point.x}
                                            y="195"
                                            className="exam-text"
                                            textAnchor="middle"
                                        >
                                            {point.exam}회차
                                        </text>

                                    </g>
                                ))}

                            </svg>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

