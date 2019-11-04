import React, { Component } from 'react';
import Output from './Output/Output'
import ValidationComponent from './Validation/ValidationComponent';
import CharComponent from './Char/CharComponent';
import './App.css';

class App extends Component {
  state = {
    text: ''
  }

  deltetChar = (e, i) => {
    const charArr = this.state.text.split('');
    charArr.splice(i, 1);

    const newText = charArr.join('');
    this.setState({text: newText});

  }

  inputLenghtOfText = (e) => {
    this.setState({text: e.target.value});
  }

  render() {

    let textStatus = <p>Text too short</p>

    let listChar = this.state.text.split('').map((cur, index) => {
      return (
        <CharComponent
          click={(event) => this.deltetChar(event, index)} 
          letter={cur}
          key={index}
          />
        )
    })

    if(this.state.text.length >= 5) {
      textStatus = <p>Text long enough"</p>
    }

    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <input onChange={this.inputLenghtOfText} type="text"/>
        <Output number={this.state.text.length}/>
        <ValidationComponent status={textStatus}/>
        {listChar}
      </div>
    );
  }
}

export default App;