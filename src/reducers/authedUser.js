import {ADD_AUTHED_USER} from '../actions/authedUser';
import {ADD_USER} from "../actions/users";

export default function authedUser(state = null, action) {
    switch (action.type) {
        case ADD_AUTHED_USER:
            return action.id;
        case ADD_USER:
            return action.user.id;
        default:
            return state
    }
}