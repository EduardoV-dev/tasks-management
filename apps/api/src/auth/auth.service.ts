import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { apiError } from "src/common/http/api-error";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { AuthenticatedUser } from "./types/authenticated.types";

type AuthenticatedResponse = {
	accessToken: string;
	user: AuthenticatedUser;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async registerUser({
		email,
		name,
		password,
	}: CreateUserDto): Promise<AuthenticatedResponse> {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await this.usersService.createUser({
			email,
			name,
			password: hashedPassword,
		});

		return await this.login(user);
	}

	async validateUser({
		email,
		password,
	}: Pick<CreateUserDto, "email" | "password">): Promise<AuthenticatedUser> {
		const user = await this.usersService.findByEmailToAuthenticate(email);
		if (!user || !(await bcrypt.compare(password, user.passwordHash)))
			throw new UnauthorizedException(
				apiError({
					code: "ACCOUNT_LOGIN_ERROR",
					message: "Email or password is wrong",
				}),
			);

		return {
			id: user.id,
			email: user.email,
			name: user.name,
		};
	}

	async login(user: AuthenticatedUser): Promise<AuthenticatedResponse> {
		return {
			accessToken: await this.jwtService.signAsync({ sub: user.id }),
			user,
		};
	}
}
