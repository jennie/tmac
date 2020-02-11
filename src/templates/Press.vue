<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto object-cover w-full h-full"
        src="
          https://www.datocms-assets.com/5128/1581278016-parkdale-meeting.jpg?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          Press &amp; Media Coverage
        </h1>
      </div>
    </div>

    <div class="md:w-4/5 lg:w-2/3 -px-12 py-16 flex flex-wrap mx-auto">
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
