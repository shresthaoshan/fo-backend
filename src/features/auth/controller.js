import * as service from "./services.js";

/**
 * @type import("express").Handler
 */
export const postSignin = async (req, res) => {
	const { email, password } = req.body;

	const user = await service.signIn(email, password);
	const { accessToken } = await service.generateTokenPair(user);

	res.cookie("session", accessToken, {
		expires: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes
		httpOnly: true,
	}).json({ id: user.id, email: user.email, full_name: user.full_name });
};

/**
 * @type import("express").Handler
 */
export const postSignOut = async (req, res) => {
	res.clearCookie("session");
	res.json({ success: true });
};

/**
 * @type import("express").Handler
 */
export const getTokenRefresh = async (req, res) => {
	const cookie = req.headers.cookie;
	if (!cookie?.length) throw new Error("Session is required.");

	const [_, session] = cookie.split("=");
	if (!session?.length) throw new Error("Session is required.");

	const [accessToken, payload] = await service.generateNewAccessToken(session);

	res.cookie("session", accessToken, {
		expires: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes
		httpOnly: true,
	}).json(payload);
};

/**
 * @type import("express").Handler
 */
export const postRegistration = async (req, res) => {
	const { full_name, email, password } = req.body;

	const user = await service.register(full_name, email, password);
	const { accessToken } = await service.generateTokenPair(user);

	res.cookie("session", accessToken, {
		expires: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes
		httpOnly: true,
	}).json({ id: user.id, email: user.email, full_name: user.full_name });
};
