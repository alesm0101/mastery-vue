<script setup lang="ts">
import type { EventType } from '@/types/Event'
import type { PropType } from 'vue'

// const event: Ref<Partial<EventType>> = ref({});

defineProps({
  event: {
    type: Object as PropType<EventType>,
    required: true
  }
})
</script>

<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
