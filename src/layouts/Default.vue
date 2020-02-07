<template>
  <div class="layout">
    <header class="header container mx-auto md:px-12">
      <g-link to="/">
        <g-image
          class="w-64 my-12"
          src="~/assets/images/logos/TMAC_logo@4x.png"
        ></g-image>
      </g-link>
      <nav class="nav flex -pl-24 mb-16">
        <g-link class="nav__link px-12 -pl-24" to="/">Home</g-link>
        <g-link class="nav__link px-12" to="/about/">About</g-link>
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
        "font-sans text-copy-primary font-body tracking-normal text-xl flex flex-col min-h-screen"
    }
  }
};
</script>
