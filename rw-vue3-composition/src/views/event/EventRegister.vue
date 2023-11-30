<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject } from "vue";

const router = useRouter()
const GStore: any = inject('GStore')
const { event } = defineProps(['event'])

const register = () => {
  // If registered then redirect to event details
  GStore.notifyMessage = 'You are successfully registered for ' + event.title
  setTimeout(() => {
    GStore.notifyMessage = ''
  }, 3000)

  // router.push adds history, router.replace doesn't
  router.push({ name: 'EventDetails' })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>