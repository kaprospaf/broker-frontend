import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("jobs", "routes/jobs.tsx"),
  route("houses", "routes/houses.tsx"),
  route("electronics", "routes/electronics.tsx"),
  route("post", "routes/post.tsx"),
] satisfies RouteConfig;
