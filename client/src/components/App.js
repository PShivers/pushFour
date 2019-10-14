import React from "react";
import ReactDOM from "react-dom";
import GameBoard from "./GameBoard";
import "bootstrap/dist/css/bootstrap.css";


class App extends React.Component {
  state = {
    squares: [[0, 0, 0], [0, 0, 0], [0, 0, 0 ]],
    selectedArray: 0,
    isXturn: true,
  };

  selectArray = (rowIndex) => {
    this.setState({
      selectedArray: rowIndex
    })
    console.log(this.state.selectedArray)
  };


  handlePushClick = () => {
    let player = '';
    if(this.state.isXturn){
      player="X"
    } else{
      player = "O"
    }
    let newSquares = [...this.state.squares]
    let newRow = [...this.state.squares[this.state.selectedArray]];
    if(newRow.includes(0)){
      newRow[newRow.indexOf(0)] = player
    } else {
      alert('Selected array full, cannot push to selected array.')
    }
    newSquares[this.state.selectedArray]=newRow;
    this.setState({
      squares: newSquares, isXturn: !this.state.isXturn
    })
  };

  render() {
    return (
      <div className="App">
        <GameBoard 
        squares={this.state.squares} 
        selectArray={this.selectArray}
        />

        <button onClick={this.handlePushClick}>Push</button>
        <button>Pop</button>
        <button>Shift</button>
        <button>Unshift</button>
      </div>
    );
  }
}

// ========================================

export default App

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}