import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ENV_VARIABLES } from "src/common/constants/env-variables";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: ENV_VARIABLES.JWT_ACCESS_SECRET,
			signOptions: {
				expiresIn:
					ENV_VARIABLES.JWT_ACCESS_EXPIRES_IN as `${number}${"s" | "m" | "h" | "d"}`,
			},
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AuthModule {}
