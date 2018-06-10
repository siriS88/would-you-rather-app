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
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('wouldYouRatherState', serializedState);

        } catch (err) {
            console.warn('Unable to save state of app to localStorage');
        }

    };

}

export default SaveState;