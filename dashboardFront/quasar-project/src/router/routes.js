const routes = [
  { path: '/login', component: () => import('pages/AuthPage.vue'), meta: { guestOnly: true } },
  { path: '/cadastro', component: () => import('pages/AuthPage.vue'), meta: { guestOnly: true } },
  { path: '/acesso-negado', component: () => import('pages/AccessDeniedPage.vue'), meta: { requiresAuth: true } },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'criar-acao', component: () => import('pages/criarAcaoPage.vue') },
      { path: 'historico-acoes', component: () => import('pages/criarAcaoPage.vue') }
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
