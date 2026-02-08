import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export async function fetchFormResultsByStudentId(studentId, formId) {
    const data = await tutorGroupHasStudentsService.getFormResultsByStudentId(studentId, formId);
    return data.data;
}