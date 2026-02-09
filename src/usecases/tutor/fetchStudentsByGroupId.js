import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export async function fetchStudentsByGroupId(groupId, options = {}) {
    const data = await tutorGroupHasStudentsService.getStudentsByGroupId(groupId, options);
    return data.data;
}