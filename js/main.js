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
      var open = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu when a link inside it is followed.
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Sharing ----------
     Two upgrades over the plain links, both progressive: without JS the
     WhatsApp link and the other share links still work, and the copy button
     falls back to selecting the URL. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-share]"), function (box) {
    var url = box.getAttribute("data-share-url");
    var title = box.getAttribute("data-share-title");

    // 1. Native share sheet where the device has one (almost all phones).
    //    One tap reaches WhatsApp, Instagram, Telegram, SMS - everything.
    var primary = box.querySelector("[data-share-whatsapp]");
    var label = box.querySelector("[data-share-label]");
    if (primary && navigator.share) {
      if (label) label.textContent = "Share";
      primary.addEventListener("click", function (e) {
        e.preventDefault();
        navigator.share({ title: title, text: title, url: url }).catch(function () {
          /* user dismissed the sheet - nothing to do */
        });
      });
    }

    // 2. Copy link, with the button itself as the confirmation.
    var copyBtn = box.querySelector("[data-share-copy]");
    if (!copyBtn) return;
    copyBtn.addEventListener("click", function () {
      var target = copyBtn.getAttribute("data-copy");
      var span = copyBtn.querySelector("span");
      var original = span ? span.textContent : "";

      function done(ok) {
        if (!span) return;
        span.textContent = ok ? "Link copied" : "Press Ctrl+C";
        copyBtn.classList.toggle("is-copied", ok);
        setTimeout(function () {
          span.textContent = original;
          copyBtn.classList.remove("is-copied");
        }, 2000);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(target).then(function () { done(true); }, function () { fallback(); });
      } else {
        fallback();
      }

      function fallback() {
        // http:// or an older browser - select the text so Ctrl+C works.
        var input = document.createElement("input");
        input.value = target;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 99999);
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(input);
        done(ok);
      }
    });
  });


  /* ---------- Scroll reveal ----------
     Progressive: elements are only hidden once JS marks them, so with JS off
     or reduced-motion on, everything is simply visible from the start. */
  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionOK && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".head, .cards, .ladder, .grid, .hero-stats, .faq, .band");
    if (targets.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add("reveal");
        io.observe(el);
      });
    }
  }

  /* ---------- conversion tracking ----------
     This site has no forms, so a WhatsApp click IS the conversion. Without
     this, analytics would only show page views and never tell you which page
     actually produced an enquiry — which is the one thing worth knowing.

     Silently does nothing when analytics is off (gtag undefined), so the site
     works identically with no Measurement ID configured. */
  document.addEventListener("click", function (e) {
    if (typeof window.gtag !== "function") return;
    var el = e.target;
    var link = el && el.closest ? el.closest("a[href]") : null;
    if (!link) return;

    var href = link.getAttribute("href") || "";
    var label = (link.querySelector("span") || {}).textContent || link.textContent || "";
    label = label.trim().slice(0, 60);

    if (href.indexOf("wa.me/?text=") !== -1) {
      // Visitor is sharing this page with their own contacts.
      window.gtag("event", "share", { method: "whatsapp", content_type: "page", item_id: location.pathname });
    } else if (href.indexOf("wa.me/") !== -1) {
      // Visitor is messaging us. The real goal.
      window.gtag("event", "contact_whatsapp", { page_path: location.pathname, button_label: label });
    } else if (href.indexOf("linkedin.com/sharing") !== -1) {
      window.gtag("event", "share", { method: "linkedin", content_type: "page", item_id: location.pathname });
    } else if (href.indexOf("mailto:") === 0) {
      window.gtag("event", "contact_email", { page_path: location.pathname });
    }
  });

  // Copy-link is a share too, but it is a button rather than a link.
  document.addEventListener("click", function (e) {
    if (typeof window.gtag !== "function") return;
    var el = e.target;
    var btn = el && el.closest ? el.closest("[data-share-copy]") : null;
    if (btn) window.gtag("event", "share", { method: "copy_link", content_type: "page", item_id: location.pathname });
  });

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

  // Hide Elfsight widget branding/footer by observing iframe loads
  setTimeout(function hideElfsightBranding() {
    var iframes = document.querySelectorAll("iframe");
    iframes.forEach(function (frame) {
      try {
        var doc = frame.contentDocument || frame.contentWindow.document;
        if (doc) {
          var style = doc.createElement("style");
          style.textContent = `
            [class*="branding"],
            [class*="footer"],
            [class*="attribution"],
            a[href*="elfsight"],
            .elfsight-branding { display: none !important; }
          `;
          doc.head.appendChild(style);
        }
      } catch (e) {}
    });
  }, 500);
})();
