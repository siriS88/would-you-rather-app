class SaveState {

    loadState = () =>{
        try {
            const state = localStorage.getItem('wouldYouRatherState');
            if (state === null) {
                return undefined;
            }
            return JSON.parse(state);

        } catch (err) {
            console.warn('Unable to fetch previous state of app from localStorage');
            return undefined;
        }

    };

    saveState = (state) => {
        const reqState = Object.assign({}, {authedUser: state.authedUser}, {users: state.users}, {questions: state.questions}); // don't save loading bar state
        try {
            const serializedState = JSON.stringify(reqState);
            localStorage.setItem('wouldYouRatherState', serializedState);

        } catch (err) {
            console.warn('Unable to save state of app to localStorage');
        }

    };

}

export default SaveState;