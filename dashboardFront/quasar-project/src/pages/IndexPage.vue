<template>
  <div class="bg-grey-2" style="min-height: 100vh; width: 100%">

    <!-- CONTAINER AJUSTADO -->
    <div class="q-px-lg q-py-xl" style="max-width: 1500px; margin: 0 auto">

      <!-- HEADER -->
      <div class="q-mb-xl">
        <div class="text-h4 text-weight-bold q-mb-md">
          Dashboard de Vendas Externas
        </div>
      </div>

      <!-- CARDS RESUMO -->
      <div class="row q-col-gutter-lg q-mb-xl">

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section>
              <q-icon name="visibility" size="36px" class="q-mb-sm text-primary" />
              <div class="text-subtitle2 text-grey">Total de Visitas</div>
              <div class="text-h5 text-weight-bold">1.245</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section>
              <q-icon name="shopping_cart" size="36px" class="q-mb-sm text-positive" />
              <div class="text-subtitle2 text-grey">Total de Vendas</div>
              <div class="text-h5 text-weight-bold">356</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section>
              <q-icon name="groups" size="36px" class="q-mb-sm text-info" />
              <div class="text-subtitle2 text-grey">Total de Leads</div>
              <div class="text-h5 text-weight-bold">520</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="shadow-4 rounded-borders bg-white">
            <q-card-section>
              <q-icon name="trending_up" size="36px" class="q-mb-sm text-warning" />
              <div class="text-subtitle2 text-grey">Taxa de Conversão</div>
              <div class="text-h5 text-weight-bold">68%</div>
            </q-card-section>
          </q-card>
        </div>

      </div>

      <!-- RANKING -->
      <div class="q-mb-xl">

        <!-- TABELA -->
        <q-card class="shadow-3 rounded-borders q-mb-lg bg-white">
          <q-card-section class="text-h6 text-weight-bold">
            Ranking de Performance
          </q-card-section>

          <q-table
            dense
            :rows="[
              { pos:1, nome:'Farmácia Central', visitas:120, mediaVendas:2.8, mediaLeads:3.5, score:95 },
              { pos:2, nome:'Mercado Bom Preço', visitas:110, mediaVendas:2.5, mediaLeads:3.2, score:90 },
              { pos:3, nome:'Loja Popular', visitas:100, mediaVendas:2.3, mediaLeads:3.0, score:85 },
              { pos:4, nome:'Farmácia Vida', visitas:90, mediaVendas:2.0, mediaLeads:2.8, score:80 }
            ]"
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
            <!-- NOME AJUSTADO -->
            <template v-slot:body-cell-nome="props">
              <q-td>
                <div class="row items-center q-gutter-sm">

                  <q-badge
                    v-if="props.row.pos <= 3"
                    :color="['yellow','grey-5','brown'][props.row.pos-1]"
                    text-color="black"
                    rounded
                  >
                    {{ props.row.pos }}
                  </q-badge>

                  <div class="column">
                    <div class="text-weight-medium">
                      {{ props.row.nome }}
                    </div>
                    <div class="text-caption text-grey">
                      {{ props.row.visitas }} visitas
                    </div>
                  </div>

                </div>
              </q-td>
            </template>
          </q-table>
        </q-card>

        <!-- TOP + PIORES -->
        <div class="row q-col-gutter-lg">

          <!-- TOP 5 -->
          <div class="col-12 col-md-6">
            <q-card class="shadow-3 rounded-borders bg-white">
              <q-card-section class="row items-center q-gutter-sm">
                <q-icon name="emoji_events" color="positive" />
                <div class="text-subtitle1 text-weight-bold">
                  Top 5 Melhores Pontos
                </div>
              </q-card-section>

              <q-card-section class="q-gutter-md">

                <div class="row items-center justify-between bg-green-1 q-pa-md rounded-borders">
                  <div class="row items-center q-gutter-md">
                    <q-badge color="positive" rounded>1</q-badge>
                    <div>
                      <div class="text-weight-medium">Drogaria Popular</div>
                      <div class="text-caption text-grey">Score: 143.1</div>
                    </div>
                  </div>
                  <div class="text-right text-positive text-weight-bold">
                    17.23<br><span class="text-caption text-grey">vendas/visita</span>
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </div>

          <!-- PIORES -->
          <div class="col-12 col-md-6">
            <q-card class="shadow-3 rounded-borders bg-white">
              <q-card-section class="row items-center q-gutter-sm">
                <q-icon name="error" color="negative" />
                <div class="text-subtitle1 text-weight-bold">
                  Pontos com Baixa Performance
                </div>
              </q-card-section>

              <q-card-section class="q-gutter-md">

                <div class="row items-center justify-between bg-red-1 q-pa-md rounded-borders">
                  <div class="row items-center q-gutter-md">
                    <q-icon name="error" color="negative" />
                    <div>
                      <div class="text-weight-medium">Supermercado Bom Preço</div>
                      <div class="text-caption text-grey">Score: 16.3</div>
                    </div>
                  </div>
                  <div class="text-right text-negative text-weight-bold">
                    2.16<br><span class="text-caption text-grey">vendas/visita</span>
                  </div>
                </div>

              </q-card-section>
            </q-card>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
// vazio
</script>

<style>
body {
  font-family: 'Inter', 'Roboto', sans-serif;
}
</style>