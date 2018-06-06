import {_getUsers, _saveUser} from '../utils/_DATA.js';
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';


export function getAllUsers(users) {
    return {
        type: GET_USERS,
        users,
    }
}

function addUser(user){
    return {
        type: ADD_USER,
        user
    }
}

export function handleGetUsers() {
    return (dispatch) => {
        _getUsers().then((users)=>{
            dispatch(getAllUsers(users));
    })
    }
}

export function handleAddUser(user) {
    return (dispatch) => {
        return _saveUser(user).then((formattedUser)=>{
            dispatch(addUser(formattedUser));
        })
    }

}