export default [
  {
    path: "/events/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--events-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Events.vue")
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
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jennie/Sites/tmac-www/node_modules/gridsome/app/pages/404.vue")
  }
]

