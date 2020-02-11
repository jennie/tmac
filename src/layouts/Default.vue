<template>
  <div class="layout">
    <p
      class="highlight leading-tight md:leading-normal text-base p-2 bg-red-600 text-white text-center md:text-xl"
    >
      <g-link to="/tmaction" class="text-white underline">
        Get the latest updates about our ongoing litigation against the City of
        Toronto and Urbancorp.
      </g-link>
    </p>

    <header class="header container mx-auto my-6 md:my-24 px-4 md:px-12">
      <div class="flex justify-between flex-row flex-no-wrap flex-1 my-6">
        <g-link to="/" class="self-center">
          <g-image
            class="w-32"
            src="~/assets/images/logos/TMAC_logo@4x.png"
          ></g-image>
        </g-link>
        <div class="buttons flex justify-end ">
          <div class="self-center hidden md:block">
            <a
              class="btn"
              href="https://calendly.com/tomediaarts/space-tour"
              target="_blank"
              >Book a Tour</a
            >
          </div>
          <div class="md:hidden self-center ">
            <button @click="toggle" class="flex items-center py-2 btn ">
              Menu
              <!-- <font-awesome :icon="['fa', 'bars']" /> -->
            </button>
          </div>
        </div>
      </div>

      <nav
        class="main nav flex flex-wrap justify-between flex-col md:flex-row md:flex md:flex-no-wrap md:flex-initial md:w-auto md:mt-0 md:relative md:h-auto md:w-auto md:bg-transparent md:p-0 fixed top-0 left-0 right-0 h-full w-full bg-gray-300 z-10 p-6 flex-1 "
        :class="isOpen ? 'block' : 'hidden'"
      >
        <g-link to="/" class="home-link md:hidden tracking-tight text-3xl "
          >Home</g-link
        >
        <div v-for="item in menu" :key="item.id">
          <g-link
            :to="item.to"
            class="tracking-tight text-3xl md:text-xl w-full "
            >{{ item.title }}</g-link
          >
          <ul
            v-if="item.submenu"
            class="submenu md:hidden mt-1 list-none flex justify-between text-lg"
          >
            <li
              v-for="item in item.submenu"
              :key="item.id"
              class="text-xl md:text-base my-2"
            >
              <g-link :to="item.to">{{ item.title }}</g-link>
            </li>
          </ul>
        </div>
      </nav>
      <nav v-if="submenu" class="subnav hidden md:block">
        <div
          v-for="item in submenu"
          :key="item.id"
          class="mr-8 my-6 lg:mb-0 inline-flex text-lg"
        >
          <g-link :to="item.to">{{ item.title }}</g-link>
        </div>
      </nav>
    </header>
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

        { title: "Events", to: "/events" },
        { title: "Exhibitions", to: "/exhibitions" },
        { title: "Rentals", to: "/space-rentals" },
        {
          title: "About",
          to: "/about"
        },
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
