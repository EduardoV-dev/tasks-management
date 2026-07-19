import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, Length, MaxLength } from "class-validator";

export class LoginDto {
	@ApiProperty({
		example: "ada@example.com",
		format: "email",
		maxLength: 254,
	})
	@Transform(({ value }) =>
		typeof value === "string" ? value.trim().toLowerCase() : value,
	)
	@IsEmail()
	@MaxLength(254)
	email!: string;

	@ApiProperty({
		example: "StrongPass123",
		format: "password",
		minLength: 8,
		maxLength: 128,
	})
	@IsString()
	@Length(8, 128)
	password!: string;
}
