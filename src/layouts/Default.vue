<template>
  <div class="layout">
    <header class="header">
      <g-link to="/">
        <g-image
          class="w-32 mx-auto my-12"
          src="~/assets/images/logos/TMAC_logo@4x.png"
        >
        </g-image
      ></g-link>
      <nav class="nav mx-auto flex text-center justify-center -pl-24 mb-16">
        <g-link class="nav__link px-12" to="/">Home</g-link>
        <g-link class="nav__link px-12" to="/about/">About</g-link>
      </nav>
    </header>
    <main class="container mx-auto  md:px-12">
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
        "font-sans text-copy-primary font-body text-xl flex flex-col min-h-screen"
    }
  }
};
</script>
