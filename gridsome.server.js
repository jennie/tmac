const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const axios = require("axios");
let d = new Date();
let today = d.toISOString();
module.exports = function(api, options) {
  api.createPages(({ createPage }) => {
    createPage({
      path: "/events",
      component: "./src/templates/Events.vue",
      context: {
        today: today
      }
    });
    createPage({
      path: "/exhibitions",
      component: "./src/templates/Exhibitions.vue",
      context: {
        today: today
      }
    });
  });

  api.loadSource(async store => {
    const events = store.addCollection({
      typeName: "Event"
    });
    const exhibitions = store.addCollection({
      typeName: "Exhibition"
    });

    events.addReference("memberList", "Member");
    exhibitions.addReference("memberList", "Member");

    const members = store.addCollection({
      typeName: "Member"
    });
    // gather over 100 events
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
          query: `{
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
                shortName
                logo {
                  url
                }
                id
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
    for (const item of eventNodes) {
      let members = item.member;
      let membersList = members.map(function(member) {
        return member.id;
      });

      events.addNode({
        ...item,
        membersList: membersList
      });
    }

    const data = await axios({
      method: "POST",
      url: "https://graphql.datocms.com/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.dato_api_key}`
      },
      data: {
        query: `query {
            allMembers {
              name
              id
              shortName
              logo {
                url
              }
            }
            allPrograms {
              description(markdown: true)
              endDate
              externalCoPresenters
              externalTicketsLink
              featureImage {
                url
              }
              highlights {
                ... on EventRecord {
                  id
                  title
                  slug
                  startDateTime
                }
                ... on ProgramRecord {
                  id
                  title
                  slug
                  startDate
                }
              }
              hours
              id
              link
              location {
                name
              }
              member {
                logo {
                  url
                }
                name
                shortName
              }
              presenter
              primaryPresenter
              programType
              slug
              startDate
              ticketPrice
              title
            }
          }
        `
      }
    }).then(result => {
      for (const item of result.data.data.allPrograms) {
        exhibitions.addNode({
          ...item
        });
      }
    });
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
