import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
    const [ userIngredients, setUserIngredients ] = useState([]);
    /**
     * This hook invoke after component render, be careful if we change state in this hook, element rerender and this invoke and again invoke useEffect
     * this can be infinity loop
     * */
    useEffect(() => {
        fetch('https://react-hooks-update.firebaseio.com/ingredients.json')
            .then(response => response.json())
            .then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData) {
                    loadedIngredients.push({
                        id: key,
                        title: responseData[key].title,
                        amount: responseData[key].amount
                    });
                }
                setUserIngredients(loadedIngredients);
            });
        /**
         * set empty array as second argument to stop infinty loop
         * */
    }, []);

    useEffect(() => {
       setUserIngredients(() => [{
            id: Math.random().toString(),
            title: 'Bannana',
            amount: 2
       }]);
        /**
         * this function run when user ingredients change
         * */
    }, [userIngredients]);

    const filteredIngredientsHandler = filteredIngredients => {
        setUserIngredients(filteredIngredients);
    };

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
      <IngredientForm onAddIngredient={addIngredientHandler} onLoadIngredients={filteredIngredientsHandler}/>

      <section>
        <Search />
          <IngredientList ingredients={userIngredients} onRemoveItem={deleteIngredientsHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
