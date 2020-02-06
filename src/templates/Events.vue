<template>
  <Layout>
    <h2 class>Upcoming Events</h2>
    <div class="-px-12 py-16 flex flex-wrap">
      <EventListing
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
      }
    }
  }
}
</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";
import EventListing from "../components/EventListing";

export default {
  components: {
    PaginationPosts,
    EventListing
  }
};
</script>
