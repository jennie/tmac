<template>
  <Layout>
    <h2 class>Upcoming Exhibitions</h2>
    <div class="-px-12 py-16 flex flex-wrap">
      <ExhibitionListing
        v-for="(e, index) in $page.exhibitions.edges"
        :key="`exhibition-${index}`"
        :exhibition="e"
      />

      <pagination-posts
        v-if="$page.exhibitions.pageInfo.totalPages > 1"
        base="/events"
        :totalPages="$page.exhibitions.pageInfo.totalPages"
        :currentPage="$page.exhibitions.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Exhibitions ($page: Int, $today: Date) {

  exhibitions: allExhibition(sortBy: "startDate", order: ASC, perPage: 20, filter: { startDate: { gte: $today } }, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
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
  }
}
</page-query>

<script>
import PaginationPosts from "../components/PaginationPosts";
import ExhibitionListing from "../components/ExhibitionListing";

export default {
  components: {
    PaginationPosts,
    ExhibitionListing
  }
};
</script>
