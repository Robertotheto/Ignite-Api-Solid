import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-Cases/authenticate";
import { InvalidCredentialsError } from "@/use-Cases/error/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);
    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }
    throw err;
  }
  reply.status(200).send();
}
