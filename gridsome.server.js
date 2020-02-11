const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const axios = require("axios");
const luxon = require("luxon");
var DateTime = luxon.DateTime;
let d = DateTime.local();
let today = d.toISODate();
let thisWeek = d.plus({ days: 7 }).toISODate();
console.log(thisWeek);
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
    createPage({
      path: "/",
      component: "./src/templates/Index.vue",
      context: {
        today: today,
        thisWeek: thisWeek
      }
    });
    createPage({
      path: "/tmaction/news",
      component: "./src/templates/News.vue"
    });
    createPage({
      path: "/tmaction/press",
      component: "./src/templates/Press.vue"
    });
    createPage({
      path: "/tmaction/faqs",
      component: "./src/templates/Faqs.vue"
    });
  });

  api.loadSource(async store => {
    const events = store.addCollection({
      typeName: "Event"
    });
    events.addReference("membersList", "Member");

    const articles = store.addCollection({
      typeName: "Article"
    });
    const presslinks = store.addCollection({
      typeName: "Press"
    });
    const exhibitions = store.addCollection({
      typeName: "Exhibition"
    });
    const faqs = store.addCollection({
      typeName: "Faqs"
    });
    exhibitions.addReference("membersList", "Member");

    const timelineItems = store.addCollection({
      typeName: "Timeline"
    });
    // timelineItems.addReference("pressLinksList", "Press");
    // timelineItems.addReference("articleList", "Article");

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
              description
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
              summary
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
            allArticles(first: 100) {
              appendix
              body
              date
              _updatedAt
              featureImage {
                url
              }
              id
              title
              summary
              slug
              shortSummary
            }
            allPressLinks(first: 100) {
              title
              outlet
              link
              isCoverage
              id
              file {
                url
                format
              }
              date
              author
            }
            allTimelineItems(first: 100) {
              date
              description
              image {
                url
              }
              title
              youtubeVideo {
                url
                thumbnailUrl
              }
            }
            allFaqItems {
              answer
              position
              id
              question
              slug
            }
            allPrograms {
              description
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
      for (const item of result.data.data.allMembers) {
        members.addNode({
          ...item
        });
      }
      for (const item of result.data.data.allArticles) {
        articles.addNode({
          ...item
        });
      }
      for (const item of result.data.data.allFaqItems) {
        faqs.addNode({
          ...item
        });
      }
      for (const item of result.data.data.allPressLinks) {
        presslinks.addNode({
          ...item
        });
      }
      for (const item of result.data.data.allTimelineItems) {
        timelineItems.addNode({
          ...item
        });
      }
      // for (const item of result.data.data.allTimelineItems) {
      //   let pressLinksList;
      //   let articleList;
      //   if (item.related[0]) {
      //     let related = item.related;
      //     if (related.__typename == "PressLinkRecord") {
      //       let pressLinksList = [related].map(function(presslink) {
      //         console.log(pressLinksList);
      //         return presslink.id;
      //       });
      //     }
      //     if (related.__typename == "ArticleRecord") {
      //       let articleList = [related].map(function(article) {
      //         console.log(articleList);
      //         return article.id;
      //       });
      //     }

      //     timelineItems.addNode({
      //       ...item,
      //       pressLinksList: pressLinksList,
      //       articleList: articleList
      //     });
      //   }
      // }
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
