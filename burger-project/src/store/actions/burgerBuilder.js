import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingrdients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingrdients
    }
};

export const fetchIngredientsFailed = () => {
   return {
       type: actionTypes.FETCH_INGREDIENTS_FAILED
   }
};

export const initIngredients = () => {
    return {
      type: actionTypes.INIT_INGRIDIENTS
    };
};

