<template>
  <Fullscreen>
    <img
      class=" h-full w-full mx-auto max-w-5xl object cover"
      src=" https://www.datocms-assets.com/5128/1581520322-sally-han.jpg "
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
            action="/thank-you"
            data-netlify="true"
            method="POST"
            accept-charset="utf-8"
          >
            <div class="mb-4 w-full">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 mt-6 text-left"
                for="name"
              >
                What do you think?
              </label>
              <textarea
                class="shadow block text-3xl appearance-none border rounded w-full py-2 mx-auto px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                placeholder="Start typing…"
                rows="5"
              />

              <label
                class="block text-gray-700 text-sm font-bold mb-2 mt-6 text-left"
                for="name"
              >
                Name and/or organization
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name and/or organization"
              />
              <div class="flex items-center flex-no-wrap justify-between">
                <button
                  class="bg-blue my-6 hover:bg-black text-xl text-white py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send
                </button>
              </div>
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
