import React, { Component } from 'react';
import classes from'./App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

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
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
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

      this.setState((state, props) => ({ 
          persons: persons,
          changeCounter: this.state.changeCounter + 1 
        }));
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

  loginHandler = () => {
    this.setState({ authenticated: true })
  };

  render() {

    let persons = null;
    
    if (this.state.showPersons) {
      persons = (
        <div>
          <p>{this.state.changeCounter}</p>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonsHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
            />
        </div>
      );
    }
    // classes.App it is selector in App.css
    return (
      <Auxiliary> 
        <button onClick={() => {
          this.setState({showCockpit: false})
        }}>Remove Cockpit</button>
        <AuthContext.Provider value={{ 
          authenticated: this.state.authenticated,
          login: this.loginHandler 
          }}>
            {
              this.state.showCockpit ? 
                <Cockpit
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                personsLength={this.state.persons.lenght}
                clicked={() => this.togglePersonsHandler()}
                login={this.loginHandler}
              /> : null
            }
            {persons} 
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);