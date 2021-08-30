import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {allJournals, deleteSingleJournal } from '../../store/journal';

import './Home.css'

function DeleteJournal({journal}) {
    const dispatch = useDispatch();
    const [deleteRender, setDeleteRender] = useState(false)

    useEffect(() => {
        dispatch(allJournals())
    }, [dispatch, deleteRender])

    const handleDelete = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleJournal(journal.id))
        setDeleteRender(true)
    }

    return (
        <i className="fas fa-trash" onClick={handleDelete}></i>
    )

}

export default DeleteJournal
