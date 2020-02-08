<template>
  <div class="layout">
    <p class="highlight p-2 bg-red-600 text-white text-center text-xl">
      <g-link :to="news" class="text-white">
        Get the latest updates about our ongoing litigation against the City of
        Toronto and Urbancorp.
      </g-link>
    </p>
    <header class="header container mx-auto md:px-12">
      <g-link to="/">
        <g-image
          class="w-64 my-12"
          src="~/assets/images/logos/TMAC_logo@4x.png"
        ></g-image>
      </g-link>
      <nav class="nav flex -pl-24 mb-16 text-3xl -ml-12">
        <g-link class="nav__link " to="/">Home</g-link>
        <g-link class="nav__link" to="/news">#TMACtion</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/events">Events</g-link>
        <g-link class="nav__link" to="/exhibitions">Exhibitions</g-link>
      </nav>
    </header>
    <main class="container mx-auto md:px-12">
      <slot />
    </main>
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
export default {
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
