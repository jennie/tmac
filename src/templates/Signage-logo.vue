<template>
  <Fullscreen class="bg-black overflow-hidden h-full w-full h-screen">
    <div
      class="bg-black overflow-hidden h-full w-full flex items-center justify-center self-center"
    >
      <g-image
        src="~/assets/images/logos/MOSHED-2020-2-27-19-26-15.gif"
        alt=""
        class="h-full w-full flex items-center justify-center self-center"
      />
    </div>
  </Fullscreen>
</template>

<style lang="postcss" scoped>
body.signage-projection {
  height: 100%;
  min-height: 100%;
  main h3 {
    line-height: 1;
    font-size: 9rem;
    strong {
      font-family: HelveticaNowText-ExtraBold;
      font-weight: normal;
      font-style: normal;
    }
  }
  .one-up.slide {
    height: 100vh;
  }
  .tns-liveregion {
    @apply absolute z-0;
    display: none !important;
  }
}
</style>
<script>
import Fullscreen from "~/layouts/Fullscreen";

export default {
  metaInfo: {
    bodyAttrs: {
      class: "custom-body-class"
    }
  },

  name: "Logo"
};
</script>
