import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import { allJournals, deleteSingleJournal } from '../../store/journal';
import SplashPage from './SplashPage/SplashPage'
import JournalForm from '../JournalFormPage/JournalForm'
import EditJournalForm from './EditJournal';
import DeleteJournal from './DeleteJournal';

import './Home.css'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const journals = useSelector((state) => state.journal);
    const [renderUpdate, setRenderUpdate] = useState(false)


    useEffect(() => {
        dispatch(allJournals())
        setRenderUpdate(false)
    }, [dispatch, renderUpdate])



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
                            <JournalForm />
                        </div>
                        <div className='date-modified'>
                            <i class="far fa-calendar-alt">
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
                            <Link className='entries-link' to={`/journals/${journal.id}/entries`}>
                                <img className='cover-img' src={journal.coverUrl} />
                            </Link>
                            <div className='journal-icons-container'>
                                <div className='journal-icons'>
                                    <div className='journal-form-icon'>
                                        <EditJournalForm journal={journal} setRenderUpdate={setRenderUpdate}/>
                                    </div>
                                    <div className='journal-trash-icon'>
                                        <DeleteJournal journal={journal}/>
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
