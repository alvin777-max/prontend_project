'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/common/Icons';

export default function StudentForm({ initialData = null, onSubmit, isSubmitting = false }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    birth: initialData?.birth || '',
    phone: initialData?.phone || '',
    attendance: initialData?.attendance ?? 90,
    scores: {
      korean: initialData?.scores?.korean ?? 80,
      english: initialData?.scores?.english ?? 80,
      math: initialData?.scores?.math ?? 80,
    },
    progress: {
      korean: initialData?.progress?.korean ?? 80,
      english: initialData?.progress?.english ?? 80,
      math: initialData?.progress?.math ?? 80,
    },
    memo: initialData?.memo || '',
    exams: initialData?.exams || {
      korean: [
        { exam: 1, score: 75 },
        { exam: 2, score: 80 },
        { exam: 3, score: 82 },
        { exam: 4, score: 85 },
      ],
      english: [
        { exam: 1, score: 70 },
        { exam: 2, score: 75 },
        { exam: 3, score: 80 },
        { exam: 4, score: 82 },
      ],
      math: [
        { exam: 1, score: 72 },
        { exam: 2, score: 78 },
        { exam: 3, score: 82 },
        { exam: 4, score: 85 },
      ],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScoreChange = (subject, value) => {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    setFormData((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [subject]: num,
      },
    }));
  };

  const handleProgressChange = (subject, value) => {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    setFormData((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [subject]: num,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('학생 이름을 입력해 주세요.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => router.back()}
        className="detail-back-btn"
      >
        <ArrowLeftIcon size={18} />
        <span>{isEdit ? '학생 수정' : '학생 추가'}</span>
      </button>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* 기본 정보 */}
          <div className="form-section-title">기본 정보</div>
          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">
                이름 <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">생년월일</label>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              className="form-input"
            />
          </div>

          {/* 성적 정보 */}
          <div className="form-section-title" style={{ marginTop: '28px' }}>
            성적 정보 (0~100점)
          </div>
          <div className="form-row-3col">
            <div className="form-group">
              <label className="form-label">국어 점수</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.korean}
                onChange={(e) => handleScoreChange('korean', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">영어 점수</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.english}
                onChange={(e) => handleScoreChange('english', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">수학 점수</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.scores.math}
                onChange={(e) => handleScoreChange('math', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* 출석률 및 학습 진행률 */}
          <div className="form-section-title" style={{ marginTop: '28px' }}>
            출석 및 학습 현황
          </div>
          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">출석률 (%)</label>
              <input
                type="number"
                name="attendance"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">평균 학습 진행률 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress.math}
                onChange={(e) => {
                  const val = e.target.value;
                  handleProgressChange('korean', val);
                  handleProgressChange('english', val);
                  handleProgressChange('math', val);
                }}
                className="form-input"
              />
            </div>
          </div>

          {/* 메모 및 평가 */}
          <div className="form-section-title" style={{ marginTop: '28px' }}>
            평가 및 메모
          </div>
          <div className="form-group">
            <textarea
              name="memo"
              rows={4}
              value={formData.memo}
              onChange={handleChange}
              placeholder="학생에 대한 추가 메모나 학습 평가를 입력하세요."
              className="form-textarea"
            />
          </div>

          {/* 하단 액션 버튼 */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
