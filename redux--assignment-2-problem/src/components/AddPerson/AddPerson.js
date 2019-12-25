import React, {useState} from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [state, setState] = useState({
        name: '',
        age: ''
    });

    const nameChangeHandler = (event) => {
        const newState = {...state};
        newState.name = event.target.value
        setState(newState);
    };

    const ageChangeHandler = (event) => {
        const newState = {...state};
        newState.age = event.target.value
        setState(newState);
    };

    return (
        <div className="AddPerson">
            <input
                type="text"
                placeholder="Name"
                onChange={nameChangeHandler}
                value={state.name}/>
            <input type="number"
                 placeholder="Age"
                 onChange={ageChangeHandler}
                 value={state.age}/>
            <button onClick={() => props.personAdded(state.name, state.age)}>Add Person</button>
        </div>
    );
};

export default addPerson;
