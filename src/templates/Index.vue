<template>
  <Layout>
    <header>
      <div class="image-gallery">
        <g-image src="~/assets/images/ruby.jpg" quality="100" fit="cover" width="920" height="614" />
        <g-image
          src="~/assets/images/summerwork.jpg"
          quality="100"
          fit="cover"
          width="920"
          height="614"
        />
        <g-image
          src="~/assets/images/changeup.jpg"
          quality="100"
          fit="cover"
          width="920"
          height="614"
        />
      </div>
      <h2
        class="about text-center my-24 text-4xl"
      >A place to create and experience video, film, games and digital culture.</h2>
      <div class="image-gallery">
        <g-image
          src="~/assets/images/jordan.jpg"
          quality="90"
          fit="cover"
          width="920"
          height="614"
        />
        <g-image
          src="~/assets/images/42713268_332158887609531_963870951341031424_o.jpg"
          quality="90"
          fit="cover"
          width="920"
          height="614"
        />
        <g-image src="~/assets/images/tiwt.jpg" quality="100" fit="cover" width="920" height="614" />
      </div>
      <!-- <img
        src="https://www.datocms-assets.com/5128/1580249587-426632353321595576094648128269575260209152o-1.jpg?&bm=normal&balph=20&auto=compress,format"
        alt=""
      />-->
    </header>

    <h2 class="text-center">Events This Week</h2>
    <div class="-px-12 pt-6 flex flex-wrap">
      <EventListing
        v-for="(e, index) in $page.eventsThisWeek.edges"
        :key="`event-${index}`"
        :event="e"
      />
    </div>
    <h2 class="text-center">More Upcoming Events</h2>
    <div class="py-16 -m-4 flex flex-wrap">
      <EventListingMini
        v-for="(e, index) in $page.events.edges"
        :key="`event-${index}`"
        :event="e"
      />

      <pagination-posts
        v-if="$page.events.pageInfo.totalPages > 1"
        base="/events"
        :totalPages="$page.events.pageInfo.totalPages"
        :currentPage="$page.events.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Events($page: Int, $today: Date, $thisWeek: Date) {
  events: allEvent(
    sortBy: "startDateTime"
    order: ASC
    perPage: 20
    filter: { startDateTime: { gt: $thisWeek } }
    page: $page
  ) @paginate {
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
}

</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";
import EventListing from "../components/EventListing";
import EventListingMini from "../components/EventListingMini";

export default {
  components: {
    PaginationPosts,
    EventListing,
    EventListingMini
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
