'use client'

import { UserPlusIcon, SearchIcon } from "@/components/common/Icons";
import Link from "next/link";
import { useState, useMemo } from "react";
import StartCards from "@/components/students/StartCard"
import { useStudentsQuery, useDeleteStudentMutation } from "@/hooks/useStudents";
import StudentTable from "@/components/students/StudentTable";


export default function StudentsPage() {

    


    const deleteMutation = useDeleteStudentMutation();
    const { data: students = [], isLoading, isError, refetch } = useStudentsQuery();

    const [searchName, setSearchName] = useState('');
    const [sortBy, setSortBy] = useState('');


    // 검색 및 정렬 필터링
    const filteredAndSortedStudents = useMemo(() => {
        let result = [...students];

        // 검색 필터
        if (searchName.trim()) {
            result = result.filter((student) =>
                student.name.toLowerCase().includes(searchName.trim().toLowerCase())
            );
        }

        // 정렬
        result.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name, 'ko');
            }
            if (sortBy === 'score') {
                const avgA = ((a.scores?.korean || 0) + (a.scores?.english || 0) + (a.scores?.math || 0)) / 3;
                const avgB = ((b.scores?.korean || 0) + (b.scores?.english || 0) + (b.scores?.math || 0)) / 3;
                return avgB - avgA;
            }
            if (sortBy === 'attendance') {
                return (b.attendance || 0) - (a.attendance || 0);
            }
            if (sortBy === 'progress') {
                const avgA = ((a.progress?.korean || 0) + (a.progress?.english || 0) + (a.progress?.math || 0)) / 3;
                const avgB = ((b.progress?.korean || 0) + (b.progress?.english || 0) + (b.progress?.math || 0)) / 3;
                return avgB - avgA;
            }
            return 0;
        });

        return result;
    }, [students, searchName, sortBy]);

    // 학생 삭제 핸들러
  const handleDeleteStudent = (id, name) => {
    if (confirm(`'${name}' 학생 정보를 삭제하시겠습니까?`)) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('학생 정보가 삭제되었습니다.');
        },
        onError: () => {
          alert('삭제에 실패했습니다. 다시 시도해 주세요.');
        },
      });
    }
  };

    return (
        <div>
            {/* 1. 상단 통계 요약 카드 4개 */}
            <StartCards students={students}/>

            {/* 2. 툴바 (검색창 / 정렬 / 학생 추가 버튼) */}
            <div className="toolbar-container">
                <div className="search-box">
                    <SearchIcon size={18} />
                    <input
                        type="text"
                        placeholder="이름으로 검색하세요..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="toolbar-actions">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">정렬: 이름순</option>
                        <option value="score">정렬: 성적 높은순</option>
                        <option value="attendance">정렬: 출석률순</option>
                        <option value="progress">정렬: 학습진행률순</option>
                    </select>

                    <Link href="/students/new" className="btn-primary">
                        <UserPlusIcon size={18} />
                        <span>학생 추가</span>
                    </Link>
                </div>
            </div>
            {/* 3. 테이블 콘텐츠 & 상태 피드백 */}
            {isLoading ? (
                <div className="state-container">
                    <div className="spinner" />
                    <div className="state-message">학생 정보를 불러오는 중입니다...</div>
                </div>
            ) : isError ? (
                <div className="state-container">
                    <div className="state-message" style={{ color: '#ef4444' }}>
                        학생 정보를 불러오지 못했습니다.
                    </div>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="btn-primary"
                    >
                        다시시도
                    </button>
                </div>
            ) : filteredAndSortedStudents.length === 0 ? (
                <div className="state-container">
                    <div className="state-message">
                        {searchName ? '검색 결과와 일치하는 학생이 없습니다.' : '등록된 학생이 없습니다.'}
                    </div>
                    {!searchName && (
                        <Link href="/students/new" className="btn-primary">
                            학생 등록하러 가기
                        </Link>
                    )}
                </div>
            ) : (
                <StudentTable
                    students={filteredAndSortedStudents}
                    onDelete={handleDeleteStudent}
                />
            )}
        </div>
    );
}