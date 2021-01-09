import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import connectServices from "../services/connectServices";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    errorMsg: null,
    loading: false,
    foods: null,
    user: {
      profile: {},
      group: {},
    },
    myRecipes: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    haveGroup: (state) => !!state.user.group,
    errorMsg: (state) => state.errorMsg,
    foods: (state) => state.foods,
    user: (state) => state.user,
    myRecipes: (state) => state.myRecipes,
  },
  mutations: {
    SET_LOADING(state) {
      state.loading = true;
    },
    SET_ERROR(state, error) {
      state.errorMsg = error;
    },
    SET_FOODS(state, foods) {
      state.foods = foods;
    },
    AUTH_LOGOUT(state) {
      state.loading = false;
      state.token = "";
    },
    AUTH_LOGIN(state, { user, group }) {
      state.loading = false;
      state.user.profile = user;
      state.user.group = group;
    },
    AUTH_REGISTER(state, user) {
      state.loading = false;
      state.user = user;
    },
    AUTH_GROUP(state, group) {
      state.loading = false;
      state.user.group = group;
    },
    SET_USER(state, { user, group }) {
      state.user.profile = user;
      state.user.group = group;
    },
    SET_MY_RECIPES(state, recipes) {
      state.myRecipes = recipes;
    },
  },
  actions: {
    async regSubmit({ commit }, user) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.regSubmit(user);
        const token = resp.data.token;
        localStorage.setItem("token", token);
        commit("AUTH_REGISTER", resp.data.user);
        return resp;
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
        return err;
      }
    },
    async loginSubmit({ commit }, userData) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.loginSubmit(userData);
        const token = resp.data.token;
        localStorage.setItem("token", token);
        const user = resp.data.user;
        const group = resp.data.group;
        commit("AUTH_LOGIN", { user, group });
        return resp;
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
        return err;
      }
    },
    async getMyUser({ commit }) {
      try {
        const resp = await connectServices.getMyUser();
        const group = resp.data.group;
        const user = resp.data.user;
        commit("SET_USER", { user, group });
      } catch (err) {
        console.log(err);
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("AUTH_LOGOUT");
    },
    async getFoods({ commit }) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.getFoods();
        commit("SET_FOODS", resp.data.foods);
      } catch (err) {
        console.log(err.response.data);
        // commit("SET_ERROR", err.response.data.message);
      }
    },
    async joinGroup({ commit }, groupID) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.joinGroup(groupID);
        return resp;
      } catch (err) {
        console.log(err.response.data);
        commit("SET_ERROR", err.response.data.message);
        return err;
      }
    },
    async createGroup({ commit }) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.createGroup();
        commit("AUTH_GROUP", resp.data.group);
        return resp;
      } catch (err) {
        console.log(err.response.data);
        // commit("SET_ERROR", err.response.data.message);
        return err;
      }
    },
    async addFood({ commit }, food) {
      try {
        const resp = await connectServices.addFood(food);
        return resp;
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
        return err;
      }
    },
    async getMyRecipes({ commit }) {
      try {
        const resp = await connectServices.getMyRecipes();
        commit("SET_MY_RECIPES", resp.data.recipes);
      } catch (err) {
        console.log(err);
      }
    },
    async addRecipe({ commit }, recipe) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.addRecipe(recipe);
        return resp;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
