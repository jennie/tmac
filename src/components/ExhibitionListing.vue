<template>
  <div class="event px-6 mb-12 w-full flex">
    <div class="w-2/3">
      <img
        class="pr-6"
        :src="
          `${exhibition.node.featureImage.url}?auto=compress,format&fit=crop&w=600&h=314&crop=faces,entropy`
        "
      />
    </div>
    <div class="w-1/3">
      <h2 class="text-2xl my-2 text-uppercase">
        <g-link :to="exhibition.node.path" class="no-underline">{{ exhibition.node.title }}</g-link>
      </h2>
      <div class="mb-2">
        <span class="date">
          {{ exhibition.node.startDate | luxon:format('MMMM d') }}
          –{{ exhibition.node.endDate | luxon:format('MMMM d') }}
        </span>
      </div>
      <div class="text-base mb-8 leading-snug sm:hidden md:block" />
    </div>
    <!-- <h4 v-html="exhibition.node.eventType" /> -->
  </div>
</template>

<style lang="postcss">
h2 {
  hyphens: auto;
  a:hover {
    @apply text-blue;
  }
}
.date {
  @apply text-2xl;
  font-family: "Agrandir Tight";
  font-weight: 400;
  font-style: normal;
}
</style>
<script>
export default {
  props: ["exhibition"]
};
</script>
