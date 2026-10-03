<template>
  <q-page class="pa-page">
    <div class="pa-container">

      <header class="pa-header">
        <h1 class="pa-title">Pontos</h1>
        <p class="pa-subtitle">Todos os pontos de venda cadastrados</p>
      </header>

      <q-banner v-if="erro" rounded class="bg-red-1 text-negative q-mb-lg">
        Não foi possível carregar os pontos. O servidor pode estar iniciando, tente novamente em instantes.
        <template v-slot:action>
          <q-btn flat no-caps color="negative" label="Tentar novamente" @click="carregarPontos" />
        </template>
      </q-banner>

      <div class="pa-card pa-card--tabela">

        <div class="row items-center justify-between q-col-gutter-md pa-tabela-topo">
          <div class="col-12 col-sm-auto">
            <div class="pa-secao-titulo">
              {{ carregando ? 'Carregando...' : `${pontos.length} ${pontos.length === 1 ? 'ponto' : 'pontos'}` }}
            </div>
          </div>

          <div class="col-12 col-sm-5">
            <q-input
              v-model="filtro"
              label="Buscar por nome, telefone, bairro, cidade ou tipo"
              dense
              outlined
              clearable
            />
          </div>
        </div>

        <q-table
          v-model:pagination="paginacao"
          :rows="pontos"
          :columns="columns"
          :filter="filtro"
          :loading="carregando"
          :rows-per-page-options="[10, 25, 50, 0]"
          rows-per-page-label="Linhas por página"
          no-data-label="Nenhum ponto cadastrado ainda."
          no-results-label="Nenhum ponto corresponde à busca."
          :pagination-label="(inicio, fim, total) => `${inicio}-${fim} de ${total}`"
          table-header-class="pa-thead"
          row-key="_id"
          flat
        >

          <template v-slot:body-cell-nome="props">
            <q-td :props="props">
              <span class="pa-ponto-nome">{{ props.row.nome }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-tipo="props">
            <q-td :props="props">
              <span class="pa-tipo">{{ props.row.tipo }}</span>
            </q-td>
          </template>

          <template v-slot:body-cell-acoes="props">
            <q-td :props="props" class="text-right">
              <DeleteButton
                :label="`Excluir ${props.row.nome}`"
                @click="confirmarExclusao(props.row)"
              />
            </q-td>
          </template>

        </q-table>
      </div>

    </div>

    <ConfirmDialog
      v-model="dialogExclusao"
      icon="delete_outline"
      title="Excluir ponto?"
      message="O ponto e todas as ações registradas nele serão excluídos. Esta operação não pode ser desfeita."
      confirm-label="Excluir ponto"
      intent="danger"
      @confirm="excluirPonto"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import DeleteButton from '../components/DeleteButton.vue'
import { apiFetch } from '../services/api.js'
import { notificar } from '../services/notificacoes.js'

const $q = useQuasar()
const pontos = ref([])
const carregando = ref(true)
const erro = ref(false)
const filtro = ref('')
const dialogExclusao = ref(false)
const pontoSelecionado = ref(null)
const paginacao = ref({ sortBy: 'nome', descending: false, rowsPerPage: 10 })

const ordenarTexto = (a, b) => String(a || '').localeCompare(String(b || ''), 'pt-BR')

const columns = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true, sort: ordenarTexto },
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left', sortable: true, sort: ordenarTexto },
  { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'left', format: (valor) => valor || '—' },
  { name: 'endereco', label: 'Endereço', field: 'endereco', align: 'left' },
  { name: 'bairro', label: 'Bairro', field: 'bairro', align: 'left', sortable: true, sort: ordenarTexto },
  { name: 'cidade', label: 'Cidade', field: 'cidade', align: 'left', sortable: true, sort: ordenarTexto },
  { name: 'acoes', label: '', field: '_id', align: 'right' }
]

function confirmarExclusao(ponto) {
  pontoSelecionado.value = ponto
  dialogExclusao.value = true
}

async function excluirPonto() {
  const ponto = pontoSelecionado.value
  if (!ponto) return

  try {
    const response = await apiFetch(`/pontos/${ponto._id}`, { method: 'DELETE' })
    if (!response.ok) {
      throw new Error('Não foi possível excluir o ponto.')
    }

    pontos.value = pontos.value.filter((item) => item._id !== ponto._id)
    notificar($q, 'sucesso', 'Ponto e ações excluídos com sucesso.')
  } catch (error) {
    console.error('Erro ao excluir ponto:', error)
    notificar($q, 'erro', error.message || 'Não foi possível excluir o ponto.')
  } finally {
    pontoSelecionado.value = null
  }
}

async function carregarPontos() {
  carregando.value = true
  erro.value = false

  try {
    const response = await apiFetch('/pontos')
    if (!response.ok) {
      throw new Error('Falha ao carregar pontos')
    }
    pontos.value = await response.json()
  } catch (e) {
    erro.value = true
    console.error('Erro ao carregar pontos:', e)
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  carregarPontos()
})
</script>

<style scoped>
.pa-page {
  --pa-navy: #0B3C5D;
  --pa-orange: #FF7A1A;
  --pa-borda: #E3E8EE;
  --pa-suave: #5F6B7A;

  background: #F4F6F9;
}

.pa-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 48px;
}

.pa-header {
  margin-bottom: 28px;
}

.pa-title {
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--pa-navy);
}

.pa-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 4px;
  margin-top: 12px;
  border-radius: 2px;
  background: var(--pa-orange);
}

.pa-subtitle {
  margin: 12px 0 0;
  color: var(--pa-suave);
}

.pa-card {
  background: #fff;
  border: 1px solid var(--pa-borda);
  border-radius: 12px;
}

.pa-card--tabela {
  overflow: hidden;
}

.pa-tabela-topo {
  margin: 0;
  padding: 16px 24px;
  border-bottom: 1px solid var(--pa-borda);
}

.pa-secao-titulo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-ponto-nome {
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-tipo {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--pa-navy);
  background: rgba(11, 60, 93, 0.08);
  border-radius: 999px;
}

.pa-card--tabela :deep(.pa-thead th) {
  font-weight: 700;
  font-size: 0.8125rem;
  color: var(--pa-navy);
  background: #F8FAFC;
}
</style>