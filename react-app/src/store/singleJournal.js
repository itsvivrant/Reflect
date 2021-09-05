const GET_SINGLE_JOURNAL ='singleJournal/GET_SINGLE_JOURNAL';

//get single journal
const getSingleJournal = (singleJournal) => ({
    type: GET_SINGLE_JOURNAL,
    singleJournal
})

export const oneJournal = (id) => async(dispatch) =>{
    const response = await fetch(`/api/journals/singleJournal/${id}`)
    const data = await response.json()
    dispatch(getSingleJournal(data))
}


export default function reducer(state={}, action){
    // let newState = {...state}
    switch(action.type) {

        case GET_SINGLE_JOURNAL:
            return {...state,...action.singleJournal}



        default:
            return state;
    }

}
