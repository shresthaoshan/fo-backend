import * as model from "./model.js";

/**
 * @type import("express").Handler
 */
export const getNewsList = async (req, res) => {
	const { index = 0 } = req.query;

	const news = await model.getNews(index);

	res.json(news);
};

/**
 * @type import("express").Handler
 */
export const postAddNews = async (req, res) => {
	const { title = "", thumbnail = "" } = req.body;

	if (!title.length) throw new Error("Title of news is required.");
	if (!thumbnail.length) throw new Error("Thumbnail link of news is required.");

	const news = await model.createNews(title, thumbnail);

	res.json(news);
};

/**
 * @type import("express").Handler
 */
export const updateNews = async (req, res) => {
	const id = req.params.id;
	const { title, thumbnail } = req.body;

	if (!title.length) throw new Error("Title of news is required.");
	if (!thumbnail.length) throw new Error("Thumbnail link of news is required.");

	const news = await model.updateContent(id, title, thumbnail);

	res.json(news);
};
