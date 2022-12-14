import * as model from "./model.js";

/**
 * @type import("express").Handler
 */
export const getSportsList = async (req, res) => {
	const { index = 0 } = req.query;

	const sports = await model.getSports(index);

	res.json(sports);
};

/**
 * @type import("express").Handler
 */
export const postAddSport = async (req, res) => {
	const { name = "", thumbnail = "", live_url = "" } = req.body;

	if (!name.length) throw new Error("Name of sport is required.");
	if (!thumbnail.length) throw new Error("Thumbnail link of sport is required.");

	const sport = await model.createSport(name, thumbnail, live_url);

	res.json(sport);
};

/**
 * @type import("express").Handler
 */
export const updateLiveUrl = async (req, res) => {
	const sport_id = req.params.sport_id;
	const { live_url = "", thumbnail = "" } = req.body;

	const sport = await model.updateLiveUrl(sport_id, live_url, thumbnail);

	res.json(sport);
};
