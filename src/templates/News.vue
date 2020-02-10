<template>
  <Layout>
    <h2 class>News</h2>

    <div class="-px-12 py-16 flex flex-wrap">
      <ArticleListing
        v-for="(a, index) in $page.articles.edges"
        :key="`article-${index}`"
        :article="a"
      />
    </div>
  </Layout>
</template>

<page-query>
query Articles {
  articles: allArticle(sortBy: "date", order: DESC) {
    edges {
      node {
        appendix
        body
        date
        featureImage {
          url
        }
        id
        title
        summary
        path
        slug
        shortSummary
      }
    }
  }
}
</page-query>

<script>
import ArticleListing from "../components/ArticleListing";

export default {
  components: {
    ArticleListing
  }
};
</script>
