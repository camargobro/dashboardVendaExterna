<template>
  <q-btn
    flat
    round
    dense
    color="negative"
    icon="delete_outline"
    :aria-label="label"
    @click="emit('click', $event)"
  >
    <q-tooltip>{{ label }}</q-tooltip>
  </q-btn>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Excluir'
  }
})

const emit = defineEmits(['click'])
</script>
