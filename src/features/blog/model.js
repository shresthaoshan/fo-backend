import { db } from "../../loaders/database.js";

export const getBlogs = async (index = 0) => {
	return await db.blog.findMany({ skip: index, take: 10, orderBy: { timestamp: "desc" } });
};

export const createBlog = async (title = "", content = "", sport_id = "") => {
	const blog = await db.blog.create({
		data: {
			title,
			content,
			sport_id,
		},
	});
	return blog;
};

export const updateContent = async (id, title = "", content = "", sport_id = "") => {
	const blog = await db.blog.update({ where: { id }, data: { title, content, sport_id } });
	return blog;
};
