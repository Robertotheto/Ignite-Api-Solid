import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";

describe("Authenticate use case", () => {
  it("should be able to authenticate", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);
    await userRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });
    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong email", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);
    expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate with wrong password", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);
    await userRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
    });
    expect(() =>
      sut.execute({
        email: "johndoe@gmail.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
