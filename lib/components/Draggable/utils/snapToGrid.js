export default ({x, y}, grid) => {
	const stepX = grid[0];
	const stepY = grid[1];

	return {
		x : Math.round(x / stepX) * stepX,
		y : Math.round(y / stepY) * stepY,
	}
};