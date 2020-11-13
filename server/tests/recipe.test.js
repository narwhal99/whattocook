const app = require("../app");
const request = require("supertest");
const Recipe = require("../models/recipe");

const {
  userOne,
  groupOne,
  recipeTwo,
  recipeOne,
  setupDatabase,
  userOneToken,
  userTwoToken,
  closeDataBase,
} = require("./fixtures/db");

beforeEach(setupDatabase);
afterAll(closeDataBase);

test("Should create a recipe", async () => {
  await request(app)
    .post("/api/recipe")
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send({
      name: "TestÉtel",
      peparation: "Moss ételt",
      preparation: "Mosst még ételt",
      description: "Főzöd",
    })
    .expect(201);
});

test("Should not create a recipe without auth.", async () => {
  await request(app)
    .post("/api/recipe")
    .send({
      name: "TestÉtel",
      peparation: "Moss ételt",
      preparation: "Mosst még ételt",
      description: "Főzöd",
    })
    .expect(401);
});

test("Should able to edit recipe with auth", async () => {
  await request(app)
    .put("/api/recipe/" + recipeTwo._id)
    .set("Authorization", "Bearer " + (await userTwoToken()))
    .send({
      name: "Edited name",
    })
    .expect(200);
  const recipe = await Recipe.findOne({ _id: recipeTwo._id });
  expect(recipe.name).toBe("Edited name");
});

test("Should not able to edit recipe without auth", async () => {
  await request(app)
    .put("/api/recipe/" + recipeTwo._id)
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send({
      name: "Edited name",
    })
    .expect(403);
  const recipe = await Recipe.findOne({ _id: recipeTwo._id });
  expect(recipe.name).not.toBe("Edited name");
});

test("Should get my recipes with auth", async () => {
  await request(app)
    .get("/api/recipes")
    .set("Authorization", "Bearer " + (await userTwoToken()))
    .send()
    .expect(200);
});

test("Should not get recipes without auth", async () => {
  await request(app).get("/api/recipes").send().expect(401);
});
