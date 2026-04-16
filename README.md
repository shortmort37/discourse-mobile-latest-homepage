# Mobile Latest Homepage

A Discourse theme component that sets the default homepage to **Latest** on narrow screens (phones), while leaving wider screens (tablets, desktop) unchanged. The user's choice between Latest and Categories is remembered for the duration of their browser session.

This is a replacement for the [Force Mobile Homepage](https://meta.discourse.org/t/force-mobile-homepage/95705) component, which was marked broken in Discourse 3.5 due to the deprecation of `site.mobileView`.

Discussion thread on Discourse Meta: https://meta.discourse.org/t/mobile-latest-homepage-theme-component/400836

---

## Behavior

- **iPhone / narrow screen** — lands on Latest by default
- **User navigates to Categories** — that choice is remembered for the rest of their browser session
- **Fresh session** — always defaults back to Latest
- **iPad (landscape) / desktop** — completely unaffected, two-column Categories + Latest unchanged

---

## How it works

The component uses `window.matchMedia` to detect narrow screens, `setDefaultHomepage` to set the default, and Ember's `service:router` to redirect before the page renders. `sessionStorage` remembers the user's last choice between Latest and Categories so navigating back to the homepage respects their preference.

```javascript
import { apiInitializer } from "discourse/lib/api";
import { setDefaultHomepage } from "discourse/lib/utilities";

export default apiInitializer("1.0", (api) => {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  setDefaultHomepage("latest");

  api.onPageChange((url) => {
    if (url === "/categories") {
      sessionStorage.setItem("mobile_homepage", "categories");
    } else if (url === "/latest") {
      sessionStorage.setItem("mobile_homepage", "latest");
    }

    if (url === "/") {
      const choice = sessionStorage.getItem("mobile_homepage");
      if (choice === "categories") {
        const router = api.container.lookup("service:router");
        router.replaceWith("discovery.categories");
      } else {
        const router = api.container.lookup("service:router");
        router.replaceWith("discovery.latest");
      }
    }
  });
});
```

The 768px breakpoint aligns with Discourse's own narrow layout threshold.

---

## Installation

1. Go to **Admin → Customize → Themes → Install → From a git repository**
2. Enter: `https://github.com/shortmort37/discourse-mobile-latest-homepage`
3. Install as a component and add it to your active theme

If you're new to installing theme components, see the [Beginner's Guide to Discourse Themes](https://meta.discourse.org/t/beginners-guide-to-using-discourse-themes/91966).

---

## Notes

- Users can still navigate to Categories manually — their choice is respected for the session
- The 768px breakpoint can be adjusted in the JS file if needed
- Session choice resets when the browser is closed, so new visits always start on Latest

---

## Contributing

Questions, feedback, and PRs welcome!
