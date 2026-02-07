import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export async function fetchGroups() {
    const data = await tutorGroupHasStudentsService.getAllGroups();
    return data.data;
}