import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { NavLink, Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import EntryForm from '../EntryFormPage/EntryForm'


function EntriesPage() {
    const dispatch = useDispatch()
    const allEntries = useSelector(state => state.journal)
    const { id }  = useParams();



    useEffect(() => {
        dispatch(allJournalEntries(id))
    }, [dispatch, id])

    return(
        <div className='home-container'>
                <div className='journal-nav-container'>
                    <div className='journal-nav-header'>
                        <h1>Journals</h1>
                    </div>
                    <div className='journal-nav-icons'>
                        <div className='add-journal'>
                            <EntryForm />
                        </div>
                        <div className='date-modified'>
                            <i className="far fa-calendar-alt">
                                <p>Sort </p>
                            </i>
                        </div>
                    </div>
                </div>
        </div>
    )

}

export default EntriesPage
