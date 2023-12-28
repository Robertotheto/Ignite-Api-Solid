import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymsUseCase } from "../create-gyms";

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const createGymsUseCase = new CreateGymsUseCase(gymsRepository);
  return createGymsUseCase;
}
