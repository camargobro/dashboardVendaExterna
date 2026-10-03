<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    transition-show="scale"
    transition-hide="scale"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="pa-confirm" :class="`pa-confirm--${intent}`">
      <q-card-section class="pa-confirm__body">
        <div class="pa-confirm__icon" aria-hidden="true">
          <q-icon :name="icon" size="22px" />
        </div>

        <div class="pa-confirm__copy">
          <h2 class="pa-confirm__title">{{ title }}</h2>
          <p class="pa-confirm__message">{{ message }}</p>
        </div>

        <q-btn
          flat
          round
          dense
          icon="close"
          color="grey-7"
          aria-label="Fechar confirmação"
          class="pa-confirm__close"
          @click="cancelar"
        />
      </q-card-section>

      <q-card-actions align="right" class="pa-confirm__actions">
        <q-btn
          flat
          no-caps
          color="primary"
          :label="cancelLabel"
          @click="cancelar"
        />
        <q-btn
          unelevated
          no-caps
          :color="intent === 'danger' ? 'negative' : 'primary'"
          :label="confirmLabel"
          @click="confirmar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'help_outline'
  },
  confirmLabel: {
    type: String,
    default: 'Confirmar'
  },
  cancelLabel: {
    type: String,
    default: 'Cancelar'
  },
  intent: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

function cancelar() {
  emit('update:modelValue', false)
}

function confirmar() {
  emit('update:modelValue', false)
  emit('confirm')
}
</script>

<style scoped>
.pa-confirm {
  --pa-navy: #0B3C5D;
  --pa-orange: #FF7A1A;
  width: min(420px, calc(100vw - 32px));
  overflow: hidden;
  border: 1px solid #E3E8EE;
  border-top: 3px solid var(--pa-orange);
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(11, 60, 93, 0.16);
}

.pa-confirm--danger {
  --pa-dialog-accent: #C62828;
  border-top-color: var(--pa-dialog-accent);
}

.pa-confirm__body {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 32px;
  align-items: start;
  gap: 14px;
  padding: 24px 24px 20px;
}

.pa-confirm__icon {
  display: grid;
  width: 44px;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 122, 26, 0.12);
  color: var(--pa-orange);
}

.pa-confirm--danger .pa-confirm__icon {
  background: rgba(198, 40, 40, 0.1);
  color: #C62828;
}

.pa-confirm__copy {
  min-width: 0;
}

.pa-confirm__title {
  margin: 0;
  color: var(--pa-navy);
  font-size: 1.125rem;
  line-height: 1.3;
  font-weight: 700;
}

.pa-confirm__message {
  margin: 8px 0 0;
  color: #5F6B7A;
  font-size: 0.9rem;
  line-height: 1.5;
}

.pa-confirm__close {
  margin: -8px -8px 0 0;
}

.pa-confirm__actions {
  gap: 8px;
  padding: 14px 20px 18px;
  border-top: 1px solid #E3E8EE;
}

.pa-confirm__actions :deep(.q-btn) {
  min-height: 40px;
  border-radius: 6px;
  padding: 0 14px;
}

@media (max-width: 420px) {
  .pa-confirm__body {
    grid-template-columns: 38px minmax(0, 1fr) 28px;
    gap: 10px;
    padding: 20px 18px 16px;
  }

  .pa-confirm__icon {
    width: 38px;
  }

  .pa-confirm__actions {
    padding: 12px 14px 16px;
  }
}
</style>
