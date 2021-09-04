import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import { allJournals} from '../../store/journal';
import SplashPage from './SplashPage/SplashPage'
import JournalCreate from './JournalCreate'
import JournalEdit from './JournalEdit';
import JournalDelete from './JournalDelete';

import './Home.css'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const journals = useSelector((state) => state.journal);
    const [renderUpdate, setRenderUpdate] = useState(false);
    const [renderDelete, setRenderDelete] = useState(false)


    useEffect(() => {
        dispatch(allJournals())
        setRenderUpdate(false)
        setRenderDelete(false)
    }, [dispatch, renderUpdate, renderDelete])



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
                            <JournalCreate />
                        </div>
                        <div className='date-modified'>
                            <i className="far fa-calendar-alt">
                                <p>Sort </p>
                            </i>
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
                                    <div className='journal-form-icon'>
                                        <JournalEdit journal={journal} setRenderUpdate={setRenderUpdate}/>
                                    </div>
                                    <div className='journal-trash-icon'>
                                        <JournalDelete journal={journal} setRenderDelete={setRenderDelete}/>
                                    </div>
                                </div>

                            </div>
                            <div className='journal-title'>
                                <p>{journal.title}</p>
                            </div>
                        </div>
                        </>
                        ))}
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
