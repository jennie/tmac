<template>
  <Fullscreen>
    <img
      class=" h-full w-full mx-auto max-w-5xl object cover"
      src="https://www.datocms-assets.com/5128/1581520322-sally-han.jpg"
      alt="Text on white background reads: I, Sally Han, of the City of Toronto, in the Province of Ontario, affirm and say as follows: I. TMAC's operations provide limited benefit to community."
    />
    <p
      class="mt-32 mx-auto text-center text-sm md:text-base bottom-0 right-0 bg-black text-white p-2"
    >
      from the affidavit of Sally Han, City of Toronto<br />August 2019
    </p>
    <div class="container md:w-2/3 mx-auto pt-0 md:bg-white">
      <div class="w-full px-6">
        <div class="mb-8 text-center text-gray-800">
          <form
            name="limited-benefit"
            action="/tmaction/limited-benefit/thank-you/"
            data-netlify="true"
            method="POST"
            accept-charset="utf-8"
          >
            <div class="mb-4 w-full">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 mt-6 text-left"
                for="response"
              >
                What do you think?
              </label>
              <textarea
                class="shadow block text-3xl appearance-none border rounded w-full py-2 mx-auto px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Start typing…"
                name="response"
                rows="5"
              />

              <label
                class="block text-gray-700 text-sm font-bold mb-2 mt-6 text-left"
                for="name"
              >
                Name and/or organization
                <span class="text-gray-500">optional</span>
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                placeholder="Name and/or organization"
              />
              <div class="flex items-center flex-no-wrap justify-between">
                <button
                  class="bg-blue my-6 hover:bg-black text-xl text-white py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send
                </button>
              </div>
              <p class="text-gray-500 text-sm self-center text-left">
                Your response will be sent to TMAC. We're collecting these
                reactions to
                <g-link to="/tmaction" class="underline" target="_blank">
                  share with the City later this month </g-link
                >.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Fullscreen>
</template>

<script>
import Fullscreen from "~/layouts/Fullscreen.vue";
export default {
  name: "Space Rentals",
  metaInfo: {
    title: "Space Rentals",
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://www.datocms-assets.com/5128/1581520322-sally-han.jpg?auto=compress,format&fit=crop&ar=1.91:1"
      },
      { name: "twitter:site", content: "@tomediaarts" },
      { name: "twitter:title", content: "#TMACtion" },
      {
        name: "twitter:description",
        content: "Do you think TMAC provides a benefit to the community?"
      },
      { name: "og:title", content: "#TMACtion" },
      {
        name: "og:description",
        content: "Do you think TMAC provides a benefit to the community?"
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
