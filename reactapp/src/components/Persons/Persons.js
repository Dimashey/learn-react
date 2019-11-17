import React, {PureComponent} from 'react'; 
import Auxiliary from '../../hoc/Auxiliary';
import Person from './Person/Person';

class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if( nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed || 
    //         nextProps.clicked !== this.props.clicked) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    //     // return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        
    }

    componentWillUpdate() {

    }

    render() {
        return (
            this.props.persons.map((person, index) => {
                return (
                    <Person 
                        click={() => this.props.clicked(index)}
                        name={person.name} 
                        age={person.age}
                        changed={(event) => this.props.changed(event, person.id)}
                        isAuth={this.props.isAuthenticated}
                        />
                );
            })
        )      
    }
} 

export default Persons;