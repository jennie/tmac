// Import global styles
require("~/main.css");

import DefaultLayout from "~/layouts/Default.vue";
import VueLuxon from "vue-luxon";
import VueCurrencyFilter from "vue-currency-filter";

export default function(Vue, { router, head, isClient }) {
  if (isClient) {
  }
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(VueCurrencyFilter, {
    symbol: "$",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: false
  });

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
}
