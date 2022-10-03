import fetch from "node-fetch";

const CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify";
const CAPTCHA_SECRET = "6LeqG5kgAAAAAOHainXpF9v6y4wD6yDAxA17CYKw";

export const verifyCaptcha = async (token = "") => {
	return new Promise((res, rej) => {
		fetch(`${CAPTCHA_URL}?secret=${CAPTCHA_SECRET}&response=${token}`)
			.then((r) => r.json())
			.then((data) => {
				if (data) res(data);
			})
			.catch((ex) => {
				rej(false);
			});
	});
};
