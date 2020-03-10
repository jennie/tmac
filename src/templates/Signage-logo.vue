<template>
  <Fullscreen class="bg-black overflow-hidden">
    <ClientOnly>
      <div>
        <TinySlider v-bind="tinySliderOptions">
          <g-image src="/logo-2.gif" alt="" class="" />
          <g-image src="/logo-1.gif" alt="" class="" />
        </TinySlider>
      </div>
    </ClientOnly>
  </Fullscreen>
</template>

<script>
import Fullscreen from "~/layouts/Fullscreen";

export default {
  components: {
    TinySlider: () => import("vue-tiny-slider"),
    Fullscreen
  },
  data() {
    return {
      tinySliderOptions: {
        nav: false,
        speed: 1000,
        items: 1,

        mode: "gallery",
        animateDelay: 5000,
        autoplayTimeout: 30000,
        autoplay: true,
        controls: false,
        autoplayButtonOutput: false
        // loop: true,
        // items: 1,
        // slideBy: 1,
        // speed: 1000,
        // autoplay: true,
        // controls: false,
        // animateDelay: 1000,
        // nav: false,
        // autoplayButtonOutput: false,
        // autoplayTimeout: 5000
      }
    };
  },

  metaInfo: {
    title: "Signage Logo",

    link: [
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/tiny-slider.css"
      }
    ]
  },

  name: "Logo"
};
</script>
