<template>
  <Layout id="event">
    <div class="header">
      <img
        class="text-center mx-auto"
        v-if="$page.event.featureImage"
        :src="
          `${$page.event.featureImage.url}?auto=compress,format&fit=crop&crop=faces,entropy&ar=16:9&fit=crop`
        "
      />
      <div class="mx-auto md:-mt-32 pt-0 md:w-2/3 md:bg-white relative md:p-6">
        <h1 class="text-2xl md:text-4xl text-center mb-6">
          {{ $page.event.title }}
        </h1>
        <div class="text-center date mb-12">
          <div v-if="duration > 24">
            {{ $page.event.startDateTime | luxon:format('EEEE, MMMM d')

            }}
            &nbsp;–&nbsp;
            {{ $page.event.endDateTime | luxon:format('EEEE, MMMM d') }}
          </div>
          <div v-else>
            {{ $page.event.startDateTime | luxon:format('EEEE, MMMM d') }}
            <br />
            {{ $page.event.startDateTime | luxon:format('t') }}&nbsp;–&nbsp;
            {{ $page.event.endDateTime | luxon:format('t') }}
          </div>
        </div>
        <div
          class="mb-8 text-center text-2xl text-gray-800"
          v-html="marked($page.event.summary)"
        />
      </div>
    </div>
    <div class="mx-auto my-16">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3 md:pr-12  order-2 md:order-1">
          <div
            v-for="member in $page.event.member"
            :key="member.id"
            class="mb-12 block"
          >
            <img
              :src="`${member.logo.url}?auto=compress,format`"
              :alt="member.name"
              width="200"
            />
          </div>
          <div class="space">
            <div class="font-display font-bold uppercase">Space</div>

            <p
              class="date m-0"
              v-for="location in $page.event.location"
              :key="location.id"
            >
              {{ location.name }}
            </p>
          </div>

          <div v-if="$page.event.externalCoPresenters" class="mt-6">
            <div class="font-display font-bold uppercase">Co-presented by</div>
            {{ $page.event.externalCoPresenters }}
          </div>
          <div v-if="$page.event.presenter" class="mt-6">
            <div class="font-display font-bold uppercase">Presented by</div>

            <p>{{ $page.event.presenter }}</p>
            <div v-if="$page.event.member[0]">
              <p v-for="member in $page.event.member" :key="member.id">
                {{ member.shortName }}
              </p>
            </div>
          </div>

          <div v-if="$page.event.registrationLink">
            <p class="flex mt-12">
              <a :href="$page.event.registrationLink" class="">
                <div v-if="$page.event.actionButtonText">
                  {{ $page.event.actionButtonText }}
                </div>
                <div v-if="!$page.event.actionButtonText">
                  Register
                </div>
              </a>
            </p>
          </div>
        </div>
        <div id="body" class="w-full md:w-2/3  order-1 md:order-2">
          <div class="mb-8" v-html="marked($page.event.description)" />
        </div>
      </div>
      <div class="mb-8">
        <g-link to="/events" class="uppercase">&larr; Back to Events</g-link>
      </div>
    </div>
    <script v-html="jsonld.jsonld" type="application/ld+json" />
  </Layout>
    </template>

    <page-query>

    query Event($id: ID!)  {
      event(id: $id) {
        startDateTime
        endDateTime
        actionButtonText
        canceled
        createdAt
        description
        eventType
        externalCoPresenters
        featureImage {
          url
        }
        id
        location {
          name
        }
        member {
          name
          shortName
          logo {
            url
          }
        }
        presenter
        registrationLink
        slug
        summary
        title

      }
    }
    </page-query>
    <style lang="postcss"></style>
    <script>
    import Layout from "~/layouts/Default.vue";
    import Interval from "luxon/src/interval.js";
    import DateTime from "luxon/src/datetime.js";
    export default {
      components: {
        Layout
      },


      computed: {
        duration() {
          var i = Interval.fromDateTimes(
            DateTime.fromISO(this.$page.event.startDateTime),
            DateTime.fromISO(this.$page.event.endDateTime)
          );
          return i.length("hours");
        },
        jsonld() {
          const jsonld = {
            "@context": "http://www.schema.org",
            "@type": "Event",
            "name": this.$page.event.title,
            "url": `https://tomediaarts.org/event/${this.$page.event.slug}`,
            "description": this.$page.event.description,
            "startDate": this.$page.event.startDateTime,
            "endDate": this.$page.event.endDateTime,
            "image": this.$page.event.featureImage.url,
            "location": {
              "@type": "Place",
              "name": "Toronto Media Arts Centre",
              "sameAs": "https://tomediaarts.org",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "32 Lisgar Street",
                "addressLocality": "Toronto",
                "addressRegion": "ON",
                "postalCode": "M6J0C9",
                "addressCountry": "Canada"
              }
            }
          }
        return { jsonld }
        }
      },
      name: "Event",
      metaInfo() {
        return {
          title: this.$page.event.title,
          description: this.$page.event.summary,
          bodyAttrs: {
            id: "page--event"
          },
          meta: [
            { name: "twitter:card", content: "summary_large_image" },
            {
              name: "twitter:image",
              content: `${
                this.$page.event.featureImage
                  ? this.$page.event.featureImage.url
                  : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
              }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
            },
            { name: "twitter:site", content: "@tomediaarts" },
            { name: "twitter:title", content: this.$page.event.title },
            {
              name: "twitter:description",
              content: `${this.$page.event.summary}`
            },
            { name: "og:title", content: this.$page.event.title },
            {
              name: "og:description",
              content: this.$page.event.summary
            },
            {
              name: "og:image",
              content: `${
                this.$page.event.featureImage
                  ? this.$page.event.featureImage.url
                  : "https://www.datocms-assets.com/5128/1562264739-videoblocks-laser-scan-lines-looping-background-animationhoy-vxoxthumbnail-full06.png"
              }?auto=compress,format&fit=crop&ar=1.91:1&crop=faces,entropy`
            }
          ]
        };
      }
    };
  </script>
</template>
