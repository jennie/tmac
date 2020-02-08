export default [
  {
    path: "/events/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--events-vue" */ "/Users/jennie/Sites/tmac/src/templates/Events.vue")
  },
  {
    path: "/exhibitions/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibitions-vue" */ "/Users/jennie/Sites/tmac/src/templates/Exhibitions.vue")
  },
  {
    path: "/exhibitions/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibition-vue" */ "/Users/jennie/Sites/tmac/src/templates/Exhibition.vue")
  },
  {
    path: "/events/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--event-vue" */ "/Users/jennie/Sites/tmac/src/templates/Event.vue")
  },
  {
    path: "/about/",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/jennie/Sites/tmac/src/pages/About.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jennie/Sites/tmac/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/jennie/Sites/tmac/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jennie/Sites/tmac/node_modules/gridsome/app/pages/404.vue")
  }
]

