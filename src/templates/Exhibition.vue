<template>
  <Layout id="exhibition">
    <div class="header">
      <img
        class="text-center mx-auto"
        :src="
          `${$page.exhibition.featureImage.url}?auto=compress,format&fit=crop&crop=faces,entropy&ar=16:9&fit=crop`
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          {{ $page.exhibition.title }}
        </h1>
        <div class="text-center date mb-12">
          {{ $page.exhibition.startDate | luxon:format('MMMM d')






          }}&nbsp;–&nbsp;{{ $page.exhibition.endDate | luxon:format('MMMM d, kkkk') }}
          <br />
          {{ $page.exhibition.hours }}
        </div>
      </div>
    </div>

    <div class="mx-auto my-16">
      <div class="flex flex-wrap ">
        <div id="aside" class="w-full md:w-1/3 md:pr-12 order-2 md:order-1">
          <div
            v-for="member in $page.exhibition.member"
            :key="member.id"
            class="mb-12 block"
          >
            <img
              :src="`${member.logo.url}?auto=compress,format`"
              :alt="member.name"
              width="200"
            />
          </div>
          <div class="space">
            <h3 class="font-display font-bold uppercase">
              <div v-if="$page.exhibition.location[1]">Spaces</div>
              <div v-else>Space</div>
            </h3>
            <p
              class="date m-0"
              v-for="location in $page.exhibition.location"
              :key="location.id"
            >
              {{ location.name }}
            </p>
          </div>

          <div v-if="$page.exhibition.externalCoPresenters" class="mt-6">
            <div class="font-display font-bold uppercase">Co-presented by</div>
            {{ $page.exhibition.externalCoPresenters }}
          </div>
          <div v-if="$page.exhibition.presenter" class="mt-6">
            <div class="font-display font-bold uppercase">Presented by</div>

            <p>{{ $page.exhibition.presenter }}</p>
            <div v-if="$page.exhibition.member[0]">
              <p v-for="member in $page.exhibition.member" :key="member.id">
                {{ member.shortName }}
              </p>
            </div>
          </div>
        </div>
        <div id="body" class="w-full md:w-2/3  order-1 md:order-2">
          <div class="mb-8" v-html="$page.exhibition.description" />
        </div>
      </div>
      <div class="mb-8">
        <g-link to="/exhibitions" class="uppercase"
          >&larr; Back to Exhibitions</g-link
        >
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
