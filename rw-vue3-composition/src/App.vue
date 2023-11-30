<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppNotify from '@/components/AppNotify.vue'
</script>

<template>
  <div>
    <AppNotify />
    <div id="layout">
      <header>
        <div class="wrapper">
          <nav>
            <RouterLink :to="{ name: 'EventList' }">Events</RouterLink> |
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  :is(a) {
    font-weight: bold;
    color: #2c3e50;
  }
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
