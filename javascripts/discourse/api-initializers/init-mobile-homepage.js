import { apiInitializer } from "discourse/lib/api";
import { setDefaultHomepage } from "discourse/lib/utilities";

export default apiInitializer("1.0", (api) => {
  api.onPageChange(() => {
    // Use window.matchMedia — the Discourse-approved way to check viewport
    // 768px matches Discourse's own narrow-layout breakpoint
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;

    if (isNarrow) {
      setDefaultHomepage("latest");
    }
  });
});