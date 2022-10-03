import * as model from "./model.js";

/**
 * @type import("express").Handler
 */
export const getLatestHighlights = async (req, res) => {
	const { index = 0, sport_id = "" } = req.query;

	const highlights = await model.getHighlights(sport_id, index);

	res.json(highlights);
};

/**
 * @type import("express").Handler
 */
export const postMakeHighlight = async (req, res) => {
	const { name = "", source = "", sport_id = "" } = req.body;

	const highlight = await model.createHighlight(name, source, sport_id);

	res.json(highlight);
};
