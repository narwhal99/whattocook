import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Food from "../views/Food.vue";
import renderFood from "../components/Food/render";
import addFood from "../components/Food/add";
import Login from "../views/Login";
import store from "../store";
import Registration from "../views/Register";
import Group from "../views/Group";
import JoinGroup from "../components/Group/join";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      path: "/food",
      component: Food,
      children: [
        { path: "", component: renderFood },
        { path: "add", component: addFood },
      ],
      meta: {
        needGroup: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        noAuth: true,
      },
    },
    {
      path: "/registration",
      component: Registration,
      meta: {
        noAuth: true,
      },
    },
    {
      path: "/group",
      component: Group,
      children: [
        {
          name: "JoinGroup",
          path: "join",
          component: JoinGroup,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.noAuth)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some((record) => record.meta.needGroup)) {
    if (store.getters.haveGroup) {
      next();
      return;
    }
    next("/group/join");
  } else if (to.name === "JoinGroup") {
    if (store.getters.haveGroup) {
      next("/group");
      return;
    }
    next();
  } else {
    next();
  }
});
export default router;
