import { refreshToken } from '@/api/authorization'
import { useAuthorizationStore } from '@/stores/authorization'
import ActivityPage from '@/views/activities/ActivityPage.vue'
import AddActivity from '@/views/activities/AddActivity.vue'
import EditActivity from '@/views/activities/EditActivity.vue'
import LogIn from '@/views/authorization/LogIn.vue'
import SignUp from '@/views/authorization/SignUp.vue'
import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: LogIn },
    { path: '/signup', name: 'Signup', component: SignUp },
    { path: '/home', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
    { path: '/activities', name: 'Activities', component: ActivityPage, meta: { requiresAuth: true } },
    { path: '/activities/add', name: 'Add Activity', component: AddActivity, meta: { requiresAuth: true } },
    { path: '/activities/:id/edit', name: 'Edit Activity', component: EditActivity, meta: { requiresAuth: true } },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthorizationStore()

  if (!auth.isLoggedIn()) {
    const newToken = await refreshToken()

    if (!newToken && to.name !== 'Login' && to.name !== 'Signup') next({ name: 'Login' })
    else if (newToken) {
      auth.setStudentDetails(newToken)
    }
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    next({ name: 'Login' })
    return
  }

  if (to.name === 'Login' && auth.isLoggedIn()) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
