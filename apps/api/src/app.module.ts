import { randomUUID } from "node:crypto";
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";
import { ENV_VARIABLES } from "./common/constants/env-variables";
import { ApiExceptionFilter } from "./common/http/api-exception.filter";
import { PrismaModule } from "./common/prisma/prisma.module";
import { UsersModule } from "./users/users.module";

const requestIdPattern =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Module({
	imports: [
		LoggerModule.forRoot({
			pinoHttp: {
				level: ENV_VARIABLES.LOG_LEVEL,
				genReqId: (request, response) => {
					const header = request.headers["x-request-id"];
					const requestId =
						typeof header === "string" && requestIdPattern.test(header)
							? header
							: randomUUID();

					response.setHeader("x-request-id", requestId);
					return requestId;
				},
				redact: {
					paths: [
						"req.headers.authorization",
						"req.headers.cookie",
						"req.body.password",
						"req.body.accessToken",
						"req.body.refreshToken",
					],
					censor: "[REDACTED]",
				},
				transport:
					ENV_VARIABLES.NODE_ENV === "production"
						? undefined
						: {
								target: "pino-pretty",
								options: {
									colorize: true,
									singleLine: true,
									translateTime: "SYS:standard",
									ignore: "pid,hostname",
								},
							},
			},
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
	],
	providers: [ApiExceptionFilter],
})
export class AppModule {}
