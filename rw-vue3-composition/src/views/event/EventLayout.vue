<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventServices'
import type { EventType } from '@/types/Event'
import { useRouter } from 'vue-router';

import { useEventStore } from "@/stores/event";

// use Pinia store:
const store = useEventStore();

const props = defineProps({
  id: {
    required: true,
    type: Number
  }
})
const router = useRouter()

// const event: Ref<Partial<EventType>> = ref({});
const event = ref({} as EventType)

// destructuring action method doesn't require using storeToRefs:
const { deleteEvent: storeDeleteEvent } = store;

const ondeleteEvent = () => {
  storeDeleteEvent(props.id);
  router.push({ name: 'EventList' })
}

onMounted(() => {
  EventService.getEvent(props.id)
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      console.log(error)
      if (error.response && error.response.status === 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        router.push({ name: 'NetworkError' })
      }
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
      <button @click="ondeleteEvent">Delete</button>
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