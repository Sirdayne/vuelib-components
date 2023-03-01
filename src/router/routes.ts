import Error404 from "@/components/Error404.vue";
import { TRouterLink } from "@/models/Router";
import Home from "@/views/Home.vue";
import { RouteConfig } from "vue-router";

type TRouteParams = { name: string; icon: string };

const createRoute = ({ name, icon }: TRouteParams): RouteConfig => ({
  path: "/" + name.replace(/\s+/g, "-").toLowerCase(),
  name,
  component: () =>
    import(/* webpackChunkName: "[request]" */ "@/views/" + name.replace(/\s+/g, "") + ".vue"),
  meta: {
    icon,
  },
});

const createRoutes = (...items: TRouteParams[]) => items.map((params) => createRoute(params));

const route404: RouteConfig = {
  path: "*",
  component: Error404,
};

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      icon: "home-outline",
    },
  },

  ...createRoutes(
    // { name: "Typography", icon: "text-outline" },
    // { name: "Colours", icon: "color-palette-outline" },
    { name: "Buttons", icon: "download-outline" },
    { name: "Checkboxes", icon: "checkbox-outline" },
    { name: "Switches", icon: "toggle-outline" },
    { name: "Radios", icon: "radio-button-on-outline" },
    { name: "Inputs", icon: "create-outline" },
    { name: "Text Areas", icon: "create-outline" },
    { name: "Datepickers", icon: "calendar-outline" },
    { name: "Uploaders", icon: "cloud-upload-outline" },
    { name: "Uploaded Files", icon: "cloud-upload-outline" },
    { name: "Document Cards", icon: "document-outline" },
    { name: "Tables", icon: "file-tray-stacked-outline" },
    { name: "Alerts", icon: "alert-circle-outline" },
    { name: "Popups", icon: "albums-outline" }
  ),

  route404,
];

export const routerLinks = routes.reduce(
  (items, { path, name, meta }) => (name ? items.concat({ path, name, icon: meta?.icon }) : items),
  [] as TRouterLink[]
);

export default routes;
