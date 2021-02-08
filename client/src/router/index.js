import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import store from "../store";
import Registration from "../views/Register";
import Group from "../views/Group";
import GroupAdd from "../components/Group/join";
import GroupRender from "../components/Group/render";
import Recipe from "../views/Recipe";
import RecipeAdd from "../components/Recipe/add";
import RecipeRender from "../components/Recipe/render";
import shopList from "../views/ShopList";
import Settings from '../views/Settings.vue'
import SettingsUser from "../components/Settings/Profile.vue"
import SettingsPWD from "../components/Settings/Password.vue"

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
          path: "/group",
          component: GroupRender,
          meta: {
            needGroup: true,
          },
        },
        {
          path: "join",
          component: GroupAdd,
          beforeEnter: (to, from, next) => {
            if (!store.getters.haveGroup) {
              next();
              return;
            }
            next("/group");
          },
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
      meta: {
        needGroup: true,
      },
    },
    {
      path: "/shoplist",
      component: shopList,
      meta: {
        needGroup: true,
      },
    },
    {
      path: "/settings",
      component: Settings,
      children: [
        { path: 'profile', component: SettingsUser },
        { path: 'password', component: SettingsPWD }
      ]
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  store.dispatch("getMyUser").then(() => {
    if (
      !store.getters.isLoggedIn &&
      !to.matched.some((record) => record.meta.noAuth)
    ) {
      next("/login");
      return;
    } else if (
      store.getters.isLoggedIn &&
      to.matched.some((record) => record.meta.noAuth)
    ) {
      next("/");
    }
    next();
    if (to.matched.some((record) => record.meta.needGroup)) {
      if (store.getters.haveGroup) {
        next();
        return;
      }
      next("/group/join");
    }
    next();
  });
});
export default router;
