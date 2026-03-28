import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.0", (api) => {
  if (!window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  const siteSettings = api.container.lookup("service:site-settings");
  const topMenu = siteSettings.top_menu || "";
  console.log("Mobile Latest Homepage - top_menu before:", topMenu);
  
  const items = topMenu.split("|").map(i => i.trim());
  const latestIndex = items.indexOf("latest");

  if (latestIndex > 0) {
    items.splice(latestIndex, 1);
    items.unshift("latest");
    siteSettings.top_menu = items.join("|");
    console.log("Mobile Latest Homepage - top_menu after:", siteSettings.top_menu);
  }
});
