
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'contact', path: 'contact', component: () => import('pages/home/Contact.vue') },
      { name: 'set', path: '', component: () => import('pages/set/Set.vue') },
      { name: 'setEng', path: 'setEng', component: () => import('pages/set/SetEng.vue') },
      { name: 'setList', path: 'setList', component: () => import('pages/set/SetList.vue') },
      { name: 'upLoadToOpenAi', path: 'UpLoadToOpenAi', component: () => import('pages/home/UpLoadToOpenAi.vue') }
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
