import {GET_QUESTIONS, SAVE_ANSWER, ADD_QUESTION, TOGGLE_LIKE, DELETE_QUESTION} from '../actions/questions';

export default function questions(state = [], action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case SAVE_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        case TOGGLE_LIKE:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    likes: state[action.qid].likes.includes(action.authedUser) ?
                        state[action.qid].likes.filter((user)=>user!==action.authedUser)
                        : state[action.qid].likes.concat([action.authedUser])
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
            const questions = Object.assign({}, state);
            delete questions[action.qid];
            return {
                ...questions
            };


        default:
            return state
}
}