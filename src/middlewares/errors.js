/**
 * @type import("express").ErrorRequestHandler
 */
export default async (err, req, res, next) => {
	res.status(400).json({ type: err.name, error: err.message });
	return;

	if (err.name === "NotFoundError") {
	}

	next(err);
};
