import {
	BadRequestException,
	type INestApplication,
	ValidationPipe,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import { ApiExceptionFilter } from "./common/http/api-exception.filter";
import { ApiResponseInterceptor } from "./common/http/api-response.interceptor";

export function configureApp(app: INestApplication): void {
	app.useLogger(app.get(Logger));
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
	app.useGlobalFilters(app.get(ApiExceptionFilter));

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Tasks Management")
		.setDescription("Tasks management api")
		.setVersion("1.0")
		.build();

	const documentFactory = () =>
		SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, documentFactory);
}
