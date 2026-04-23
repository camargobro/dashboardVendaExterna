<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar class="q-pl-md q-pr-md justify-center">
        <div class="row items-center no-wrap q-gutter-x-md">
          <q-btn
            flat
            round
            dense
            :color="isActive('/') ? 'primary' : 'grey-7'"
            label="HOME"
            class="q-mx-xs hover:shadow-3 hover:scale-110 transition-all"
            @click="go('/')"
          />
          <q-btn
            flat
            round
            dense
            :color="isActive('/criar-acao') ? 'primary' : 'grey-7'"
            label="REGISTRAR AÇÃO"
            class="q-mx-xs hover:shadow-3 hover:scale-110 transition-all"
            @click="go('/criar-acao')"
          />
          <q-btn
            flat
            round
            dense
            :color="isActive('/historico-acoes') ? 'primary' : 'grey-7'"
            label="HISTÓRICO DE AÇÕES"
            class="q-mx-xs hover:shadow-3 hover:scale-110 transition-all"
            @click="go('/historico-acoes')"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function go (path) {
  if (route.path !== path) {
    router.push(path)
  }
}

function isActive (path) {
  return route.path === path
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
</style>
