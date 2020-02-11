<template>
  <Layout id="event">
    <div class="header">
      <div v-if="$page.article.featureImage">
        <img
          class="text-center mx-auto"
          :src="
            `${$page.article.featureImage.url}?auto=compress,format&fit=crop&crop=faces,entropy&ar=1.91:1&fit=crop`
          "
        />
      </div>

      <div v-else class="bg-black pb-1/3" />
      <div class="mx-auto -mt-64 pt-0 md:w-2/3 bg-white relative p-12">
        <h1 class="text-3xl text-center mt-12 mb-6 pt-12">
          {{ $page.article.title }}
        </h1>
        <div class="text-center date mb-12">
          {{ $page.article.date | luxon:format('MMMM d, kkkk') }}
        </div>
        <div class="mb-8 text-center text-2xl" v-html="$page.article.summary" />
      </div>
    </div>

    <div class="mx-auto mb-16">
      <div class="flex flex-wrap">
        <div id="body" class="w-full mx-auto md:w-2/3">
          <div class="mb-8" v-html="$page.article.body" />
          <div class="mb-8">
            <g-link to="/news" class="uppercase">&larr; Back to News</g-link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>

query Article($id: ID!)  {
  article(id: $id) {
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
</page-query>
<style lang="postcss"></style>
<script>
import Layout from "~/layouts/Default.vue";

export default {
  components: {
    Layout
  },

  name: "Article",
  metaInfo() {
    return {
      title: this.$page.article.title,
      bodyAttrs: {
        id: "page--article"
      }
    };
  }
};
</script>

<style></style>
