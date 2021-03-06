// As modules in js are singletons and are only executed once (when loaded), users and  questions are part of the module cache
// and if any of the functions that change these variables, all other variables will be operating on the changed data, since
// these variables are global in this scope and are part of the same one reference in the same process. When page is refereshed
// and app is reloaded, module code is executed again and changes to these variables are reset. So, use database to persist changes
// across refreshes. This kind of module caching only works if we continue in the same process.
// (https://stackoverflow.com/questions/25416871/nodejs-persistent-variable)
let users = {
  samp: {
    id: 'samp',
    name: 'Sam Pascal',
    avatarURL: ,
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  jsmith: {
    id: 'jsmith',
    name: 'John Smith',
    avatarURL: ,
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  johndoe: {
    id: 'johndoe',
    name: 'John Doe',
    avatarURL: ,
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'samp',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['samp'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'johndoe',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['johndoe', 'sarahedo'],
      text: 'become a supervillain'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'samp',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['samp'],
      text: 'be telepathic'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['samp'],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'jsmith',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['jsmith'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['johndoe'],
      text: 'have your best friend find $500'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'johndoe',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['johndoe'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['jsmith'],
      text: 'write Swift'
    }
  },
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
    return new Promise((res, rej) => {
        setTimeout(() => res({...users}), 1000)
})
}

export function _getQuestions () {
    return new Promise((res, rej) => {
        setTimeout(() => res({...questions}), 1000)
})
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        },
        likes: [],
    }
}

function formatUser ({ name, id, avatarURL }) {
    return {
        id,
        name,
        avatarURL,
        answers: [],
        questions: [],
        favorites: [],
    }
}

export function _saveQuestion (question) {
    return new Promise((res, rej) => {
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
        questions = {
            ...questions,
            [formattedQuestion.id]: formattedQuestion
    };

    users = {
        ...users,
        [question.author] : {
            ...users[question.author],
            questions: users[question.author].questions.concat([question.id])
        }
    };

        res(formattedQuestion)
    }, 1000)
})
}

export function _saveUser (user) {
    return new Promise((res, rej) => {
        const formattedUser = formatUser(user)
        setTimeout(() => {
            users = {
                ...users,
                [formattedUser.id]: formattedUser
            };

            res(formattedUser)
        }, 1000)
    })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {
        setTimeout(() => {
        users = {
            ...users,
            [authedUser]: {
        ...users[authedUser],
                answers: {
            ...users[authedUser].answers,
                    [qid]: answer
            }
        }
    }

        questions = {
            ...questions,
            [qid]: {
        ...questions[qid],
                [answer]: {
            ...questions[qid][answer],
                    votes: questions[qid][answer].votes.concat([authedUser])
            }
        }
    }

        res()
    }, 500)
})
}

export function _saveToggleLike({authedUser, qid}) {
    return new Promise((res, rej) => {
        setTimeout(()=>{
            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    likes: questions[qid].likes.includes(authedUser) ?
                        questions[qid].likes.filter((user)=>user!==authedUser)
                        : questions[qid].likes.concat([authedUser])
                }
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    favorites: users[authedUser].favorites.includes(authedUser) ?
                        users[authedUser].favorites.filter((id)=>id!==qid)
                        : users[authedUser].favorites.concat([qid])
                }
            };
            res()
        },500)
    });
}

export function _saveDeleteQuestion({authedUser, qid}) {
    return new Promise((res,rej) => {
      setTimeout(()=>{
          const res_delete_q = delete questions.qid;
          let res_delete_ans = true;
          if (users[authedUser].answers.hasOwnProperty(qid)) {
              res_delete_ans = delete users[authedUser].answers[qid];
          }

          users = {
              ...users,
              authedUser: {
                  ...users[authedUser],
                  questions: users[authedUser].questions.filter((id)=>id!==qid)
              }
          };

          res(res_delete_q&&res_delete_ans)
      }, 500)
    })

}
