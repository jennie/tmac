<template>
  <div class="event mb-2 w-full border-b">
    <span
      v-if="presslink.node.isCoverage"
      class="bg-black text-white text-sm px-2 float-right"
      >TMAC</span
    >
    <span class="text-base">
      {{ presslink.node.date | luxon:format('MMMM d, kkkk') }}
      <!-- –{{ presslink.node.endDateTime | luxon:format('t') }} -->
    </span>
    <h3 class="text-2xl my-2 text-uppercase">
      <a :href="presslink.node.link" target="_blank">{{
        presslink.node.title
      }}</a>
    </h3>

    <div class="mb-2">
      <span v-if="presslink.node.author">{{ presslink.node.author }} –</span>
      {{ presslink.node.outlet }}
    </div>
    <i class="fas fa-file"></i>
    <div v-if="presslink.node.file">
      <a :href="presslink.node.file.url" class="pl-2 text-base underline"
        >Download/view {{ presslink.node.file.format }}</a
      >
    </div>
    <div
      class="text-base mb-8 leading-snug sm:hidden md:block"
      v-html="presslink.node.summary"
    />
  </div>
  <!-- <h4 v-html="presslink.node.articleType" /> -->
</template>

<style lang="postcss" scoped>
main {
  h3 {
    @apply normal-case font-normal leading-tight;
    font-family: HelveticaNowText-Bold;
    hyphens: auto;
    a {
      @apply underline;
    }

    a:hover {
      @apply text-blue;
    }
  }
}
.date {
  @apply text-2xl tracking-tighter text-xl;
}
</style>
<script>
export default {
  props: ["presslink"]
};
</script>
