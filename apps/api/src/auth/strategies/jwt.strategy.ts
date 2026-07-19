import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ENV_VARIABLES } from "src/common/constants/env-variables";
import { apiError } from "src/common/http/api-error";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: ENV_VARIABLES.JWT_ACCESS_SECRET,
		});
	}

	async validate({ sub }: { sub: string }) {
		const user = await this.usersService.findById(sub);
		if (!user)
			throw new UnauthorizedException(
				apiError({
					code: "USER_NOT_FOUND",
					message: "User not found",
				}),
			);
		return user;
	}
}
