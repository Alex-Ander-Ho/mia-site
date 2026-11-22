/* MIA public site — minimal progressive enhancement (no network calls). */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("primary-nav");
  var toggle = document.querySelector(".nav-toggle");
  var firstNavLink = nav ? nav.querySelector("a") : null;

  function setMenu(open) {
    if (!nav || !toggle) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    nav.classList.toggle("is-open", open);
  }

  function menuIsOpen() {
    return !!toggle && toggle.getAttribute("aria-expanded") === "true";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = !menuIsOpen();
      setMenu(open);
      if (open && firstNavLink) {
        firstNavLink.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && menuIsOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuIsOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!menuIsOpen()) return;
      if (header && !header.contains(event.target)) {
        setMenu(false);
      }
    });

    var desktop = window.matchMedia("(min-width: 960px)");
    var onBreakpointChange = function (event) {
      if (event.matches) setMenu(false);
    };
    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", onBreakpointChange);
    } else if (typeof desktop.addListener === "function") {
      desktop.addListener(onBreakpointChange);
    }
  }

  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
