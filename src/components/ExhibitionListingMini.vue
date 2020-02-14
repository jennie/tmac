<template>
  <div class="exhibitionMini">
    <g-link :to="exhibition.node.path" class="no-underline">
      <img
        class="w-full object-cover"
        :src="
          `${exhibition.node.featureImage.url}?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy`
        "
      />
      <div class="w-full text-center">
        <h3 class="text-2xl my-2 text-uppercase">
          {{ exhibition.node.title }}
        </h3>
        <div class="mb-2">
          <span class="date"> {{ startDate }} – {{ endDate }} </span>
        </div>
        <div class="text-base mb-8 leading-snug sm:hidden md:block" />
      </div>
    </g-link>
  </div>
</template>

<style lang="postcss">
h3 {
  hyphens: auto;
  @apply uppercase;
  a:hover {
    @apply text-blue;
  }
}
.date {
  @apply text-2xl tracking-tighter text-xl;
}
</style>
<script>
import Layout from "~/layouts/Default.vue";
import Interval from "luxon/src/interval.js";
import DateTime from "luxon/src/datetime.js";
export default {
  props: ["exhibition"],

  computed: {
    startDate() {
      let d = DateTime.fromISO(this.exhibition.node.startDate);
      return d.toFormat("MMMM d");
    },
    endDate() {
      let d = DateTime.fromISO(this.exhibition.node.endDate);
      return d.toFormat("MMMM d, kkkk");
    }
  }
};
</script>
