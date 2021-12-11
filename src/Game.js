import React from 'react'
import './Game.css'
import GameCell from './GameCell';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.fieldValues = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.state = {
            bluePlayerIsCurrent: false,
            opacity: 0,
            redPlayerOpacity: 1,
            bluePlayerOpacity: 0,
            fieldValues: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]
        }
    }
    newGame() {
        this.fieldValues = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.setState({
            bluePlayerIsCurrent: false,
            redPlayerOpacity: 1,
            bluePlayerOpacity: 0,
            fieldValues: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ]
        })
    }
    detectWinner() {
        let emptyStayed = false;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (this.fieldValues[i][j] === null) emptyStayed = true;

        for (let i = 0; i < 3; i++) {
            rowCheck: {
                for (let j = 0; j < 2; j++) {
                    if (!(this.fieldValues[i][j] === this.fieldValues[i][j + 1] && this.fieldValues[i][j] !== null)) {
                        break rowCheck;
                    }
                }
                return true;
            }
            columntCheck: {
                for (let j = 0; j < 2; j++) {
                    if (!(this.fieldValues[j][i] === this.fieldValues[j + 1][i] && this.fieldValues[j][i] !== null)) {
                        break columntCheck;
                    }
                }
                return true;
            }
        }
        let firstDiagonal = true;
        let secondDiogonal = true;
        for (let i = 0; i < 2; i++) {
            firstDiagonal = firstDiagonal && (this.fieldValues[i][i] === this.fieldValues[i + 1][i + 1] && this.fieldValues[i][i] !== null);
            secondDiogonal = secondDiogonal && (
                this.fieldValues[i][2 - i] === this.fieldValues[i + 1][2 - i - 1] && this.fieldValues[i][2 - i] !== null);

        }
        if (firstDiagonal || secondDiogonal)
            return true;
        else if (emptyStayed)
            return false;
        else return null;
    }
    async clickedOnGameCell(row, column) {
        if (this.fieldValues[row][column] !== null) return;
        this.fieldValues[row][column] = Number(this.state.bluePlayerIsCurrent);
        this.setState({ fieldValues: this.fieldValues, bluePlayerIsCurrent: !this.state.bluePlayerIsCurrent });
        let component = this;
        let animationStart = performance.now();
        requestAnimationFrame(
            function appear(time) {
                component.playersAreChanging = true;
                let timeFraction = (time - animationStart) / 200;
                if (timeFraction > 1) timeFraction = 1;
                let state = {};
                if (component.state.bluePlayerIsCurrent) {
                    state = {
                        redPlayerOpacity: 1 - timeFraction,
                        bluePlayerOpacity: timeFraction
                    }
                } else {
                    state = {
                        redPlayerOpacity: timeFraction,
                        bluePlayerOpacity: 1 - timeFraction
                    }
                }
                component.setState(state);
                if (timeFraction < 1) requestAnimationFrame(appear);
                else component.playersAreChanging = false;
            }
        )

        let detectWinnerResult = this.detectWinner();
        if (detectWinnerResult !== false) {
            await new Promise((resolve) => { setTimeout(resolve, 200) });
            if (detectWinnerResult) this.props.onEnd(this.state.bluePlayerIsCurrent ? 1 : 2);
            else this.props.onEnd(0);
        }

    }
    renderGameCell(row, column) {
        let component = this;
        return <GameCell onClick={() => { component.clickedOnGameCell(row, column) }} value={this.state.fieldValues[row][column]}></GameCell>
    }
    componentDidMount() {
        let component = this;
        let animaitionStart = performance.now();
        requestAnimationFrame(
            function appear(time) {
                let timeFraction = (time - animaitionStart) / 700;
                if (timeFraction > 1) timeFraction = 1;
                component.setState({ opacity: timeFraction });
                if (timeFraction < 1) requestAnimationFrame(appear);
            }
        )
    }
    render() {
        return (
            <div id="game-container" style={{ opacity: this.state.opacity }}>
                <div id="players">
                    <div id="red-player" style={{ opacity: this.state.redPlayerOpacity }}>Red</div>
                    <div id="blue-player" style={{ opacity: this.state.bluePlayerOpacity }}>Blue</div>
                </div>
                <div id="field">
                    {this.renderGameCell(0, 0)}
                    {this.renderGameCell(0, 1)}
                    {this.renderGameCell(0, 2)}
                    {this.renderGameCell(1, 0)}
                    {this.renderGameCell(1, 1)}
                    {this.renderGameCell(1, 2)}
                    {this.renderGameCell(2, 0)}
                    {this.renderGameCell(2, 1)}
                    {this.renderGameCell(2, 2)}
                </div>
            </div>
        )
    }
}