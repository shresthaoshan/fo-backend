import { db } from "../../loaders/database.js";

export const getSports = async (index = 0) => {
	return await db.sport.findMany({ skip: index, take: 10, orderBy: { sport_id: "desc" } });
};

export const createSport = async (name = "", live_url = "") => {
	const sport = await db.sport.create({
		data: {
			name,
			live_url,
			sport_id: name.trim().toLowerCase().replace(/\s+/g, "_"),
		},
	});
	return sport;
};

export const updateLiveUrl = async (sport_id = "", live_url = "") => {
	const sport = await db.sport.update({ where: { sport_id }, data: { live_url } });
	return sport;
};
