<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto"
        src="
          https://www.datocms-assets.com/5128/1581304594-cafe-floors.jpg?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          FAQs
        </h1>
        <div class="text-center date mb-12"></div>
        <div class="mb-8 text-center text-gray-800">
          <p>
            We've heard these a few times. Here are answers to those
            <b>burning questions</b> you've had about TMAC!
          </p>
        </div>
      </div>
    </div>

    <main>
      <div id="body" class="">
        <div
          class="p-2 mx-auto md:w-2/3 w-full"
          v-for="(faq, index) in $page.faqs.edges"
          :key="`faq-${index}`"
          id="`faq-${index}`"
        >
          <div class="p-6 h-full border-black border-4">
            <h3 class="m-0">{{ faq.node.question }}</h3>
            <div class="text-black" v-html="marked(faq.node.answer)" />
          </div>

          <div
            class=" text-6xl text-center mx-auto my-12"
            v-if="$page.faqs.edges.length !== index + 1"
          >
            <i class="fas fa-question-circle"></i>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<style lang="postcss" scoped>
h3 {
  @apply text-3xl m-0 normal-case leading-tight;
  font-family: "HelveticaNowDisplay-XBlk";

  font-weight: normal;
  font-style: normal;
}
</style>
<page-query>
query Articles {
  faqs: allFaqs(sortBy: "position", order: ASC) {
    edges {
      node {
        answer
        id
				position
        question
        slug
      }
    }
  }
}
</page-query>
<script>
export default {
  name: "FAQs",
  description: "Frequently Asked Questions about TMAC",
  metaInfo: {
    title: "FAQs",
    description: "Frequently Asked Questions about TMAC",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1581304594-cafe-floors.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "FAQs" },
      {
        name: "twitter:description",
        content: "The questions we get… over and over."
      },
      { name: "og:title", content: "TMAC" },
      {
        name: "og:description",
        content: "The questions we get… over and over."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1581304594-cafe-floors.jpg.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
