<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted } from 'vue'
import EventService, { type Event } from '@/services/EventServices'

// const events = ref([] as Array<Event>)
const events = ref<Event[]>([])

onMounted(() => {
  EventService.getEvents()
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>