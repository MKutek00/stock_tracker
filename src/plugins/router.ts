import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Main from "@/views/Main.vue";
import Wallet from "@/views/Wallet.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Main,
      name: "main",
    },
    {
      path: "/wallet",
      component: Wallet,
      name: "wallet",
    },
  ],
});
