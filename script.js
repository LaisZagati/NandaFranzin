// Fernanda Franzin — interações da página
(function () {
  "use strict";

  /* Menu mobile */
  var toggle = document.getElementById("menu-toggle");
  var header = document.querySelector("header");
  var desktopNav = header && header.querySelector("nav");
  var mobileNav = null;

  function buildMobileNav() {
    var nav = document.createElement("nav");
    nav.className = "border-t border-border bg-background px-5 pb-5 pt-3 lg:hidden";
    nav.setAttribute("aria-label", "Navegação mobile");
    var wrap = document.createElement("div");
    wrap.className = "flex flex-col gap-3";
    Array.prototype.forEach.call(desktopNav.querySelectorAll("a"), function (a) {
      var link = document.createElement("a");
      link.href = a.getAttribute("href");
      link.textContent = a.textContent;
      link.className = "py-1 text-sm font-medium text-muted-foreground hover:text-foreground";
      link.addEventListener("click", closeMenu);
      wrap.appendChild(link);
    });
    nav.appendChild(wrap);
    return nav;
  }

  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.remove();
    mobileNav = null;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  if (toggle && desktopNav && header) {
    toggle.addEventListener("click", function () {
      if (mobileNav) {
        closeMenu();
        return;
      }
      mobileNav = buildMobileNav();
      header.appendChild(mobileNav);
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu");
    });
  }

  /* Carrossel de depoimentos */
  var testimonialsPT = [
    { quote: "Eu estava vivendo uma fase de muitas dúvidas e não conseguia organizar o que sentia. A terapia me ajudou a olhar para minhas escolhas com mais clareza e menos culpa.", name: "Gabriel" },
    { quote: "Morar fora trouxe desafios que eu não esperava. Encontrei na terapia um espaço seguro para entender melhor minha identidade, minhas emoções e o meu lugar nessa nova fase.", name: "Jackie" },
    { quote: "Cheguei à terapia me sentindo perdido diante de tantas mudanças. Aos poucos, comecei a entender meus padrões e a tomar decisões de forma mais consciente.", name: "Rogério" },
    { quote: "Foi importante ter alguém que entendesse não só o que eu estava sentindo, mas também o contexto de viver longe do meu país. Saí das sessões com mais clareza e direção.", name: "Ana" }
  ];

  var testimonialsEN = [
    { quote: "I was going through a phase of a lot of doubt and couldn't organize what I was feeling. Therapy helped me look at my choices with more clarity and less guilt.", name: "Gabriel" },
    { quote: "Living abroad brought challenges I didn't expect. In therapy I found a safe space to better understand my identity, my emotions, and my place in this new phase.", name: "Jackie" },
    { quote: "I came to therapy feeling lost in the face of so many changes. Little by little, I began to understand my patterns and make decisions more consciously.", name: "Rogério" },
    { quote: "It was important to have someone who understood not just what I was feeling, but also the context of living far from my country. I left the sessions with more clarity and direction.", name: "Ana" }
  ];

  var track = document.getElementById("testimonial-track");
  var prev = document.getElementById("prev-testimonial");
  var next = document.getElementById("next-testimonial");
  var index = 0;
  var siteLang = "pt";

  function currentTestimonials() {
    return siteLang === "en" ? testimonialsEN : testimonialsPT;
  }

  function renderTestimonials() {
    if (!track) return;
    var testimonials = currentTestimonials();
    track.innerHTML = "";
    for (var i = 0; i < 3; i++) {
      var item = testimonials[(index + i) % testimonials.length];
      var card = document.createElement("article");
      card.className = "border border-border bg-card p-7 shadow-sm";
      card.innerHTML =
        '<p class="font-display text-5xl leading-none text-accent">\u201C</p>' +
        '<p class="min-h-28 text-sm leading-6 text-muted-foreground"></p>' +
        '<div class="mt-6 border-t border-border pt-4"><p class="text-sm font-semibold"></p></div>';
      var ps = card.querySelectorAll("p");
      ps[1].textContent = item.quote;
      ps[2].textContent = item.name;
      track.appendChild(card);
    }
  }

  function move(step) {
    var testimonials = currentTestimonials();
    index = (index + step + testimonials.length) % testimonials.length;
    renderTestimonials();
  }

  if (prev) prev.addEventListener("click", function () { move(-1); });
  if (next) next.addEventListener("click", function () { move(1); });

  /* Alternador global de idioma (PT / EN) */
  try {
    var saved = window.localStorage && window.localStorage.getItem("ff-lang");
    if (saved === "en" || saved === "pt") siteLang = saved;
  } catch (e) { /* localStorage indisponível, segue com pt */ }

  var langToggle = document.getElementById("lang-toggle");
  var translatable = Array.prototype.slice.call(document.querySelectorAll("[data-en]"));

  function applyLanguage() {
    translatable.forEach(function (el) {
      if (el.dataset.pt === undefined) {
        el.dataset.pt = el.innerHTML;
      }
      el.innerHTML = siteLang === "en" ? el.dataset.en : el.dataset.pt;
    });
    document.documentElement.lang = siteLang === "en" ? "en" : "pt-BR";
    if (langToggle) {
      langToggle.textContent = siteLang === "en" ? "PT" : "EN";
      langToggle.setAttribute(
        "aria-label",
        siteLang === "en" ? "Mudar para português" : "Switch to English"
      );
    }
    index = 0;
    renderTestimonials();
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      siteLang = siteLang === "pt" ? "en" : "pt";
      try {
        window.localStorage && window.localStorage.setItem("ff-lang", siteLang);
      } catch (e) { /* localStorage indisponível */ }
      applyLanguage();
    });
  }

  applyLanguage();
})();
