'use client';

import { useRouter } from 'next/navigation';
import {useCreateStudentMutaion} from '@/hooks/useStudents';
import StudentForm from '@/components/students/StudentForm';

export default function NewStudentPage() {
  const router = useRouter();
  const createMutation = useCreateStudentMutaion();

  const handleCreateStudent = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        alert('학생이 성공적으로 등록되었습니다.');
        router.push('/students');
      },
      onError: () => {
        alert('학생 등록에 실패했습니다. 다시 시도해 주세요.');
      },
    });
  };

  return (
    <div>
      <StudentForm
        onSubmit={handleCreateStudent}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
