(function () {
  "use strict";

  var header = document.getElementById("nav");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("formContato");
  var feedback = document.getElementById("formFeedback");

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setHeaderScrolled() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      var el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      feedback.textContent = "";
      feedback.classList.remove("is-ok", "is-err");

      if (!form.checkValidity()) {
        feedback.textContent = "Preencha todos os campos corretamente.";
        feedback.classList.add("is-err");
        return;
      }

      feedback.textContent = "Mensagem recebida! Em breve entraremos em contato.";
      feedback.classList.add("is-ok");
      form.reset();
    });
  }

})();
