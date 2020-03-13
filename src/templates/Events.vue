<template>
  <Layout>
    <h2 class>Upcoming Events</h2>
    <div class="-px-12 py-16 flex flex-wrap">
      <EventListing
        v-for="(e, index) in $page.events.edges"
        :key="`event-${index}`"
        :event="e"
      />
      <PaginationPosts
        v-if="$page.events.pageInfo.totalPages > 1"
        base="/events"
        :totalPages="$page.events.pageInfo.totalPages"
        :currentPage="$page.events.pageInfo.currentPage"
      />
    </div>

    <div id="past-events">
      <h2 class>Past Events</h2>

      <!-- {{ $page.pastEvents.totalCount }} -->
      <div
        class="event"
        v-for="(e, index) in $page.pastEvents.edges"
        :key="`event-${index}`"
        :event="e"
      >
        <h4 class="flex">
          <strong class="truncate"
            ><g-link :to="e.node.path">
              {{ e.node.title }}
            </g-link>
          </strong>
          <div
            class="self-center pl-2 presenters text-xs HelveticaNowMicro-XLtIt"
          >
            <span class="truncate">
              {{ e.node.startDateTime  | luxon:format('MMMM d, kkkk')}}
            </span>
            <!-- <span v-if="e.node.member[0]"
              >{{ e.node.member[0].shortName }}
            </span>
            <span v-if="e.node.presenter">{{ e.node.presenter }}</span>
            <span v-if="e.node.externalCoPresenters">{{
              e.node.externalCoPresenters
            }}</span> -->
          </div>
        </h4>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Events ($page: Int, $today: Date) {

  events: allEvent(sortBy: "startDateTime", order: ASC, perPage: 20, filter: { startDateTime: { gte: $today } }, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        startDateTime
        endDateTime
        featureImage {
          url
        }
        id
        slug
        path
        title
        summary
        eventType
        canceled
      }
    }
  }
  pastEvents: allEvent(sortBy: "startDateTime", order: DESC, filter: { endDateTime: { lt: $today } }) {
    totalCount
    edges {
      node {
        startDateTime
        endDateTime
        slug
        path
        title
        presenter
        canceled
        member {
          shortName
        }
        externalCoPresenters
      }
    }
  }
}
</page-query>
<style lang="postcss" scoped>
h4 {
  strong {
    font-family: HelveticaNowText-ExtraBold;
    font-weight: normal;
    font-style: normal;
  }
}
</style>
<script>
import PaginationPosts from "../components/PaginationPosts";
import EventListing from "../components/EventListing";

export default {
  components: {
    PaginationPosts,
    EventListing
  },
  name: "Events",
  metaInfo: {
    title: "Events",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1581448828-jordan.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "Events" },
      {
        name: "twitter:description",
        content:
          "Upcoming workshops, receptions, openings, socials, parties and concerts."
      },
      { name: "og:title", content: "Events" },
      {
        name: "og:description",
        content:
          "Upcoming workshops, receptions, openings, socials, parties and concerts."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1581448828-jordan.jpg.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
