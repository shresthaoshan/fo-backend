import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";

// password
const SALT = Number(process.env.SALT) || 10;

export const hashPassword = async (password = "") => {
	const salt = await bcrypt.genSalt(SALT);
	return await bcrypt.hash(password, salt);
};
export const matchPassword = async (password = "", hash = "") => {
	return await bcrypt.compare(password, hash);
};

// tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "abcdef";
const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || "ghijkl";
const FIELD_TO_CLEAR = ["password", "token", "sub"];

export const validateAccessToken = async (token = "") => {
	return new Promise((res, rej) => {
		jwt.verify(
			token,
			ACCESS_TOKEN_SECRET,
			{
				subject: "ACCESS",
				algorithms: ["HS512"],
			},
			(error, payload) => {
				if (error) rej(error);
				if (!payload) rej("Token-Payload extraction failed.");
				res(payload);
			}
		);
	});
};
export const validateResetToken = async (token = "") => {
	return new Promise((res, rej) => {
		jwt.verify(
			token,
			RESET_TOKEN_SECRET,
			{
				subject: "RESET",
				algorithms: ["HS384"],
			},
			(error, payload) => {
				if (error) rej(error);
				if (!payload) rej("Token-Payload extraction failed.");
				res(payload);
			}
		);
	});
};

export const getAccessToken = async (payload = {}) => {
	return new Promise((res, rej) => {
		for (let field of FIELD_TO_CLEAR) if (field in payload) delete payload[field];

		jwt.sign(
			payload,
			ACCESS_TOKEN_SECRET,
			{
				algorithm: "HS512",
				noTimestamp: true,
				subject: "ACCESS",
			},
			(error, token) => {
				if (error) rej(error);
				if (!token?.length) rej("Failed to generate access token.");
				res(token);
			}
		);
	});
};

export const getResetToken = async (payload = {}) => {
	return new Promise((res, rej) => {
		for (let field of FIELD_TO_CLEAR) if (field in payload) delete payload[field];

		jwt.sign(
			payload,
			RESET_TOKEN_SECRET,
			{
				algorithm: "HS384",
				subject: "RESET",
				expiresIn: "1d",
			},
			(error, token) => {
				if (error) rej(error);
				if (!token?.length) rej("Failed to generate reset token.");
				res(token);
			}
		);
	});
};

// mail
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
const EMAIL_HOST = process.env.EMAIL_HOST || "";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;

const transport = createTransport({
	host: EMAIL_HOST,
	port: EMAIL_PORT,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

export const sendResetEmail = async (user_name, user_email, token) => {
	const resp = await transport.sendMail({
		from: EMAIL_USER,
		to: user_email,
		subject: "Password reset!!!",
		html: `
			<h1>FunOlympics</h1>
			<h3>Hello, ${user_name}!</h3>
			<p>There has been a password reset request for this account. If you had initiated the request, you can use the token below to reset your password.</p>
			<pre>The token is valid for 24 hours.</pre>
			<p><b>${token}</b></p>
			<p><i>If you did not initiate any password reset request, kindly ignore this email.</i></p>
		`,
	});
	console.log({ resp });
};
