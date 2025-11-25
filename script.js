gsap.registerPlugin(ScrollTrigger);

/* HERO TIMELINE */

const rect = document.querySelector(".elo-rect");
const symbol = document.querySelector(".elo-symbol");
const tagline = document.querySelector(".elo-tagline");
const gloss = document.querySelector(".elo-gloss");

if (rect && symbol && tagline && gloss) {
  const heroTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
    defaults: { ease: "power2.inOut" }
  });

  // Phase 1: rectangle descends into center, symbol fades in
  heroTl
    .to(rect, {
      duration: 4,
      top: "50%"
    })
    .to(
      symbol,
      {
        duration: 1.6,
        opacity: 1,
        ease: "power2.out"
      },
      "-=2"
    );

  // Phase 2: tagline passes horizontally above the rectangle
  heroTl.fromTo(
    tagline,
    { left: "-110%" },
    {
      duration: 5,
      left: "110%",
      ease: "power1.inOut"
    },
    "-=0.5"
  );

  // Gloss sweep during tagline pass
  heroTl
    .fromTo(
      gloss,
      { opacity: 0, xPercent: -100 },
      {
        opacity: 1,
        xPercent: 100,
        duration: 2,
        ease: "power1.inOut"
      },
      "-=4"
    )
    .to(
      gloss,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power1.out"
      },
      ">-0.3"
    );

  // Phase 3: rectangle continues descending off-screen, symbol fades out
  heroTl
    .to(rect, {
      duration: 4,
      top: "140%",
      ease: "power2.in"
    })
    .to(
      symbol,
      {
        duration: 1.8,
        opacity: 0,
        ease: "power2.in"
      },
      "<+0.5"
    );

  // Phase 4: reset positions before next loop
  heroTl
    .set(rect, { top: "-40%" })
    .set(tagline, { left: "-110%" })
    .set(gloss, { opacity: 0, xPercent: -100 });
}

/* Scene fade-ins */

gsap.utils.toArray(".scene").forEach(scene => {
  if (scene.classList.contains("scene--hero")) return;

  gsap.fromTo(
    scene,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scene,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse"
      }
    }
  );
});