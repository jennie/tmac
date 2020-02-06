// Import global styles
require("~/main.css");

import DefaultLayout from "~/layouts/Default.vue";
import VueLuxon from "vue-luxon";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueLuxon, {
    clientZone: "America/Toronto"
  });
}
