import {useState} from 'react'
import Header from './components/Header';
import Section from './components/Section';
import './App.css';

function App() {
    const [text, setText] =useState('');
  return (
    <div className="container">
        <Header />
        <Section text={text} setText={setText}/>
    </div>
  );
}

export default App;
