const elemFromString = (html:string):Element => {
	const tempWrapper:HTMLElement = document.createElement('div');
	tempWrapper.innerHTML = html;
	return tempWrapper.children[0];
};

export default elemFromString;
