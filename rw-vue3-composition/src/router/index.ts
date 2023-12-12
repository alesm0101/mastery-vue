import { createRouter, createWebHistory, type RouteLocation, type RouteLocationNormalized } from 'vue-router'
import EventList from '../views/EventListView.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventEdit from '../views/event/EventEdit.vue'
import EventRegister from '../views/event/EventRegister.vue'
import EventLayout from "../views/event/EventLayout.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import { inject } from "vue";

// lazyloading
// ChunkName for vite: https://router.vuejs.org/guide/advanced/lazy-loading.html#With-Vite
const About = () => import( '../views/AboutView.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: ((route: RouteLocationNormalized) => ({ page: parseInt(route.query.page as string) || 1 }) ),
    // beforeEnter (to, from, next) {
    //   const page = parseInt(to.query.page as string) || 0 
    //   if (page > 0 ) {
    //       next()
    //   } else {
    //     const updateTo = {
    //       ...to,
    //       query: {}
    //     }
    //     console.log(updateTo)
    //     next(updateTo)
    //   }
    // },
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }

      }
    ]
  },
  {
    // redirect from events to event because the nested children
    path: "/events/:afterEvent(.*)",
    redirect: (to: RouteLocation) => {
      return { path: "/event/" + to.params.afterEvent };
    },
  },
  {
    path: '/about',
    name: 'About',
    // alias:  '/about-us', // don't use to avoid ceo duplicate
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  { 
    path: '/about-us', 
    redirect: { name: "About" }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound  
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError    
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
});



router.beforeEach((to, from: any) => {
  // NProgress.start()
  const gNotify: any = inject('GStore')

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    gNotify.messages.push({ id: 'requireAuth', text: 'Sorry, you are not authorized to view this page' })

    if (from.href) { // <--- If this navigation came from a previous page.
      return false
    } else {  // <--- Must be navigating directly
      return { path: '/' }  // <--- Push navigation to the root route.
    }
  }
})


export default router
