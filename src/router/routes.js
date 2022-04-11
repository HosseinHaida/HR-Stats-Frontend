import user from "src/store/user";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/people", component: () => import("pages/People.vue") },
      { path: "/people/add", component: () => import("pages/PeopleAdd.vue") },
      { path: "/users", component: () => import("pages/Users.vue") },
      { path: "/users/:id", component: () => import("pages/User.vue") },
      { path: "/users/new", component: () => import("pages/UserAdd.vue") },
      { path: "/stats", component: () => import("pages/Stats.vue") },
      {
        path: "/stats/register",
        component: () => import("pages/StatsRegister.vue"),
      },
      {
        path: "stats/daysoff",
        component: () => import("pages/StatsDaysOff.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },

  // at last
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
