import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { API_MESSAGE } from "./api-message.decorator";
import { ApiResponse } from "./api-response";

@Injectable()
export class ApiResponseInterceptor<T>
	implements NestInterceptor<T, ApiResponse<T>>
{
	constructor(private readonly reflector: Reflector) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<T>,
	): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
		const message =
			this.reflector.get<string>(API_MESSAGE, context.getHandler()) ??
			"Request successful!";

		return next.handle().pipe(
			map((data) => ({
				ok: true,
				message,
				data: data ?? null,
				error: null,
			})),
		);
	}
}
