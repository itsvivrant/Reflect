
const GET_JOURNALS = 'journal/GET_JOURNALS';
const GET_JOURNAL_ENTRIES = 'journal/GET_JOURNAL_ENTRIES';
const CREATE_JOURNAL = 'journal/CREATE_JOURNAL';
const CREATE_ENTRY = 'journal/CREATE_ENTRY';
const UPDATE_JOURNAL = 'journal/UPDATE_JOURNAL';
const DELETE_JOURNAL = 'journal/DELETE_JOURNAL';



const getJournals = (journals) => ({
    type: GET_JOURNALS,
    journals
})

const getJournalEntries = (journals) => ({
    type: GET_JOURNAL_ENTRIES,
    journals
})

const newJournal = (journal) => ({
    type: CREATE_JOURNAL,
    journal
})

const newEntry = (entry) => ({
    type: CREATE_ENTRY,
    entry
})

const updateJournal = (journal) => ({
    type: UPDATE_JOURNAL,
    journal
})

const deleteJournal = (journal) => ({
    type: DELETE_JOURNAL,
    journal
})



export const allJournals = () => async(dispatch) => {
    const response = await fetch('/api/journals/');
    const data = await response.json()
    dispatch(getJournals(data))
}

export const allJournalEntries = (id) => async(dispatch) => {
    const response = await fetch(`/api/journals/${id}/entries`)
    const data = await response.json()
    dispatch(getJournalEntries(data))
}

export const createJournal = (title, coverUrl, user_id) => async(dispatch) => {
    const response = await fetch('/api/journals/new-journal', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            title,
            coverUrl,
            user_id
         }),
    })

    const new_data = await response.json();
    dispatch(newJournal(new_data));
    return new_data
}

export const createEntry = (title, content, strengths, user_id, id) => async(dispatch) => {
    const response = await fetch(`/api/journals/${id}/entries/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            content,
            strengths,
            user_id,
        })
    })

    const new_data = await response.json();
    dispatch(newEntry(new_data));
    return new_data
}

export const editJournal = (title, coverUrl, id, user_id) => async(dispatch) => {
    const response  = await fetch(`/api/journals/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, coverUrl, user_id}),
    })
    const update_data = await response.json();
    dispatch(updateJournal(update_data));
    return update_data
}

export const deleteSingleJournal = (id) => async(dispatch) => {
    const response = await fetch(`/api/journals/delete/${id}`, {
        method: "DELETE"
    })

    const delete_data = await response.json();
    dispatch(deleteJournal(delete_data))

}

export default function reducer(state={}, action){
    let newState = {...state}
    switch(action.type) {
        case GET_JOURNALS:
            newState = {...action.journals}
            return newState
            //another way:
            //newstate.journals
    
        case GET_JOURNAL_ENTRIES:
            newState["journal"] = action.journals.journal;
            newState["entries"] = action.journals.entries;
            return newState

        case CREATE_JOURNAL:
            newState[action.journal.id] = action.journal
            return newState
            //another way:
            // return {
            //     ...state,
            //     [action.journal.id]: action.journal
            // }

        case CREATE_ENTRY:
            newState[action.entry.id] = action.entry
            return newState

        case UPDATE_JOURNAL:
            newState[action.journal.id] = action.journal
            return newState

        case DELETE_JOURNAL:
            return newState


        default:
            return state;
    }

}
