import supertest from "supertest";

import { prisma } from "../src/config/db.js";

import app from "../src/app.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
  await prisma.$executeRaw`DELETE FROM "users" WHERE "email" = 'email@teste.com'`;
});

describe("Authentication tests", () => {
  it("should create a new user given a valid login", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toBe(201);

    const user = await prisma.user.findFirst({ where: { email: login.email } });
    expect(user?.email).toBe(login.email);
  });

  it("should return statusCode 422 given an invalid login", async () => {
    const login = userFactory.createLogin();
    login.confirmPassword = "";

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toBe(422);
  });

  it("should return statusCode 409 given an email already registered", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toBe(409);
  });

  it("should return a token when loggged in with valid data", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const response = await supertest(app)
      .post("/sign-in")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);

    const token = response.body.token;
    expect(token).toBeDefined();
  }, 10000);

  it("should return status 401 when trying to log in with invalid data", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const response = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: "wrong password",
    });

    expect(response.status).toBe(401);
  }, 10000);
});

describe("Test entity related tests", () => {
  it("should create a new test and return status 201, given valid data", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const signIn = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.password,
    });
    const token = signIn.body.token;
    const testData = testFactory.generateTestData();
    const response = await supertest(app)
      .post("/tests")
      .send(testData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);

    const test = await prisma.test.findFirst({ where: { name: testData.name } });
    expect(test?.name).toBe(testData.name);
  }, 10000);

  it("should return all created tests data, separated by disciplines, and status 200", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const signIn = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.password,
    });
    const token = signIn.body.token;

    const testData = testFactory.generateTestData();
    await testFactory.createTest(testData);

    const response = await supertest(app).get("/tests/disciplines").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    const tests = response.body;
    expect(tests).not.toBeNull;
  }, 10000);

  it("should return all created tests data, separated by teachers, and status 200", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    const signIn = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.password,
    });
    const token = signIn.body.token;

    const testData = testFactory.generateTestData();
    await testFactory.createTest(testData);

    const response = await supertest(app).get("/tests/teachers").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);

    const tests = response.body;
    expect(tests).not.toBeNull;
  }, 10000);

  it("should return status 498 given an invalid token", async () => {
    const login = userFactory.createLogin();
    const user = await userFactory.createUser(login);

    await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.password,
    });

    const response = await supertest(app)
      .get("/tests/disciplines")
      .set("Authorization", `Bearer wrong token`);
    expect(response.status).toBe(498);
  }, 10000);
});

afterAll(async () => {
  await prisma.$disconnect();
});
