import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventListView.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventEdit from '../views/event/EventEdit.vue'
import EventRegister from '../views/event/EventRegister.vue'
import EventLayout from "../views/event/EventLayout.vue";

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
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
