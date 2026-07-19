const logLevels = [
	"trace",
	"debug",
	"info",
	"warn",
	"error",
	"fatal",
	"silent",
] as const;

const logLevel =
	process.env.LOG_LEVEL ||
	(process.env.NODE_ENV === "production" ? "info" : "debug");

if (!logLevels.includes(logLevel as (typeof logLevels)[number])) {
	throw new Error(`Invalid LOG_LEVEL: ${logLevel}`);
}

export const ENV_VARIABLES = Object.freeze({
	PORT: process.env.PORT || 4000,
	DATABASE_URL: process.env.DATABASE_URL || "",
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "my-secret",
	JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
	NODE_ENV: process.env.NODE_ENV || "development",
	LOG_LEVEL: logLevel,
});
