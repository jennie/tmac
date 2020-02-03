const axios = require("axios");
const path = require("path");
let d = new Date();
let today = d.toISOString();
module.exports = function(api) {
  api.createPages(({ createPage }) => {
    createPage({
      path: "/events",
      component: "./src/templates/Events.vue",
      context: {
        today: today
      }
    });
  });

  api.loadSource(async store => {
    const events = store.addCollection({
      typeName: "Event"
    });
    let skip = 0;
    const limit = 100;
    let keepQuerying = true;
    let eventNodes = [];
    while (keepQuerying) {
      const datoPages = await axios({
        method: "POST",
        url: "https://graphql.datocms.com/",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.dato_api_key}`
        },
        data: {
          query: `
            query {
              allEvents(first: ${limit}, skip: ${skip}) {
                actionButtonText
                canceled
                createdAt
                description(markdown: true)
                endDateTime
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
                }
                presenter
                registrationLink
                slug
                startDateTime
                summary(markdown: true)
                title
              }
            }
          `
        }
      }).then(result => {
        // aggregate results
        eventNodes = eventNodes.concat(result.data.data.allEvents);

        skip += limit;

        if (result.data.data.allEvents.length < limit) {
          keepQuerying = false;
        }
      });
    }
    console.log(eventNodes.length);
    for (const item of eventNodes) {
      events.addNode({
        ...item
      });
    }
  });

  api.beforeBuild(({ config, store }) => {
    const { collection } = store.getCollection("Event");

    const eventsList = collection.data.map(event => {
      return pick(event, ["title", "path"]);
    });

    const output = {
      dir: "./static",
      name: "search.json",
      ...options.output
    };

    const outputPath = path.resolve(process.cwd(), output.dir);
    const outputPathExists = fs.existsSync(outputPath);
    const fileName = output.name.endsWith(".json")
      ? output.name
      : `${output.name}.json`;

    if (outputPathExists) {
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(eventsList)
      );
    } else {
      fs.mkdirSync(outputPath);
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(eventsList)
      );
    }
  });
};
