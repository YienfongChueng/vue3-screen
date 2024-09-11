import { createRouter,createWebHashHistory} from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: ()=> import('@/views/map1/index.vue')
    },
    {
        path: '/indexMap',
        name: 'indexMap',
        component: ()=> import('@/views/map2/indexMap.vue')
    }
]

export default createRouter({
    routes,
    history: createWebHashHistory()
})