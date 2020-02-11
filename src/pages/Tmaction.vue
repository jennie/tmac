<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto"
        src="
          https://www.datocms-assets.com/5128/1581301758-img2704.jpeg?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy
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
          under a contract with TMAC. We’re suing both parties for the right to
          purchase the arts space as agreed.
        </p>
        <p class="px-6 md:w-1/3">
          <b>TMAC remains ready, willing and able to close.</b> All we want is
          for the City of Toronto to deliver on the promises it made and allow
          us to complete the transaction. Nothing more, nothing less.
        </p>
        <p class="px-6 md:w-1/3">
          Despite its responsibility to protect this unique Section 37 benefit,
          the
          <b>
            City has interfered and refused to act in the interest of the
            community
          </b>
          for over 5 years — putting the security of vital media artists and
          nonprofits in jeopardy.
        </p>
      </div>
      <div id="body">
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
  }
};
</script>
