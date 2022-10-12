import * as model from "./model.js";
import * as utils from "./utils.js";

export const signIn = async (email = "", password = "") => {
	const user = await model.getUserByEmail(email);
	const matchPassword = await utils.matchPassword(password, user.password);
	if (!matchPassword) throw new Error("Passwords do not match. Signin failed.");
	return user;
};
export const register = async (full_name = "", email = "", password = "") => {
	await model
		.getUserByEmail(email)
		.then(() => {
			throw new Error("User with email already exists. Registration failed.");
		})
		.catch((_) => {});
	const hashedPassword = await utils.hashPassword(password);
	const user = model.createNewUser(email, full_name, hashedPassword);
	return user;
};
export const generateTokenPair = async (user = null) => {
	if (!user) throw new Error("User data is required as payload.");
	const freshUserData = await model.getUserByEmail(user.email);
	if (freshUserData.status === "SUSPENDED") throw new Error("Cannot generate tokens. User is suspened.");
	const accessToken = await utils.getAccessToken(user);
	return { accessToken };
};
export const generateNewAccessToken = async (accessToken = "") => {
	const payload = await utils.validateAccessToken(accessToken);
	const freshUserData = await model.getUserByEmail(payload.email);
	if (freshUserData.status === "SUSPENDED") throw new Error("Cannot generate tokens. User is suspened.");
	const token = await utils.getAccessToken(payload);
	return [token, payload];
};
export const generateResetToken = async (accountEmail = "") => {
	const user = await model.getUserByEmail(accountEmail);
	const { email, full_name, id } = user;
	const token = await utils.getResetToken({ email, full_name, id });
	const updatedUser = await model.setToken(id, token);
	await utils.sendResetEmail(full_name, email, token);
	return updatedUser.id;
};
export const resetPassword = async (token = "", newPassword = "") => {
	const payload = await utils.validateResetToken(token);
	const hashedPassword = await utils.hashPassword(newPassword);
	const user = await model.resetToken(payload.id, hashedPassword);
	return user.id;
};
