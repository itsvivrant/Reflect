const GET_JOURNALS = 'journal/GET_JOURNALS';

const getJournals = (journals) => ({
    type: GET_JOURNALS,
    journals
})

export const allJournals = () => async(dispatch) => {
    const response = await fetch('/api/journals/');
    const data = await response.json()
    dispatch(getJournals(data))
    return {}
}


let initialState = {}
export default function reducer(state=initialState, action){
    switch(action.type) {
        case GET_JOURNALS:
            const newState = {...state, ...action.journals}
            return newState
        default:
            return state;
    }
}
