<template>
  <q-page class="bg-grey-1">
    <div class="q-pa-md" style="max-width: 960px; margin: 0 auto;">
      <div class="row items-center justify-between q-pb-md q-mb-lg">
        <div>
          <div class="text-h5 text-weight-bold">Gerenciar Ações</div>
        </div>
      </div>

      <div v-if="!isHistory">
        <q-card class="bg-white shadow-4 rounded-borders q-pa-xl" style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);">
          <q-card-section class="text-center q-pb-lg">
            <q-icon name="add_circle" size="48px" class="text-primary q-mb-md" />
            <div class="text-h5 text-weight-bold text-primary q-mb-sm">Registrar Nova Ação</div>
            <div class="text-body2 text-grey-7">Preencha os detalhes abaixo para registrar uma nova ação de vendas</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="enviarAcao" class="q-gutter-xl">
              <div class="row q-col-gutter-xl q-row-gutter-xl">
                <div class="col-12 col-md-6">
                  <q-select
                    filled
                    label="Ponto de Venda"
                    v-model="form.pontoId"
                    :options="pontosOptions"
                    option-label="label"
                    option-value="value"
                    emit-value
                    map-options
                    placeholder="Selecione um ponto"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                    label-class="text-weight-medium"
                  >
                    <template v-slot:prepend>
                      <q-icon name="location_on" />
                    </template>
                  </q-select>

                  <div class="q-mt-xs text-right">
                    <q-btn
                      flat
                      dense
                      color="grey-7"
                      label="Adicionar novo ponto"
                      icon="add"
                      @click="toggleAddPonto"
                      class="text-caption hover:shadow-3 hover:scale-110 transition-all"
                    />
                  </div>
                </div>

                <div class="col-12 col-md-6">
            <q-input
  filled
  label="Data da Ação"
  v-model="form.data"
  type="date"
  outlined
  :min="'2023-01-01'"
  :max="new Date().toISOString().split('T')[0]"
  class="hover:shadow-4 hover:bg-grey-1 transition-all"
  label-class="text-weight-medium"
>
  <template v-slot:prepend>
    <q-icon name="calendar_today" />
  </template>
