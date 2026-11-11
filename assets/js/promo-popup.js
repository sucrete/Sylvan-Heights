// promotional pop-up (home page)
// Opens a few seconds after the page starts loading, unless the visitor has
// already closed this pop-up during the current browser session.

// how long after the page starts loading before the pop-up appears
const popUpDelayMs = 3000;

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("promo-popup");
  if (!popup) return;
  const pageStart = performance.now();
  const content = popup.querySelector(".promo-popup__content");
  const closeButton = popup.querySelector(".promo-popup__close");
  // keyed to the content image, so swapping in a new promo shows it again
  const dismissedKey = "promoPopupDismissed:" + content.getAttribute("src");
  let lastFocused = null;

  function wasDismissed() {
    try {
      return sessionStorage.getItem(dismissedKey) === "1";
    } catch (e) {
      return false;
    }
  }

  function openPopup() {
    lastFocused = document.activeElement;
    popup.hidden = false;
    // reading offsetWidth forces the browser to apply the starting state
    // (opacity 0, scale .8) before .is-visible triggers the transition
    void popup.offsetWidth;
    popup.classList.add("is-visible");
    document.body.classList.add("promo-popup-open");
    // focus the dialog (not the X) so no focus ring shows until the user tabs
    popup.focus({ preventScroll: true });
    document.addEventListener("keydown", onKeydown);
  }

  function closePopup() {
    popup.classList.remove("is-visible");
    popup.hidden = true;
    document.body.classList.remove("promo-popup-open");
    document.removeEventListener("keydown", onKeydown);
    try {
      sessionStorage.setItem(dismissedKey, "1");
    } catch (e) {}
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closePopup();
    // keep keyboard focus inside the dialog (the close button is its only control)
    if (e.key === "Tab") {
      e.preventDefault();
      closeButton.focus();
    }
  }

  closeButton.addEventListener("click", closePopup);
  // clicking the scrim (outside the card) also closes it
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  if (wasDismissed()) return;

  // never show an empty card: wait for the content image, then honor the delay
  function scheduleOpen() {
    const wait = Math.max(0, popUpDelayMs - (performance.now() - pageStart));
    setTimeout(openPopup, wait);
  }
  if (content.complete && content.naturalWidth) scheduleOpen();
  else content.addEventListener("load", scheduleOpen, { once: true });
});
