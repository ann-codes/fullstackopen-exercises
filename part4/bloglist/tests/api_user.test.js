const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./api_userTestHelper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("coolcat", 10);
  const newUser = new User({
    name: "Cat",
    username: "coolcat",
    passwordHash: passwordHash,
  });
  await newUser.save();
});

describe("verifying api user calls", () => {
  test("succeeds with 200 code", async () => {
    // got 500 error when expecting 200 because of putting it in the class/model
    // and sending it through controller to be parsed to new form breaks structure
    // ie includes other data not in schema
    await api.post("/api/users").send(helper.addUser0).expect(200);
    const dbEnd = await helper.usersInDb();
    expect(dbEnd.length).toEqual(2);
  });

  test("username must be unique", async () => {
    const dbStart = await helper.usersInDb();
    await api.post("/api/users").send(helper.addUser1).expect(400);
    const dbEnd = await helper.usersInDb();
    expect(dbStart.length).toEqual(dbEnd.length);
  });

  test("username must be 3 characters or longer", async () => {
    const dbStart = await helper.usersInDb();
    await api.post("/api/users").send(helper.addUser2).expect(400);
    const dbEnd = await helper.usersInDb();
    expect(dbStart.length).toEqual(dbEnd.length);
  });

  test("password must be 3 characters or longer", async () => {
    const dbStart = await helper.usersInDb();
    await api.post("/api/users").send(helper.addUser3).expect(400);
    const dbEnd = await helper.usersInDb();
    expect(dbStart.length).toEqual(dbEnd.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
