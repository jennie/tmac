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
        base="/Exhibitions"
        :totalPages="$page.exhibitions.pageInfo.totalPages"
        :currentPage="$page.exhibitions.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query Exhibitions ($page: Int, $today: Date) {

  exhibitions: allExhibition(sortBy: "startDate", order: ASC, perPage: 20, filter: { endDate: { gte: $today } }, page: $page) @paginate {
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
import ExhibitionListing from "../components/ExhibitionListing";

export default {
  components: {
    PaginationPosts,
    ExhibitionListing
  },
  name: "Exhibitions",
  metaInfo: {
    title: "Exhibitions",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1547952533-2018-11-01001-bymyseum.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "Exhibitions" },
      {
        name: "twitter:description",
        content: "Upcoming programs, exhibitions and festivals."
      },
      { name: "og:title", content: "Exhibitions" },
      {
        name: "og:description",
        content: "Upcoming programs, exhibitions and festivals."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1547952533-2018-11-01001-bymyseum.jpg.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
