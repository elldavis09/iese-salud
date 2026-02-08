import analyticsService from "@/services/tutor/analyticsService.js";

export async function fetchAnalyticsByForm(groupId, formId) {
    const data = await analyticsService.fetchFormAnalytics(groupId, formId);
    return data.data;
}