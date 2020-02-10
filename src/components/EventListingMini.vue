<template>
  <div class="w-1/3 p-1 rounded-lg overflow-hidden">
    <div class="pb-2/3 relative">
      <g-link :to="event.node.path" class="no-underline">
        <img
          class="absolute h-full w-full object-cover"
          :src="
            `${event.node.featureImage.url}?auto=compress,format&fit=crop&w=600&h=314&crop=faces,entropy`
          "
        />
        <div class="p-2 absolute bottom-0">
          <h3 class="text-xl m-2 -mb-1 bg-white p-1">
            {{ event.node.title }}
          </h3>
          <p class="date text-sm font-body font-normal inline m-2 bg-white p-1">
            {{ event.node.startDateTime | luxon:format('MMMM d') }}
          </p>
        </div>
      </g-link>
    </div>
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
  props: ["event"]
};
</script>
