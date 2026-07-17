import {
	ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
} from "@nestjs/common";
import type { Response } from "express";
import type { ApiErrorPayload, ApiResponse } from "./api-response";

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const payload = value as Record<string, unknown>;

	return (
		typeof payload.message === "string" &&
		typeof payload.code === "string" &&
		(payload.details === undefined || Array.isArray(payload.details))
	);
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void {
		const response = host.switchToHttp().getResponse<Response>();

		if (exception instanceof HttpException) {
			const payload = exception.getResponse();

			if (isApiErrorPayload(payload)) {
				response.status(exception.getStatus()).json({
					ok: false,
					message: payload.message,
					data: null,
					error: { code: payload.code, details: payload.details ?? [] },
				} satisfies ApiResponse<null>);

				return;
			}

			response.status(exception.getStatus()).json({
				ok: false,
				message: "Request failed",
				data: null,
				error: { code: "HTTP_ERROR", details: [] },
			} satisfies ApiResponse<null>);

			return;
		}

		response.status(500).json({
			ok: false,
			message: "Internal server error",
			data: null,
			error: { code: "INTERNAL_ERROR", details: [] },
		} satisfies ApiResponse<null>);
	}
}
