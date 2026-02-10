import formsService from "@/services/tutor/formsService.js";

export async function fetchForms(page) {
    const response = await formsService.getAllFormsByPage(page);
    console.log(response);
    return response.data;
}