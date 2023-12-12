
<script setup lang="ts">
import { inject, onMounted, watchEffect } from 'vue'

const gNotify: any = inject('GStore')


onMounted(() => {
  watchEffect(() => {
    const lastMessageID = gNotify.messages.at(gNotify.messages.length - 1)
    if (gNotify.messages.length) {
      setTimeout(() => {
        gNotify.messages = gNotify.messages.filter((n: any) => n.id !== lastMessageID.id)
      }, 3000)
    }
  })

})
</script>

<template>
  <div class="notify">
    <div class="notifyMessage" v-for="notify in gNotify.messages" :key="notify.id">
      {{ notify.text }}
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
