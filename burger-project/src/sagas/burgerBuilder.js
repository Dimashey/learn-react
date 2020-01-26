import { put } from 'redux-saga/effects';
import * as actions from '../store/actions/index';
import axios from "../axios-order";

export function* initIngridientsSaga() {
    try {
        const response = yield axios.get('https://burger-project-929c7.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch {
        yield put(actions.fetchIngredientsFailed());
    }
}
