<script setup lang="ts">
import {  RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider
    :theme="{
      token : {
        borderRadius: 2,
      }
    }"
  >
    <RouterView />
  </a-config-provider>
</template>
