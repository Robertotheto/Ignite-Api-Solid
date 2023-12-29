import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@exemplo.com",
      password: "123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@exemplo.com",
      password: "123456",
    });
    const { token } = authResponse.body;
    const response = await request(app.server)
      .get("/me")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@exemplo.com",
      })
    );
  });
});
