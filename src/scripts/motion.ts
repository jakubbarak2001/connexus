/**
 * Centrální motion vrstva — GSAP + ScrollTrigger + Lenis.
 * Načítá se deferred (nebrání renderu). Při prefers-reduced-motion
 * se vůbec nespustí; obsah je pak viditelný čistě přes CSS (skryté
 * výchozí stavy platí jen pod html.js-anim z inline skriptu v <head>).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const NAV_OFFSET = -88;

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  init();
}

function init() {
  // Motion vrstva běží — CSS failsafe z Layoutu už není potřeba.
  clearTimeout((window as { __animFailsafe?: number }).__animFailsafe);

  gsap.registerPlugin(ScrollTrigger);

  const lenis = setupSmoothScroll();
  setupAnchors(lenis);
  heroIntro();
  heroHeadlineSwap();
  scrollDepth();
  magneticButtons();

  // Webfonty se načítají async a po swapu se mění výška řádků —
  // ScrollTrigger si pak musí přepočítat pozice triggerů.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

function setupSmoothScroll(): Lenis {
  const lenis = new Lenis({ duration: 1.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

function setupAnchors(lenis: Lenis) {
  document.querySelectorAll<HTMLAnchorElement>("a[href*='#']").forEach((a) => {
    if (a.classList.contains("skip-to-main")) return; // musí přesunout fokus, ne jen scroll
    a.addEventListener("click", (e) => {
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.2 });
      history.pushState(null, "", url.hash);
    });
  });
}

/** Vstupní choreografie hero sekce — hraje hned po načtení. */
function heroIntro() {
  if (!document.querySelector(".hero")) return;

  gsap
    .timeline({ delay: 0.15, defaults: { ease: "power4.out" } })
    .fromTo(
      "#main-nav",
      { y: -16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
      0.2,
    )
    .fromTo(
      ".hero__eyebrow",
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8 },
      0.15,
    )
    .fromTo(
      // Jen první varianta v každé masce — ostatní varianty rotujícího
      // řádku odkrývá až heroHeadlineSwap.
      ".hero-line .hero-line__inner:first-child",
      // visibility: CSS drží řádky skryté do startu tweenu (viz Hero.astro)
      // 135 %: musí přejet i spodní padding masky (kompenzace dotažnic),
      // jinak horní okraje glyfů prosvítají pod řádkem.
      { yPercent: 135, rotate: 2.5, visibility: "visible" },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.3,
        stagger: 0.16,
        transformOrigin: "left bottom",
      },
      0.1,
    )
    .fromTo(
      ".hero__ctas",
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9 },
      0.95,
    )
    .fromTo(
      ".hero__chevron",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8, ease: "power2.out" },
      1.2,
    );
}

/**
 * Rotace druhého řádku titulku: po pár vteřinách aktuální varianta
 * vyjede maskou nahoru a další najede zespodu — stejný pohyb jako
 * vstupní animace. Smyčka běží donekonečna.
 */
function heroHeadlineSwap() {
  const items = gsap.utils.toArray<HTMLElement>(
    ".hero-line--swap .hero-line__inner",
  );
  if (items.length < 2) return;

  const HOLD = 3.8; // jak dlouho varianta drží, než se vymění
  const FIRST_HOLD = HOLD - 2; // první varianta se mění o 2 s dřív
  let index = 0;

  const cycle = () => {
    const current = items[index];
    index = (index + 1) % items.length;
    const next = items[index];

    // Sekvenčně: nová varianta najíždí až po úplném odjezdu staré —
    // jinak její horní okraj prosvítá spodkem masky už během odjezdu.
    gsap.to(current, {
      yPercent: -135,
      rotate: -2.5,
      duration: 0.8,
      ease: "power3.in",
      transformOrigin: "left bottom",
      onComplete: () => gsap.set(current, { visibility: "hidden" }),
    });
    gsap.fromTo(
      next,
      { yPercent: 135, rotate: 2.5, visibility: "visible" },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        ease: "power4.out",
        transformOrigin: "left bottom",
        delay: 0.8,
      },
    );

    gsap.delayedCall(HOLD, cycle);
  };

  // První výměna až po doběhnutí vstupní choreografie.
  gsap.delayedCall(FIRST_HOLD + 1.6, cycle);
}

/** Scrub parallax — hloubka vázaná na scroll, jen na desktopu. */
function scrollDepth() {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
      gsap.to(".hero__content", {
        yPercent: -6,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    }

    // Velké stínové číslice problémových karet plavou různou rychlostí.
    gsap.utils.toArray<HTMLElement>(".problem-card__num").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40 + i * 14 },
        {
          y: -28 - i * 10,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".problem-card") as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    const photo = document.querySelector(".person-photo-frame");
    if (photo) {
      gsap.fromTo(photo, { y: 32 }, {
        y: -32,
        ease: "none",
        scrollTrigger: { trigger: "#o-mne", start: "top bottom", end: "bottom top", scrub: true },
      });
    }

    const glow = document.querySelector(".contact-glow");
    if (glow) {
      gsap.fromTo(glow, { scale: 0.85, opacity: 0.6 }, {
        scale: 1.1,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: "#kontakt", start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  });
}

/** Magnetický tah CTA tlačítka za kurzorem — jen myš, ne dotyk. */
function magneticButtons() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll<HTMLElement>(".js-magnetic").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    });
  });
}
