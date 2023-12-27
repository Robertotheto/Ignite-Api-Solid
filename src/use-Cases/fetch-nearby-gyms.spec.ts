import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearByGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearByGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -11.8196965,
      longitude: -55.5092161,
    });

    await gymsRepository.create({
      title: "Farm Gym",
      description: null,
      phone: null,
      latitude: -11.9193606,
      longitude: -55.515776,
    });
    const { gyms } = await sut.execute({
      userLatitude: -11.8196965,
      userLongitude: -55.5092161,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
