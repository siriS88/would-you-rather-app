import {getAllUsers} from './users';
import {getAllQuestions} from './questions';
import {getInitialData} from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading';

export default function handleGetInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        getInitialData().then(({users, questions})=>{
            dispatch(getAllUsers(users));
            dispatch(getAllQuestions(questions));
            dispatch(hideLoading());
        })
    }
}