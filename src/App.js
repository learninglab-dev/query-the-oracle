import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MetaBuilder from './MetaBuilder.js'

function App() {
  const names = ['A','B','C','D','E']
  const [statement, setStatement] = useState('')
  return (
    <div className="App">
      <MetaBuilder names={names} setStatement={setStatement}/>
      <p>{statement}</p>
    </div>
  );
}

export default App;
