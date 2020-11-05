const User = require("../models/user");
const app = require("../app");
const request = require("supertest");
const {
  userOne,
  setupDatabase,
  userOneToken,
  closeDataBase,
} = require("./fixtures/db");

beforeEach(setupDatabase);
afterAll(closeDataBase);

test("Should signup a new user ", async () => {
  const resp = await request(app)
    .post("/api/user/signup")
    .send({
      firstName: "Andrej",
      lastName: "Molnár",
      email: "molnarandre@email.com",
      password: "secretPW31!",
    })
    .expect(201);
  expect(resp.body.success).toBe(true);

  // Assert that the database was changed correctly
  const user = await User.findOne({ email: "molnarandre@email.com" });
  expect(user).not.toBeNull();

  //Password hash test
  expect(user.password).not.toBe("secretPW31!");
});

test("Should login existing user", async () => {
  const resp = await request(app).post("/api/user/login").send({
    email: userOne.email,
    password: userOne.password,
  });
  expect(resp.body.success).toBe(true);
});

test("Should not login with wrong pw", async () => {
  const resp = await request(app).post("/api/user/login").send({
    email: userOne.email,
    password: "thisisnotmypassword",
  });
  expect(resp.body.success).toBe(false);
});

test("Should get user profile", async () => {
  await request(app)
    .get("/api/user/me")
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/api/user/me").send().expect(403);
});
