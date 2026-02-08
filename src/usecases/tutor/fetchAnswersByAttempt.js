import attemptService from "@/services/tutor/attemptsService.js";

export async function fetchAnswersByAttempt(attemptId) {
    const data = await attemptService.getAnswersByAttemptId(attemptId);
    return data.data.respuestas;
}