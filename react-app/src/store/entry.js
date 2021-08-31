const GET_ENTRIES = 'entry/GET_ENTRIES'

const getEntries = (entries) => ({
    type: GET_ENTRIES,
    entries
})

export const getAllEntries = () => async(dispatch) => {
    const response = await fetch('/api/entries/all')
    const data = await response.json()
    dispatch(getEntries(data))
}



export default function reducer(state={}, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_ENTRIES:
            newState = {...action.entries}
            return newState

        default:
            return state
    }

}
