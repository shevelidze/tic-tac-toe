import React from 'react';
import './App.css';
import Logo from './Logo.js';
import Game from './Game.js';
import Result from './Result';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.centralContainer = <div id="central-container">Content</div>
    this.state = { logoDidDisappear: false, gameResult: null };
    let component = this;
    this.logoDidDisappear = () => {
      component.setState({ logoDidDisappear: true });
    }
    this.gameRef = React.createRef();
    this.resultRef = React.createRef();
  }

  onGameEnd(gameResult) {
    this.setState({ gameResult: gameResult });
    this.resultRef.current.showAndHide();
  }

  render() {
    let container = this;
    return (
      this.state.logoDidDisappear ?
        <div>
          <Game ref={this.gameRef} onEnd={(gameResult) => { container.onGameEnd(gameResult) }}></Game>
          <Result gameResult={this.state.gameResult} newGame={() => { this.gameRef.current.newGame() }} ref={this.resultRef}></Result>
        </div>
        : <Logo disappearCallback={this.logoDidDisappear}></Logo>

    );
  }

}
