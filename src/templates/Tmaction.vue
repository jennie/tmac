<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto"
        src="
          https://www.datocms-assets.com/5128/1595708026-photo1-3.jpg?auto=compress,format
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          #TMACtion
        </h1>
        <div class="mb-8 text-center text-gray-800"></div>
      </div>
    </div>
    <main>
      <div
        class="cols flex flex-wrap justify-between my-6 border-b-4 border-red-600 py-6"
      >
        <p class="px-6 md:w-1/3">
          In May 2015,
          <b>the City of Toronto and Urbancorp breached their obligations</b>
          under a contract with TMAC. We sued both parties for the right to
          purchase the arts space as agreed.
        </p>
        <p class="px-6 md:w-1/3">
          Our only demand is that the City of Toronto
          <b>deliver on the promises it made</b> to this community. Nothing
          more, nothing less.
        </p>
        <p class="px-6 md:w-1/3">
          Despite its responsibility to protect this unique Section 37 benefit,
          the
          <b>
            City has interfered and refused to act in the interest of the
            community
          </b>
          for over 6 years — putting the security of vital media artists and
          nonprofits in jeopardy.
        </p>
      </div>
      <div id="body">
        <div class="mx-auto">
          <p class="text-xl text-red-600 text-center">
            Do you think TMAC provides a benefit to the community?
          </p>
          <div class="text-center mx-auto">
            <g-link
              to="/tmaction/limited-benefit"
              class="bg-red-500 hover:bg-red-600 text-2xl text-white py-2 px-4 rounded-full no-underline "
              >Submit Your Response</g-link
            >
          </div>
        </div>
        <h2>Timeline of Events</h2>
        <TimelineItem
          v-for="(t, index) in $page.timelineItems.edges"
          :key="`timelineItem-${index}`"
          :timelineItem="t"
          :index="index"
        />
      </div>
    </main>
  </Layout>
</template>
<style lang="postcss" scoped>
h3 {
  @apply uppercase text-2xl;
  font-family: "HelveticaNowText-ExtraBold";
  font-weight: normal;
  font-style: normal;
  text-transform: unset;
}
</style>
<page-query>
query Timeline {
  timelineItems: allTimeline(sortBy: "date", order: DESC) {
    edges {
      node {
        date
        title
        description
        image {
          url
        }
        youtubeVideo {
          url
          thumbnailUrl
        }        
      }
    }
  }
}
</page-query>

<script>
import TimelineItem from "../components/TimelineItem";

export default {
  components: {
    TimelineItem
  },
  name: "#TMACtion",
  metaInfo: {
    title: "#TMACtion",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1581292380-c1e2c1a7-e926-4a84-b125-ddf381d50554.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "Updates on the fight for our space" },
      {
        name: "twitter:description",
        content:
          "News, FAQs and updates about our ongoing litigation against the City of Toronto and Urbancorp over our space at 32 Lisgar Street."
      },
      { name: "og:title", content: "Updates on the fight for our space" },
      {
        name: "og:description",
        content:
          "News, FAQs and updates about our ongoing litigation against the City of Toronto and Urbancorp over our space at 32 Lisgar Street."
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1581292380-c1e2c1a7-e926-4a84-b125-ddf381d50554.jpg?auto=compress,format?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
