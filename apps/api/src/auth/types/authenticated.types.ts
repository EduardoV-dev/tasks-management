import { Request } from "express";
import { User } from "generated/prisma/client";

export type AuthenticatedUser = Pick<User, "id" | "name" | "email">;

export type AuthenticatedRequest = Request & {
	user: AuthenticatedUser;
};
