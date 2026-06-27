import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '../stores/authStore.js';
import {routes} from "@/router/routes.js";

const routesRouter = [
    // Rutas públicas
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: {guest: true}
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Auth/RegisterView.vue'),
        meta: {guest: true}
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/Auth/ForgotPasswordView.vue'),
        meta: {guest: true}
    },
    // Rutas protegidas
    {
        path: '/student/dashboard',
        name: 'StudentDashboard',
        component: () => import('@/views/student/DashboardView.vue'),
        meta: {requiresAuth: true, allowRoles: ['student']}
    },
    {
        path: '/student/forms/:id',
        name: 'StudentForm',
        component: () => import('@/views/student/FormView.vue'),
        meta: {requiresAuth: true, allowRoles: ['student']}
    },
    {
        path: '/student/forms/:formId/attempts/:attemptId/results',
        name: 'AttemptResults',
        component: () => import('@/views/student/InterpretacionView.vue'),
        meta: {requiresAuth: true, allowRoles: ['student']}
    },

    {
        path: '/tutor/dashboard',
        name: 'TutorDashboard',
        component: () => import('@/views/tutor/TutorDashboard.vue'),
        meta: {requiresAuth: true, allowRoles: ['tutor']}
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routesRouter
});

/**
 * Guard de navegación global para manejar la autenticación y redirección de rutas.
 * Este guard se ejecuta antes de cada cambio de ruta.
 */
router.beforeEach(
    async (to, from, next) => {
        // Inicializar el store de autenticación y el store de usuario
        const authStore = useAuthStore();

        // Asegurarse de que la autenticación esté inicializada antes de verificar el estado
        await authStore.initializeAuth();

        const isAuthenticated = authStore.isAuthenticated;
        const userRole = authStore.user?.roles_id;

        // Verificar si la ruta requiere autenticación y si el usuario no está autenticado
        if (to.meta.requiresAuth && isAuthenticated) {
            next('/login');
            // Verificar si la ruta es para invitados y el usuario ya está autenticado
        } else if (to.meta.guest && isAuthenticated) {
            if (userRole === 2) {
                next(routes.tutorDashboard);
            } else {
                next(routes.studentDashboard);
            }
        } else {
            next();
        }
    }
);

export default router;

