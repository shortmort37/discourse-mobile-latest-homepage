import { apiInitializer } from "discourse/lib/api";
import { setDefaultHomepage } from "discourse/lib/utilities";

export default apiInitializer("1.0", (api) => {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  setDefaultHomepage("latest");

  api.onPageChange((url) => {
    if (url === "/") {
      const router = api.container.lookup("service:router");
      router.replaceWith("discovery.latest");
    }
  });
});
