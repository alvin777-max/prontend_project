import {
  UsersGroupIcon,
  TrendingUpIcon,
  CalendarIcon,
  TargetIcon,
} from '@/components/common/Icons';

export default function StatCards({ students = [] }) {
  
  const totalStudents = students.length;

  // 전체 학생 평균 성적 계산
  const avgScore =
    totalStudents > 0
      ? Math.round(
          students.reduce((sum, s) => {
            const { korean = 0, english = 0, math = 0 } = s.scores || {};
            return sum + (korean + english + math) / 3;
          }, 0) / totalStudents
        )
      : 0;

  // 전체 학생 평균 출석률 계산
  const avgAttendance =
    totalStudents > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.attendance || 0), 0) / totalStudents)
      : 0;

  // 전체 학생 평균 학습 진행률 계산
  const avgProgress =
    totalStudents > 0
      ? Math.round(
          students.reduce((sum, s) => {
            const { korean = 0, english = 0, math = 0 } = s.progress || {};
            return sum + (korean + english + math) / 3;
          }, 0) / totalStudents
        )
      : 0;

  return (
    <div className="stat-cards-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-blue">
          <UsersGroupIcon size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">전체 학생 수</span>
          <span className="stat-value">{totalStudents}명</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-green">
          <TrendingUpIcon size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">평균 성적</span>
          <span className="stat-value">{avgScore}점</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-cyan">
          <CalendarIcon size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">평균 출석률</span>
          <span className="stat-value">{avgAttendance}%</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-icon-purple">
          <TargetIcon size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">평균 학습 진행률</span>
          <span className="stat-value">{avgProgress}%</span>
        </div>
      </div>
    </div>
  );
}
