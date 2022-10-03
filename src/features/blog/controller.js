import * as model from "./model.js";

/**
 * @type import("express").Handler
 */
export const getBlogList = async (req, res) => {
	const { index = 0 } = req.query;

	const blogs = await model.getBlogs(index);

	res.json(blogs);
};

/**
 * @type import("express").Handler
 */
export const postAddBlog = async (req, res) => {
	const { title = "", content = "", sport_id = "" } = req.body;

	if (!title.length) throw new Error("Title of blog is required.");
	if (!content.length) throw new Error("Content of blog is required.");

	const blog = await model.createBlog(title, content, sport_id);

	res.json(blog);
};

/**
 * @type import("express").Handler
 */
export const updateBlog = async (req, res) => {
	const id = req.params.id;
	const { title, content, sport_id } = req.body;

	if (!title.length) throw new Error("Title of blog is required.");
	if (!content.length) throw new Error("Content of blog is required.");

	const blog = await model.updateContent(id, title, content, sport_id);

	res.json(blog);
};
