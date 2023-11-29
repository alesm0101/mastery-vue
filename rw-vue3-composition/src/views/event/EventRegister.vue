<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const register = () => {
  // router.push adds history, router.replace doesn't
  router.push({ name: 'EventDetails' })
}
defineProps(['event'])
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me!</button>
</template>