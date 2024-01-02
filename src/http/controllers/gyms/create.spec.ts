import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const response = await request(app.server)
      .post("/gyms")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: "Javascript Gym",
        description: "Gym to learn Javascript",
        phone: "123456789",
        latitude: -11.8196965,
        longitude: -55.5092161,
      });
    expect(response.status).toEqual(201);
  });
});
