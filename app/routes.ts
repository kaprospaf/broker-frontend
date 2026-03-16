import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("profile", "routes/profile.tsx"),
  route("myposts", "routes/myposts.tsx"),
  route("dashboard", "routes/dashboard.tsx"),

  route("jobs", "routes/jobs.tsx"),
  route("electronics", "routes/electronics.tsx"),
  route("furniture", "routes/furniture.tsx"),

  route("houses", "routes/houses.tsx", [
    route("sale", "routes/houses/sale.tsx"),
    route("rent", "routes/houses/rent.tsx"),
  ]),
] satisfies RouteConfig;