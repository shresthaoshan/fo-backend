import captcha from "../features/captcha/index.js";

/**
 * @type import("express").Handler
 */
export default (req, _, next) => {
	const captchaToken = req.headers.captcha;

	if (!captchaToken?.length) throw new Error("Captcha solution required.");

	if (!captcha.services.verifyCaptcha(captchaToken)) throw new Error("Captcha verification failed.");

	next();
};
