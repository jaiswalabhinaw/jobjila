/* Jobjila — shared front-end behaviour. */
(function () {
  "use strict";

  /* ---------- mobile navigation ---------- */
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

  /* ---------- pre-select course / intent from the query string ----------
     Course pages link to /contact/?course=<slug> and section pages to
     /contact/?intent=<value>, so the form arrives already filled in.      */
  var params = new URLSearchParams(window.location.search);
  ["course", "intent"].forEach(function (key) {
    var value = params.get(key);
    if (!value) return;
    var field = document.querySelector('[name="' + key + '"]');
    if (!field) return;
    var match = Array.prototype.some.call(field.options || [], function (o) {
      return o.value === value;
    });
    if (match) field.value = value;
  });

  /* ---------- forms ----------
     FORM_ENDPOINT is intentionally empty: this is a static site with no
     backend. Paste a form-handler URL here (Formspree, Basin, Getform,
     Google Apps Script — anything that accepts a POST) and every form on
     the site starts submitting to it. Until then the forms tell the
     visitor to email us instead of silently failing.                      */
  var FORM_ENDPOINT = "";
  var CONTACT_EMAIL = "hello@jobjila.com";

  function setStatus(form, message, ok) {
    var el = form.querySelector("[data-form-status]");
    if (!el) return;
    el.textContent = message;
    el.style.color = ok ? "var(--success)" : "var(--ink-600)";
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-form]"), function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var button = form.querySelector('button[type="submit"]');

      if (!FORM_ENDPOINT) {
        setStatus(
          form,
          "This form is not connected yet — please email " + CONTACT_EMAIL + " and we will reply the same way.",
          false
        );
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "Sending…";
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          setStatus(form, "Thank you — we will get back to you within one working day.", true);
        })
        .catch(function () {
          setStatus(form, "Something went wrong. Please email " + CONTACT_EMAIL + " instead.", false);
        })
        .finally(function () {
          if (button) {
            button.disabled = false;
            button.textContent = "Send message";
          }
        });
    });
  });
})();
