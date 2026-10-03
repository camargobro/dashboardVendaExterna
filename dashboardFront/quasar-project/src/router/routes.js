const routes = [
  { path: '/', component: () => import('pages/landingPage.vue') },
  { path: '/login', component: () => import('pages/AuthPage.vue'), meta: { guestOnly: true } },
  { path: '/cadastro', component: () => import('pages/AuthPage.vue'), meta: { guestOnly: true } },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'criar-acao', component: () => import('pages/criarAcaoPage.vue') },
      { path: 'historico-acoes', component: () => import('pages/criarAcaoPage.vue') },
      { path: 'pontos', component: () => import('pages/pontosPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes