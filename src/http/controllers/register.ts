import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UserAlreadyExistsError } from "@/use-Cases/error/user-already-exists-error";
import { RegisterUseCase } from "@/use-Cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const registerUseCase = new RegisterUseCase(prismaUserRepository);
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }
    throw err;
  }
  reply.status(201).send();
}
