import React from "react";
import "./Result.css"

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opacity: 0, display: 'none' };
    }

    showAndHide() {
        this.animationRunning = true;
        let component = this;
        let animationDuration = 700;
        let animationStart = performance.now();
        component.setState({ display: 'block' });
        requestAnimationFrame(
            async function appear(time) {
                let timeFraction = (time - animationStart) / animationDuration;
                if (timeFraction > 1) timeFraction = 1;
                component.setState({ opacity: timeFraction });
                if (timeFraction < 1) requestAnimationFrame(appear);
                else {
                    await new Promise((resolve) => { setTimeout(resolve, 1000) });
                    component.props.newGame();
                    let animationStart = performance.now();
                    requestAnimationFrame(
                        function disappear(time) {
                            let timeFraction = (time - animationStart) / animationDuration;
                            if (timeFraction > 1) timeFraction = 1;
                            component.setState({ opacity: 1 - timeFraction });
                            if (timeFraction < 1) requestAnimationFrame(disappear);
                            else {
                                component.animationRunning = false;
                                component.setState({ display: 'none' });
                            }
                        }
                    )
                }
            }
        )
    }
    render() {
        return (
            <div id="result-block" style={{ opacity: this.state.opacity, display: this.state.display }}>
                {this.props.gameResult === 1 ? <div>Red won!🏆</div> : this.props.gameResult === 2 ? <div>Blue won!🏆</div> : <div>Draw🤝</div>}
            </div>
        )
    }

}