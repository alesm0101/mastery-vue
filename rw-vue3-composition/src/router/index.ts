import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventListView.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventEdit from '../views/event/EventEdit.vue'
import EventRegister from '../views/event/EventRegister.vue'
import EventLayout from "../views/event/EventLayout.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: ((route) => ({ page: parseInt(route.query.page as string) || 1 }) ),
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
          component: EventEdit
        }
      ]
    },
    {
      // redirect from events to event because the nested children
      path: "/events/:afterEvent(.*)",
      redirect: (to) => {
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
      component: () => import('../views/AboutView.vue')
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
})

export default router
