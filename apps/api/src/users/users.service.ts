import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async createUser({ email, name, password }: CreateUserDto) {
		await this.prisma.user.create({
			data: {
				email,
				name,
				passwordHash: password,
			},
		});
	}
}
