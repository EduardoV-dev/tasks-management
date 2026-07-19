import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
	apiErrorExample,
	apiSuccessExample,
} from "src/common/openapi/api-examples";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LoginDto } from "./dto/login.dto";
import type { AuthenticatedRequest } from "./types/authenticated.types";

const authenticatedResponseExample = apiSuccessExample({
	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	user: {
		id: "clx123abc",
		email: "ada@example.com",
		name: "Ada Lovelace",
	},
});

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: "Register an account",
		description: "Creates an account and returns an access token.",
	})
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({
		description: "Account registered successfully.",
		schema: { example: authenticatedResponseExample },
	})
	@ApiBadRequestResponse({
		description: "The request body failed validation.",
		schema: {
			example: apiErrorExample({
				code: "VALIDATION_ERROR",
				message: "Validation failed",
				details: [
					{
						field: "password",
						code: "matches",
						message:
							"password must contain uppercase, lowercase, and numeric characters",
					},
				],
			}),
		},
	})
	@ApiConflictResponse({
		description: "The email is already registered.",
		schema: {
			example: apiErrorExample({
				code: "EMAIL_ALREADY_EXISTS",
				message: "Email is already used",
			}),
		},
	})
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.registerUser(dto);
	}

	@Public()
	@UseGuards(AuthGuard("local"))
	@Post("login")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: "Log in",
		description: "Authenticates an account and returns an access token.",
	})
	@ApiBody({ type: LoginDto })
	@ApiOkResponse({
		description: "Authenticated successfully.",
		schema: { example: authenticatedResponseExample },
	})
	@ApiUnauthorizedResponse({
		description: "The email or password is invalid.",
		schema: {
			example: apiErrorExample({
				code: "ACCOUNT_LOGIN_ERROR",
				message: "Email or password is wrong",
			}),
		},
	})
	async login(@Body() _: LoginDto, @Req() req: AuthenticatedRequest) {
		return await this.authService.login(req.user);
	}
}
