const app = require("../app");
const request = require("supertest");
const Food = require("../models/food");

const {
  userOne,
  groupOne,
  foodOne,
  setupDatabase,
  userOneToken,
  userTwoToken,
  closeDataBase,
} = require("./fixtures/db");

beforeEach(setupDatabase);
afterAll(closeDataBase);

test("Should create a food", async () => {
  await request(app)
    .post("/api/food")
    .set("Authorization", "Bearer " + (await userTwoToken()))
    .send({
      name: "Test",
      quantity: "9",
      unit: "kg",
    })
    .expect(201);
});

test("Should not create food without group", async () => {
  await request(app)
    .post("/api/food")
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send({
      name: "Test",
      quantity: "9",
      unit: "kg",
    })
    .expect(403);
});

test("Should not create food without authentication", async () => {
  await request(app)
    .post("/api/food")
    .send({
      name: "Test",
      quantity: "9",
      unit: "kg",
    })
    .expect(401);
});

test("Should delete food", async () => {
  await request(app)
    .delete("/api/food/" + foodOne._id)
    .set("Authorization", "Bearer " + (await userTwoToken()))
    .send()
    .expect(200);

  const food = await Food.findById(foodOne._id);
  expect(food).toBe(null);
});

test("Should edit food", async () => {
  await await request(app)
    .patch("/api/food")
    .set("Authorization", "Bearer " + (await userTwoToken()))
    .send({
      _id: foodOne._id,
      name: "Zöldség",
    })
    .expect(200);

  const food = await Food.findById(foodOne._id);
  expect(food.name).toBe("Zöldség");
});
