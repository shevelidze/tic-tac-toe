import React from 'react'
import './GameCell.css'

export default class GameCell extends React.Component {
    render() {
        let className = '';
        if (this.props.value === 0)
            className = 'red';
        else if (this.props.value === 1)
            className = 'blue';
        className = 'game-cell ' + className;
        return <div className={className} onClick={this.props.onClick}></div>
    }
}