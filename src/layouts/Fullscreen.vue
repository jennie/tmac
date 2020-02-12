<template>
  <div class="layout">
    <transition name="fade" appear>
      <main class="container mx-auto px-4 md:px-12">
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

<style lang="postcss">
nav {
  div:first-child a {
    @apply ml-0;
  }
}
.btn {
  @apply m-0 pt-3 leading-none bg-black text-sm uppercase text-white py-2 px-4 rounded-sm no-underline;
}
@media (max-width: 767px) {
  /* nav.main {
    @apply fixed top-0 left-0 right-0 h-full w-full bg-green-300 z-10 block p-6;
    div {
      @apply w-full;
      a {
        @apply text-2xl;
      }
    }

    overflow: auto;
  } */
}
</style>
