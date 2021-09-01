const GET_ENTRIES = 'entry/GET_ENTRIES'
const GET_ENTRY = 'entry/GET_ONE_ENTRY'
const UPDATE_ENTRY = 'entry/UPDATE_ENTRY'
const DELETE_ENTRY = 'entry/DELETE_ENTRY'

const getEntries = (entries) => ({
    type: GET_ENTRIES,
    entries
})

const getEntry = (entry) => ({
    type: GET_ENTRY,
    entry
})

const updateEntry = (entry) => ({
    type: UPDATE_ENTRY,
    entry
})

const deleteEntry = (entry) => ({
    type: DELETE_ENTRY,
    entry
})

export const getAllEntries = () => async(dispatch) => {
    const response = await fetch('/api/entries/all')
    const data = await response.json()
    dispatch(getEntries(data))
}

export const getOneEntry = (id) => async(dispatch) => {
    const response = await fetch(`/api/entries/${id}`)
    const data = await response.json()
    dispatch(getEntry(data))
}


export const editEntry = (title, content, strengths, user_id, id) => async(dispatch) => {
    const response = await fetch(`/api/entries/edit/${id}` , {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, content, strengths, user_id})
    })
    const update_data = await response.json();
    dispatch(updateEntry(update_data));
    return update_data
}

export const deleteSingleEntry = (id) => async(dispatch) => {
    const response = await fetch(`/api/entries/delete/${id}`, {
        method: "DELETE"
    })
    const delete_data = await response.json();
    dispatch(deleteEntry(delete_data))
}




export default function reducer(state={}, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_ENTRIES:
            newState = {...action.entries}
            return newState

        case GET_ENTRY:
            newState = {...action.entry}
            return newState

        case UPDATE_ENTRY:
            newState[action.entry.id] = action.entry
            return newState

        case DELETE_ENTRY:
            return newState

        default:
            return state
    }

}
