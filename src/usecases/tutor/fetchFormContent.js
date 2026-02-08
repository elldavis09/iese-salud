import formsService from "@/services/tutor/formsService.js";

export async function fetchFormContent(formId) {
    const data = await formsService.getForm(formId);
    return data.data;
}