</q-input>
                </div>

                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Número de Leads"
                    v-model.number="form.leads"
                    type="number"
                    min="0"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                    label-class="text-weight-medium"
                  >
                    <template v-slot:prepend>
                      <q-icon name="people" />
                    </template>
                  </q-input>
                </div>

                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Número de Vendas"
                    v-model.number="form.vendas"
                    type="number"
                    min="0"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                    label-class="text-weight-medium"
                  >
                    <template v-slot:prepend>
                      <q-icon name="shopping_cart" />
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="row justify-center q-pt-lg">
                <q-btn
                  color="primary"
                  label="Registrar Ação"
                  type="submit"
                  size="lg"
                  icon="send"
                  class="q-px-xl hover:shadow-4 hover:scale-110 transition-all"
                />
                <q-btn
                  flat
                  label="Limpar Campos"
                  class="q-ml-md hover:shadow-3 hover:scale-110 transition-all"
                  @click="resetForm"
                  icon="clear"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-dialog v-model="addNewPonto" persistent content-class="dialog-blur">
          <q-card class="q-pa-md" style="min-width: 420px; max-width: 620px;">
            <q-card-section>
              <div class="row items-center justify-between q-mb-md">
                <div>
                  <div class="text-h6 text-weight-bold">Novo ponto</div>
                  <div class="text-caption text-grey">Preencha as informações para criar o ponto e usar na ação.</div>
                </div>
                <q-btn flat round dense icon="close" @click="toggleAddPonto" class="hover:shadow-3 hover:scale-110 transition-all" />
              </div>

              <div class="row q-col-gutter-md q-row-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Nome do ponto"
                    v-model="novoPonto.nome"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Tipo"
                    v-model="novoPonto.tipo"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                  />
                </div>
                <div class="col-12">
                  <q-input
                    filled
                    label="Endereço"
                    v-model="novoPonto.endereco"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Bairro"
                    v-model="novoPonto.bairro"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    filled
                    label="Cidade"
                    v-model="novoPonto.cidade"
                    outlined
                    class="hover:shadow-4 hover:bg-grey-1 transition-all"
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="negative" @click="toggleAddPonto" class="hover:shadow-3 hover:scale-110 transition-all" />
              <q-btn label="Salvar ponto" color="primary" @click="salvarNovoPonto" class="hover:shadow-4 hover:scale-110 transition-all" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <div v-else>
        <div class="text-h6 text-weight-bold q-mb-lg">Histórico de ações</div>
        <div v-if="acoesComNomes.length === 0" class="text-body2 text-grey-7">Nenhuma ação registrada ainda.</div>

        <div v-else class="q-gutter-y-md">
          <div v-for="acao in acoesComNomes" :key="acao._id" class="q-mb-lg">
            <q-card :class="['shadow-1 rounded-borders', acaoBackgroundClass(acao.vendas)]">
              <q-card-section>
                <div class="row items-start q-col-gutter-md">
                  <div class="col-12 col-md-5">
                    <div class="text-subtitle2 text-grey">Nome do ponto</div>
                    <div class="text-h6 text-weight-bold">{{ acao.pontoNome }}</div>
                    <div class="text-caption text-grey">{{ acao.endereco }}</div>
                  </div>
                  <div class="col-12 col-md-2">
                    <div class="text-subtitle2 text-grey">Data</div>
                    <div>{{ formatDate(acao.data) }}</div>
                  </div>
                  <div class="col-6 col-md-2">
                    <div class="text-subtitle2 text-grey">Leads</div>
                    <div>{{ acao.leads }}</div>
                  </div>
                  <div class="col-6 col-md-3">
                    <div class="text-subtitle2 text-grey">Vendas</div>
                    <div>{{ acao.vendas }}</div>
                  </div>
                 <div class="col-auto">
  <div class="row justify-end full-height items-start">
    <q-btn
  flat
  icon="delete"
  label="Excluir"
  color="grey-8"
  @click="confirmarExclusao(acao._id)"
  class="bg-grey-3 text-weight-medium"
/>
  </div>
</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const $q = useQuasar();
const route = useRoute();
const acoes = ref([]);
const pontos = ref([]);
const form = ref({ pontoId: '', data: '', leads: 0, vendas: 0 });
const addNewPonto = ref(false);
const novoPonto = ref({ nome: '', endereco: '', bairro: '', cidade: '', tipo: '' });

const isHistory = computed(() => route.path === '/historico-acoes');

const pontosOptions = computed(() =>
  [...pontos.value]
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
    .map((ponto) => ({
      label: `${ponto.nome} — ${ponto.endereco}`,
      value: ponto._id,
    }))
)

const acoesComNomes = computed(() =>
  [...acoes.value]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .map((acao) => {
      const ponto = pontos.value.find((p) => p._id === acao.pontoId) || {}

      return {
        ...acao,
        pontoNome: ponto.nome || `ID: ${acao.pontoId}`,
        endereco: ponto.endereco || 'Endereço não encontrado',
      }
    })
)

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('pt-BR');
}

function resetForm() {
  form.value = { pontoId: '', data: '', leads: 0, vendas: 0 };
  addNewPonto.value = false;
  novoPonto.value = { nome: '', endereco: '', bairro: '', cidade: '', tipo: '' };
}

function toggleAddPonto() {
  addNewPonto.value = !addNewPonto.value;
  if (addNewPonto.value) {
    form.value.pontoId = '';
  }
}

