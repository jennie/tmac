<template>
  <div>
    <div
      :class="
        `mini pb-2/3 relative ${
          event.canceled == true ? 'canceled' : 'not-canceled'
        } `
      "
    >
      <g-link :to="event.path" class="no-underline">
        <img
          v-if="event.featureImage"
          class="absolute h-full w-full object-cover"
          :src="
            `${
              event.featureImage.url
            }?auto=compress,format&fit=crop&w=600&h=314&crop=faces,entropy&sat=${
              event.canceled == true ? -100 : 0
            }&con=${event.canceled == true ? -85 : 0}`
          "
        />

        <div
          v-if="event.canceled == true"
          class="label p-2 absolute top-0 uppercase text-red-600 bg-red-100 m-4 leading-tight tracking-wide"
        >
          Canceled
        </div>
        <div class="p-2 absolute bottom-0">
          <h3 class="text-xl m-2 -mb-1 bg-white p-1">
            {{ event.title }}
          </h3>
          <p class="date text-sm font-body font-normal inline m-2 bg-white p-1">
            {{ event.startDateTime | luxon:format('MMMM d') }}
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
