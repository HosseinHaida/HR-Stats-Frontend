const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    // beforeEnter: (to, from) => {
    //   // reject the navigation
    //   console.log(store);
    //   if (!user.data) return false;
    //   else return true;
    // },
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/people", component: () => import("pages/People.vue") },
      { path: "/users", component: () => import("pages/Users.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
