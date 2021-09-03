import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {allJournals, deleteSingleJournal } from '../../store/journal';

import './Home.css'

function JournalDelete({journal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [deleteRender, setDeleteRender] = useState(false)

    useEffect(() => {
        dispatch(allJournals())
    }, [dispatch, deleteRender, journal.id])

    const handleDelete = async(e) => {
        e.preventDefault()
        await dispatch(deleteSingleJournal(journal.id))
        setDeleteRender(true)
        history.push(`/`)
    }

    return (
        <i className="fas fa-trash" onClick={handleDelete}></i>
    )

}

export default JournalDelete
