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
  joinGroup(groupID) {
    return Api.put("/group/join/" + groupID);
  },
  createGroup() {
    return Api.post("/group");
  },
  addFood(food) {
    return Api.post("/food", food);
  },
  getMyRecipes() {
    return Api.get("/recipes");
  },
  addRecipe(recipe) {
    return Api.post("/recipe", recipe);
  },
  getMyGroupRecipes() {
    return Api.get("/group/recipes");
  },
  leaveGroup() {
    return Api.post("/group/leave");
  },
  deletefood(foodID) {
    return Api.delete(`/food/${foodID}`);
  },
  editFood(editedFood) {
    return Api.patch("food", editedFood);
  },
  getShoplist() {
    return Api.get("/shoplist");
  },
  shopItemSubmit(shopItem) {
    return Api.post("/shoplist", shopItem);
  },
  shopItemDelete(item) {
    return Api.delete("/shoplist/" + item);
  },
};
