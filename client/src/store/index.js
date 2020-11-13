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
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    errorMsg: (state) => state.errorMsg,
    foods: (state) => state.foods,
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
      (state.loading = false), (state.token = "");
    },
  },
  actions: {
    async regSubmit({ commit }, user) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.regSubmit(user);
        const token = resp.data.token;
        localStorage.setItem("token", token);
        commit("empty");
        throw resp.data;
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
      }
    },
    async loginSubmit({ commit }, user) {
      commit("SET_LOADING");
      try {
        const resp = await connectServices.loginSubmit(user);
        const token = resp.data.token;
        localStorage.setItem("token", token);
        return resp;
      } catch (err) {
        commit("SET_ERROR", err.response.data.message);
        return err;
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
  },
});
