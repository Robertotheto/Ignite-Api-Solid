import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -11.8196965,
        longitude: -55.5092161,
      },
    });
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        latitude: -11.8196965,
        longitude: -55.5092161,
      });
    expect(response.status).toEqual(201);
  });
});
