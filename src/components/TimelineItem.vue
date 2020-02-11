<template>
  <div>
    <div class="-px-12 py-2 flex flex-wrap mx-auto">
      <div class="w-full md:w-2/4  self-center">
        <img
          v-if="timelineItem.node.image"
          class="pr-6  my-2 mx-auto"
          :src="
            `${timelineItem.node.image.url}?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy`
          "
        />
        <div v-if="timelineItem.node.youtubeVideo" class="pr-6  my-2 mx-auto">
          <a :href="timelineItem.node.youtubeVideo.url">
            <img
              :src="timelineItem.node.youtubeVideo.thumbnailUrl"
              class="mx-auto w-full"
            />
          </a>
        </div>
        <div class="uppercase text-center text-red-600 timeline-date">
          {{ date }}
        </div>
        <div class="year">
          {{ timelineItem.node.date | luxon:format('kkkk') }}
        </div>
      </div>
      <div class="w-full md:w-2/4 self-center">
        <h3>{{ timelineItem.node.title }}</h3>
        <div v-html="marked(timelineItem.node.description)" />
      </div>
    </div>
    <div
      class="w-full md:w-2/4 flex"
      v-if="$page.timelineItems.edges.length !== index + 1"
    >
      <hr class="vertical self-center justify-center mx-auto " />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
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
  font-family: "HelveticaNowDisplay-XBlk";
  font-weight: normal;
  font-style: normal;
}
.year {
  @apply text-2xl text-red-400 m-0 text-center;
  font-family: "HelveticaNowText-ExtraBold";
}
</style>
<script>
import DateTime from "luxon/src/datetime.js";

export default {
  props: ["timelineItem", "index"],
  computed: {
    date() {
      let d = DateTime.fromISO(this.timelineItem.node.date);

      return d.toFormat("MMMM d");
    }
  }
};
</script>
