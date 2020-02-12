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
          <div class="mt-24 text-2xl">
            <h3 class="uppercase text-green-500 text-3xl">
              Received, thank you!
            </h3>
            <p>
              Feel free to tweet the image above, and share your thoughts on
              social media using #TMACtion hashtag!
              <g-link to="/tmaction" class="underline">
                Stay up to date with our ongoing fight for our space.
              </g-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Fullscreen>
</template>

<script>
import Fullscreen from "~/layouts/Fullscreen.vue";
export default {
  name: "Thanks!",
  metaInfo: {
    title: "Thanks!"
  }
};
</script>
