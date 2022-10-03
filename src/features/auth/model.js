import { db } from "../../loaders/database.js";

export const getUser = async (id = "") => {
	return await db.user.findUniqueOrThrow({ where: { id } });
};

export const getUserByEmail = async (email = "") => {
	return await db.user.findUniqueOrThrow({ where: { email } });
};

export const createNewUser = async (email = "", full_name = "", password = "") => {
	const user = await db.user.create({
		data: {
			full_name,
			email,
			password,
			status: "ACTIVE",
		},
	});
	return {
		id: user.id,
		email: user.email,
		full_name: user.full_name,
		timestamp: user.timestamp,
		status: user.status,
	};
};
