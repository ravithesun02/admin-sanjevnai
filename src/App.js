import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component{
  render()
  {
    return(
      
      <BrowserRouter>
        <div>
          <Main/>
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
