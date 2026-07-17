export type ApiErrorDetail = {
	code: string;
	message: string;
	field?: string;
};

export type ApiError = {
	code: string;
	details: ApiErrorDetail[];
};

export type ApiErrorPayload = {
	message: string;
	code: string;
	details?: ApiErrorDetail[];
};

export type ApiResponse<T = unknown> = {
	ok: boolean;
	message: string;
	data: T | null;
	error: ApiError | null;
};
