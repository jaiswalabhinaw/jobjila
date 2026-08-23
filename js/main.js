/* Jobjila — shared front-end behaviour.
   There are no forms on this site by design: every call to action opens a
   pre-filled WhatsApp chat instead, which needs no backend and converts
   better than a form. See scripts/lib.js -> wa(). */
(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu when a link inside it is followed.
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hide the floating WhatsApp button while the footer is on screen, so it
  // never sits on top of the footer links.
  var float = document.querySelector(".wa-float");
  var siteFooter = document.querySelector(".site-footer");

  if (float && siteFooter && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          float.style.opacity = entry.isIntersecting ? "0" : "1";
          float.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
        });
      },
      { rootMargin: "0px 0px -80px 0px" }
    ).observe(siteFooter);
  }
})();
