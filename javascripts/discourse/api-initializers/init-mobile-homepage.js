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
