import React, { useState } from 'react';
import {UsetInput} from './User/UserInput';
import { UserOutpt } from './User/UserOutput';

function  App () {

  const [state, setState] = useState({text: 'Hego Damask'});

  function change(event) {
    setState({text: event.target.value})
  }

  return (
    <div
      style = {{
        margin: 'auto',
        width: '20%',
        marginTop: '1rem'
      }}
      >
      <UsetInput change={change.bind(this)}/>
      <UserOutpt name={state.text}/>
    </div>
  );
}

export default App;