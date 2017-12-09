/**
 * Creates a page url
 * @param {number|string} index
 * @returns {string} - new url
 */
const getPageUrl = index => index === 1 ? '/api/users/' : `/api/users/${index}/`;

/**
 * Creates an empty object for
 */
const createPage = (pageIndex, pageIndexMax) => {
	const page = { result: [] };
	if (pageIndex > 1) {
		page.previousPageUrl = getPageUrl(pageIndex - 1);
	}
	if (pageIndex < pageIndexMax) {
		page.nextPageUrl = getPageUrl(pageIndex + 1);
	}
	return page;
};

/**
 * Splits users per pages
 * @param {Array} users
 * @param {Array} usersPerPage
 */
const createPages = (users, usersPerPage) => {
	const pageNumMax = Math.ceil(users.length / usersPerPage);

	return users.reduce((acc, user, index) => {
		const pageNum = index ? Math.ceil((index + 1) / usersPerPage) : 1;
		let page = acc[pageNum - 1];

		if (!page) {
			page = createPage(pageNum, pageNumMax);
			acc.push(page);
		}

		page.result.push(user);
		return acc;
	}, []);
};

module.exports = {
	createPages
};
