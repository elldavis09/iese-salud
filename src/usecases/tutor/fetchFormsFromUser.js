import formsService from "@/services/tutor/formsService.js";

export async function fetchFormsFromUser(userId) {
    const response = await formsService.getFormsFromUser(userId);
    return response.data;
}