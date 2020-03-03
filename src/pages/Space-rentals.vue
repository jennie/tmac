<template>
  <Layout>
    <div class="header">
      <img
        class="text-center mx-auto"
        src="
          https://www.datocms-assets.com/5128/1573870676-1562639275-8c954bd3-9617-42f3-a332-016f2f33bcf4.jpg?auto=compress,format&fit=crop&ar=16:9&crop=faces,entropy
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          Space Rentals
        </h1>
        <div class="mb-8 text-center text-gray-800">
          <p>
            We offer our gallery, event and meeting spaces for rent to a variety
            of groups.
          </p>
        </div>
      </div>
    </div>
    <main>
      <div
        v-for="(rentalPackage, index) in $page.packages.edges"
        :key="`package-${index}`"
        :index="index"
      >
        <div
          class="package my-6 border-b-4 py-6 bg-gray-100 rounded p-12 my-6 "
        >
          <h2>
            {{ rentalPackage.node.name }}
          </h2>
          <div class="flex flex-wrap justify-between ">
            <div class="w-full md:w-1/2">
              <div v-html="marked(rentalPackage.node.description)" />

              <h3 class="mb-4">Package Rate</h3>
              <p
                class="rate text-center font-bold text-green-600 bg-white inline-block rounded text-3xl p-3"
              >
                {{ rentalPackage.node.rate | currency }}
              </p>

              <h3 class="mb-4">Room Fees</h3>

              <table class="table-auto">
                <thead class="hidden">
                  <tr>
                    <th class="px-4 py-2">Space</th>
                    <th class="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(spaceOption, index) in rentalPackage.node
                      .spaceOptions"
                    :key="`space-${index}`"
                    :index="index"
                  >
                    <td class="border px-4 py-2">
                      {{ spaceOption.room.name }}
                      <span class="text-sm block" v-if="spaceOption.note">{{
                        spaceOption.note
                      }}</span>
                    </td>
                    <td class="border px-4 py-2">
                      {{ spaceOption.price | currency }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full md:w-1/2 md:pl-4">
              <h3 class="mb-4">Schedule</h3>
              <div
                v-for="(schedule, index) in rentalPackage.node.schedule"
                :key="`schedule-${index}`"
                :index="index"
                class="mb-4"
              >
                <span class="uppercase text-sm block" v-if="schedule.dayOfWeek">
                  {{ schedule.dayOfWeek }}
                </span>
                <span> {{ schedule.name }}: </span>
                <span>
                  {{ schedule.time }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query Packages {
  packages: allRentalPackage(sortBy: "position", order:ASC) {
    edges {
      node {
        name
        description
        rate
        spaceOptions {
          price
          note
          room {
            size
            name
            photo {
              url
            }
          }
        }
        schedule {
          dayOfWeek
          name
          time
        }
      }
    }
  }
}
</page-query>
<style lang="postcss">
main {
  .package {
    h2,
    h3 {
      font-family: HelveticaNowText-Bold;
      font-weight: normal;
      font-style: normal;
    }
    h2 {
      @apply m-0 text-left p-0;
    }
    h3 {
      @apply normal-case;
    }
    ul > li {
      @apply mb-0 pb-0;
    }
  }
}
</style>
<script>
export default {
  name: "Space Rentals",
  metaInfo: {
    title: "Space Rentals",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1573870676-1562639275-8c954bd3-9617-42f3-a332-016f2f33bcf4.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "Space Rentals" },
      {
        name: "twitter:description",
        content: "Information about renting space at Toronto Media Arts Centre"
      },
      { name: "og:title", content: "About TMAC" },
      {
        name: "og:description",
        content: "Information about renting space at Toronto Media Arts Centre"
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1573870676-1562639275-8c954bd3-9617-42f3-a332-016f2f33bcf4.jpg?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy"
      }
    ]
  }
};
</script>
