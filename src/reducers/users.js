import {GET_USERS, ADD_USER} from '../actions/users';
import {SAVE_ANSWER, ADD_QUESTION, TOGGLE_LIKE, DELETE_QUESTION} from '../actions/questions';
import merge from 'lodash/merge';

export default function users(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return merge({}, state, action.users); // because ... operator performs a shallow copy and so if the state has
            // more info (loaded from localStorage) that is nested inside in a user that action.users does not, it is overridden and lost
        case SAVE_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        ...{[action.qid]: action.answer}
                    }
                }
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser]['questions'].concat([action.question.id])
                }
            };
        case ADD_USER:
            return {
                ...state,
                [action.user.id] : action.user,
            };

        case TOGGLE_LIKE:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    favorites: state[action.authedUser].favorites.includes(action.qid) ?
                        state[action.authedUser].favorites.filter((qid)=>qid!==action.qid)
                        : state[action.authedUser].favorites.concat([action.qid])
                }
            };
        case DELETE_QUESTION:
            // Do not modify the redux state directly. It is immutable because redux does shallow
            // checking with root state object to check if state changed. If you directly modify
            // state, then shallow checking (checking object reference) might return false as the
            // object references are the same

            // Always create a new object from state to a new variable using Object.assign and
            // modify that and return it or use the spread operator to make the needed changes and
            // return a new object
            const users = Object.assign({}, state)
            delete users[action.authedUser].answers[action.qid];
            return {
                ...users,
                [action.authedUser]: {
                    ...users[action.authedUser],
                    questions: users[action.authedUser].questions.filter((id) => id !== action.qid),
                    }
                };
        default:
            return state
    }
}