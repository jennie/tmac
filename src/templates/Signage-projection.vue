<template>
  <Fullscreen class="bg-black h-full">
    <ClientOnly>
      <div>
        <TinySlider
          v-bind="tinySliderOptions"
          class="flex flex-col h-full h-screen"
        >
          <div
            class="relative flex flex-col justify-evenly slide min-h-full"
            v-for="(faq, index) in $page.faqs.edges"
            :key="`faq-${index}`"
            :id="faq.node.slug"
          >
            <img
              :src="
                `${faq.node.image.url}?fit=crop&crop=faces,entropy,top&ar=16:9`
              "
              v-if="faq.node.image.url"
              class="absolute h-full w-full object-cover"
              alt=""
            />

            <div class="absolute z-20 bottom-0">
              <h3 class="text-6xl mt-0 bg-black text-white p-3">
                {{ faq.node.question }}
              </h3>
            </div>
          </div>
        </TinySlider>
      </div>
    </ClientOnly>
  </Fullscreen>
</template>
<page-query>
query Faqs {
  faqs: allFaqs(sortBy: "position", order: ASC) {
    edges {
      node {
        answer
				position
        question
        image {
          url
        }
      }
    }
  }
}
</page-query>
<style lang="postcss">
h3 {
  line-height: 1;

  strong {
    font-family: HelveticaNowText-ExtraBold;
    font-weight: normal;
    font-style: normal;
  }
}
.slide {
  height: 640px;
}
.tns-liveregion {
  @apply absolute z-0;
  display: none !important;
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
        slideBy: 1,
        speed: 1000,
        autoplay: true,
        controls: false,
        mode: "gallery",
        animateDelay: 10000,
        nav: false,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000
      }
    };
  }
};
</script>
