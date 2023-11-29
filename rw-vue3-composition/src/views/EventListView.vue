<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventServices'
import type { EventType } from '@/types/Event' // , 

// const events = ref([] as Array<Event>)
const events = ref<EventType[]>([])

const props = defineProps({
  page: {
    required: true,
    type: Number
  }
})

const page = computed(() => props.page)
const totalPages = ref(0)
const hasNext = computed(() => {
  const _totalPages = Math.ceil(totalPages.value / 2)
  return page.value < _totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalPages.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log(error)
      })
  })

})
</script>

<template>
  <h1>Events for good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink v-if="page > 1" rel="prev" id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }">
        Prev
      </RouterLink>
      <RouterLink v-if="hasNext" rel="next" id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }">
        Next
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>