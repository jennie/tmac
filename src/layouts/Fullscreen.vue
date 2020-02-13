<template>
  <div class="layout">
    <transition name="fade" appear>
      <main>
        <slot />
      </main>
    </transition>
    <Footer />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }

}
</static-query>

<script>
import Footer from "../components/Footer";

export default {
  components: {
    Footer
  },

  metaInfo: {
    htmlAttrs: {
      lang: "en",
      class: "text-gray-900 antialiased"
    },
    bodyAttrs: {
      class:
        "font-sans text-copy-primary font-body tracking-tight text-xl flex flex-col min-h-screen"
    },
    titleTemplate: "Toronto Media Arts Centre – %s"
  }
};
</script>
