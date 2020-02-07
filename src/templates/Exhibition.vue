<template>
  <Layout id="exhibition">
    <div class="header">
      <img
        class="text-center mx-auto"
        :src="
          `${$page.exhibition.featureImage.url}?auto=compress,format&fit=crop&crop=faces,entropy&ar=16:9&fit=crop`
        "
      />
      <div class="mx-auto -mt-32 pt-0 md:w-2/3 bg-white relative p-12">
        <h1 class="text-3xl text-center mt-12 mb-6 pt-12">{{ $page.exhibition.title }}</h1>
        <div class="text-center date mb-12">
          {{ $page.exhibition.startDate | luxon:format('EEEE, MMMM d') }}
          <br />
          {{ $page.exhibition.startDate | luxon:format('t') }}&nbsp;–&nbsp;
          {{ $page.exhibition.endDate | luxon:format('t') }}
        </div>
        <div class="mb-8 text-center text-gray-800" v-html="$page.exhibition.summary" />
      </div>
    </div>

    <div class="mx-auto my-16">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3 md:pr-12">
          <div v-for="member in $page.exhibition.member" :key="member.id" class="mb-12 block">
            <img :src="`${member.logo.url}?auto=compress,format`" :alt="member.name" width="200" />
          </div>
          <div class="space">
            <div class="font-display font-bold uppercase">Space</div>

            <p
              class="date m-0"
              v-for="location in $page.exhibition.location"
              :key="location.id"
            >{{ location.name }}</p>
          </div>

          <div v-if="$page.exhibition.externalCoPresenters" class="mt-6">
            <div class="font-display font-bold uppercase">Co-presented by</div>
            {{ $page.exhibition.externalCoPresenters }}
          </div>
          <div v-if="$page.exhibition.presenter" class="mt-6">
            <div class="font-display font-bold uppercase">Presented by</div>

            <p>{{ $page.exhibition.presenter }}</p>
            <div v-if="$page.exhibition.member[0]">
              <p v-for="member in $page.exhibition.member" :key="member.id">{{ member.shortName }}</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3">
          <div class="mb-8" v-html="$page.exhibition.description" />
          <div class="mb-8">
            <g-link to="/events" class="uppercase">&larr; Back to Events</g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>

query Exhibition($id: ID!)  {
  exhibition(id: $id) {
    description
    endDate
    externalCoPresenters
    externalTicketsLink
    featureImage {
      url
    }
    highlights {
      title
      startDateTime
      slug
      
    }

    hours
    id
    link
    location {
      name
    }
    member {
      logo {
        url
      }
      name
      shortName
    }
    presenter
    primaryPresenter
    programType
    slug
    startDate
    ticketPrice
    title
  }
}
</page-query>
<style lang="postcss">
#page--exhibition {
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

  name: "Exhibition",
  metaInfo() {
    return {
      title: this.$page.exhibition.title,
      bodyAttrs: {
        id: "page--exhibition"
      }
    };
  }
};
</script>

<style></style>
