const GET_HAPPINESS = 'happiness/GET_HAPPINESS'
const UPDATE_HAPPINESS = 'happiness/UPDATE_HAPPINESS'
const DELETE_HAPPINESS = 'happiness/DELETE_HAPPINESS'

const getHappiness = (happiness) => ({
    type: GET_HAPPINESS,
    happiness
})

const updateHappiness = (happiness) => ({
    type: UPDATE_HAPPINESS,
    happiness
})

const deleteHappiness = (happiness) => ({
    type: DELETE_HAPPINESS,
    happiness
})

export const getUserHappiness = () => async(dispatch) => {
    const response = await fetch(`/api/users/happiness`)
    const data = await response.json()
    dispatch(getHappiness(data))
}

export const editHappiness = (overall_happiness, happiness_date, user_id, id) => async(dispatch) => {
    const response = await fetch(`/api/users/edit/happiness/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({overall_happiness, happiness_date, user_id})
    });

    if (response.ok) {
        const updateData = await response.json();
        dispatch(updateHappiness(updateData));
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteUserHappiness = (id) => async(dispatch) => {
    const response = await fetch(`/api/users/delete/happiness/${id}`, {
        method: "DELETE"
    })
    const deleteData = await response.json();
    dispatch(deleteHappiness(deleteData))
}


export default function reducer (state = {}, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_HAPPINESS:
            newState = {...action.happiness}
            return newState

        case UPDATE_HAPPINESS:
            newState[action.happiness.id] = action.happiness
            return newState

        case DELETE_HAPPINESS:
            return newState

        default:
            return state
    }
}
