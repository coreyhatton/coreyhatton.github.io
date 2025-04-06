import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";
// import { flatRoutes } from "@react-router/fs-routes";

// export default flatRoutes({}) satisfies RouteConfig;

export default [
  layout("layouts/home.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
