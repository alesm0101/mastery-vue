<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventServices'
import type { EventType } from '@/types/Event'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

// const event: Ref<Partial<EventType>> = ref({});
const event = ref({} as EventType)

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>


<template>
  <div v-if="event.id">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'EventDetails' }">Detail</RouterLink> |
      <RouterLink :to="{ name: 'EventRegister' }">Register</RouterLink> |
      <RouterLink :to="{ name: 'EventEdit' }">Edit</RouterLink> |
    </nav>
    <RouterView :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>