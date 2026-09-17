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
  var testimonials = [
    { quote: "A terapia com a Fernanda me ajudou a olhar para a minha história com mais clareza e a fazer escolhas que realmente fazem sentido para mim.", name: "Mariana", place: "Portugal" },
    { quote: "Me senti acolhida, sem julgamentos, e finalmente consegui me conectar com o que realmente quero para a minha vida.", name: "Camila", place: "Itália" },
    { quote: "O processo me trouxe mais leveza e direção em um momento de muitas dúvidas. Recomendo de coração.", name: "Ana", place: "Brasil" },
    { quote: "Encontrei um espaço seguro para entender minhas emoções e transformar a forma como vivo minhas escolhas.", name: "Luísa", place: "Espanha" }
  ];

  var track = document.getElementById("testimonial-track");
  var prev = document.getElementById("prev-testimonial");
  var next = document.getElementById("next-testimonial");
  var index = 0;

  function render() {
    if (!track) return;
    track.innerHTML = "";
    for (var i = 0; i < 3; i++) {
      var item = testimonials[(index + i) % testimonials.length];
      var card = document.createElement("article");
      card.className = "border border-border bg-card p-7 shadow-sm";
      card.innerHTML =
        '<p class="font-display text-5xl leading-none text-accent">\u201C</p>' +
        '<p class="min-h-28 text-sm leading-6 text-muted-foreground"></p>' +
        '<div class="mt-6 border-t border-border pt-4"><p class="text-sm font-semibold"></p><p class="text-xs text-muted-foreground"></p></div>';
      var ps = card.querySelectorAll("p");
      ps[1].textContent = item.quote;
      ps[2].textContent = item.name;
      ps[3].textContent = item.place;
      track.appendChild(card);
    }
  }

  function move(step) {
    index = (index + step + testimonials.length) % testimonials.length;
    render();
  }

  if (prev) prev.addEventListener("click", function () { move(-1); });
  if (next) next.addEventListener("click", function () { move(1); });
  render();
})();
