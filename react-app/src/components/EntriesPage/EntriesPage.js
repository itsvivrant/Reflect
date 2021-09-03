import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import { getOneEntry } from '../../store/entry'
import EntryCreate from './EntryCreate';
import EntryEdit from './EntryEdit'
import moment from 'moment';
import b2 from '../EntriesPage/background-img/b2.jpg'
import b3 from '../EntriesPage/background-img/b3.jpg'
import b4 from '../EntriesPage/background-img/b4.jpg'
import b5 from '../EntriesPage/background-img/b5.jpg'
import b6 from '../EntriesPage/background-img/b6.jpg'
import b9 from '../EntriesPage/background-img/b9.jpg'
import b10 from '../EntriesPage/background-img/b10.jpg'


import './EntriesPage.css'


function EntriesPage() {
    let { id }  = useParams();
    id = Number(id)
    const dispatch = useDispatch()
    // const entry = useSelector(state => state.entry.entry)
    const [entryRender, setEntryRender] = useState(false)
    const [editEntryId, setEditEntryId] = useState('')
    const [deleteRender, setDeleteRender] = useState(false)
    const [updateRender, setUpdateRender] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const allEntries = useSelector(state => state.journal.entries)

    const journal = useSelector(state => state.journal.journal)
    const journalName = journal?.title

    const currentDate = moment().format("dddd, MM/DD/YYYY");



    const [selectedPicture, setSelectedPicture] = useState('')




    useEffect(() => {
        dispatch(allJournalEntries(id))
        // dispatch(getOneEntry(entry.id))
        setEntryRender(false)
        setDeleteRender(false)
        setUpdateRender(false)

        const pictureArray =[b2, b3, b4, b5,b6, b9, b10]
        const randomIndex =  Math.floor(Math.random() * pictureArray.length);
        setSelectedPicture(pictureArray[randomIndex])



    }, [dispatch, journal?.id, entryRender, deleteRender, updateRender, journalName])

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
                    <input className='search-input' type='text' placeholder='Search entries...'></input>
                </div>
                <div className='entry-list-container'>
                    <div className='entry-list-box'>
                    {allEntries?.map(entry => (

                        <div onClick={() => (setShowForm(true))}>
                            <div onClick={() => (setEditEntryId(entry.id))}>
                                <div className='entry-content'  key={entry.id}>
                                    <div className='entry-content-title'> <p>{entry?.title.length < 50 ? entry?.title : `${entry?.title.slice(0 , 30)}...`}</p></div>
                                    <div className='entry-content-content'> <p>{entry?.content.length < 50? entry?.content.replace(/<[^>]*>/g, '') : `${entry?.content.slice(0,30).replace(/<[^>]*>/g, '')}...`}</p> </div>
                                    <div className='entry-content-created'> <p>{entry.created_at}</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div className='entry-right-container' style={{backgroundImage: `url(${selectedPicture})`}}>
                {showForm ?
                    <EntryEdit currentDate={currentDate} setUpdateRender={setUpdateRender} setDeleteRender={setDeleteRender} editEntryId={editEntryId} setShowForm={setShowForm}/>

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
