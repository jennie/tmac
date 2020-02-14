// Import global styles
require("~/main.css");

import DefaultLayout from "~/layouts/Default.vue";
import VueLuxon from "vue-luxon";
import vTinySlider from "vue-tiny-slider";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  var marked = require("marked");
  marked.setOptions({
    smartypants: true
  });
  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      }
    }
  });
  Vue.use(VueLuxon, {
    clientZone: "America/Toronto"
  });
  const VueTinySlider = {
    install(Vue, options) {
      Vue.component("VueTinySlider", vTinySlider);
    }
  };
  Vue.use(VueTinySlider);
}
