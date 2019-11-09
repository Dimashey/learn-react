import React, {Component} from 'react'; 

import Person from './Person/Person';

class Persons extends Component {

    // static getDerivedStateFromProps(props, state) {
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        
    }

    // componentWillUpdate() {

    // }

    render() {
        return (
            this.props.persons.map((person, index) => {
                return (
                    <Person 
                        click={() => this.props.clicked(index)}
                        name={person.name} 
                        age={person.age}
                        changed={(event) => this.props.changed(event, person.id)}/>
                );
            })
        )      
    }
} 

export default Persons;