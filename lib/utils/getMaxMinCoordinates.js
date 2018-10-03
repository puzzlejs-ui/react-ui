export default ({x ,y}, currentEl, containment = 'window') => {
	const currentElRect   = currentEl.getBoundingClientRect();
	const currentElWidth  = currentElRect.width;
	const currentElHeight = currentElRect.height;

	let containmentElWidth;
	let containmentElHeight;

	if(containment === 'window') {
		containmentElWidth  = window.innerWidth;
		containmentElHeight = window.innerHeight;
	}
	else {
		const parentElRect  = currentEl.parentNode.getBoundingClientRect();
		containmentElWidth  = parentElRect.width;
		containmentElHeight = parentElRect.height;
	}

	return {
		x : Math.max(Math.min(containmentElWidth  - currentElWidth,  x), 0),
		y : Math.max(Math.min(containmentElHeight - currentElHeight, y), 0),
	}
}