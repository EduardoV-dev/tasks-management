import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import { configureApp } from "./../src/app.setup";

describe("AppController (e2e)", () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		configureApp(app);
		await app.init();
	});

	it("rejects invalid registration requests with the production API configuration", () => {
		return request(app.getHttpServer())
			.post("/api/auth/register")
			.send({})
			.expect(400)
			.expect("x-request-id", /^[0-9a-f-]{36}$/i)
			.expect((response) => {
				expect(response.body).toMatchObject({
					ok: false,
					message: "Validation failed",
					data: null,
					error: { code: "VALIDATION_ERROR" },
				});
				expect(response.body.error.details).toEqual(expect.any(Array));
			});
	});

	it("publishes the authentication endpoints in OpenAPI", () => {
		return request(app.getHttpServer())
			.get("/docs-json")
			.expect(200)
			.expect((response) => {
				expect(response.body.paths).toMatchObject({
					"/api/auth/register": { post: expect.any(Object) },
					"/api/auth/login": { post: expect.any(Object) },
				});
			});
	});

	afterEach(async () => {
		await app.close();
	});
});
