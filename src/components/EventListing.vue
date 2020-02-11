<template>
  <div class="event mb-12 w-full flex flex-wrap">
    <div class="w-full md:w-1/3">
      <img
        v-if="event.node.featureImage"
        class="pr-6"
        :src="
          `${event.node.featureImage.url}?auto=compress,format&fit=crop&w=600&h=314&crop=faces,entropy`
        "
      />
    </div>
    <div class="w-full md:w-2/3">
      <h3 class="text-2xl my-2 text-uppercase">
        <g-link :to="event.node.path" class="no-underline">
          {{ event.node.title }}
        </g-link>
      </h3>
      <div class="mb-2">
        <span class="date text-base">
          <div v-if="duration > 24">
            <p class="date text-sm">
              {{ event.node.startDateTime | luxon:format('EEEE, MMMM d') }}
              &nbsp;–&nbsp;
              {{ event.node.endDateTime | luxon:format('EEEE, MMMM d') }}
            </p>
          </div>
          <div v-else>
            <p class="date">
              {{ event.node.startDateTime | luxon:format('EEEE, MMMM d') }}
              <br />
              {{ event.node.startDateTime | luxon:format('t') }}&nbsp;–&nbsp;
              {{ event.node.endDateTime | luxon:format('t') }}
            </p>
          </div>
        </span>
      </div>
      <div
        class="text-base mb-8 leading-snug sm:hidden md:block"
        v-html="event.node.summary"
      />
    </div>
    <!-- <h4 v-html="event.node.eventType" /> -->
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
import Layout from "~/layouts/Default.vue";
import Interval from "luxon/src/interval.js";
import DateTime from "luxon/src/datetime.js";
export default {
  props: ["event"],

  computed: {
    duration() {
      var i = Interval.fromDateTimes(
        DateTime.fromISO(this.event.node.startDateTime),
        DateTime.fromISO(this.event.node.endDateTime)
      );
      return i.length("hours");
    }
  }
};
</script>
