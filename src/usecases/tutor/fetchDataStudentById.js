import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export async function fetchDataStudentById(groupId, studentId) {
    const data = await tutorGroupHasStudentsService.getDataStudentByGroupId(groupId, studentId);
    return data.data;
}