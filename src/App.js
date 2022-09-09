import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './Componets/Login';
import Settings from "./pages/Settings";
import './App.css';

export default function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={ logo } className="App-logo" alt="logo" />
    //     <p>SUA VEZ</p>
    //   </header>
    // </div>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      {/* <Route exact path="/trivia" component={ Trivia } />
      <Route path="*" component={ PageNotFound } /> */}
    </Switch>
  );
}
