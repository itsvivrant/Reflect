import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import EntryCreate from '../EntryFormPage/EntryCreate';
import EntryEdit from '../EntryFormPage/EntryEdit'

import './EntriesPage.css'

function EntriesPage() {
    const dispatch = useDispatch()
    const [entryRender, setEntryRender] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const allEntries = useSelector(state => state.journal.entries)
    const journal = useSelector(state => state.journal.journal)
    let { id }  = useParams();
    id = Number(id)


    useEffect(() => {
        dispatch(allJournalEntries(id))
        setEntryRender(false)
    }, [dispatch, id, entryRender])

    return(
        <div className='entry-home-container'>
            <div className='entry-left-container'>
                <div className='entry-nav'>
                        <Link to='/' className="entries-link">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                        <i className="fas fa-book"></i>
                        <p>{journal?.title}</p>
                </div>
                <div className='entry-list-container'>
                    {allEntries?.map(entry => (
                        <button onClick={() => (
                            setShowForm(true)
                        )}>
                            <div className='entry-content' key={entry.id}>
                                <p>{entry.title}</p>
                                <p>{entry.content}</p>
                                <p>{entry.created_at}</p>
                                <p>{entry.updated_at}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className='entry-right-container'>
                {showForm ?
                    <EntryEdit setShowForm={setShowForm}/>

                :
                <>
                    <EntryCreate setEntryRender={setEntryRender} setShowForm={setShowForm}/> 
                </>
                }


            </div>
        </div>

    )

}

export default EntriesPage
