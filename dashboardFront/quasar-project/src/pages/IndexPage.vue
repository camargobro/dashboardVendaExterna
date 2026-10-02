<template>
  <div class="pa-page">
    <div class="pa-container">

      <header class="pa-header">
        <h1 class="pa-title">Dashboard de Vendas Externas</h1>
        <p class="pa-subtitle">Média de vendas por visita em cada local</p>
      </header>

      <q-banner v-if="erro" rounded class="bg-red-1 text-negative q-mb-lg">
        Não foi possível carregar os dados. O servidor pode estar iniciando, tente novamente em instantes.
        <template v-slot:action>
          <q-btn flat color="negative" label="Tentar novamente" @click="buscarDados" />
        </template>
      </q-banner>

      <div class="row q-col-gutter-md q-mb-lg">
        <div v-for="item in resumo" :key="item.label" class="col-12 col-sm-4">
          <div class="pa-card">
            <div class="pa-label">{{ item.label }}</div>
            <div class="pa-numero">{{ carregando ? '—' : item.valor }}</div>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div v-for="d in destaques" :key="d.chave" class="col-12 col-md-6">
          <div class="pa-card pa-destaque" :class="`pa-destaque--${d.chave}`">

            <div class="pa-destaque-titulo">{{ d.titulo }}</div>

            <div class="row items-start justify-between no-wrap q-col-gutter-md">
              <div class="col">
                <div class="pa-ponto-nome">
                  {{ d.ponto.nome || (carregando ? 'Carregando...' : 'Sem dados') }}
                </div>
                <div class="pa-label">
                  {{ d.ponto.endereco || 'Endereço não informado' }}
                </div>
              </div>

              <div class="col-auto text-right">
                <div class="pa-media">{{ formatarDecimal(d.ponto.mediaVendas) }}</div>
                <div class="pa-label">vendas/visita</div>
              </div>
            </div>

            <div class="row pa-stats">
              <div class="col-4">
                <div class="pa-label">Visitas</div>
                <div class="pa-stat">{{ formatarInteiro(d.ponto.totalVisitas) }}</div>
              </div>
              <div class="col-4">
                <div class="pa-label">Vendas</div>
                <div class="pa-stat">{{ formatarInteiro(d.ponto.totalVendas) }}</div>
              </div>
              <div class="col-4">
                <div class="pa-label">Leads</div>
                <div class="pa-stat">{{ formatarInteiro(d.ponto.totalLeads) }}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="pa-card pa-card--tabela">

        <div class="row items-center justify-between pa-tabela-topo">
          <div>
            <div class="pa-secao-titulo">Ranking de performance</div>
            <div class="pa-label">Ordenado pela média de vendas por visita</div>
          </div>
          <q-btn
            outline
            color="primary"
            label="Exportar planilha"
            no-caps
            @click="baixarRanking"
          />
        </div>

        <q-table
          v-model:pagination="pagination"
          :rows="ranking"
          :columns="columns"
          :loading="carregando"
          :rows-per-page-options="[10, 25, 50, 0]"
          rows-per-page-label="Linhas por página"
          no-data-label="Nenhum ponto encontrado"
          :pagination-label="(inicio, fim, total) => `${inicio}-${fim} de ${total}`"
          table-header-class="pa-thead"
          row-key="nome"
          flat
        >

          <template v-slot:body-cell-pos="props">
            <q-td :props="props" :class="['pa-pos', { 'pa-pos--top': props.row.pos <= 3 }]">
              {{ props.row.pos }}
            </q-td>
          </template>

          <template v-slot:body-cell-nome="props">
            <q-td :props="props">
              <div class="pa-ponto-nome">{{ props.row.nome }}</div>
              <div class="pa-label">{{ props.row.endereco }}</div>
            </q-td>
          </template>

          <template v-slot:body-cell-mediaVendas="props">
            <q-td :props="props">
              <div class="pa-barra-wrap">
                <div class="pa-barra">
                  <div
                    class="pa-barra-fill"
                    :style="{ width: larguraBarra(props.row.mediaVendas) }"
                  ></div>
                </div>
                <span class="pa-barra-valor">{{ formatarDecimal(props.row.mediaVendas) }}</span>
              </div>
            </q-td>
          </template>

        </q-table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from 'src/services/api'

const totalVendas = ref(0)
const totalAcoes = ref(0)
const totalLeads = ref(0)

const ranking = ref([])

const melhorVendas = ref({})
const piorPonto = ref({})

const carregando = ref(true)
const erro = ref(false)

const pagination = ref({ rowsPerPage: 10 })

function formatarInteiro(valor) {
  return Number(valor || 0).toLocaleString('pt-BR')
}

