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
          <span class="date">{{ startDate }}&#8212;{{ endDate }} </span>

          <br />
          {{ $page.exhibition.hours }}
        </div>
        <div v-if="$page.exhibition.primaryPresenter">
          <div class="text-center text-sm HelveticaNowMicro-XLtIt">
            presented by {{ $page.exhibition.primaryPresenter }}
            <div v-if="$page.exhibition.externalCoPresenters">
              and {{ $page.exhibition.externalCoPresenters }}
            </div>
            <div v-if="$page.exhibition.member[0]">
              with {{ $page.exhibition.member[0].name }}
            </div>
          </div>
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
          <div class="mb-8" v-html="marked($page.exhibition.description)" />

          <div v-if="$page.exhibition.eventsList.length > 0">
            <h4 class="font-body normal-case mb-2 p-1">Related Programs</h4>
            <div class="flex flex-wrap">
              <EventListingMini
                v-for="(e, index) in $page.exhibition.eventsList"
                :key="`event-${index}`"
                :event="e"
                class="w-full md:w-1/2 p-1 rounded-lg overflow-hidden"
              />
            </div>
          </div>
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
    eventsList {
    
      title
      path
      startDateTime
      slug
      featureImage {
        url
      }      
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
import EventListingMini from "~/components/EventListingMini.vue";
import DateTime from "luxon/src/datetime.js";

export default {
  components: {
    Layout,
    EventListingMini
  },

  name: "Exhibition",
  computed: {
    startDate() {
      let d = DateTime.fromISO(this.$page.exhibition.startDate);
      return d.toFormat("MMMM d");
    },
    endDate() {
      let d = DateTime.fromISO(this.$page.exhibition.endDate);
      return d.toFormat("MMMM d, kkkk");
    }
  },
  metaInfo() {
    return {
      title: this.$page.exhibition.title,
      description: this.$page.exhibition.summary,
      bodyAttrs: {
        id: "page--exhibition"
      },
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${
            this.$page.exhibition.featureImage
              ? this.$page.exhibition.featureImage.url
              : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
          }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
        },
        { name: "twitter:site", content: "@tomediaarts" },
        { name: "twitter:title", content: this.$page.exhibition.title },
        {
          name: "twitter:description",
          content: `${this.$page.exhibition.description}`
        },
        { name: "og:title", content: this.$page.exhibition.title },
        {
          name: "og:description",
          content: this.$page.exhibition.description
        },
        {
          name: "og:image",
          content: `${
            this.$page.exhibition.featureImage
              ? this.$page.exhibition.featureImage.url
              : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
          }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
        }
      ]
    };
  }
};
</script>

<style></style>
