import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export async function fetchStudentsByGroupId(groupId) {
    const data = await tutorGroupHasStudentsService.getStudentsByGroupId(groupId);
    return data.data;
}