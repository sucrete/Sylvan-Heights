import { LitElement, html } from "../../assets/js/vendor/lit.js";

// Winter-rates notification bar (hardcoded, not connected to Sanity).
// Shown from Nov 1 through Mar 31. The years roll over automatically:
// on Nov 1 the season becomes "this year - next year", and from Jan 1
// through Mar 31 it stays "last year - this year".
function getWinterRatesNotice(now = new Date()) {
  const month = now.getMonth(); // 0 = Jan ... 10 = Nov, 11 = Dec
  const inSeason = month >= 10 || month <= 2;
  if (!inSeason) return null;
  const startYear = month >= 10 ? now.getFullYear() : now.getFullYear() - 1;
  const endYear = startYear + 1;
  return `Winter rates are effective from December 1st, ${startYear} - March 31st, ${endYear}`;
}

export class Header extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const notice = getWinterRatesNotice();
    return html`
      ${notice
        ? html`<div class="notification-bar" role="region" aria-label="Site notice">
            <p class="notification-bar__text">${notice}</p>
          </div>`
        : ""}
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header-four-wrapper">
              <div class="nav-area">
                <nav aria-label="Primary navigation">
                  <ul class="parent-nav">
                    <li>
                      <a class="nav-link" href="rates.html">Rates</a>
                    </li>
                    <li>
                      <a class="nav-link" href="passes.html">Passes</a>
                    </li>
                    <li>
                      <a class="nav-link" href="course.html">Course</a>
                    </li>
                    <li>
                      <a class="nav-link" href="events.html">Events</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="button-area-right-header">
                <button type="button" class="menu-btn-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="side-bar">
                  <svg
                    width="25"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect y="12" width="25" height="1" fill="#1F1F25"></rect>
                    <rect y="6" width="25" height="1" fill="#1F1F25"></rect>
                    <rect width="25" height="1" fill="#1F1F25"></rect>
                  </svg>
                </button>
              </div>
              <a href="index.html" class="logo-container" aria-label="Sylvan Heights Golf Course — home">
                <img
                  src="/assets/images/logo/SH-Logo-White.svg"
                  alt="Sylvan Heights Golf Course"
                  class="logo logo-white"
                />
                <img
                  src="/assets/images/logo/SH-Logo.svg"
                  alt="Sylvan Heights Golf Course"
                  class="logo logo-dark injectable"
                />

                <!-- 🔸🔸🔸 mobile logos 🔸🔸🔸 -->
                <img
                  src="/assets/images/logo/SH-Logo-White.svg"
                  alt=""
                  class="mobile-logo mobile-logo-white"
                  aria-hidden="true"
                />
                <img
                  src="/assets/images/logo/SH-Logo.svg"
                  alt=""
                  class="mobile-logo mobile-logo-dark"
                  aria-hidden="true"
                />
              </a>
              <div class="nav-area">
                <nav aria-label="Secondary navigation">
                  <ul class="parent-nav">
                    <li class="has-dropdown doesnt-have-mr">
                      <a class="nav-link" href="#" aria-haspopup="true" aria-expanded="false">
                        About Us
                        <img
                          src="/assets/images/icons/sackers-chevron.svg"
                          class="injectable chevron"
                          alt=""
                          aria-hidden="true"
                        />
                      </a>
                      <ul class="submenu parent-nav with-border" role="menu" aria-label="About Us">
                        <li role="none">
                          <a href="book-an-event.html" role="menuitem">
                            <img
                              src="/assets/images/icons/sackers-chevron.svg"
                              class="injectable chevron"
                              alt=""
                              aria-hidden="true"
                            /><span class="text">Book An Event</span></a
                          >
                        </li>
                        <li role="none">
                          <a href="contact.html" role="menuitem">
                            <img
                              src="/assets/images/icons/sackers-chevron.svg"
                              class="injectable chevron"
                              alt=""
                              aria-hidden="true"
                            /><span class="text">Contact</span></a
                          >
                        </li>
                        <li role="none">
                          <a href="guidelines.html" role="menuitem">
                            <img
                              src="/assets/images/icons/sackers-chevron.svg"
                              class="injectable chevron"
                              alt=""
                              aria-hidden="true"
                            />
                            <span class="text">Guidelines</span>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a
                        href="book-tee-time.html"
                        class="rts-btn btn-primary my-btn book-tee-time-btn"
                      >
                        Book Tee Time
                        <img
                          class="injectable"
                          src="assets/images/icons/14.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("my-header", Header);
