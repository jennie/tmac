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
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          {{ $page.article.title }}
        </h1>
        <div class="text-center date mb-12">
          {{ $page.article.date | luxon:format('MMMM d, kkkk') }}
        </div>
        <div
          class="mb-8 text-center text-2xl"
          v-html="marked($page.article.summary)"
        />
      </div>
    </div>

    <div class="mx-auto mb-16">
      <div class="flex flex-wrap">
        <div id="body" class="w-full mx-auto md:w-2/3">
          <div class="mb-8" v-html="marked($page.article.body)" />
          <div class="mb-8">
            <g-link to="/news" class="uppercase">&larr; Back to News</g-link>
          </div>
        </div>
      </div>
    </div>
    {{ jsonld }}

    <script v-html="jsonld.jsonld" type="application/ld+json" />
  </Layout>
</template>

<page-query>

query Article($id: ID!)  {
  article(id: $id) {
    appendix
    body
    date
    _updatedAt    
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
  computed: {
    jsonld() {
      const jsonld = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://tomediaarts.org/news/${this.$page.article.slug}`
        },
        headline: this.$page.article.title,
        image: `${
          this.$page.article.featureImage
            ? this.$page.article.featureImage.url
            : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
        }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`,
        datePublished: this.$page.article.date,
        dateModified: this.$page.article._updatedAt,
        author: {
          "@type": "Organization",
          name: "Toronto Media Arts Centre"
        },
        publisher: {
          "@type": "Organization",
          name: "Toronto Media Arts Centre",
          logo: {
            "@type": "ImageObject",
            url: "https://tomediaarts.org/images/logos/TMAC_logo@4x.png"
          }
        },
        description: this.$page.article.summary
      };
      return { jsonld };
    }
  },
  metaInfo() {
    return {
      title: this.$page.article.title,
      description: this.$page.article.summary,
      bodyAttrs: {
        id: "page--article"
      },
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${
            this.$page.article.featureImage
              ? this.$page.article.featureImage.url
              : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
          }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
        },
        { name: "twitter:site", content: "@tomediaarts" },
        { name: "twitter:title", content: this.$page.article.title },
        {
          name: "twitter:description",
          content: `${this.$page.article.summary}`
        },
        { name: "og:title", content: this.$page.article.title },
        {
          name: "og:description",
          content: this.$page.article.summary
        },
        {
          name: "og:image",
          content: `${
            this.$page.article.featureImage
              ? this.$page.article.featureImage.url
              : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
          }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
        }
      ]
    };
  }
};
</script>

<style></style>
