<template>
  <Layout id="event">
    <div class="container-inner mx-auto p-12 pt-0 md:w-2/3">
      <h1 class="text-3xl text-center mb-4">{{ $page.event.title }}</h1>
      <div class="mb-8" v-html="$page.event.summary" />

      <p>{{ $page.event.startDateTime }}</p>
    </div>

    <div class="container-inner mx-auto my-16">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3 md:pr-12">
          <div class="address">
            <div class="font-bold uppercase">Location</div>

            <p
              class="date border-b py-6 m-0"
              v-for="location in $page.event.location"
              :key="location.id"
            >
              {{ location.name }}
            </p>
          </div>
          <!-- {{ $page.event.tickets}} -->
        </div>
        <div class="w-full md:w-2/3">
          <div class="mb-8" v-html="$page.event.description" />
          <div class="mb-8">
            <g-link to="/events" class="font-bold uppercase"
              >Back to Events</g-link
            >
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>

query Event($id: ID!)  {
  event(id: $id) {
    startDateTime (format: "MMMM D, Y")
    endDateTime (format: "MMMM D, Y")
    actionButtonText
    canceled
    createdAt
    description
    eventType
    externalCoPresenters
    featureImage {
      url
    }
    id
    location {
      name
    }
    member {
      name
    }
    presenter
    registrationLink
    slug
    summary
    title

  }
}
</page-query>
<style lang="postcss">
#page--event {
  h2 {
    @apply font-bold text-3xl mt-12 mb-0 leading-tight mb-3;
  }
  h3 {
    @apply font-bold text-lg text-blue uppercase;
  }

  h3 + p {
    @apply mb-6;
  }
}
</style>
<script>
import Layout from "~/layouts/Default.vue";

export default {
  components: {
    Layout
  },

  name: "Event",
  metaInfo() {
    return {
      title: this.$page.event.title,
      bodyAttrs: {
        id: "page--event"
      }
    };
  }
};
</script>

<style></style>
