import { createRouter, createWebHistory } from "vue-router";

import ApplyJob from "../views/ApplyJob.vue";
import ShowData from "../views/ShowData.vue";
import Login from "../components/LoginDialog.vue";

const routes = [
  {
    path: "/",
    name: "ApplyJob",
    component: () => import("../views/ApplyJob.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/LoginDialog.vue"),
  },
  {
    path: "/data",
    name: "Showdata",
    component: () => import("../views/ShowData.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
