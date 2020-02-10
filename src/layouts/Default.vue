<template>
  <div class="layout">
    <p class="highlight p-2 bg-red-600 text-white text-center text-xl">
      <g-link to="/tmaction" class="text-white underline">
        Get the latest updates about our ongoing litigation against the City of
        Toronto and Urbancorp.
      </g-link>
    </p>
    <header class="header container mx-auto md:px-12 h-64">
      <div class="flex justify-between flex-row flex-no-wrap flex-1">
        <g-link to="/" class="self-center">
          <g-image
            class="mt-12 w-32 mb-6"
            src="~/assets/images/logos/TMAC_logo@4x.png"
          ></g-image>
        </g-link>
        <div class="self-center">
          <a
            class="m-0 pt-3 leading-none bg-black text-sm uppercase hover:bg-red-600 text-white py-2 px-4 rounded-sm no-underline"
            >Book a Tour</a
          >
        </div>
      </div>

      <nav class="nav flex flex-wrap -pl-24 mb-24 text-3xl -ml-12 block">
        <div v-for="item in menu" :key="item.id">
          <g-link :to="item.to">{{ item.title }}</g-link>
          <ul v-if="item.submenu" class="lg:hidden mt-1">
            <li
              v-for="item in item.submenu"
              :key="item.id"
              class="text-sm my-2"
            >
              <g-link :to="item.to">{{ item.title }}</g-link>
            </li>
          </ul>
        </div>
        <nav v-if="submenu" class="subnav hidden lg:block">
          <div
            v-for="item in submenu"
            :key="item.id"
            class="mr-8 my-6 lg:mb-0 inline-flex"
          >
            <g-link :to="item.to">{{ item.title }}</g-link>
          </div>
        </nav>
      </nav>
    </header>
    <transition name="fade" appear>
      <main class="container mx-auto md:px-12">
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
    }
  },
  watch: {
    $route: {
      handler: function(current) {
        const route = this.menu.filter(route =>
          current.path.includes(route.to)
        );
        if (route[0]) {
          if (route && Array.isArray(route[0].submenu)) {
            this.submenu = route[0].submenu;
          } else if (route) {
            this.submenu = [];
          }
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      submenu: [],
      isOpen: false,
      isActive: false,
      menu: [
        {
          title: "#TMACtion",
          to: "/tmaction",
          submenu: [
            {
              title: "News",
              to: "/tmaction/news"
            },
            {
              title: "FAQs",
              to: "/tmaction/faqs"
            },
            {
              title: "Press",
              to: "/tmaction/press"
            }
          ]
        },
        {
          title: "About",
          to: "/about"
        },

        { title: "Events", to: "/events" },
        { title: "Exhibitions", to: "/exhibitions" },
        { title: "Rentals", to: "/space-rentals" },
        { title: "Location", to: "/location" }
      ]
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="postcss"></style>
