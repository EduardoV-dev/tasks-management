import { Exclude, Transform } from "class-transformer";
import { IsEmail, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
	@Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
	@IsString()
	@Length(2, 100)
	name!: string;

	@Transform(({ value }) =>
		typeof value === "string" ? value.trim().toLowerCase() : value,
	)
	@IsEmail()
	@MaxLength(254)
	email!: string;

	@IsString()
	@Length(8, 128)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
		message:
			"password must contain uppercase, lowercase, and numeric characters",
	})
	password!: string;
}
