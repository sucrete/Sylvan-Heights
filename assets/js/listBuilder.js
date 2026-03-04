//* Creates event list for home page
const calendarQuery =
  "https://0yddk171.api.sanity.io/v2026-03-04/data/query/production?query=%7B%0A++%22events%22%3A+*%5B_type+%3D%3D+%22event%22%5D%2C%0A++%22images%22%3A+*%5B_type+%3D%3D+%22sanity.imageAsset%22%5D%0A%7D&perspective=published";

const todaysDate = new Date();
const futureDate = todaysDate.setMonth(todaysDate.getMonth() + 5);

document.addEventListener("DOMContentLoaded", function () {
  var cal = document.getElementById("events-list");

  //~ fetch data
  fetchData(calendarQuery).then((data) => {
    //~ create custom view
    const { sliceEvents, createPlugin } = FullCalendar;
    const CustomViewConfig = {
      classNames: ["custom-view"],
      content: function (props) {
        let segs = sliceEvents(props, true);
        const sortedSegs = segs.sort(
          (a, b) => new Date(b.range.start) - new Date(a.range.start),
        );
        let html =
          segs.length > 0
            ? ` <div class="events-list-wrapper events-list-wrapper-home d-flex flex-column-reverse">
              ${sortedSegs
                .slice(-3)
                .map((seg) => {
                  return `
                    <div class="event-list-item${
                      seg.def.extendedProps?.linkQuestion
                        ? " includes-register-button"
                        : ""
                    }">
                      <div class="event-content-row">
                        <div class="date-side">
                          <div class="date-box">
                            <div>
                              <div class="event-month">
                                ${moment(seg.range.start).format("MMM")}
                              </div>
                              <div class="event-day">
                                ${
                                  moment(seg.range.start).add(1, "days") < 10
                                    ? "0" +
                                      moment(seg.range.start)
                                        .add(1, "days")
                                        .format("D")
                                    : moment(seg.range.start)
                                        .add(1, "days")
                                        .format("D")
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="content-side">
                          <div class="event-list-title">
                            ${seg.def.title}
                          </div>
                          <div class="event-list-date-mobile-wrapper">
                            <img src="assets/images/icons/calendar-2.svg" class="date-icon" alt=""/>
                            <div class="event-list-date">
                              ${
                                // adding a day because FullCalendar ranges (which are given to all events in FC) are exclusive (example: an event falling on July 23rd is given the range "Tue Jul 22 2025 19:00 (start) - Wed Jul 23 2025 19:00 (end)")
                                moment(seg.range.start)
                                  .add(1, "days")
                                  .format("dddd, MMMM Do")
                              } 
                              ${
                                moment(seg.range.end).isAfter(
                                  moment(seg.range.start).add(1, "days"),
                                )
                                  ? "&nbsp;- " +
                                    moment(seg.range.end).format("ddd, MMMM Do")
                                  : ""
                              }
                            </div>
                            
                          </div>
                          <div class="event-list-description">${seg.def.extendedProps?.eventDescription}</div>

                          ${
                            seg.def.extendedProps.linkQuestion ||
                            seg.def.extendedProps.flyerQuestion
                              ? `
                            <div class="event-list-footer-home">
                              ${
                                seg.def.extendedProps?.flyer
                                  ? `<a href="${
                                      data.images.find(
                                        (image) =>
                                          image._id ===
                                          seg.def.extendedProps.flyer.asset
                                            ._ref,
                                      ).url
                                    }"
                                    class="flyer-button pill"
                                    target="_blank"
                                    >view flyer</a>`
                                  : ""
                              }
                              ${
                                seg.def.extendedProps?.linkQuestion
                                  ? "<a href='" +
                                    seg.def.extendedProps?.linkDeets.linkURL +
                                    "' class='register-button pill' target='_blank'>" +
                                    seg.def.extendedProps?.linkDeets?.linkText +
                                    "</a>"
                                  : ""
                              }
                            </div>
                            `
                              : ""
                          }
                           
                        </div>
                      </div>
                    </div>
                    `;
                })
                .join("")}
                </div>`
            : `<div class="no-events-message"><img class="no-events-icon injectable" src="assets/images/icons/no-events.svg"/>no events scheduled for this month</div>`;

        return { html: html };
      },
    };

    const CustomViewPlugin = createPlugin({
      views: {
        monthList: CustomViewConfig,
      },
    });
    // console.log(
    //   `%c${JSON.stringify(data, null, 2)}`,
    //   "color: red; background: black"
    // );

    //~ initialize Calendar
    var calendar = new FullCalendar.Calendar(cal, {
      plugins: [CustomViewPlugin],
      headerToolbar: false,
      views: {
        monthList: {
          visibleRange: {
            start: new Date(),
            end: futureDate,
          },
          height: "unset",
        },
      },
      initialView: "monthList",
      events: data.events,
    });
    calendar.render();
  });
});
