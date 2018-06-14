import { createSelector } from 'reselect';

// Selectors are used to improve performace by memoizing. Without a selector,
// everytime mapStateToProps was called by Home component, we were sorting
// all the questions wastefully even though nothing changed. This is not needed.
// If we can cache the result of sorting once, if questions are the same,
// we can just use the cached result instead of recalculating.

// sortQuestions is a memoized selector and if the result of input selector
// getQuestions does not change, it will return the cache value instead of
// applying the transformation function (that does the actual sorting).

const getQuestions = state => state.questions;

const getUsers = state => state.users;

export const sortQuestions = createSelector([getQuestions], (questions)=> {
    return Object.keys(questions)
        .sort((a,b)=>questions[b].timestamp-questions[a].timestamp)
});

export const getQuestionIds = createSelector([getQuestions], (questions) => {
   return Object.keys(questions);
});

export const getUserValues = createSelector([getUsers], (users) => {
    return Object.values(users);
});

export const sortUsers = createSelector([getUsers], (users)=> {
    const userValues=Object.values(users);
    userValues.sort((a,b)=>
        ((Object.keys(b.answers).length + b.questions.length)
            - (Object.keys(a.answers).length + a.questions.length)));
    return userValues;

});


