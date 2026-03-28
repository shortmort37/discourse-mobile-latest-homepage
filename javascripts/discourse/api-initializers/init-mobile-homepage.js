import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  api.modifyClass("route:discovery.categories", {
    pluginId: "mobile-latest-homepage",
    beforeModel() {
      this.replaceWith("discovery.latest");
    }
  });
});
