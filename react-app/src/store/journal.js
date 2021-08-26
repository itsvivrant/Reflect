const GET_JOURNALS = 'journal/ALL_JOURNALS';

const getJournals = (journals) => ({
    type: GET_JOURNALS,
    payload: journals
})

export const allJournals = () => async(dispatch) => {
    const response = await fetch('/api/journals/');
    const journals = await response.json()
    dispatch(getJournals(journals))
}


let initialState = {}
export default function reducer(state=initialState, action){
    switch(action.type) {
        case GET_JOURNALS:
            const newState = {...state}
            action.payload.journals.forEach((journal) => {
                newState.journals[journal.id] = journal
            })
            return newState
        default:
            return state;
    }
}
