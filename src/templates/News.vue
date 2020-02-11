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
  },
  name: "News",
  metaInfo: {
    title: "News",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1580597552-img2715.jpeg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "News" },
      {
        name: "twitter:description",
        content: "The latest on TMAC's fight for its space at 32 Lisgar Street."
      },
      { name: "og:title", content: "News" },
      {
        name: "og:description",
        content: "The latest on TMAC's fight for its space at 32 Lisgar Street."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1580597552-img2715.jpeg.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
