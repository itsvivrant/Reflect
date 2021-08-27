import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';


function EntriesPage() {
    const dispatch = useDispatch()
    const allEntries = useSelector(state => state.journal)
    const { id }  = useParams();

    console.log("  CONSOLE.LOG                 ", allEntries)

    useEffect(() => {
        dispatch(allJournalEntries(id))
    }, [dispatch, id])

    return(
        <h1>Entries</h1>
    )

}

export default EntriesPage
