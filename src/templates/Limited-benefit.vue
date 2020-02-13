<template>
  <Fullscreen id="limited-benfit" name="LimitedBenefit">
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
    <div class="container mx-auto pt-0 md:bg-white">
      <div class="w-full px-6">
        <div type="success" v-if="submitted">
          <h3 class="uppercase text-center text-green-500 text-3xl">
            Thanks, got it!
          </h3>
          <div class="text-left mt-6">
            <h4 class="text-center text-gray-900 text-3xl mb-6">Next steps:</h4>

            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2 px-6">
                <h3 class="HelveticaNowDisplay-XBlk normal-case">
                  Share your response with the City
                </h3>
                <ol
                  class="list-decimal my-6 mx-auto px-12 py-6 bg-yellow-300 text-lg "
                >
                  <li class="m-0 pb-3">
                    <b>Mike Williams</b>, General Manager, Economic Development
                    and Culture<br />
                    <a
                      class="text-blue underline"
                      href="mailto:mike.williams@toronto.ca"
                      >mike.williams@toronto.ca</a
                    >
                  </li>
                  <li class="m-0 p-0">
                    <b>Councillor Ana Bailão</b>, City of Toronto, Ward 9
                    Davenport<br />
                    <a
                      class="text-blue underline"
                      href="mailto:councillor_bailao@toronto.ca"
                      >councillor_bailao@toronto.ca</a
                    >
                    • Twitter:
                    <a
                      class="text-blue underline"
                      href="https://twitter.com/anabailaoTO"
                      target="_blank"
                      >AnaBailaoTO</a
                    >
                  </li>
                  <!-- <li class="m-0 p-0">
                    <b>Councillor Michael Thompson</b>, Chair of Toronto's
                    Economic and Community Development Committee <br />
                    <a
                      class="text-blue underline"
                      href="mailto:councillor_thompson@toronto.ca"
                      >councillor_thompson@toronto.ca</a
                    >
                  </li> -->
                </ol>
              </div>
              <div class="w-full md:w-1/2 px-6">
                <h3 class="HelveticaNowDisplay-XBlk normal-case">
                  Share your thoughts on Twitter
                </h3>
                <p class="mt-6">
                  Feel free to share the image above with a link to
                  <g-link to="/tmaction/limited-benefit" target="_blank"
                    >this page</g-link
                  >, and share your thoughts on social media using
                  <a
                    href="https://twitter.com/search?q=TMACtion&src=typed_query&f=live"
                    target="_blank"
                    >#TMACtion</a
                  >
                  hashtag!
                </p>
              </div>
            </div>
          </div>
          <div class="mx-6">
            <h3 class="HelveticaNowDisplay-XBlk normal-case">
              Your response:
            </h3>
            <blockquote class="my-6 mx-auto px-12 py-6 bg-gray-100 text-base">
              {{ formData.response }}
            </blockquote>
          </div>
        </div>

        <div v-else class="mb-8 text-center text-gray-800">
          <form
            name="limited-benefit"
            action
            data-netlify="true"
            method="POST"
            v-if="!submitted"
            v-on:submit.prevent="handleSubmit"
            accept-charset="utf-8"
          >
            <div class="mb-4 w-full md:w-2/3 mx-auto">
              <label
                class="block text-gray-700 text-xl mb-2 mt-6 text-left"
                for="response"
              >
                What do you think?
              </label>
              <textarea
                class="shadow block text-xl appearance-none border rounded w-full py-2 mx-auto px-3 text-gray-700 leading-tight tracking-tight focus:outline-none focus:shadow-outline"
                placeholder="Start typing…"
                name="response"
                id="response"
                v-model="formData.response"
                rows="5"
              />

              <label
                class="block text-gray-700 text-lg mb-2 mt-6 text-left"
                for="name"
              >
                Name and/or organization
                <span class="pl-2 text-gray-500 font-normal">optional</span>
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                id="name"
                type="text"
                v-model="formData.name"
                placeholder="Name and/or organization"
              />
              <div class="flex items-center flex-no-wrap justify-between">
                <button
                  class="bg-blue my-6 hover:bg-black text-xl text-white py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save and see next steps →
                </button>
              </div>
              <p class="text-gray-600 text-base self-center text-left">
                Your response will be sent to TMAC. On the next page, you will
                see who else you can contact. Need some background?
                <g-link to="/tmaction" class="underline" target="_blank"
                  >Read about our lawsuit against the City of Toronto and
                  Urbancorp</g-link
                >
                – filed 5 years ago this May.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Fullscreen>
</template>

<style lang="postcss">
h3 {
}
label {
  font-family: HelveticaNowText-ExtraBold;
  font-weight: normal;
  font-style: normal;
  span {
    font-family: HelveticaNowText-Regular;
    font-weight: normal;
    font-style: normal;
  }
}
</style>
<script>
import Fullscreen from "~/layouts/Fullscreen.vue";

export default {
  name: "LimitedBenefit",
  components: {
    Fullscreen
  },
  data() {
    return {
      formData: {},
      submitted: false
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      let responseText = e.target.querySelector("#response").value;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          response: e.target.querySelector("#response").value,
          name: e.target.querySelector("#name").value,
          ...this.formData
        })
      })
        .then(response => {
          this.submitted = true;
        })
        .catch(error => {
          console.log("====================================");
          console.log(`error in submiting the form data:${error}`);
          console.log("====================================");
        });
    }
  },
  metaInfo: {
    title: "Limited Benefit?",
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
        content: "What benefit do you think TMAC provides to the community?"
      },
      { name: "og:title", content: "#TMACtion" },
      {
        name: "og:description",
        content: "What benefit do you think TMAC provides to the community?"
      },
      {
        name: "og:image",
        content:
          "https://www.datocms-assets.com/5128/1581520322-sally-han.jpg?auto=compress,format&fit=crop&ar=1.91:1"
      }
    ]
  }
};
</script>
