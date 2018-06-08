import {GET_USERS, ADD_USER} from '../actions/users';
import {SAVE_ANSWER, ADD_QUESTION, TOGGLE_LIKE, DELETE_QUESTION} from '../actions/questions';

export default function users(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            };
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
            delete state[action.authedUser].answers[action.qid];
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.filter((id) => id !== action.qid),
                    }
                };
        default:
            return state
    }
}