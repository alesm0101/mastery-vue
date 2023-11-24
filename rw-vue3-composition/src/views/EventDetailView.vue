<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService, { type Event } from '@/services/EventServices'

// const event: Ref<Partial<Event>> = ref({});
const event = ref({} as Event)

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

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
  <div>
    <h1>{{ event.title }}</h1>
    <div class="events">
      <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>