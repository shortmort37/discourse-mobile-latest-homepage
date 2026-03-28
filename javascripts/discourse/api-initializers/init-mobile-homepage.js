import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  api.onPageChange((url) => {
    if (!window.matchMedia("(max-width: 768px)").matches) {
      return;
    }
    if (url === "/" || url === "/categories") {
      window.location.replace("/latest");
    }
  });
});
