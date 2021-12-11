import React from 'react'
import './Logo.css'

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            bottom: '25%',
            display: 'flex'
        };
        this.animationStart = null;
        let component = this;
        this.callAppear = (time) => {
            component.appear(time);
        };
        this.callDisappear = (time) => {
            component.disappear(time);
        }
    }
    async appear(time) {
        console.log(this.animationStart);
        let timeFraction = (time - this.animationStart) / 700;
        if (timeFraction > 1) timeFraction = 1;
        this.setState({ opacity: timeFraction, bottom: (45 + timeFraction * 5) + '%' });
        if (timeFraction < 1) requestAnimationFrame(this.callAppear);
        else {
            await new Promise((resolve) => { setTimeout(resolve, 700) });
            this.animationStart = performance.now();
            requestAnimationFrame(this.callDisappear);
        }

    }
    disappear(time) {
        let timeFraction = (time - this.animationStart) / 700;
        if (timeFraction > 1) timeFraction = 1;
        this.setState({ opacity: 1 - timeFraction });
        if (timeFraction < 1) requestAnimationFrame(this.callDisappear);
        else {
            this.setState({ display: 'none' });
            this.props.disappearCallback();
        }

    }
    componentDidMount() {
        this.animationStart = performance.now();
        requestAnimationFrame(this.callAppear);
    }
    render() {
        return (
            <div id="logo" style={{ bottom: this.state.bottom, display: this.state.display }}>
                <div style={{ opacity: this.state.opacity }}>TicTacToe</div>
                <div style={{ opacity: this.state.opacity }}>by shevelidze</div>
            </div>
        )
    }
}