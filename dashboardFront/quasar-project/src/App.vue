<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="pa-route" mode="out-in">
      <component :is="Component" :key="route.matched[0]?.path" />
    </Transition>
  </router-view>
</template>

<script setup>
//
</script>
