import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';


class App extends React.Component{
  render()
  {
    return <Main/>
  }
}

export default App;
