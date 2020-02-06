<template>
  <Layout id="event">
    <div class="header">
      <img
        class="text-center mx-auto"
        :src="
          `${$page.event.featureImage.url}?auto=compress,format&fit=crop&crop=faces,entropy&ar=16:9&fit=crop`
        "
      />
      <div class="mx-auto -mt-32 pt-0 md:w-2/3 bg-white relative p-12 ">
        <h1 class="text-3xl text-center mt-12 mb-6 pt-12 ">
          {{ $page.event.title }}
        </h1>
        <div class="text-center date mb-12">
          {{ $page.event.startDateTime | luxon:format('EEEE, MMMM d') }}<br />
          {{ $page.event.startDateTime | luxon:format('t') }}&nbsp;–&nbsp;
          {{ $page.event.endDateTime | luxon:format('t') }}
        </div>
        <div
          class="mb-8 text-center text-gray-800"
          v-html="$page.event.summary"
        />
      </div>
    </div>

    <div class="container-inner mx-auto my-16">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3 md:pr-12">
          <div class="space">
            <div class="font-display font-bold uppercase">Space</div>

            <p
              class="date m-0"
              v-for="location in $page.event.location"
              :key="location.id"
            >
              {{ location.name }}
            </p>
          </div>

          <div v-if="$page.event.externalCoPresenters" class="mt-6">
            <div class="font-display font-bold uppercase">Co-presented by</div>
            {{ $page.event.externalCoPresenters }}
          </div>
          <div v-if="$page.event.presenter" class="mt-6">
            <div class="font-display font-bold uppercase">Presented by</div>

            <p
              class="date m-0"
              v-for="member in $page.event.member"
              :key="member.id"
            >
              {{ member.name }}
            </p>
            <p>
              {{ $page.event.presenter }}
            </p>
          </div>
          <div v-else-if="$page.event.member[0]">
            <p
              class="date m-0"
              v-for="member in $page.event.member"
              :key="member.id"
            >
              {{ member.name }}
            </p>
          </div>
        </div>
        <div class="w-full md:w-2/3">
          <div class="mb-8" v-html="$page.event.description" />
          <div class="mb-8">
            <g-link to="/events" class="uppercase"
              >&larr; Back to Events</g-link
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
    startDateTime
    endDateTime
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
    @apply text-3xl mt-12 mb-0 leading-tight mb-3;
  }
  h3 {
    @apply text-2xl uppercase mt-6 mb-0;
  }
  h4 {
    @apply font-display uppercase text-lg font-bold leading-snug mt-3 mb-0;
  }
  p strong {
    @apply font-body font-bold;
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
