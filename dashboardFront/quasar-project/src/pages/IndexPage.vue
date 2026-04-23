```vue
<template>
  <div class="bg-grey-2" style="min-height: 100vh; width: 100%">
    <div class="q-px-lg q-py-xl" style="max-width: 1500px; margin: 0 auto">

      <div class="row items-center q-mb-xl">
        <div class="col-12 col-md-4"></div>

        <div class="col-12 col-md-4 text-center">
          <div class="text-h4 text-weight-bold q-mb-md dashboard-title">
            Dashboard de Vendas Externas
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-xl q-mb-xl justify-center">

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section class="text-center">
              <q-icon name="visibility" size="36px" class="q-mb-sm text-primary" />

              <div class="text-subtitle2 text-grey">
                Total de Ações
              </div>

              <div class="text-h5 text-weight-bold">
                {{ totalAcoes }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section class="text-center">
              <q-icon name="shopping_cart" size="36px" class="q-mb-sm text-positive" />

              <div class="text-subtitle2 text-grey">
                Total de Vendas
              </div>

              <div class="text-h5 text-weight-bold">
                {{ totalVendas }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section class="text-center">
              <q-icon name="groups" size="36px" class="q-mb-sm text-info" />

              <div class="text-subtitle2 text-grey">
                Total de Leads
              </div>

              <div class="text-h5 text-weight-bold">
                {{ totalLeads }}
              </div>
            </q-card-section>
          </q-card>
        </div>

      </div>

      <div class="row q-col-gutter-lg q-mt-xl q-mb-xl">

        <div class="col-12 col-md-6">
          <q-card class="shadow-4 rounded-borders bg-white border-positive">

            <q-card-section class="row items-center q-gutter-sm">
              <q-icon name="emoji_events" color="positive" size="lg" />

              <div class="text-h5 text-weight-bold">
                Melhor ponto
              </div>
            </q-card-section>

            <q-card-section class="q-gutter-md">

              <div class="row items-center justify-between bg-green-1 q-pa-md rounded-borders">

                <div class="row items-center q-gutter-md">

                  <q-badge color="positive" rounded size="lg">
                    Melhor
                  </q-badge>

                  <div>
                    <div class="text-h6 text-weight-bold">
                      {{ melhorVendas.nome || 'Carregando...' }}
                    </div>

                    <div class="text-body1 text-grey">
                      Score:
                      {{ melhorVendas.mediaVendas ? (melhorVendas.mediaVendas * 10).toFixed(1) : '0.0' }}
                    </div>
                  </div>

                </div>

                <div class="text-right text-positive text-h6 text-weight-bold">
                  {{ melhorVendas.mediaVendas ? melhorVendas.mediaVendas.toFixed(2) : '0.00' }}
                  <br>
                  <span class="text-body1 text-grey">
                    vendas/visita
                  </span>
                </div>

              </div>

              <div class="row items-center q-pt-sm justify-between">

                <div class="text-body1 text-grey">
                  Clique para ver mais informações do ponto
                </div>

                <q-btn
                  flat
                  color="primary"
                  icon="visibility"
                  :label="showDetalhesMelhor ? 'Ver menos' : 'Ver mais'"
                  @click="showDetalhesMelhor = !showDetalhesMelhor"
                  class="hover:shadow-3 hover:scale-110 transition-all text-body1"
                />

              </div>

              <div
                v-show="showDetalhesMelhor"
                class="q-mt-md q-pa-lg rounded-borders"
                style="
                  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
                  border: 1px solid rgba(76, 175, 80, 0.25);
                "
              >

                <div class="row items-center q-mb-md">
                  <q-icon name="insights" color="positive" size="28px" class="q-mr-sm" />

                  <div class="text-subtitle1 text-weight-bold text-positive">
                    Detalhes do Melhor Ponto
                  </div>
                </div>

                <div class="row q-col-gutter-md">

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Visitas
                      </div>

                      <div class="text-h5 text-weight-bold text-dark">
                        {{ melhorVendas.totalVisitas || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Total de Vendas
                      </div>

                      <div class="text-h5 text-weight-bold text-positive">
                        {{ melhorVendas.totalVendas || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Total de Leads
                      </div>

                      <div class="text-h5 text-weight-bold text-info">
                        {{ melhorVendas.totalLeads || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Média de Leads
                      </div>

                      <div class="text-h5 text-weight-bold text-primary">
                        {{ melhorVendas.mediaVendas ? melhorVendas.mediaVendas.toFixed(2) : '0.00' }}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </q-card-section>

          </q-card>
        </div>

        <div class="col-12 col-md-6">

          <q-card class="shadow-4 rounded-borders bg-white border-negative">

            <q-card-section class="row items-center q-gutter-sm">

              <q-icon name="close" color="negative" size="lg" />

              <div class="text-h5 text-weight-bold">
                Pior ponto
              </div>

            </q-card-section>

            <q-card-section class="q-gutter-md">

              <div class="row items-center justify-between bg-red-1 q-pa-md rounded-borders">

                <div class="row items-center q-gutter-md">

                  <q-badge color="negative" rounded size="lg">
                    Pior
                  </q-badge>

                  <div>

                    <div class="text-h6 text-weight-bold">
                      {{ piorPonto.nome || 'Carregando...' }}
                    </div>

                    <div class="text-body1 text-grey">
                      Score:
                      {{ piorPonto.mediaVendas ? (piorPonto.mediaVendas * 10).toFixed(1) : '0.0' }}
                    </div>

                  </div>

                </div>

                <div class="text-right text-negative text-h6 text-weight-bold">
                  {{ piorPonto.mediaVendas ? piorPonto.mediaVendas.toFixed(2) : '0.00' }}

                  <br>

                  <span class="text-body1 text-grey">
                    vendas/visita
                  </span>
                </div>

              </div>

              <div class="row items-center q-pt-sm justify-between">

                <div class="text-body1 text-grey">
                  Clique para ver mais informações do ponto
                </div>

                <q-btn
                  flat
                  color="negative"
                  icon="visibility"
                  :label="showDetalhesPior ? 'Ver menos' : 'Ver mais'"
                  @click="showDetalhesPior = !showDetalhesPior"
                  class="hover:shadow-3 hover:scale-110 transition-all text-body1"
                />

              </div>

              <div
                v-show="showDetalhesPior"
                class="q-mt-md q-pa-lg rounded-borders"
                style="
                  background: linear-gradient(135deg, #ffebee, #fce4ec);
                  border: 1px solid rgba(244, 67, 54, 0.25);
                "
              >

                <div class="row items-center q-mb-md">

                  <q-icon name="warning" color="negative" size="28px" class="q-mr-sm" />

                  <div class="text-subtitle1 text-weight-bold text-negative">
                    Detalhes do Pior Ponto
                  </div>

                </div>

                <div class="row q-col-gutter-md">

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Visitas
                      </div>

                      <div class="text-h5 text-weight-bold text-dark">
                        {{ piorPonto.totalVisitas || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Total de Vendas
                      </div>

                      <div class="text-h5 text-weight-bold text-negative">
                        {{ piorPonto.totalVendas || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Total de Leads
                      </div>

                      <div class="text-h5 text-weight-bold text-orange">
                        {{ piorPonto.totalLeads || 0 }}
                      </div>

                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="bg-white q-pa-md rounded-borders shadow-1">

                      <div class="text-caption text-grey-7">
                        Média de Leads
                      </div>

                      <div class="text-h5 text-weight-bold text-deep-orange">
                        {{ piorPonto.mediaVendas ? piorPonto.mediaVendas.toFixed(2) : '0.00' }}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </q-card-section>

          </q-card>

        </div>

      </div>

      <div class="q-mb-xl">

        <q-card class="shadow-3 rounded-borders q-mb-lg bg-white">

          <q-card-section class="text-h5 text-weight-bold">
            Ranking de Performance
          </q-card-section>

          <q-table
            :rows="ranking"
            :columns="[
              { name:'nome', label:'Nome do ponto', field:'nome' },
              { name:'visitas', label:'Visitas', field:'visitas' },
              { name:'mediaVendas', label:'Média vendas', field:'mediaVendas' },
              { name:'mediaLeads', label:'Média leads', field:'mediaLeads' },
              { name:'score', label:'Score', field:'score' }
            ]"
            row-key="nome"
            flat
          >

            <template v-slot:body-cell-nome="props">

              <q-td class="text-left">

                <div class="row items-center q-gutter-md">

                  <q-badge
                    v-if="props.row.pos <= 3"
                    :color="['yellow','grey-5','brown'][props.row.pos-1]"
                    text-color="black"
                    rounded
                    size="lg"
                  >
                    {{ props.row.pos }}
                  </q-badge>

                  <div class="column">

                    <div class="text-h6 text-weight-bold">
                      {{ props.row.nome }}
                    </div>

                    <div class="text-body1 text-grey">
                      {{ props.row.visitas }} visitas
                    </div>

                  </div>

                </div>

              </q-td>

            </template>

          </q-table>

        </q-card>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalVendas = ref(0)
const totalAcoes = ref(0)
const totalLeads = ref(0)
const ranking = ref([])
const melhorVendas = ref({})
const piorPonto = ref({})
const showDetalhesMelhor = ref(false)
const showDetalhesPior = ref(false)

async function buscarDados() {
  try {

    const responseDashboard = await fetch('http://localhost:3000/dashboard')

    const responseRanking = await fetch('http://localhost:3000/dashboard/ranking')

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
        visitas: item.totalVisitas,
        mediaVendas: Math.round(item.mediaVendas * 100) / 100,
        mediaLeads: Math.round(item.mediaLeads * 100) / 100,
        score: Math.round(item.mediaVendas * 10 * 100) / 100
      }))

      melhorVendas.value = dataRanking.melhorVendas
      piorPonto.value = dataRanking.piorPonto

    }

  } catch (e) {
    console.error('Erro ao carregar o dashboard:', e)
  }
}

onMounted(() => {
  buscarDados()
})
</script>

<style scoped>
body {
  font-family: 'Lato', sans-serif;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
```
