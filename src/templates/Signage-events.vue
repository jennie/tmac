<template>
  <Fullscreen>
    <ClientOnly>
      <div class="grid grid-cols-1 grid-rows-3 grid-flow-col h-full">
        <TinySlider v-bind="tinySliderOptions">
          <div
            class="pb-2/3 relative"
            v-for="(event, index) in $page.events.edges"
            :key="`event-${index}`"
          >
            <img
              v-if="event.node.featureImage"
              class="absolute h-full w-full object-cover"
              :src="
                `${event.node.featureImage.url}?fit=crop&crop=faces,entropy,top&ar=16:9`
              "
            />
            <div class="absolute bottom-0">
              <h3 class="text-6xl m-2 -mb-1 bg-white p-3">
                {{ event.node.title }}
              </h3>
              <p
                class="text-4xl font-body font-normal inline m-2 bg-white p-3 -mt-1"
              >
                {{ event.node.startDateTime | luxon:format('MMMM d') }}
              </p>
            </div>
          </div>
        </TinySlider>
      </div>
    </ClientOnly>
  </Fullscreen>
</template>

<page-query>
query Events ($today: Date) {

  events: allEvent(sortBy: "startDateTime", order: ASC, filter: { startDateTime: { gte: $today } }) {
    totalCount
    edges {
      node {
        startDateTime
        endDateTime
        featureImage {
          url
        }
        id
        title
      }
    }
  }
  
}
</page-query>
<style lang="postcss" scoped>
h4 {
  strong {
    font-family: HelveticaNowText-ExtraBold;
    font-weight: normal;
    font-style: normal;
  }
}
</style>
<script>
import EventListingMini from "../components/EventListingMini";
import Fullscreen from "~/layouts/Fullscreen";

export default {
  components: {
    EventListingMini,
    Fullscreen,
    TinySlider: () => import("vue-tiny-slider")
  },
  name: "Events",
  data() {
    return {
      tinySliderOptions: {
        loop: true,
        items: 2,
        speed: 1000,
        autoplay: true,
        axis: "vertical",
        controls: false,
        mode: "carousel",
        animateDelay: 10000,
        nav: false,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000
      }
    };
  }
};
</script>
