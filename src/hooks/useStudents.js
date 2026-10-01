'use client'

import {studentsApi} from '@/api/studentsApi'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const {getStudents, getStudentById, createStudent, updateStudent, deleteStudents} = studentsApi;

// 캐시에 저장될 키값
export const STUDENTS_QUERY_KEY = ['students'];

// 전체 학생 목록 조회 hook
export const useStudentsQuery = () => {
    return useQuery({
        queryKey: STUDENTS_QUERY_KEY,
        queryFn: getStudents
    });
};

// 특정 학생 상세조회 hook
export const useStudentsDetailQuery = (id) => {
    return useQuery({
        queryKey: [...STUDENTS_QUERY_KEY, id],
        queryFn: () => getStudentById(id),
        enabled: !!id
    });
};

// 학생 추가 hook
export const useCreateStudentMutaion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY })
        }
    })
};

// 학생 정보 수정 hook
export const useUpdateStudentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStudent,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
        },
    });
};

// 학생 삭제 hook
export const useDeleteStudentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStudents,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: STUDENTS_QUERY_KEY });
        },
    });
};