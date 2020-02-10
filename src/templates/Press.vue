<template>
  <Layout>
    <h2 class>Media Coverage</h2>

    <div class="md:w-1/2 -px-12 py-16 flex flex-wrap mx-auto">
      <PressLinkListing
        v-for="(p, index) in $page.presslinks.edges"
        :key="`press-${index}`"
        :presslink="p"
      />
    </div>
  </Layout>
</template>

<page-query>
query Articles {
  presslinks: allPress(sortBy: "date", order: DESC) {
      edges {
        node {
      title
      outlet
      link
      isCoverage
      id
      file {
        url
        format
      }
      date
      author
      }
    }
  }
}
</page-query>

<script>
import PressLinkListing from "../components/PressLinkListing";

export default {
  components: {
    PressLinkListing
  }
};
</script>
