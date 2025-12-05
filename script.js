// ----------------------------
// Smooth Scroll for Menu Items
// ----------------------------
const menuButtons = document.querySelectorAll(".simurg-menu-item[data-target]");

menuButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ----------------------------------
// Section Slide-In on Scroll
// ----------------------------------
const observedSections = document.querySelectorAll(".page-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

observedSections.forEach((section) => observer.observe(section));

// ----------------------------------
// Multilingual Translation Engine
// ----------------------------------

const translations = {
  en: {
    "hero.title": "RUNWAY PRODUCTION HOUSE",
    "hero.city": "New York",
    "hero.brand": "Eloquence Productions",
    "hero.est": "EST. 2025",

    "menu.creative": "Creative Direction",
    "menu.runway": "Runway Production",
    "menu.casting": "Casting",
    "menu.architecture": "Show Architecture",
    "menu.backstage": "Backstage Systems",

    "section.creative.title": "Creative Direction",
    "section.creative.text": "At Eloquence, we sculpt the entire experience—from audio and lighting to timing, runway set design, flow of show, backstage momentum, media coverage, press, and audience engagement. Every shift, entrance, and beat is engineered to deliver the designer’s vision with precision and emotional weight.",

    "section.runway.title": "Runway Production",
    "section.runway.text": "Eloquence oversees the full production of your show—from venue & technical teams to run of show, event itinerary, backstage traffic, guest flow, and front-of-house experience. We coordinate with lighting, sound, photo, video, and press so the collection is seen, captured, and remembered.",

    "section.casting.title": "Casting",
    "section.casting.text": "Casting is architecture. We curate faces, walks, and energies that echo the collection's core identity, curating sophisticated lineups to deliver your collection to the world eloquently. Interested in walking an Eloquence show? Let us know.",

    "section.architecture.title": "Show Architecture",
    "section.architecture.text": "From runway layouts to sight-lines and pacing, we design how an audience receives the collection. Our team develops one-of-one set designs with our trusted carpentry & design partners, creating an elevated stage or canvas for the live story to unfold. Each environment is built to photograph beautifully for major media outlets, digital publications, and your own archives and portfolios. At Eloquence, every last detail is intentional.",

    "section.backstage.title": "Backstage Systems",
    "section.backstage.text": "We build backstage as a calm, precise ecosystem—call sheets, quick-change flows, and communication lines that keep talent, glam, and production moving in sync."
  },

  // Placeholders for future languages. They will fall back to English
  es: {}, // Spanish
  fr: {}, // French
  it: {}, // Italian
  pt: {}, // Portuguese
  ru: {}, // Russian
  uk: {}, // Ukrainian
  zh: {}, // Mandarin Chinese
  ja: {}  // Japanese
};

function setLanguage(lang) {
  const fallback = translations.en;
  const dict = translations[lang] || fallback;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const translated = dict[key] || fallback[key];
    if (translated) {
      el.textContent = translated;
    }
  });
}

// Initialize language selector if present
const languageSelect = document.getElementById("language-select");
if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });
}

// Set default language on load
setLanguage("en");

// ---------------------------------------------------
// Press PIN Portal Logic
// ---------------------------------------------------

// Map of valid press PINs → Google Drive links
const pressPins = {
  "ELOQ-PHOTO": "https://drive.google.com/your-photographers-folder",
  "ELOQ-VIDEO": "https://drive.google.com/your-videographers-folder",
  "ELOQ-ATMOS": "https://drive.google.com/your-atmosphere-folder"
};

// DOM elements for the portal
const pinInput = document.getElementById("press-pin-input");
const pinSubmit = document.getElementById("press-pin-submit");
const pinError = document.getElementById("press-pin-error");
const pinSuccess = document.getElementById("press-pin-success");
const pinLink = document.getElementById("press-pin-link");

if (pinSubmit) {
  pinSubmit.addEventListener("click", () => {
    const enteredPin = pinInput.value.trim();

    // Reset messages
    pinError.style.display = "none";
    pinSuccess.style.display = "none";

    if (pressPins[enteredPin]) {
      // Successful match
      pinLink.href = pressPins[enteredPin];
      pinSuccess.style.display = "block";
    } else {
      // Wrong PIN
      pinError.style.display = "block";
      // Shake animation for wrong entry
      pinInput.classList.add("shake");
      setTimeout(() => pinInput.classList.remove("shake"), 400);
    }
  });
}