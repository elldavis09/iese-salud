import ApiService from "../apiService";

const tutorGroupHasStudentsService = {

    getAllGroups: async () => {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData("tutor/groups")
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getStudentsByGroupId: async (groupId) => {
        return new Promise((resolve) => {
            const api = new ApiService();
            api.fetchData(`tutor/groups/${groupId}/students`) // tutor/groups/1/students
                .then((data) => {
                    resolve(data);
                })
                .catch(() => {
                    resolve([]);
                });
        });
    },
    getDataStudentByGroupId: async (groupId, studentId) => { // tutor/groups/1/students/3
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/groups/${groupId}/students/${studentId}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    getFormResultsByStudentId: async (studentId, formId) => {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/students/${studentId}/form/${formId}/interpretations`) // tutor/students/3/form/4/interpretations
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default tutorGroupHasStudentsService;