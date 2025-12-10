<script setup lang="ts">
import { useAuthorizationStore } from '@/stores/authorization';

const auth = useAuthorizationStore()
</script>

<template>
  <section id="home-page" class="section">
    <h1>Welcome, {{ auth.firstName }}!</h1>
    <p class="lead">View your summary of activities here.</p>
  </section>
</template>
