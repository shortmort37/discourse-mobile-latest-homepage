import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  api.onPageChange((url) => {
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;
    if (isNarrow && (url === "/" || url === "")) {
      window.location.replace("/latest");
    }
  });
});
