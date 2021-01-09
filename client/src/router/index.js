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
import GroupAdd from "../components/Group/join";
import GroupRender from "../components/Group/render";
import Recipe from "../views/Recipe";
import RecipeAdd from "../components/Recipe/add";
import RecipeRender from "../components/Recipe/render";

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
        { path: "/", component: GroupRender },
        {
          path: "join",
          component: GroupAdd,
        },
      ],
    },
    {
      path: "/recipe",
      component: Recipe,
      children: [
        { path: "/", component: RecipeRender },
        {
          path: "add",
          component: RecipeAdd,
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
  } else {
    next();
  }
});
export default router;
