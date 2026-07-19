import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { UserSelect } from "generated/prisma/models";
import { apiError } from "src/common/http/api-error";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

const select: UserSelect = {
	id: true,
	email: true,
	name: true,
};

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser({ email, name, password }: CreateUserDto) {
		try {
			return await this.prisma.user.create({
				data: {
					email,
					name,
					passwordHash: password,
				},
				select,
			});
		} catch (err) {
			if (
				err instanceof Prisma.PrismaClientKnownRequestError &&
				err.code === "P2002"
			) {
				throw new ConflictException(
					apiError({
						code: "EMAIL_ALREADY_EXISTS",
						message: "Email is already used",
					}),
				);
			}

			throw err;
		}
	}

	async findByEmailToAuthenticate(email: string) {
		return await this.prisma.user.findUnique({
			where: { email, deletedAt: null },
			select: {
				...select,
				passwordHash: true,
			},
		});
	}

	async findById(id: string) {
		return await this.prisma.user.findFirst({
			where: { id, deletedAt: null },
			select,
		});
	}
}
