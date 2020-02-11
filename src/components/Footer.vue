<template>
  <footer class="container px-4 mt-32 mx-auto md:px-12">
    <div class="flex flex-wrap md:flex-no-wrap flex-1">
      <div class="md:w-1/4 md:px-2 md:mb-0">
        <h3>Toronto Media Arts Centre</h3>
        <p>
          32 Lisgar Street
          <br />Toronto, ON M6J 0C9 <br />Canada
        </p>
        <p>
          <i class="fas fa-envelope"></i>
          <a
            class="pl-1"
            href="https://tomediaarts.us11.list-manage.com/subscribe/post?u=a11a58bffdfcead3161ea4d9d&id=0f5e662ee0"
            target="_blank"
            >Join our mailing list</a
          >
        </p>
        <p>
          <i class="fas fa-building"></i>
          <a class="pl-1" href="https://calendly.com/tomediaarts/space-tour"
            >Book a tour</a
          >
        </p>
        <p>
          <i class="fas fa-map-marker-alt"></i>
          <a class="pl-1" href="/location">How to find us</a>
        </p>
        <p>
          <i class="fab fa-accessible-icon"></i>
          <a
            class="pl-1"
            href="https://policies.tomediaarts.org/procedure-manual/policies/accessibility"
            >Accessibility information</a
          >
        </p>
        <p>
          <a
            href="https://www.canadahelps.org/CharityProfilePage.aspx?CharityID=d106865"
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full no-underline"
            >Donate</a
          >
        </p>
      </div>
      <div class="md:w-1/4 md:px-2 md:mb-0">
        <h3>Contact us</h3>
        <section id="contact">
          <p>
            <a href="mailto:info@tomediaarts.org">info@tomediaarts.org</a>
          </p>
          <p>
            <a href="tel:6476896005">
              <span class="tel">(647) 689-6005</span>
            </a>
          </p>
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
          <a href="https://shwca.se/tmac-logo-kit">Download logos</a>
        </section>
      </div>
      <div class="md:w-1/4 md:px-2 md:mb-0">
        <h3>Hours</h3>
        <p>10am–6pm Mon-Fri</p>
        <p>Open later + on weekends for events and exhibitions.</p>
        <p>Closed on all stat holidays.</p>
        <div class="hidden vcard">
          <div class="org">Toronto Media Arts Centre</div>
          <a class="email" href="mailto:info@tomediaarts.org"
            >info@tomediaarts.org</a
          >
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
      <div class="md:w-1/4 md:px-2 md:mb-0">
        <h3>Members</h3>
        <div class="orgs" id="members">
          <div v-for="member in $static.members.edges" :key="member.id">
            <img
              :src="`${member.node.logo.url}?auto=compress,format`"
              :alt="member.name"
              class="w-32 py-3"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="post-footer copyright text-center text-gray-600 mt-12">
      <p>© 2011-2020 Toronto Media Arts Cluster</p>
      <p class="charitable-number text-sm">
        Registered Charity 847429701RR0001
      </p>
      <p>
        <a href="https://governance.tomediaarts.org">Governance</a>
      </p>
    </div>
  </footer>
</template>
<style lang="postcss">
footer {
  @apply text-base;
  a {
    @apply underline;
  }
  div {
    @apply p-0;
  }
  div:first-child {
    @apply pl-0;
  }
  #social {
    a {
      @apply text-3xl px-2;
      &:first-child {
        @apply pl-0;
      }
    }
  }
  > div > div {
    @apply w-full mb-6;
  }
  h3 {
    @apply font-normal normal-case leading-normal tracking-normal;
    font-family: HelveticaNowText-Bold;
  }
}
</style>
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
