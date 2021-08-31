import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import EntryForm from '../EntryFormPage/EntryForm'

import './EntriesPage.css'

function EntriesPage() {
    const dispatch = useDispatch()
    const [entryRender, setEntryRender] = useState(false)
    const allEntries = useSelector(state => state.journal.entries)
    const journal = useSelector(state => state.journal.journal)
    let { id }  = useParams();
    id = Number(id)


    useEffect(() => {
        dispatch(allJournalEntries(id))
        setEntryRender(false)
    }, [dispatch, id, entryRender])

    return(
        <div className='home-container'>
            <div className='journal-nav-container'>
                <div className='entry-nav'>
                    <Link to='/' className="entries-link">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <p>{journal?.title}</p>
                </div>
                <div className='journal-nav-icons'>
                    <div className='add-journal'>
                        <EntryForm setEntryRender={setEntryRender}/>
                    </div>
                    <div className='date-modified'>
                        <i className="far fa-calendar-alt">
                            <p>Sort </p>
                        </i>
                    </div>
                </div>
            </div>
            <div>
                {allEntries?.map(entry => (
                    <div key={entry.id}>
                        <p>{entry.title}</p>
                        <p>{entry.content}</p>
                        <p>{entry.created_at}</p>
                        <p>{entry.updated_at}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default EntriesPage
