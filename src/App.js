import React from 'react';
import logo from './logo.svg';
import './App.css';
import Builder from './Builder.js'

function App() {
  const names = ['A','B','C','D']
  return (
    <div className="App">
      <Builder names={names}/>
    </div>
  );
}

export default App;
