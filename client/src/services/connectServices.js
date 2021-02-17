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
  joinGroup(groupID) {
    return Api.put("/group/join/" + groupID);
  },
  createGroup() {
    return Api.post("/group");
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
  getShoplist() {
    return Api.get("/shoplist");
  },
  shopItemSubmit(shopItem) {
    return Api.post("/shoplist", shopItem);
  },
  shopItemDelete(item) {
    return Api.delete("/shoplist/" + item);
  },
  updateshoplistTODO(itemID) {
    return Api.patch("/shoplist/todo/" + itemID)
  },
  DeleteAllDoneTODO() {
    return Api.delete('/shoplist/todo/all')
  },
  updateMyProfile(euser) {
    return Api.patch('user/me', euser)
  },
  getRecipe(recipeID) {
    return Api.get('/recipe/' + recipeID)
  },
  saveRecipe(editedRecipe) {
    return Api.put('/recipe/' + editedRecipe._id, editedRecipe)
  },
  removeRecipe(recipeID) {
    return Api.delete("/recipe/" + recipeID)
  }
};
