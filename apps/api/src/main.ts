import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ENV_VARIABLES } from "./common/constants/env-variables";
import { ApiExceptionFilter } from "./common/http/api-exception.filter";
import { ApiResponseInterceptor } from "./common/http/api-response.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api");
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors) =>
				new BadRequestException({
					message: "Validation failed",
					code: "VALIDATION_ERROR",
					details: errors.flatMap(({ property, constraints }) =>
						Object.entries(constraints ?? {}).map(([code, message]) => ({
							code,
							message,
							field: property,
						})),
					),
				}),
		}),
	);
	app.useGlobalInterceptors(new ApiResponseInterceptor(app.get(Reflector)));
	app.useGlobalFilters(new ApiExceptionFilter());

	await app.listen(ENV_VARIABLES.PORT);
}
bootstrap();
