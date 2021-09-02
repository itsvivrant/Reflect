import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import { getOneEntry } from '../../store/entry'
import EntryCreate from './EntryCreate';
import EntryEdit from './EntryEdit'
import moment from 'moment';

import './EntriesPage.css'

function EntriesPage() {
    let { id }  = useParams();
    id = Number(id)
    const dispatch = useDispatch()
    // const entry = useSelector(state => state.entry.entry)
    const [entryRender, setEntryRender] = useState(false)
    const [editEntryId, setEditEntryId] = useState('')
    const [deleteRender, setDeleteRender] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const allEntries = useSelector(state => state.journal.entries)

    const journal = useSelector(state => state.journal.journal)

    const currentDate = moment().format("MM/DD/YYYY");



    useEffect(() => {
        dispatch(allJournalEntries(id))
        // dispatch(getOneEntry(entry.id))
        setEntryRender(false)
        setDeleteRender(false)
    }, [dispatch, id, entryRender, deleteRender])

    return(
        <div className='entry-home-container'>
            <div className='entry-left-container'>
                <div className='entry-nav'>
                        <div className='left-icon'>
                            <Link to='/' className="entries-link">
                                <i className="fas fa-arrow-left"></i>
                            </Link>
                        </div>
                        <div className='book-icon-title'>
                            <i className="fas fa-book"></i>
                            <p>{journal?.title}</p>
                        </div>
                </div>
                <div className='entries-length-search'>
                    <p>{allEntries?.length} Entries</p>
                    <i className="fas fa-search"></i>


                </div>
                <div className='entry-list-container'>
                    {allEntries?.map(entry => (

                        <div onClick={() => (
                            setShowForm(true)
                        )}>
                            <div onClick={() => (
                            setEditEntryId(entry.id)
                        )}>

                                <div className='entry-content' readOnly={true} key={entry.id}>
                                    <p>{entry.title}</p>
                                    <p>{entry.content}</p>
                                    <p>{entry.created_at}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='entry-right-container'>
                {showForm ?
                    <EntryEdit currentDate={currentDate} setDeleteRender={setDeleteRender} editEntryId={editEntryId} setShowForm={setShowForm}/>

                :
                <>
                    <EntryCreate currentDate={currentDate} setEntryRender={setEntryRender} setShowForm={setShowForm}/>
                </>
                }


            </div>
        </div>

    )

}

export default EntriesPage
