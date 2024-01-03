import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to search gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);
    await request(app.server)
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
    await request(app.server)
      .post("/gyms")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        title: "Typescript Gym",
        description: "Gym to learn Typescript",
        phone: "123456789",
        latitude: -11.8196965,
        longitude: -55.5092161,
      });
    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "Javascript",
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
