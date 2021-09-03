import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import { getOneEntry } from '../../store/entry'
import EntryCreate from './EntryCreate';
import EntryEdit from './EntryEdit'
import moment from 'moment';

import './EntriesPage.css'
import { convertToRaw } from 'draft-js';

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
    const journalName = journal?.title

    const currentDate = moment().format("dddd, MM/DD/YYYY");

    function randomColor(e) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        // const op = 0.3;
        const color = "#" + randomColor;
        e.target.style.backgroundColor = color;
      }


    useEffect(() => {
        dispatch(allJournalEntries(id))
        // dispatch(getOneEntry(entry.id))
        setEntryRender(false)
        setDeleteRender(false)

    }, [dispatch, journal?.id, entryRender, deleteRender, journalName])

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
                            <h5>{journal?.title}</h5>
                            <p>{allEntries?.length} Entries</p>
                        </div>
                </div>
                <div className='entries-length-search'>
                    <i className="fas fa-search"></i>
                </div>
                <div className='entry-list-container'>
                    <div className='entry-list-box'>
                    {allEntries?.map(entry => (

                        <div onClick={() => (setShowForm(true))}>
                            <div onClick={() => (setEditEntryId(entry.id))}>
                                <div className='entry-content'  key={entry.id}>
                                    <div className='entry-content-title'> <p>{entry?.title.length < 50 ? entry?.title : `${entry?.title.slice(0 , 30)}...`}</p></div>
                                    <div className='entry-content-content'> <p>{entry?.content.length < 50? entry?.content : `${entry?.content.slice(0,30)}...`}</p> </div>
                                    <div className='entry-content-created'> <p>{entry.created_at}</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
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
