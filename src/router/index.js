import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '../stores/auth.js';
import LoginView from '../views/Auth/LoginView.vue';
import DashboardView from '@/views/student/DashboardView.vue';
import RegisterView from '../views/Auth/RegisterView.vue';
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue';
import FormView from '@/views/student/FormView.vue';
import InterpretacionView from "@/views/student/InterpretacionView.vue";
import TutorDashboard from "@/views/tutor/TutorDashboard.vue";
import {useUserStore} from "@/stores/user.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: LoginView, meta: {guest: true}},
        {path: '/register', component: RegisterView, meta: {guest: true}},
        {path: '/forgot-password', component: ForgotPasswordView, meta: {guest: true}},
        {path: '/student/dashboard', component: DashboardView, meta: {requiresAuth: true}},
        {path: '/student/forms/:id', component: FormView, meta: {requiresAuth: true}},
        {path: '/student/forms/:formId/attempts/:attemptId/results', component: InterpretacionView, meta: {requiresAuth: true}},
        {path: '/tutor/dashboard', component: TutorDashboard, meta: {requiresAuth: true}},
    ]
});

// Guard de navegación
router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    const userStore = useUserStore();

    await auth.initializeAuth();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login');
    } else if (to.meta.guest && auth.isAuthenticated) {
        await userStore.fetchUserData();
        if (userStore.role === 'tutor') {
            next('/tutor/dashboard');
        } else {
            next('/student/dashboard');
        }
    } else {
        next();
    }
});

export default router;

