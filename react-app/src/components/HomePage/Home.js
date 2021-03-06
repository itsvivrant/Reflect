import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import { allJournals} from '../../store/journal';
import SplashPage from './SplashPage/SplashPage';
import NavBar from '../NavBar/NavBar';
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





    useEffect(() => {
        (async() => {
            await dispatch(allJournals())
        })();
    }, [dispatch, renderPage])



    let main;
    if (sessionUser) {
        main = (
            <>
            <NavBar/>
            <div className='home-container'>
                <div className='journal-nav-container'>
                    <div className='journal-nav-header'>
                        <h2>Journals</h2>
                    </div>

                    <div className='add-journal'>
                        <JournalCreate setRenderPage={setRenderPage} renderPage={renderPage}/>
                    </div>
                </div>


                <div className='journal-gallery'>
                    {journals?.journals?.sort((a, b) => a.created_at - b.created_at).map((journal, idx) => (
                        <div className='each-journal-container' key={idx}>
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
                        </div>
                        ))}
                    </div>
                </div>

            </>
        )
    } else {
        main = (
            <>
            <NavBar />
            <SplashPage />
            </>
        )
    }
    return(
        <>
        {main}
        </>

    )


}

export default HomePage;
