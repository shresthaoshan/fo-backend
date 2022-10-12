import { db } from "../../loaders/database.js";

export const getSports = async (index = 0) => {
	return await db.sport.findMany({ skip: index, take: 10, orderBy: { sport_id: "asc" } });
};

export const createSport = async (name = "", thumbnail = "", live_url = "") => {
	const sport = await db.sport.create({
		data: {
			name,
			live_url,
			thumbnail,
			sport_id: name.trim().toLowerCase().replace(/\s+/g, "_"),
		},
	});
	return sport;
};

export const updateLiveUrl = async (sport_id = "", live_url = "", thumbnail = "") => {
	let pkg = {};
	if (live_url.length) pkg.live_url = live_url;
	if (thumbnail.length) pkg.thumbnail = thumbnail;

	console.log({ pkg });

	const sport = await db.sport.update({ where: { sport_id }, data: pkg });
	return sport;
};
