import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import Cabinet from '@/views/Cabinet.vue'
import SignInForm from '@/components/SignInForm.vue'
import OrderList from '@/components/OrderList.vue'
import NewOrder from '@/components/NewOrder.vue'
import ProfileEditer from '@/components/ProfileEditer.vue'
import Order from '@/components/Order.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: "SignIn",
        component: SignIn
    },
    {
        path: '/cabinet',
        name: 'Cabinet',
        component: Cabinet,
        children: [
            {
                path: 'orders/:id',
                component: Order
            },

            {
                path:'orders',
                component: OrderList
            },
            {
                path:'profile',
                component: ProfileEditer
            },
            {
                path: 'new-order/',
                component: NewOrder
            },
            
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
