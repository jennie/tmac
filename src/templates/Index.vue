<template>
  <Layout>
    <header>
      <div class="image-gallery">
        <img
          src="https://www.datocms-assets.com/5128/1581459534-ruby.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
        <img
          src="https://www.datocms-assets.com/5128/1581459444-summerwork.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
        <img
          src="https://www.datocms-assets.com/5128/1581445197-426965753321596209427917960276168609890304o.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
      </div>
      <h2 class="about text-center my-12 md:my-24 text-4xl">
        A place to create and experience video, film, games and digital culture.
      </h2>
      <div class="image-gallery">
        <img
          src="https://www.datocms-assets.com/5128/1581448828-jordan.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
        <img
          src="https://www.datocms-assets.com/5128/1581459375-42713268332158887609531963870951341031424o.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
        <img
          src="https://www.datocms-assets.com/5128/1581459430-tiwt.jpg?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.49:1&fit=crop"
        />
      </div>
    </header>
    <div v-if="$page.exhibitionsUpcoming.edges.length > 0">
      <h2 class="text-center">Exhibitions</h2>
      <div class="-px-12 py-16 flex flex-wrap">
        <ExhibitionListingMini
          v-for="(e, index) in $page.exhibitionsUpcoming.edges"
          :key="`exhibition-${index}`"
          :exhibition="e"
        />
      </div>
    </div>
    <div v-if="$page.eventsThisWeek.edges.length > 0">
      <h2 class="text-center">Events This Week</h2>
      <div class="-px-12 pt-6 flex flex-wrap">
        <EventListing
          v-for="(e, index) in $page.eventsThisWeek.edges"
          :key="`event-${index}`"
          :event="e"
        />
      </div>
    </div>
    <div v-if="$page.events.edges.length > 0">
      <h2 class="text-center">Upcoming Events</h2>
      <div class="py-16 flex flex-wrap">
        <EventListingMini
          v-for="(e, index) in $page.events.edges"
          :key="`event-${index}`"
          :event="e"
        />{{ $page.events.totalcount }}
        <div
          class="w-full text-center my-6 "
          v-if="$page.events.totalCount > 9"
        >
          <g-link
            to="/events"
            class="px-4 py-2 bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >All upcoming events</g-link
          >
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Events($today: Date, $thisWeek: Date) {
  events: allEvent(
    sortBy: "startDateTime"
    order: ASC
    limit: 9
    filter: { startDateTime: { gt: $thisWeek } }
  ) {
    totalCount
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
      }
    }
  }
  eventsThisWeek: allEvent(
    sortBy: "startDateTime"
    order: ASC
    filter: { startDateTime: { between: [$today, $thisWeek] } }
  ) {
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
      }
    }
  }
  exhibitionsUpcoming: allExhibition(
    sortBy: "startDate"
    order: ASC
    filter: { endDate: { gte: $today } }
  ) {
    edges {
      node {
        endDate
        externalCoPresenters
        externalTicketsLink
        featureImage {
          url
        }
        link
        presenter
        primaryPresenter
        programType
        path
        slug
        startDate
        ticketPrice
        title
      }
    }
  }
}


</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";
import EventListing from "../components/EventListing";
import EventListingMini from "../components/EventListingMini";
import ExhibitionListingMini from "../components/ExhibitionListingMini";

export default {
  components: {
    PaginationPosts,
    EventListing,
    EventListingMini,
    ExhibitionListingMini
  },
  name: "Home",
  metaInfo: {
    title: "Toronto Media Arts Centre",
    keywords:
      "oronto media arts, toronto media arts cluster, media-based arts, electronic arts, computer integrated media, toronto media arts center, media arts collective",
    titleTemplate: "%s",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1581445197-426965753321596209427917960276168609890304o.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "TMAC" },
      {
        name: "twitter:description",
        content:
          "A collaborative space for Toronto media arts organizations, media-based artists and the Queen West Triangle community."
      },
      { name: "og:title", content: "TMAC" },
      {
        name: "og:description",
        content:
          "A collaborative space for Toronto media arts organizations, media-based artists and the Queen West Triangle community."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1581445197-426965753321596209427917960276168609890304o.jpg.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>

<style lang="postcss">
.event:last-child {
  @apply mb-0;
}
h2 {
}
.image-gallery {
  display: flex;
  margin: 0 auto;
  flex-wrap: nowrap;
}
.image-gallery img {
  flex: 1 1 auto;
  width: 33.3%;
  height: 100%;
}
</style>
