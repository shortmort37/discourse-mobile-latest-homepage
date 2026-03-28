import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  api.modifyClass("route:index", {
    pluginId: "mobile-latest-homepage",
    redirect() {
      const isNarrow = window.matchMedia("(max-width: 768px)").matches;
      if (isNarrow) {
        this.replaceWith("discovery.latest");
      } else {
        this._super(...arguments);
      }
    }
  });
});
