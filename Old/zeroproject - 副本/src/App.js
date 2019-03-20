import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-taco-table/dist/react-taco-table.css';


import {Stock_Table} from './Stock/Stock';
import {BuyIn_Table} from './BuyIn/BuyIn';

class Init extends React.Component{
  //Create a gamesparks object to be used
  constructor(props) {
    super(props);
    this.gamesparks = new GameSparks();
  }
}

class App extends Component {
  render() {
    return (

      <html lang="en">
        <head>
          <meta charset="utf-8"/> 
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"/>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
        </head>
        <body>
          
          <div class="container-fluid">
              <BuyIn_Table />  
          </div>

        </body>
      </html>
    );
  }
}

export default App;
