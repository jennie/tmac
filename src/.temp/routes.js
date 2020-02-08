export default [
  {
    path: "/events/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--events-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Events.vue")
  },
  {
    path: "/exhibitions/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibitions-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Exhibitions.vue")
  },
  {
    path: "/exhibitions/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibition-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Exhibition.vue")
  },
  {
    path: "/events/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--event-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Event.vue")
  },
  {
    path: "/about/",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/jennie/Sites/tmac-www/src/pages/About.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jennie/Sites/tmac-www/node_modules/gridsome/app/pages/404.vue")
  },
  {
    path: "/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--index-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jennie/Sites/tmac-www/node_modules/gridsome/app/pages/404.vue")
  }
]

