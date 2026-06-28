import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore.js';
import { routes } from "@/router/routes.js";

const routesRouter = [
    // Rutas públicas
    {
        path: '/',
        redirect: '/login',
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Auth/RegisterView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/Auth/ForgotPasswordView.vue'),
        meta: { requiresAuth: false }
    },
    // Rutas protegidas
    {
        path: '/student/dashboard',
        name: 'StudentDashboard',
        component: () => import('@/views/student/DashboardView.vue'),
        meta: { requiresAuth: true, allowedRoles: [3] }
    },
    {
        path: '/student/forms/:id',
        name: 'StudentForm',
        component: () => import('@/views/student/FormView.vue'),
        meta: { requiresAuth: true, allowedRoles: [3] }
    },
    {
        path: '/student/forms/:formId/attempts/:attemptId/results',
        name: 'AttemptResults',
        component: () => import('@/views/student/InterpretacionView.vue'),
        meta: { requiresAuth: true, allowedRoles: [3] }
    },

    {
        path: '/tutor/dashboard',
        name: 'TutorDashboard',
        component: () => import('@/views/tutor/TutorDashboard.vue'),
        meta: { requiresAuth: true, allowedRoles: [2] }
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
        if (authStore.token && !authStore.user) {
            // Si hay un token pero no hay información del usuario, intentar inicializar la autenticación
            console.log('Checking authentication status with token');
            await authStore.checkAuthStatus();
        }

        const isAuthenticated = authStore.isAuthenticated;
        const userRole = authStore.user?.roles_id;

        // Verificar si la ruta requiere autenticación y si el usuario no está autenticado
        if (to.meta.requiresAuth && !isAuthenticated) {
            console.log('Redirection to Login: route requires authentication and user is not authenticated');
            return next({ name: 'Login' });
        }

        // Verificar si la ruta tiene restricciones de rol y si el usuario no tiene el rol permitido
        if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
            console.log('Redirection to Login: user role not allowed for this route. User role:', userRole, 'Allowed roles:', to.meta.allowedRoles);
            if (userRole === 2) return next(routes.tutorDashboard);
            if (userRole === 3) return next(routes.studentDashboard);

            return next({ name: 'Login' });
        }

        // Si todo está bien, permitir la navegación a la ruta solicitada
        console.log('Navigation allowed to route:', to.name);
        next();
    }
);

export default router;

