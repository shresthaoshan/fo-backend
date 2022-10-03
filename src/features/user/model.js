import { db } from "../../loaders/database.js";

const select = {
	email: true,
	full_name: true,
	id: true,
	status: true,
	timestamp: true,
};

export const getUsers = async (index = 0) => {
	return await db.user.findMany({
		skip: index,
		take: 10,
		orderBy: { full_name: "desc" },
		select: {
			email: true,
			full_name: true,
			id: true,
			status: true,
			timestamp: true,
		},
	});
};

// export const updateUser = async (name = "", live_url = "") => {
// 	const sport = await db.sport.create({
// 		data: {
// 			name,
// 			live_url,
// 			sport_id: name.trim().toLowerCase().replace(/\s+/g, "_"),
// 		},
// 		select,
// 	});
// 	return sport;
// };

export const suspendUser = async (id) => {
	return await db.user.update({ where: { id }, data: { status: "SUSPENDED" }, select });
};

export const activateUser = async (id) => {
	return await db.user.update({ where: { id }, data: { status: "ACTIVE" }, select });
};
