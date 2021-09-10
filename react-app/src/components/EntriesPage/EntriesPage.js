import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {  Link, useParams} from 'react-router-dom';
import { allJournalEntries } from '../../store/journal';
import EntryCreate from './EntryCreate';
import EntryEdit from './EntryEdit'
import EntriesNav from '../NavBar/EntriesNav';
import moment from 'moment';

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

    const [renderPage, setRenderPage] = useState(false)
    const [editEntryId, setEditEntryId] = useState('')

    const [selectedPicture, setSelectedPicture] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const allEntries = useSelector(state => state.journal.entries)

    const journal = useSelector(state => state.journal.journal)
    const journalName = journal?.title

    const currentDate = moment().format("dddd, MM/DD/YYYY");



    useEffect(() => {
        dispatch(allJournalEntries(id))
        setRenderPage(false)



        const pictureArray =[b3, b4, b5,b6, b9, b10]
        const randomIndex =  Math.floor(Math.random() * pictureArray.length);
        setSelectedPicture(pictureArray[randomIndex])

    }, [dispatch, id, renderPage , journalName])

    return(
        <div className='entries-whole'>
            {showSideBar &&
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
                                <div onClick={() => (setEditEntryId(entry.id))} className='entry-content'  key={entry.id}>
                                    <div className='entry-content-title'>
                                        <p>{entry?.title.length < 15 ? entry?.title : `${entry?.title.slice(0 , 15)}...`}</p>
                                    </div>
                                    <div className='entry-content-content'>
                                        <p>{entry?.content.length < 15 ? entry?.content.replace(/<[^>]*>/g, '') : `${entry?.content.slice(0,15).replace(/<[^>]*>/g, '')}...`}</p>
                                    </div>
                                    <div className='entry-content-created'> <p>{entry.created_at?.slice(0,17)}</p></div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
            </div>
            }
            <div className='entry-right-container'>
                <EntriesNav setShowSideBar={setShowSideBar} showSideBar={showSideBar}/>
                <div className='entry-edit-create' style={{backgroundImage: `url(${selectedPicture})`}}>

                    {showForm && editEntryId ?
                        <EntryEdit currentDate={currentDate} setRenderPage={setRenderPage} renderPage={renderPage} editEntryId={editEntryId} setShowForm={setShowForm}/>

                    :
                    <>
                        <EntryCreate currentDate={currentDate} setRenderPage={setRenderPage} setShowForm={setShowForm}/>
                    </>
                    }


                    </div>
            </div>

        </div>
    )

}

export default EntriesPage
