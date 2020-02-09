<template>
  <div class="layout">
    <p class="highlight p-2 bg-red-600 text-white text-center text-xl">
      <g-link to="/news" class="text-white">
        Get the latest updates about our ongoing litigation against the City of
        Toronto and Urbancorp.
      </g-link>
    </p>
    <header class="header container mx-auto md:px-12">
      <div class="flex justify-between flex-row flex-no-wrap flex-1">
        <g-link to="/" class="self-center">
          <g-image class="w-64 mt-12 mb-6" src="~/assets/images/logos/TMAC_logo@4x.png"></g-image>
        </g-link>
        <div class="self-center">
          <a
            class="m-0 pt-3 leading-none bg-black text-sm uppercase hover:bg-red-600 text-white py-2 px-4 rounded-sm no-underline"
          >Book a Tour</a>
        </div>
      </div>
      <nav class="nav flex -pl-24 mb-24 text-3xl -ml-12">
        <g-link class="nav__link" to="/news">#TMACtion</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/events">Events</g-link>
        <g-link class="nav__link" to="/exhibitions">Exhibitions</g-link>
        <g-link class="nav__link" to="/rentals">Rentals</g-link>
        <g-link class="nav__link" to="/location">Location</g-link>
      </nav>
    </header>
    <main class="container mx-auto md:px-12">
      <slot />
    </main>
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
    }
  }
};
</script>


<style lang="postcss">
</style>
