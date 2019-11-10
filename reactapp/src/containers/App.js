import React, { Component } from 'react';
import classes from'./App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: '28' },
      { id: 'vasdf1', name: 'Manu', age: '29' },
      { id: 'asdf11', name: 'Stephanie', age: '26' }
    ],
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {
    console.log('check');
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    
  }

  nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      });

      const person = {
        ...this.state.persons[personIndex]
      };  

      person.name = event.target.value;

      const persons = [...this.state.persons];
      
      persons[personIndex] = person;

      this.setState({persons: persons});
  };

  deletePersonsHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1); 
    this.setState({persons: persons})
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  render() {

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonsHandler}
            changed={this.nameChangedHandler}
            />
        </div>
      );
    }
    // classes.App it is selector in App.css
    return (
      <div className={classes.App}> 
      <button onClick={() => {
        this.setState({showCockpit: false})
      }}>Remove Cockpit</button>
          {
            this.state.showCockpit ? 
              <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.lenght}
              clicked={() => this.togglePersonsHandler()}
            /> : null
          }
          {persons} 
      </div>
    );
  }
}

export default App;