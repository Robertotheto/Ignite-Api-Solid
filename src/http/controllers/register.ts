import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-Cases/register'
import { PrismaUserRepository } from '@/repositories/prisma-user-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    reply.status(409).send()
  }
  reply.status(201).send()
}
