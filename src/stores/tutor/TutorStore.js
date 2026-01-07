import {ref} from "vue";
import {defineStore} from "pinia";
import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export const useTutorGrupoHasStudentsStore = defineStore('tutorGrupoHasStudents', () => {
    const groups = ref([]);
    const students = ref([]);
    const student = ref([]);
    const interpretaciones = ref([]);
    const attemptId = ref(null);

    const isLoading = ref(false);
    const error = ref(null);

    const fetchGroups = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await tutorGroupHasStudentsService.getAllGroups();
            console.log(data);
            groups.value = data.data;
            return true;
        } catch (err) {
            error.value = 'Error: ' + err.message || 'Error fetching groups';
        } finally {
            isLoading.value = false;
        }
    }

    const fetchStudentsByGroupId = async (groupId) => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await tutorGroupHasStudentsService.getStudentsByGroupId(groupId);
            students.value = data.data;
        } catch (err) {
            error.value = err.message || 'Error fetching students';
        } finally {
            isLoading.value = false;
        }
    }

    const fetchDataStudentById = async (groupId, studentId) => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await tutorGroupHasStudentsService.getDataStudentByGroupId(groupId, studentId);
            student.value = data.data;
        } catch (err) {
            error.value = err.message || 'Error fetching student data';
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    const fetchFormResultsByStudentId = async (studentId, formId) => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await tutorGroupHasStudentsService.getFormResultsByStudentId(studentId, formId);
            interpretaciones.value = data.data.interpretaciones;
            attemptId.value = data.data.intento;
            console.log(data.data);
        } catch (err) {
            error.value = err.message || 'Error fetching form results';
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        groups,
        students,
        student,
        interpretaciones,
        attemptId,
        isLoading,
        error,
        fetchGroups,
        fetchStudentsByGroupId,
        fetchDataStudentById,
        fetchFormResultsByStudentId
    };
});
