const app = require("../app");
const request = require("supertest");
const Group = require("../models/group");

const {
  userOne,
  groupOne,
  setupDatabase,
  userOneToken,
  closeDataBase,
} = require("./fixtures/db");

beforeEach(setupDatabase);
afterAll(closeDataBase);

test("Should create a group", async () => {
  const resp = await request(app)
    .post("/api/group")
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send({
      name: "Ez egy test csoport",
    })
    .expect(201);
  expect(resp.body.success).toBe(true);
});

test("Should not create a group without authentication", async () => {
  await request(app)
    .post("/api/group")
    .send({
      name: "Ez egy test csoport",
    })
    .expect(401);
});

test("Should join to a group", async () => {
  await request(app)
    .put("/api/group/join/" + groupOne._id)
    .set("Authorization", "Bearer " + (await userOneToken()))
    .send()
    .expect(200);

  const group = await Group.findOne({ _id: groupOne._id });
  expect(group.members).not.toBeNull();
});

test("Should not join to a group without authentication", async () => {
  await request(app)
    .put("/api/group/join/" + groupOne._id)
    .send()
    .expect(401);
  const group = await Group.findOne({ _id: groupOne._id });
  expect(group.members).not.toBe();
});
