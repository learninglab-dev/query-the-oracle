import React from 'react';
import logo from './logo.svg';
import './App.css';
import MegaBuilder from './MegaBuilder.js'

function App() {
  const names = ['A','B','C','D','E']
  return (
    <div className="App">
      <MegaBuilder names={names}/>
    </div>
  );
}

export default App;
