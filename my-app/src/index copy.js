import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {this.props.value}
//       </button>
//     );
//   }
// }

//  Making an Interactive Component
// Let’s fill the Square component with an “X” when we click it. First, change the button tag that is returned from the Square component’s render() function to this:


  // we want the Square component to “remember” that it got clicked, and fill it with an “X” mark. To “remember” things, components use state.
  // React components can have state by setting this.state in their constructors. this.state should be considered as private to a React component that it’s defined in. Let’s store the current value of the Square in this.state, and change it when the Square is clicked.

  // First, we’ll add a constructor to the class to initialize the state:
// class Square extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       value: null
// //     };
// //   }
// // Note

// In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start with a super(props) call.

// Now we’ll change the Square’s render method to display the current state’s value when clicked:

// STEP 2 Replace this.props.value with this.state.value inside the <button> tag.
// Replace the `onClick={...}` event handler with `onClick={() => this.setState({value: 'X'})}`.
// Put the className and onClick props on separate lines for better readability.
// After these changes, the <button> tag that is returned by the Square’s render method looks like this:

// STEP 3 
// Note

// We split the returned element into multiple lines for readability, and added parentheses so that JavaScript doesn’t insert a semicolon after return and break our code.

// Now we’re passing down two props from Board to Square: value and onClick. The onClick prop is a function that Square can call when clicked. We’ll make the following changes to Square:

// Replace this.state.value with this.props.value in Square’s render method
// Replace this.setState() with this.props.onClick() in Square’s render method
// Delete the constructor from Square because Square no longer keeps track of the game’s state
// After these changes, the Square component looks like this:

// CLASS COMPONENT --> FUNCTION COMPONENT

// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }
// When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

// The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
// When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
// This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
// Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls the Board’s handleClick(i) when clicked.
// We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

 
  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}


  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})} // By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked.
      >
        {/* After the update, the Square’s this.state.value will be 'X', so we’ll see the X on the game board. If you click on any Square, an X should show up.

 */}
        {this.state.value} 
      </button>
    );
  })
}

// IMPPORTANT NOTE: Note

// To save typing and avoid the confusing behavior of this, we will use the arrow function syntax for event handlers here and further below:
```
class Square extends React.Component {
 render() {
   return (
     <button className="square" onClick={() => console.log('click')}>
       {this.props.value}
     </button>
   );
 }
}
```
// Notice how with onClick={() => console.log('click')}, we’re passing a function as the onClick prop. React will only call this function after a click. Forgetting () => and writing onClick={console.log('click')} is a common mistake, and would fire every time the component re-renders.



// STEP 1: Passing Data Through Props
// To get our feet wet, let’s try passing some data from our Board component to our Square component.

// We strongly recommend typing code by hand as you’re working through the tutorial and not using copy/paste. This will help you develop muscle memory and a stronger understanding.

// In Board’s renderSquare method, change the code to pass a prop called value to the Square:

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }
// In the beginning, we passed the value prop down from the Board to show numbers from 0 to 8 in every Square. In a different previous step, we replaced the numbers with an “X” mark determined by Square’s own state. This is why Square currently ignores the value prop passed to it by the Board.

// STEP 4 When we try to click a Square, we should get an error because we haven’t defined handleClick yet. We’ll now add handleClick to the Board class:
// Note how in handleClick, we call `.slice()` to create a copy of the squares array to modify instead of modifying the existing array. We will explain why we create a copy of the squares array in the next section.


handleClick(i) {
  const squares = this.state.squares.slice(); // notice how the slice() method instead of modifiying the existng array. SO WHY IS IMMUTABILITY SO IMPORTANT TO LEARN????
  squares[i] = 'X';
  this.setState({squares: squares});
}

// IMMUTABILITY

// SIDE LESSON ON IMMUTABILITY

// We will now use the prop passing mechanism again. We will modify the Board to instruct each individual Square about its current value ('X', 'O', or null). We have already defined the squares array in the Board’s constructor, and we will modify the Board’s renderSquare method to read from it:
// renderSquare(i) {
//   return <Square value={this.state.squares[i]} />;
// }

// Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.

// Next, we need to change what happens when a Square is clicked. The Board component now maintains which squares are filled. We need to create a way for the Square to update the Board’s state. Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.

// Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function when a square is clicked. We’ll change the renderSquare method in Board to:
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax, you can write:
// var newPlayer = {...player, score: 2};

// NEW VERSION OF renderSquare
renderSquare(i) {
  return (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  );
}



render() {
  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className="board-row">
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className="board-row">
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>
  );
}
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
