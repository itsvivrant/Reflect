import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { allJournals} from '../../store/journal';
import SplashPage from './SplashPage/SplashPage';
import Footer from '../Footer/Footer';
import JournalCreate from './JournalCreate';
import JournalEdit from './JournalEdit';
import JournalDelete from './JournalDelete';

import './Home.css'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const journals = useSelector((state) => state.journal);
    const [renderPage, setRenderPage] = useState(false);
    const [journalId, setJournalId] = useState('')

    function order(a, b) {
        return a.created_at < b.created_at ? -1 : (a.created_at > b.created_at ? 1 : 0);
    }

    journals?.journals?.sort(order)


    useEffect(async () => {
        await dispatch(allJournals())
    }, [dispatch, renderPage])



    let main;
    if (sessionUser) {
        main = (
            <div className='home-container'>
                <div className='journal-nav-container'>
                    <div className='journal-nav-header'>
                        <h1>Journals</h1>
                    </div>
                    <div className='journal-nav-icons'>
                        <div className='add-journal'>
                            <JournalCreate setRenderPage={setRenderPage} renderPage={renderPage}/>
                        </div>
                    </div>


                </div>

                <div className='journal-container'>
                    <div className='journal-gallery'>
                    {journals?.journals?.map((journal) => (
                        <>
                        <div className='each-journal'>
                            <Link className='entries-link' key={journal.id} to={`/journals/${journal?.id}/entries`}>
                                <img className='cover-img' alt='' src={journal.coverUrl} />
                            </Link>
                            <div className='journal-icons-container'>
                                <div className='journal-icons'>
                                    <div className='journal-form-icon' onClick={()=> setJournalId(journal.id)} >
                                        <JournalEdit journal={journal} journalId={journalId} setRenderPage={setRenderPage} renderPage={renderPage}/>
                                    </div>
                                    <div className='journal-trash-icon'>
                                        <JournalDelete journal={journal}  setRenderPage={setRenderPage} renderPage={renderPage}/>
                                    </div>
                                </div>

                            </div>
                            <div className='journal-title'>
                                <p>{journal.title}</p>
                            </div>
                        </div>
                        </>
                        )).sort(order)}
                    </div>
                </div>
            </div>
        )
    } else {
        main = (
            <SplashPage />
        )
    }
    return(
        <>
        {main}
        </>

    )


}

export default HomePage;
