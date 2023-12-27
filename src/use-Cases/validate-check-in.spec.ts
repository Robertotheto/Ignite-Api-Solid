import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });
  it("should be able to validate the check in", async () => {
    const createCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    const { checkIn } = await sut.execute({
      checkInId: createCheckIn.id,
    });
    expect(checkIn.validate_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validate_at).toEqual(expect.any(Date));
  });
  it("should not be able to validate an inexistent check in", async () => {
    await expect(
      sut.execute({
        checkInId: "inexistent-check-in",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
