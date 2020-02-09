<template>
  <div class="event mb-12 w-full flex">
    <div class="w-1/3">
      <img
        v-if="article.node.featureImage"
        class="pr-6"
        :src="
          `${article.node.featureImage.url}?auto=compress,format&fit=crop&w=600&h=314&crop=faces,entropy`
        "
      />
    </div>

    <div class="w-2/3">
      <h3 class="text-2xl my-2 text-uppercase">
        <g-link :to="article.node.path" class="no-underline">{{ article.node.title }}</g-link>
      </h3>
      <div class="mb-2">
        <span class="date">
          {{ article.node.date | luxon:format('MMMM d, kkkk') }}
          <!-- –{{ article.node.endDateTime | luxon:format('t') }} -->
        </span>
      </div>
      <div class="text-base mb-8 leading-snug sm:hidden md:block" v-html="article.node.summary" />
    </div>
    <!-- <h4 v-html="article.node.articleType" /> -->
  </div>
</template>

<style lang="postcss">
h3 {
  hyphens: auto;
  text-transform: uppercase;

  a:hover {
    @apply text-blue;
  }
}
.date {
  @apply text-2xl tracking-tighter text-xl;
}
</style>
<script>
export default {
  props: ["article"]
};
</script>