async function salvarNovoPonto() {
  if (!novoPonto.value.nome || !novoPonto.value.endereco || !novoPonto.value.bairro || !novoPonto.value.cidade || !novoPonto.value.tipo) {
    $q.notify({ type: 'negative', message: 'Preencha todos os dados do novo ponto.' });
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/pontos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoPonto.value),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar o ponto');
    }

    const pontoCriado = await response.json();
    pontos.value.push(pontoCriado);
    form.value.pontoId = pontoCriado._id;
    addNewPonto.value = false;
    $q.notify({ type: 'positive', message: 'Ponto criado com sucesso.' });
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: error.message || 'Erro ao criar o ponto.' });
  }
}

function acaoBackgroundClass(vendas) {
  if (vendas === 0) {
    return 'bg-red-2';
  }
  if (vendas >= 1 && vendas <= 4) {
    return 'bg-yellow-2';
  }
  return 'bg-green-2';
}

async function carregarPontos() {
  try {
    const response = await fetch('http://localhost:3000/pontos');
    if (!response.ok) {
      throw new Error('Falha ao carregar pontos');
    }
    pontos.value = await response.json();
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Não foi possível carregar a lista de pontos.' });
  }
}

async function carregarAcoes() {
  try {
    const response = await fetch('http://localhost:3000/acoes');
    if (!response.ok) {
      throw new Error('Falha ao carregar histórico');
    }
    acoes.value = await response.json();
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: 'Não foi possível carregar o histórico de ações.' });
  }
}
function confirmarExclusao(id) {
  $q.dialog({
    title: 'Confirmar exclusão',
    message: 'Você tem certeza que deseja excluir esta ação?',
    persistent: true,
    ok: {
      label: 'Excluir',
      color: 'negative'
    },
    cancel: {
      label: 'Cancelar',
      flat: true
    }
  }).onOk(() => {
    excluirAcao(id);
  });
}
async function excluirAcao(id){
    try {
        const response = await fetch(`http://localhost:3000/acoes/${id}`, {
        method: 'DELETE',
        });
        if (!response.ok) {
        throw new Error('Falha ao excluir ação');
        }
        acoes.value = acoes.value.filter((a) => a._id !== id);
        $q.notify({ type: 'positive', message: 'Ação excluída com sucesso.' });
    } catch (error) {
        console.error(error);
        $q.notify({ type: 'negative', message: 'Não foi possível excluir a ação.' });
    }
}

async function enviarAcao() {
  try {
    if (!form.value.pontoId && !addNewPonto.value) {
      throw new Error('Selecione um ponto ou adicione um novo ponto');
    }

    let pontoId = form.value.pontoId;

    if (addNewPonto.value) {
      if (!novoPonto.value.nome || !novoPonto.value.endereco || !novoPonto.value.bairro || !novoPonto.value.cidade || !novoPonto.value.tipo) {
        throw new Error('Preencha todos os dados do novo ponto');
      }

      const pontoResponse = await fetch('http://localhost:3000/pontos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPonto.value),
      });

      if (!pontoResponse.ok) {
        const error = await pontoResponse.json();
        throw new Error(error.error || 'Erro ao criar o ponto');
      }

      const pontoCriado = await pontoResponse.json();
      pontos.value.push(pontoCriado);
      pontoId = pontoCriado._id;
      form.value.pontoId = pontoCriado._id;
    }

    const payload = {
      pontoId,
      data: form.value.data,
      leads: Number(form.value.leads),
      vendas: Number(form.value.vendas),
    };

    const response = await fetch('http://localhost:3000/acoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar ação');
    }

    const novaAcao = await response.json();
    acoes.value.push(novaAcao);
    $q.notify({ type: 'positive', message: 'Ação registrada com sucesso.' });
    resetForm();
  } catch (error) {
    console.error(error);
    $q.notify({ type: 'negative', message: error.message || 'Erro ao enviar ação.' });
  }
}

onMounted(() => {
  carregarPontos();
  carregarAcoes();
});
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}

.rounded-borders {
  border-radius: 16px;
}

.transition-all {
  transition: all 0.3s ease;
}
</style>
