
<script setup lang="ts">
import { computed, inject, watch } from 'vue' // onMounted, watchEffect

const gNotify: any = inject('GStore')

const counter = computed(() => gNotify.count)


/*
refactor:
update string instead of array and handle count internally
*/

watch(
  counter, (newValue, oldValue) => {
    const isAdding = newValue > oldValue
    if (isAdding) {
      const lastMessageID = gNotify.messages.at(gNotify.messages.length - 1)
      if (gNotify.messages.length) {
        setTimeout(() => {
          console.log('setTimeout')
          gNotify.messages = gNotify.messages.filter((n: any) => n.id !== lastMessageID.id)
        }, 3000)
      }
    }
  });

/* onMounted(() => {
  watchEffect(() => {})
}) */
</script>

<template>
  <div class="notify">
    <div class="notifyMessage" v-for="notify in gNotify.messages" :key="notify.id">
      {{ notify.id }}
    </div>
  </div>
</template>

<style scoped>
.notify {
  position: fixed;
  top: 2rem;
}

@keyframes yellowfade {
  from {
    background: yellow;
    opacity: 1;
  }

  to {
    background: transparent;
    opacity: 0;
  }
}

.notifyMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
  /* TODO add transition after remove */
}
</style>
