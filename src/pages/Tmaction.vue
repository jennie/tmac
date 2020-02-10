<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto"
        src="
          https://www.datocms-assets.com/5128/1581278016-parkdale-meeting.jpg?&bm=normal&balph=20&auto=compress,format
        "
      />
      <div class="mx-auto -mt-32 pt-0 md:w-2/3 bg-white relative p-12">
        <h1 class="text-3xl text-center mt-12 mb-6 pt-12">
          #TMACtion
        </h1>
        <div class="text-center date mb-12"></div>
        <div class="mb-8 text-center text-gray-800">
          <p>
            In May 2015, the City of Toronto and Urbancorp
            <b>breached their obligations</b> under a contract with TMAC. We’re
            suing both parties for the right to purchase the arts space as
            agreed. Here you’ll find updates about our progress towards a
            resolution that will secure the space at 32 Lisgar for the benefit
            of the community.
          </p>

          <p>
            As of February 2020, we are still in litigation with the City of
            Toronto over the space, and the City maintains its position that
            TMAC is uanable to successfully operate the space and provides
            "limited benefit" to the community.
          </p>
        </div>
      </div>
    </div>
    <main>
      <div id="body">
        <div
          v-for="(t, index) in $page.timelineItems.edges"
          :key="`timelineItem-${index}`"
        >
          <div class="-px-12 py-2 flex flex-wrap mx-auto">
            <div class="w-2/4  self-center">
              <img
                v-if="t.node.image"
                class="pr-6  my-2 mx-auto w-9/12"
                :src="
                  `${t.node.image.url}?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy`
                "
              />

              <div class="uppercase text-center text-red-600 timeline-date">
                {{ t.node.date | luxon:format('MMMM d') }}
              </div>
              <div class="year">
                {{ t.node.date | luxon:format('kkkk') }}
              </div>
            </div>
            <div class="w-2/4 self-center">
              <h3>{{ t.node.title }}</h3>
              <div v-html="t.node.description" />
            </div>
          </div>

          <div
            class="w-2/4 flex"
            v-if="$page.timelineItems.edges.length !== index + 1"
          >
            <hr class="vertical self-center justify-center mx-auto " />
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>
<style lang="postcss" scoped>
h3 {
  @apply uppercase;
}
hr.vertical {
  @apply h-24 flex text-center justify-center border-red-500;

  border-width: 0 3px 0 0;

  display: inline-flex;

  min-height: 100%;

  max-height: 100%;

  max-width: 0;

  width: 10px;

  vertical-align: text-bottom;
}

.timeline-date {
  @apply text-3xl m-0;
  font-family: "HelveticaNowText-ExtraBold";
  font-weight: normal;
  font-style: normal;
}
.year {
  @apply text-2xl text-red-400 m-0 text-center;
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
