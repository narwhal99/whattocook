import axios from "axios";
import router from "../router";
import store from '../store'

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
  headers: {
    Authorization: localStorage.getItem("token") || "",
  },
});

instance.interceptors.response.use(undefined, async function(error) {
  if (
    error.response.status === 401 &&
    error.config &&
    !error.config.__isRetryRequest
  ) {
    store.dispatch("logout");
    router.push("/login");
  }
  return Promise.reject(error);
});

export default instance;
