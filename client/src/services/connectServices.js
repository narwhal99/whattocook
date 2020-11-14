import Api from "@/services/Api";

export default {
  regSubmit(user) {
    return Api.post("user/signup", user);
  },
  loginSubmit(user) {
    return Api.post("user/login", user);
  },
  getMyUser() {
    return Api.get("user/me");
  },
  getFoods() {
    return Api.get("/foods");
  },
};
