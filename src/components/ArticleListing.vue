<template>
  <div class="event mb-12 w-full flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img
        v-if="article.node.featureImage"
        class="md:pr-6"
        :src="
          `${article.node.featureImage.url}?auto=compress,format&fit=crop&max-w=600&max-h=337&ar=16:9&crop=faces,entropy`
        "
      />
      <img
        v-else
        class="pr-6"
        src="https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png?auto=compress,format&fit=crop&m-width=600&ar=16:9"
      />
    </div>

    <div class="w-full md:w-2/3 self-center">
      <h3 class="text-2xl my-2 text-uppercase">
        <g-link :to="article.node.path" class="no-underline">{{
          article.node.title
        }}</g-link>
      </h3>
      <div class="mb-2">
        <span class="date">
          {{ article.node.date | luxon:format('MMMM d, kkkk') }}
          <!-- –{{ article.node.endDateTime | luxon:format('t') }} -->
        </span>
      </div>
      <div
        class="text-base mb-8 leading-snug sm:hidden md:block"
        v-html="article.node.summary"
      />
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
