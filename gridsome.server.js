const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const axios = require("axios");
const luxon = require("luxon");
const ics = require("ics");

var DateTime = luxon.DateTime;
let d = DateTime.local();
let today = d.toISODate();
let thisWeek = d.plus({ days: 7 }).toISODate();
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
      path: "/signage-events",
      component: "./src/templates/Signage-events.vue",
      context: {
        today: today,
        bodyClass: "signage-events"
      }
    });
    createPage({
      path: "/signage-projection",
      component: "./src/templates/Signage-projection.vue",
      context: {
        today: today,
        bodyClass: "signage-projection"
      }
    });
    createPage({
      path: "/signage-logo",
      component: "./src/templates/Signage-logo.vue",
      context: {
        today: today,
        bodyClass: "signage-logo"
      }
    });
    createPage({
      path: "/tmaction/limited-benefit",
      component: "./src/templates/Limited-benefit.vue",
      context: {
        bodyClass: "limited-benefit"
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
    const rentalPackages = store.addCollection({
      typeName: "RentalPackage"
    });
    const exhibitions = store.addCollection({
      typeName: "Exhibition"
    });
    exhibitions.addReference("eventsList", "Event");
    exhibitions.addReference("membersList", "Member");

    const faqs = store.addCollection({
      typeName: "Faqs"
    });

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
              image {
                url
              }
            }
            allPrograms(first:100) {
              description
              endDate
              externalCoPresenters
              externalTicketsLink
              featureImage {
                url
              }
              highlights {
                id
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
            allRentalPackages {
              name
              description
              position
              rate
              singleDay
              spaceOptions {
                price
                note
                
                room {
                  availabilityCalendar
                  size
                  name
                  photo {
                    url
                  }
                }
              }
              schedule {
                label
                name
                time
              }
            }
          }
        `
      }
    }).then(result => {
      for (const item of result.data.data.allPrograms) {
        // create reference to events
        let events = item.highlights;
        let eventsList = events.map(function(event) {
          return event.id;
        });
        exhibitions.addNode({
          ...item,
          eventsList: eventsList
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
      for (const item of result.data.data.allRentalPackages) {
        rentalPackages.addNode({
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
    const output = {
      dir: "./static",
      name: "ical.ics",
      ...options.output
    };

    const outputPath = path.resolve(process.cwd(), output.dir);
    const outputPathExists = fs.existsSync(outputPath);

    var { collection } = store.getCollection("Event");
    const events = [];

    const eventsList = collection.data.map(event => {
      return pick(event, [
        "title",
        "path",
        "summary",
        "canceled",
        "startDateTime",
        "endDateTime",
        "eventType",
        "location",
        "id"
      ]);
    });

    var { collection } = store.getCollection("Exhibition");
    const exhibitions = [];

    const exhibitionsList = collection.data.map(exhibition => {
      return pick(exhibition, [
        "title",
        "path",
        "summary",
        "startDate",
        "endDate",
        "location",
        "primaryPresenter",
        "presenter",
        "member",
        "id"
      ]);
    });
    for (const item of exhibitionsList) {
      const startTime = DateTime.fromISO(item.startDate).toObject();
      const endTime = DateTime.fromISO(item.endDate)
        .plus({ days: 1 })
        .toObject();
      const presenters = [];
      if (item.member[0]) {
        presenters.push(item.member[0].name);
      }
      if (item.primaryPresenter) {
        presenters.push(item.primaryPresenter);
      }
      if (item.presenter) {
        presenters.push(item.presenter);
      }

      const exhibition = {
        start: [startTime.year, startTime.month, startTime.day],
        end: [endTime.year, endTime.month, endTime.day],
        uid: `tmac_exhibition_${item.id}`,
        productId: "TMAC Bot - Jennie",

        title: item.title,
        description: `Presented by ${presenters.join(", ")}`,
        location: `Toronto Media Arts Centre, ${item.location
          .map(a => a.name)
          .join(", ")}`,
        url: "https://www.tomediaarts.org" + item.path
      };
      exhibitions.push(exhibition);
    }
    for (const item of eventsList) {
      const startTime = DateTime.fromISO(item.startDateTime).toObject();
      const endTime = DateTime.fromISO(item.endDateTime).toObject();
      const event = {
        start: [
          startTime.year,
          startTime.month,
          startTime.day,
          startTime.hour,
          startTime.minute
        ],
        end: [
          endTime.year,
          endTime.month,
          endTime.day,
          endTime.hour,
          endTime.minute
        ],
        uid: `tmac_event_${item.id}`,
        productId: "TMAC Bot - Jennie",
        status: `${item.canceled == true ? "CANCELLED" : "CONFIRMED"}`,
        title: item.title,
        description: item.summary,
        location: `Toronto Media Arts Centre, ${item.location
          .map(a => a.name)
          .join(", ")}`,
        url: "https://www.tomediaarts.org" + item.path
      };
      events.push(event);
    }
    const allCalendarItems = events.concat(exhibitions);
    const { error, value } = ics.createEvents(allCalendarItems);

    if (error) {
      console.log(error);
      return;
    }
    const icsFileName = output.name.endsWith(".ics")
      ? output.name
      : `${output.name}.ics`;

    if (outputPathExists) {
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, icsFileName),
        value
      );
    } else {
      fs.mkdirSync(outputPath);
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, icsFileName),
        value
      );
    }
  });
};
