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
        <g-image class="w-64 mt-12 mb-6" src="~/assets/images/logos/TMAC_logo@4x.png"></g-image>
      </g-link>
      <nav class="nav flex -pl-24 mb-24 text-3xl -ml-12">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/news">#TMACtion</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
        <g-link class="nav__link" to="/events">Events</g-link>
        <g-link class="nav__link" to="/exhibitions">Exhibitions</g-link>
      </nav>
    </header>
    <main class="container mx-auto md:px-12">
      <slot />
    </main>

    <footer class="container mx-auto md:px-12">
      <div class="flex">
        <div class="md:1/4 px-2">
          <h3>Toronto Media Arts Centre</h3>
          <p>
            32 Lisgar Street
            <br />Toronto, ON M6J 0C9
            <br />Canada
          </p>
          <p>
            <i class="fas fa-map-marker-alt"></i>
            <a href="/location">How to find us</a>
          </p>
          <p>
            <i class="fab fa-accessible-icon"></i>
            <a
              href="https://policies.tomediaarts.org/procedure-manual/policies/accessibility"
            >Accessibility information</a>
          </p>
          <p class="charitable-number">Registered Charity 847429701RR0001</p>
          <p>
            <a
              href="https://www.canadahelps.org/CharityProfilePage.aspx?CharityID=d106865"
              class="btn btn-alt"
            >Donate</a>
          </p>
        </div>
        <div class="md:1/4 px-2">
          <h3>Contact us</h3>
          <section id="contact">
            <span>
              <a href="mailto:info@tomediaarts.org">info@tomediaarts.org</a>
            </span>
            <span>
              <a href="tel:6476896005">
                <span class="tel">(647) 689-6005</span>
              </a>
            </span>
          </section>
          <h3>Social</h3>
          <section id="social">
            <a href="https://www.instagram.com/tomediaarts/">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com/tomediaarts">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com/TOMediaArts">
              <i class="fab fa-facebook"></i>
            </a>
          </section>
          <section id="logos">
            <a href="https://shwca.se/tmac-logo-kit">Logos for print and web</a>
          </section>
        </div>
        <div class="md:1/4 px-2">
          <h3>Hours</h3>
          <p>10am–6pm Mon-Fri</p>
          <p>Open later + on weekends for events and exhibitions.</p>
          <p>Closed on all stat holidays.</p>
          <div class="vcard" id>
            <div class="org">Toronto Media Arts Centre</div>
            <a class="email" href="mailto:info@tomediaarts.org">info@tomediaarts.org</a>
            <div class="adr">
              <div class="street-address">32 Lisgar Street</div>
              <span class="locality">Toronto</span> ,
              <span class="region">ON</span>
              ,
              <span class="postal-code">M6J 0C9</span>
              <span class="country-name">Canada</span>
            </div>
          </div>
        </div>
        <div class="md:1/4 px-2">
          <h3>Members</h3>
          <div class="orgs" id="members">
            <div v-for="member in $static.members.edges" :key="member.id">
              <img
                :src="`${member.node.logo.url}?auto=compress,format`"
                :alt="member.name"
                class="w-32 py-3 text-center mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <p class="copyright">
        © 2011-2020 Toronto Media Arts Cluster
        <br />
        <a href="https://governance.tomediaarts.org">Governance</a>
      </p>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  members:   allMember(sortBy: "name", order:ASC) {
    edges {
      node {
        name
        logo {
          url
        }
      }
    }
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

<style lang="postcss">
</style>
