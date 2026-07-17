import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
	@Post("register")
	@HttpCode(HttpStatus.CREATED)
	register(@Body() data: CreateUserDto) {
		console.log("data", data);
	}
}
