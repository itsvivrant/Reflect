const GET_JOURNALS = 'journal/GET_JOURNALS';
const GET_JOURNAL_ENTRIES = 'journal/GET_JOURNAL_ENTRIES';
const CREATE_JOURNAL = 'journal/CREATE_JOURNAL'

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



export default function reducer(state={}, action){
    let newState = {...state}
    switch(action.type) {
        case GET_JOURNALS:
            newState = {...action.journals}
            return newState

        case GET_JOURNAL_ENTRIES:
            newState["journal"] = action.journals.journal;
            newState["entries"] = action.journals.entries;
            return newState

        case CREATE_JOURNAL:
            return {
                ...state,
                [action.journal.id]: action.journal
            }
        default:
            return state;
    }

}
