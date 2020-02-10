export default [
  {
    path: "/tmaction/press/",
    component: () => import(/* webpackChunkName: "page--src--templates--press-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Press.vue")
  },
  {
    path: "/tmaction/news/",
    component: () => import(/* webpackChunkName: "page--src--templates--news-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/News.vue")
  },
  {
    path: "/tmaction/faqs/",
    component: () => import(/* webpackChunkName: "page--src--templates--faqs-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Faqs.vue")
  },
  {
    path: "/program/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibition-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Exhibition.vue")
  },
  {
    path: "/news/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--article-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Article.vue")
  },
  {
    path: "/events/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--events-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Events.vue")
  },
  {
    path: "/exhibitions/:page(\\d+)?/",
    component: () => import(/* webpackChunkName: "page--src--templates--exhibitions-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Exhibitions.vue")
  },
  {
    path: "/event/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--event-vue" */ "/Users/jennie/Sites/tmac-www/src/templates/Event.vue")
  },
  {
    path: "/tmaction/",
    component: () => import(/* webpackChunkName: "page--src--pages--tmaction-vue" */ "/Users/jennie/Sites/tmac-www/src/pages/Tmaction.vue")
  },
  {
    path: "/space-rentals/",
    component: () => import(/* webpackChunkName: "page--src--pages--space-rentals-vue" */ "/Users/jennie/Sites/tmac-www/src/pages/Space-rentals.vue")
  },
  {
    path: "/location/",
    component: () => import(/* webpackChunkName: "page--src--pages--location-vue" */ "/Users/jennie/Sites/tmac-www/src/pages/Location.vue")
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

