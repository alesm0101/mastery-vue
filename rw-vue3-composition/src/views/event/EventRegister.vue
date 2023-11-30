<script setup lang="ts">
// import { useRouter } from 'vue-router'
import { inject } from "vue";

// const router = useRouter()
const gNotify: any = inject('GStore')
const { event } = defineProps(['event'])

const register = () => {
  // If registered then redirect to event details
  gNotify.count++
  const idMessage = `register_${gNotify.count}`
  gNotify.messages.push({ id: idMessage, text: `You are successfully registered for ${event.title}` })
  setTimeout(() => {
    gNotify.messages = gNotify.messages.filter((n: any) => n.id !== idMessage)
  }, 5000)

  // router.push adds history, router.replace doesn't
  // router.push({ name: 'EventDetails' })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>