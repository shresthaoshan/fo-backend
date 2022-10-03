import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "ghijkl";
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
export const validateRefreshToken = async (token = "") => {
	return new Promise((res, rej) => {
		jwt.verify(
			token,
			ACCESS_TOKEN_SECRET,
			{
				subject: "REFRESH",
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

export const getRefreshToken = async (payload = {}) => {
	return new Promise((res, rej) => {
		for (let field of FIELD_TO_CLEAR) if (field in payload) delete payload[field];

		jwt.sign(
			payload,
			REFRESH_TOKEN_SECRET,
			{
				algorithm: "HS384",
				noTimestamp: true,
				subject: "REFRESH",
			},
			(error, token) => {
				if (error) rej(error);
				if (!token?.length) rej("Failed to generate refresh token.");
				res(token);
			}
		);
	});
};
