const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'contact', path: 'contact', component: () => import('pages/home/Contact.vue') },
      { name: 'set', path: 'set', component: () => import('pages/set/Set.vue') },
      { name: 'setEng', path: 'setEng', component: () => import('pages/set/SetEng.vue') },
      { name: 'setList', path: 'setList', component: () => import('pages/set/SetList.vue') },
      { name: 'home', path: '', component: () => import('pages/home/Home.vue') },
      { name: 'returnAndExchange', path: 'returnAndExchange', component: () => import('pages/home/ReturnAndExchange.vue') },
      { name: 'about', path: 'about', component: () => import('pages/home/About.vue') },
      { name: 'termsOfServiceAndPrivacy', path: 'termsOfServiceAndPrivacy', component: () => import('pages/home/TermsOfServiceAndPrivacy.vue') },
      { name: 'upLoadToOpenAi', path: 'UpLoadToOpenAi', component: () => import('pages/home/UpLoadToOpenAi.vue') }
    ]
  },
  {
    path: '/payuniOrder',
    component: () => import('layouts/ShowLayout.vue'),
    children: [
      { name: 'translate', path: 'translate', component: () => import('pages/composables/Translate.vue') },
      { name: 'payuniOrderQuery', path: 'query', component: () => import('pages/payuni/Query.vue') },
      { name: 'payuniOrderAuto', path: 'auto', component: () => import('pages/payuni/Home.vue') },
      { name: 'payuniOrder', path: '', component: () => import('pages/payuni/PayuniOrder.vue') },
      { name: 'deleteOrder', path: 'deleteOrder', component: () => import('pages/payuni/DeleteOrder.vue') },
      { name: 'payResult', path: 'payResult', component: () => import('pages/payuni/PayResult.vue') }
    ]
  },
  {
    path: '/sensor',
    component: () => import('layouts/ShowLayout.vue'),
    children: [
      { name: 'sensor', path: '', component: () => import('pages/sensor/Home.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
