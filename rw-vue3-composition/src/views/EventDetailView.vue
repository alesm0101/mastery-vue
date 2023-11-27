<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventServices' // , { type Event }
import { type EventApi } from '@/models/Event' // , 

// const event: Ref<Partial<EventApi>> = ref({});
const event = ref({} as EventApi)

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