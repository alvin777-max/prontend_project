'use client';

import Link from 'next/link';
import { TrashIcon } from '../common/Icons';

export default function StudentTable({ students = [], onDelete }) {
  // 아바타 배경색 순환 클래스
  const getAvatarColorClass = (idx) => {
    const classes = ['avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5'];
    return classes[idx % classes.length];
  };

  return (
    <div className="table-card">
      <table className="student-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>생년월일</th>
            <th>전화번호</th>
            <th>출석률</th>
            <th>평균 성적</th>
            <th>학습 진행률</th>
            <th style={{ textAlign: 'center' }}>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => {
            const { korean = 0, english = 0, math = 0 } = student.scores || {};
            const avgScore = Math.round((korean + english + math) / 3);

            const { korean: pKor = 0, english: pEng = 0, math: pMath = 0 } = student.progress || {};
            const avgProgress = Math.round((pKor + pEng + pMath) / 3);

            const initial = student.name ? student.name.charAt(0) : '';

            return (
              <tr key={student.id}>
                <td>
                  <div className="student-name-cell">
                    <div className={`avatar ${getAvatarColorClass(idx)}`}>
                      {initial}
                    </div>
                    <span className="student-name">{student.name}</span>
                  </div>
                </td>
                <td>{student.birth}</td>
                <td>{student.phone}</td>
                <td>
                  <div className="progress-bar-container">
                    <span className="progress-text">{student.attendance}%</span>
                    <div className="progress-track">
                      <div
                        className="progress-fill progress-fill-green"
                        style={{ width: `${student.attendance}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: '600', color: '#0f172a' }}>
                    {avgScore}점
                  </span>
                </td>
                <td>
                  <div className="progress-bar-container">
                    <span className="progress-text">{avgProgress}%</span>
                    <div className="progress-track">
                      <div
                        className="progress-fill progress-fill-blue"
                        style={{ width: `${avgProgress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Link
                      href={`/students/${student.id}`}
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '13px' }}
                    >
                      보기
                    </Link>
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(student.id, student.name)}
                        className="btn-secondary"
                        style={{ padding: '6px 10px', color: '#ef4444' }}
                        title="학생 삭제"
                      >
                        <TrashIcon size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
