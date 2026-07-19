import type { ApiErrorPayload, ApiResponse } from "../http/api-response.types";

export function apiSuccessExample<T>(
	data: T,
	message = "Request successful!",
): ApiResponse<T> {
	return { ok: true, message, data, error: null };
}

export function apiErrorExample({
	code,
	message,
	details = [],
}: ApiErrorPayload): ApiResponse<null> {
	return {
		ok: false,
		message,
		data: null,
		error: { code, details },
	};
}
