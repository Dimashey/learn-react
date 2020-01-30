import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
    const [ userIngredients, setUserIngredients ] = useState([]);

    const addIngredientHandler = (ingredient) => {
        setUserIngredients(prevIngredients => [...userIngredients, { id: Math.random().toString(), ...ingredient }]);
    };

    const deleteIngredientsHandler = (ingredientId) => {
        const newIngredientArray = userIngredients.filter(ing => {
          return ing.id !== ingredientId
        });
        setUserIngredients(newIngredientArray)
    };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
          <IngredientList ingredients={userIngredients} onRemoveItem={deleteIngredientsHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
