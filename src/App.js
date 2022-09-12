import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Settings from './pages/Settings';
import './App.css';
import Game from './pages/Game';
import store from './redux/store';

export default function App() {
  return (
    <Switch>
      <Provider store={ store }>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/game" component={ Game } />
      </Provider>
    </Switch>
  );
}
// <div className="App">
//   <header className="App-header">
//     <img src={ logo } className="App-logo" alt="logo" />
//     <p>SUA VEZ</p>
//   </header>
// </div>
