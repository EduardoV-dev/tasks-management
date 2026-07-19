import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureApp } from "./app.setup";
import { ENV_VARIABLES } from "./common/constants/env-variables";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });

	configureApp(app);

	await app.listen(ENV_VARIABLES.PORT);
}
bootstrap();
