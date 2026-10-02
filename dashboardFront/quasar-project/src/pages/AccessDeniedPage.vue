<template>
  <main class="denied-page">
    <div class="denied-mark" aria-hidden="true">!</div>
    <p class="denied-eyebrow">ACESSO RESTRITO</p>
    <h1>Área exclusiva para administradores</h1>
    <p class="denied-copy">Esta conta não tem permissão para visualizar os dados da operação.</p>
    <q-btn color="primary" unelevated no-caps icon="logout" label="Sair da conta" @click="sair" />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { clearSession } from 'src/services/auth'

const router = useRouter()

function sair () {
  clearSession()
  router.replace('/login')
}
</script>

<style scoped>
.denied-page {
  --navy: #0b3c5d;
  --orange: #ff7a1a;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  background: #f4f6f9;
  text-align: center;
}

.denied-mark {
  display: grid;
  width: 52px;
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid var(--orange);
  border-radius: 50%;
  color: var(--orange);
  font-size: 1.5rem;
  font-weight: 700;
}

.denied-eyebrow {
  margin: 24px 0 8px;
  color: var(--orange);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

h1 {
  max-width: 520px;
  margin: 0;
  color: var(--navy);
  font-size: 1.75rem;
  line-height: 1.25;
}

.denied-copy {
  max-width: 420px;
  margin: 12px 0 24px;
  color: #5f6b7a;
}
</style>