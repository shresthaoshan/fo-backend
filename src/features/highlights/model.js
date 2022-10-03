import { db } from "../../loaders/database.js";

export const getHighlights = async (sport_id = "", index = 0) => {
	return await db.highlight.findMany({ where: { sport_id }, orderBy: { timestamp: "desc" }, skip: index, take: 10 });
};

export const createHighlight = async (name = "", source = "", sport_id = "") => {
	const highlight = await db.highlight.create({
		data: {
			name,
			source,
			sport_id,
		},
	});
	return highlight;
};
