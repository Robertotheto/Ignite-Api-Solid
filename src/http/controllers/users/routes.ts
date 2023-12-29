import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "../users/authenticate";
import { profile } from "../users/profile";
import { register } from "../users/register";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get("/me", { onRequest: [verifyJwt] }, profile);
}
