import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymsUseCase } from "./create-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymsUseCase;
describe("Create Gym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymsUseCase(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -11.8196965,
      longitude: -55.5092161,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
