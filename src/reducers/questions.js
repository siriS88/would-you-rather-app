import {GET_QUESTIONS, SAVE_ANSWER, ADD_QUESTION, TOGGLE_LIKE} from '../actions/questions';

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


default:
    return state
}
}