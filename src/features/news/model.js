import { db } from "../../loaders/database.js";

export const getNews = async (index = 0) => {
	return await db.news.findMany({ skip: index, take: 10, orderBy: { timestamp: "desc" } });
};

export const createNews = async (title = "", thumbnail = "") => {
	const news = await db.news.create({
		data: {
			title,
			thumbnail,
		},
	});
	return news;
};

export const updateContent = async (id, title = "", thumbnail = "") => {
	const news = await db.news.update({ where: { id }, data: { title, thumbnail } });
	return news;
};
