import user from "src/store/user";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/profile", component: () => import("pages/Profile.vue") },
      { path: "/people", component: () => import("pages/People.vue") },
      { path: "/people/add", component: () => import("pages/PeopleAdd.vue") },
      { path: "/users", component: () => import("pages/Users.vue") },
      { path: "/users/:id", component: () => import("pages/User.vue") },
      { path: "/users/new", component: () => import("pages/UserAdd.vue") },
      {
        path: "/dastoor/upload",
        component: () => import("pages/Dastoor/Upload.vue"),
      },
      { path: "/stats", component: () => import("pages/Stats.vue") },
      {
        path: "/stats/register",
        component: () => import("pages/StatsRegister.vue"),
      },
      {
        path: "/stats/query",
        component: () => import("pages/StatsQuery.vue"),
      },
      {
        path: "stats/daysoff",
        component: () => import("src/pages/StatsDaysOffAdd.vue"),
      },
      {
        path: "stats/daysoff/list",
        component: () => import("pages/StatsDaysOffList.vue"),
      },
      {
        path: "stats/missions",
        component: () => import("pages/StatsMissionsList.vue"),
      },
      {
        path: "stats/missions/add",
        component: () => import("src/pages/StatsMissionsAdd.vue"),
      },
      {
        path: "stats/agents",
        component: () => import("pages/StatsAgentsList.vue"),
      },
      {
        path: "stats/agents/add/external",
        component: () => import("pages/StatsAgentsAdd.vue"),
      },
      {
        path: "stats/agents/add/internal",
        component: () => import("pages/StatsAgentsAdd.vue"),
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
