import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link} from 'react-router-dom';
import { allJournals, deleteSingleJournal } from '../../store/journal';
import SplashPage from './SplashPage/SplashPage'
import JournalForm from '../JournalFormPage/JournalForm'
import EditJournalForm from '../EditJournalPage/EditJournal';
import DeleteJournal from './DeleteJournal';

import './Home.css'

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const journals = useSelector((state) => state.journal)


    useEffect(() => {
        dispatch(allJournals())
    }, [dispatch])



    let main;
    if (sessionUser) {
        main = (
            <div className='home-container'>
                <div className='journal-info-container'>
                    <h1>Journal Info</h1>
                    <JournalForm />
                </div>

                <div className='journal-show-container'>
                {journals?.journals?.map((journal) => (
                    <>
                        <div className='testing-div'>
                            <div className='each-journal'>
                                <Link className='entries-link' to={`/journals/${journal.id}/entries`}>
                                    <img className='cover-img' src={journal.coverUrl} />
                                </Link>
                                <div className='journal-edit-trash'>
                                    <div className='journal-form-icon'>
                                        <EditJournalForm journal={journal}/>
                                    </div>
                                    <div className='journal-trash-icon'>
                                         <DeleteJournal journal={journal}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
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
