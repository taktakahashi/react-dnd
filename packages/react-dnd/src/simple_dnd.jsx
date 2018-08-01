import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import { DragSource, DropTarget } from 'react-dnd'

const dragSourceSpec = {
	beginDrag(props) {
		return props
	},

	endDrag(props, monitor) {
		const source = monitor.getItem()
		const target = monitor.getDropResult()
		if (!!target) props.dropAction(source, target)
	},
}

const dropTargetSpec = {
	drop(props) {
		return props
	},
}

function dragCollect(connect) {
	return {
		connectDragSource: connect.dragSource(),
	}
}

function dropCollect(connect) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

export function SimpleDnDWrapper(WrappedComponent) {
	@DropTarget('item', dropTargetSpec, dropCollect)
	@DragSource('item', dragSourceSpec, dragCollect)
	class DragandropItem extends Component {
		propTypes: {
			connectDragSource: PropTypes.func.isRequired,
			connectDropTarget: PropTypes.func.isRequired,
			dropAction: PropTypes.func.isRequired,
			dragAction: PropTypes.func.isRequried,
		}

		constructor(props) {
			super(props)
		}

		render() {
			const { connectDropTarget, connectDragSource } = this.props
			return React.createElement(WrappedComponent, {
				...this.props,
				ref: instance => {
					connectDropTarget(ReactDOM.findDOMNode(instance))
					connectDragSource(ReactDOM.findDOMNode(instance))
				},
			})
		}
	}

	return DragandropItem
}