function formatarDecimal(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const resumo = computed(() => [
  { label: 'Total de ações', valor: formatarInteiro(totalAcoes.value) },
  { label: 'Total de vendas', valor: formatarInteiro(totalVendas.value) },
  { label: 'Total de leads', valor: formatarInteiro(totalLeads.value) }
])

const destaques = computed(() => [
  { chave: 'melhor', titulo: 'Melhor ponto', ponto: melhorVendas.value },
  { chave: 'pior', titulo: 'Pior ponto', ponto: piorPonto.value }
])

const maiorMedia = computed(() =>
  Math.max(0, ...ranking.value.map(item => item.mediaVendas))
)

function larguraBarra(valor) {
  if (!maiorMedia.value) return '0%'
  return `${(valor / maiorMedia.value) * 100}%`
}

const columns = [
  {
    name: 'pos',
    label: '#',
    field: 'pos',
    align: 'left'
  },
  {
    name: 'nome',
    label: 'Ponto',
    field: 'nome',
    align: 'left'
  },
  {
    name: 'visitas',
    label: 'Visitas',
    field: 'visitas',
    align: 'center',
    format: valor => formatarInteiro(valor)
  },
  {
    name: 'mediaVendas',
    label: 'Média vendas',
    field: 'mediaVendas',
    align: 'left'
  },
  {
    name: 'mediaLeads',
    label: 'Média leads',
    field: 'mediaLeads',
    align: 'center',
    format: valor => formatarDecimal(valor)
  }
]

async function buscarDados() {
  carregando.value = true
  erro.value = false

  try {

    const responseDashboard = await apiFetch('/dashboard')

    const responseRanking = await apiFetch('/dashboard/ranking')

    if (!responseDashboard.ok) {
      throw new Error('Erro ao buscar dados do dashboard')
    }

    const dataDashboard = await responseDashboard.json()

    totalVendas.value = dataDashboard.totalVendas
    totalAcoes.value = dataDashboard.totalAcoes
    totalLeads.value = dataDashboard.totalLeads

    if (responseRanking.ok) {

      const dataRanking = await responseRanking.json()

      ranking.value = dataRanking.ordenado.map((item, index) => ({
        pos: index + 1,

        nome: item.nome,

        endereco: item.endereco || 'Endereço não informado',

        visitas: item.totalVisitas,

        mediaVendas: Math.round(item.mediaVendas * 100) / 100,

        mediaLeads: Math.round(item.mediaLeads * 100) / 100
      }))

      melhorVendas.value = dataRanking.melhorVendas || {}

      piorPonto.value = dataRanking.piorPonto || {}
    } else {
      erro.value = true
    }

  } catch (e) {
    erro.value = true
    console.error('Erro ao carregar o dashboard:', e)
  } finally {
    carregando.value = false
  }
}

onMounted(() => {
  buscarDados()
})

async function baixarRanking() {
  try {
    const resp = await apiFetch('/dashboard/ranking/xlsx')
    if (!resp.ok) throw new Error('Erro ao baixar XLSX')

    const blob = await resp.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = 'ranking.xlsx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(blobUrl)
  } catch (e) {
    console.error('Erro ao baixar ranking XLSX:', e)
  }
}
</script>

<style scoped>
.pa-page {
  --pa-navy: #0B3C5D;
  --pa-orange: #FF7A1A;
  --pa-bom: #2E7D32;
  --pa-ruim: #C62828;
  --pa-borda: #E3E8EE;
  --pa-suave: #5F6B7A;

  min-height: 100vh;
  width: 100%;
  background: #F4F6F9;
}

.pa-container {
  max-width: 1280px;
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
  height: 100%;
  padding: 20px 24px;
  background: #fff;
  border: 1px solid var(--pa-borda);
  border-radius: 12px;
}

.pa-card--tabela {
  padding: 0;
  overflow: hidden;
}

.pa-label {
  font-size: 0.8125rem;
  color: var(--pa-suave);
}

.pa-numero {
  margin-top: 4px;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-destaque {
  border-left: 4px solid var(--pa-cor);
}

.pa-destaque--melhor {
  --pa-cor: var(--pa-bom);
}

.pa-destaque--pior {
  --pa-cor: var(--pa-ruim);
}

.pa-destaque-titulo {
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--pa-cor);
}

.pa-ponto-nome {
  font-size: 1.125rem;
  line-height: 1.3;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-media {
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 700;
  color: var(--pa-cor);
}

.pa-stats {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--pa-borda);
}

.pa-stat {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-tabela-topo {
  padding: 20px 24px;
  border-bottom: 1px solid var(--pa-borda);
}

.pa-secao-titulo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-pos {
  width: 56px;
  font-weight: 700;
  color: var(--pa-suave);
}

.pa-pos--top {
  color: var(--pa-navy);
}

.pa-barra-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 180px;
}

.pa-barra {
  flex: 1;
  height: 8px;
  background: #EEF1F5;
  border-radius: 4px;
  overflow: hidden;
}

.pa-barra-fill {
  height: 100%;
  background: var(--pa-orange);
  border-radius: 4px;
}

.pa-barra-valor {
  min-width: 48px;
  text-align: right;
  font-weight: 700;
  color: var(--pa-navy);
}

.pa-card--tabela :deep(.pa-thead th) {
  font-weight: 700;
  font-size: 0.8125rem;
  color: var(--pa-navy);
  background: #F8FAFC;
}
</style>