import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import getMaxMinCoordinates from './utils/getMaxMinCoordinates';
import snapToGrid from './utils/snapToGrid';

class Draggable extends PureComponent {
	static get propTypes() {
		return {
			handle            : PropTypes.string,
			grid              : PropTypes.array,
			onDragStart       : PropTypes.func,
			onDragStop        : PropTypes.func,
			onDrag            : PropTypes.func,
			containment       : PropTypes.PropTypes.oneOf(['parent', 'window']),
			axis              : PropTypes.PropTypes.oneOf(['x', 'y']),
			draggingClassName : PropTypes.string,
			children          : PropTypes.node.isRequired,
		};
	}

	static get defaultProps() {
		return {
			handle            : null,
			children          : null,
			axis              : null,
			containment       : 'window',
			draggingClassName : 'dragging',
			grid              : [1, 1],
			onDragStart       : () => {},
			onDragStop        : () => {},
			onDrag            : () => {}
		}
	}

	get coordinates() {
		return {
			x : this.state.x,
			y : this.state.y
		}
	}

	constructor() {
		super();

		this.elementRef = React.createRef();

		this.state = {
			x        : null,
			y        : null,
			dragging : false
		};

		this.initialMouseX = null;
		this.initialMouseY = null;
		this.handleElement = null;

		this.stopDrag  = this.stopDrag.bind(this);
		this.startDrag = this.startDrag.bind(this);
		this.onDrag    = this.onDrag.bind(this);
	}

	componentDidMount() {
		this.handleElement = this.elementRef.current.querySelector(this.props.handle);

		if(this.handleElement) {
			this.handleElement.addEventListener("mousedown", this.startDrag);
		}

		const rect = this.elementRef.current.getBoundingClientRect();
		this.setState({x : rect.x, y : rect.y});
	}

	componentWillUnmount() {
		document.removeEventListener("mouseup", this.stopDrag);
		document.removeEventListener("mousemove", this.onDrag);

		if(this.handleElement) {
			this.handleElement.removeEventListener("mousedown", this.startDrag);
		}
	}

	startDrag(event) {
		if(this.handleElement && event.currentTarget !== this.handleElement) {
			return;
		}

		this.setState({dragging : true});

		this.initialMouseX = event.pageX - this.state.x;
		this.initialMouseY = event.pageY - this.state.y;

		this.props.onDragStart(event, this.coordinates);

		document.addEventListener("mouseup", this.stopDrag);
		document.addEventListener("mousemove", this.onDrag);
	}

	stopDrag(event) {
		this.setState({dragging : false});

		this.initialMouseX = null;
		this.initialMouseY = null;

		this.props.onDragStop(event, this.coordinates);

		document.removeEventListener("mouseup", this.stopDrag);
		document.removeEventListener("mousemove", this.onDrag);
	}

	onDrag(event) {
		if(!this.state.dragging) {
			return;
		}

		let x = event.pageX - this.initialMouseX;
		let y = event.pageY - this.initialMouseY;

		if(this.props.axis) {
			x = this.props.axis === 'x' ? x : this.state.x;
			y = this.props.axis === 'y' ? y : this.state.y;
		}

		let coordinates = {x, y};
		coordinates = snapToGrid(coordinates, this.props.grid);
		coordinates = getMaxMinCoordinates(coordinates, this.elementRef.current, this.props.containment);

		this.setState(coordinates);
		this.props.onDrag(event, coordinates);
	}

	render() {
		return React.cloneElement(React.Children.only(this.props.children), {
			ref         : this.elementRef,
			onMouseDown : this.startDrag,
			className   : classNames(this.props.children.props.className, {
				[this.props.draggingClassName] : this.state.dragging
			}),
			style       : Object.assign({}, this.props.children.props.style, {
				position : 'fixed',
				left     : this.state.x + 'px',
				top      : this.state.y + 'px',
				bottom   : this.state.y !== null ? 'auto' : null,
				right    : this.state.x !== null ? 'auto' : null
			})
		});
	}
}

export default Draggable;