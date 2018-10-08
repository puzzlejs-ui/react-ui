export default ({x ,y}, currentEl, containment = 'window') => {
	const currentElRect   = currentEl.getBoundingClientRect();
	const currentElWidth  = currentElRect.width;
	const currentElHeight = currentElRect.height;

	let containmentElWidth;
	let containmentElHeight;
	let containmentElX = 0;
	let containmentElY = 0;

	if(containment === 'window') {
		containmentElWidth  = window.innerWidth;
		containmentElHeight = window.innerHeight;
	}
	else {
		const parentElRect  = currentEl.parentNode.getBoundingClientRect();
		containmentElWidth  = parentElRect.width;
		containmentElHeight = parentElRect.height;
		containmentElX    = parentElRect.x;
		containmentElY   = parentElRect.y;
		console.log(parentElRect);
	}

	return {
		x : Math.max(Math.min(containmentElWidth  - currentElWidth  + containmentElX, x), containmentElX),
		y : Math.max(Math.min(containmentElHeight - currentElHeight + containmentElY, y), containmentElY),
		offset : {
			x: containmentElX,
			y: containmentElY
		}
	}
}