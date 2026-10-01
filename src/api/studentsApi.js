const BASE_URL = "http://localhost:4000/students";

export const studentsApi = {
    getStudents: async () => {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("학생 목록을 불러오는데 실패했습니다.");
        }
        return response.json();
    },
    getStudentById: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`학생 정보(ID: ${id})를 불러오는데 실패했습니다.`);
        }
        return response.json();
    },
    createStudent: async (studentData) => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            throw new Error("학생 정보를 등록하는데 실패했습니다.");
        }
        return response.json();
    },
    updateStudent: async ({ id, data }) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("학생 정보를 수정하는데 실패했습니다.");
        }
        return response.json();
    },
    deleteStudents: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("학생 정보를 삭제하는데 실패했습니다.");
        }
        return true;
    }
};