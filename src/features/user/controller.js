import * as model from "./model.js";

/**
 * @type import("express").Handler
 */
export const getUserList = async (req, res) => {
	const { index = 0 } = req.query;

	const users = await model.getUsers(index);

	res.json(users);
};

/**
 * @type import("express").Handler
 */
export const suspend = async (req, res) => {
	const id = req.params.id;

	const user = await model.suspendUser(id);

	res.json(user);
};

/**
 * @type import("express").Handler
 */
export const activate = async (req, res) => {
	const id = req.params.id;

	const user = await model.activateUser(id);

	res.json(user);
};
