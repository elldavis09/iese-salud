// Definir un objeto de rutas para mantener la coherencia
// Solo se define la ruta sin los componentes ni meta
// Si las rutas aceptan paraámetros dinámicos, se pueden definir como funciones
export const routes = {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    studentDashboard: '/student/dashboard',
    studentForm: (id) => `/student/forms/${id}`,
    studentFormResults: (formId, attemptId) => `/student/forms/${formId}/attempts/${attemptId}/results`,
    tutorDashboard: '/tutor/dashboard',
    tutorGroupFormAnalytics: (groupId, formId) => `/tutor/groups/${groupId}/forms/${formId}/analytics`,
};