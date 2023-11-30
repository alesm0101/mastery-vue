
<script setup lang="ts">
import { inject } from 'vue'

const gNotify: any = inject('GStore')

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
  }

  to {
    background: transparent;
  }
}

.notifyMessage {
  animation-name: yellowfade;
  animation-duration: 5s;
}
</style>
