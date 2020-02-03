<template>
  <div class="event px-6 w-1/3">
    <img
      :src="
        `${event.node.featureImage.url}?auto=compress,format&fit=crop&max-w=427&max-h=224&crop=faces,entropy`
      "
    />
    <h2 class="text-3xl my-2 text-uppercase">
      <g-link :to="event.node.path" class="no-underline ">{{
        event.node.title
      }}</g-link>
    </h2>
    <div class="mb-2">
      <span class="date">{{ event.node.startDateTime }}</span>
    </div>
    <!-- <h4 v-html="event.node.eventType" /> -->
    <div class="text-base mb-8 leading-snug " v-html="event.node.summary" />
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
  props: ["event"]
};
</script>
