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
            TMAC is available to rent for a wide range of events—from gallery
            openings and receptions to small meetups and hackathons, dining
            events to panel discussions.
          </p>
        </div>
      </div>
    </div>
    <main>
      <div class="cols flex flex-wrap justify-between my-6 border-b-4 py-6">
        <div class="px-6 md:w-1/2">
          <p class="lead text-3xl leading-tight">
            Located in the heart of the Queen West Triangle – a vibrant,
            arts-friendly neighbourhood close to downtown Toronto – TMAC offers
            event, meeting and exhibition spaces in a purpose-built media arts
            facility overlooking Lisgar Park.
          </p>

          <p>
            <em>
              The rates below apply to not-for-profit organizations
              (incorporated or not), individual artists and collectives. We have
              limited availability for corporate/private and ticketed event
              rentals.
              <a href="mailto:events@tomediaarts.org"
                >Get in touch for rates.</a
              >
            </em>
          </p>
        </div>

        <div class="px-6 md:w-1/2">
          <h3>In-Kind Space</h3>
          <ul>
            <li>
              We welcome <b>co-production</b> and
              <b>co-presentation</b> inquiries from media arts nonprofits and
              festivals.
            </li>
            <li>
              We offer in-kind and PWYC pricing for <b>community events</b>, ad
              hoc groups and new/emerging artists, especially those serving and
              from marginalized communities.
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="flex justify-around justify-center">
        <a
          href="https://airtable.com/shrx5ut1Eq5aEffJk"
          class="bg-teal-500 text-2xl hover:bg-teal-600 text-white py-2 px-8 rounded text-center no-underline"
          >Submit Request</a
        >
      </div> -->
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

              <h3 class="mb-3 uppercase text-base">Schedule</h3>
              <div
                v-for="(schedule, index) in rentalPackage.node.schedule"
                :key="`schedule-${index}`"
                :index="index"
                class="mb-2 text-base"
              >
                <span
                  class="label uppercase text-sm block text-teal-600 tracking-normal"
                  v-if="rentalPackage.node.singleDay !== true && schedule.label"
                >
                  {{ schedule.label }}
                </span>
                <span> {{ schedule.name }}: </span>
                <span>
                  {{ schedule.time }}
                </span>
              </div>
            </div>
            <div class="w-full md:w-1/2 md:pl-12">
              <h3 class="mb-4">Package Rate</h3>
              <p
                class="rate text-center font-bold text-teal-600 bg-white inline-block rounded text-3xl p-3"
              >
                {{ rentalPackage.node.rate | currency }}
              </p>

              <h3 class="mb-4">Room Fees</h3>

              <table class="table-auto w-auto w-full">
                <thead class="hidden">
                  <tr>
                    <th class="px-4 py-2">Space</th>
                    <th class="px-4 py-2">Price</th>
                    <th class="px-4 py-2">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(spaceOption, index) in rentalPackage.node
                      .spaceOptions"
                    :key="`space-${index}`"
                    :index="index"
                  >
                    <td class="border px-4 py-2 w-2/3">
                      <div class="flex  justify-between">
                        <p class="m-0 p-0">
                          {{ spaceOption.room.name }}
                          <span class="text-sm block" v-if="spaceOption.note">{{
                            spaceOption.note
                          }}</span>
                        </p>
                      </div>
                    </td>
                    <td class="border px-4 py-2">
                      {{ spaceOption.price | currency }}
                    </td>
                    <td class="border px-4 py-2 ">
                      <a
                        class="justify-center align-middle"
                        v-if="spaceOption.room.availabilityCalendar"
                        :href="spaceOption.room.availabilityCalendar"
                        target="_blank"
                        ><i class="fas fa-calendar-day"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-around justify-center">
        <!-- <a
          href="https://airtable.com/shrx5ut1Eq5aEffJk"
          class="bg-teal-500 text-2xl hover:bg-teal-600 text-white py-2 px-8 rounded text-center no-underline"
          >Submit Request</a
        > -->
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
            availabilityCalendar
            photo {
              url
            }
          }
        }
        singleDay
        schedule {
          label
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
  .lead {
    font-family: HelveticaNowText-Bold;
    font-weight: normal;
    font-style: normal;
  }
  .package {
    h2,
    h3,
    .label {
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
  name: "SpaceRentals",
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
