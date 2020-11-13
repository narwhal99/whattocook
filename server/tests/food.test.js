const app = require("../app");
const request = require("supertest");

const {
  userOne,
  groupOne,
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
